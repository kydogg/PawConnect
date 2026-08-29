#!/bin/bash
# Automated backend probes for Sprint 1 issue #3 — email/password auth + RLS
# (ADR-0001). Uses only the public anon key; RLS is the boundary under test.
#
# NOTE: run AFTER disabling "Confirm email" in the Supabase dashboard —
# with confirmations on, signup sends mail (2/hour limit on the built-in
# mailer) and returns no session, so every probe below fails.
# Probe users are left behind; delete them in Dashboard → Authentication.
set -u
URL="https://jculjhfkganixztkswjp.supabase.co"
ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWxqaGZrZ2FuaXh6dGtzd2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzc4MzQsImV4cCI6MjA4MzkxMzgzNH0.n3gHRv6dQcNVTwRl0Y7QRtQcfXrYJPgARhE1lL7q2pk"
TS=$(date +%s)
EMAIL_A="pawconnect.probe.a.${TS}@gmail.com"
EMAIL_B="pawconnect.probe.b.${TS}@gmail.com"
PASS="Probe-pass-1234"
FAIL=0

json_get() { python3 -c "import sys,json; d=json.load(sys.stdin); print(d$1)" 2>/dev/null; }
check() { # check <description> <ok:0|1>
  if [ "$2" -eq 0 ]; then echo "  ✓ $1"; else echo "  ✗ $1"; FAIL=1; fi
}

echo "=== 1. Sign up user A ($EMAIL_A) — expect immediate session ==="
RESP_A=$(curl -s -X POST "$URL/auth/v1/signup" -H "apikey: $ANON" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_A\",\"password\":\"$PASS\",\"data\":{\"full_name\":\"Probe A\"}}")
TOKEN_A=$(echo "$RESP_A" | json_get "['access_token']")
UID_A=$(echo "$RESP_A" | json_get "['user']['id']")
check "signup returns a session (email confirmation off)" "$([ -n "$TOKEN_A" ] && echo 0 || echo 1)"
[ -z "$TOKEN_A" ] && { echo "  response: $RESP_A"; echo "Aborting — later probes need a session."; exit 1; }

echo "=== 2. Trigger: A's profiles row exists and is readable by A ==="
ROW=$(curl -s "$URL/rest/v1/profiles?id=eq.$UID_A&select=id,email,full_name" \
  -H "apikey: $ANON" -H "Authorization: Bearer $TOKEN_A")
echo "  $ROW"
check "profiles row created by signup trigger" "$(echo "$ROW" | grep -q "$UID_A" && echo 0 || echo 1)"

echo "=== 3. Wrong-password sign-in — expect invalid_credentials ==="
ERR=$(curl -s -X POST "$URL/auth/v1/token?grant_type=password" -H "apikey: $ANON" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_A\",\"password\":\"wrong-password-1\"}")
check "error_code is invalid_credentials" "$(echo "$ERR" | grep -q invalid_credentials && echo 0 || echo 1)"

echo "=== 4. Sign up user B ($EMAIL_B) ==="
RESP_B=$(curl -s -X POST "$URL/auth/v1/signup" -H "apikey: $ANON" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_B\",\"password\":\"$PASS\",\"data\":{\"full_name\":\"Probe B\"}}")
TOKEN_B=$(echo "$RESP_B" | json_get "['access_token']")
UID_B=$(echo "$RESP_B" | json_get "['user']['id']")
check "second account created with session" "$([ -n "$TOKEN_B" ] && echo 0 || echo 1)"

echo "=== 5. RLS: B reads A's profile — expect [] (migration 0003) ==="
CROSS=$(curl -s "$URL/rest/v1/profiles?id=eq.$UID_A&select=id,email" \
  -H "apikey: $ANON" -H "Authorization: Bearer $TOKEN_B")
echo "  $CROSS"
check "cross-user profile read denied" "$([ "$CROSS" = "[]" ] && echo 0 || echo 1)"

echo "=== 6. RLS: B lists all profiles — expect only own row ==="
ALL=$(curl -s "$URL/rest/v1/profiles?select=id" -H "apikey: $ANON" -H "Authorization: Bearer $TOKEN_B")
check "profile listing limited to own row" "$([ "$ALL" = "[{\"id\":\"$UID_B\"}]" ] && echo 0 || echo 1)"

echo "=== 7. RLS: B updates A's profile — expect no rows updated ==="
UPD=$(curl -s -X PATCH "$URL/rest/v1/profiles?id=eq.$UID_A" \
  -H "apikey: $ANON" -H "Authorization: Bearer $TOKEN_B" -H "Content-Type: application/json" \
  -H "Prefer: return=representation" -d '{"full_name":"HACKED"}')
check "cross-user profile update denied" "$([ "$UPD" = "[]" ] && echo 0 || echo 1)"

echo "=== 8. Anonymous read of profiles — expect [] ==="
ANON_READ=$(curl -s "$URL/rest/v1/profiles?select=id" -H "apikey: $ANON")
check "anonymous profile read denied" "$([ "$ANON_READ" = "[]" ] && echo 0 || echo 1)"

echo
if [ "$FAIL" -eq 0 ]; then echo "ALL PROBES PASSED"; else echo "SOME PROBES FAILED"; exit 1; fi
