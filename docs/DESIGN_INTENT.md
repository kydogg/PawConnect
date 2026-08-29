# PawConnect Design Intent

**Companion to:** `PRODUCT_SPEC.md`, `brand-design.html`, `PawConnect-Asset-Library.md`
**Purpose:** Captures the *emotional posture* of every screen that has one. The spec tells you what's on the screen; this tells you what it should feel like.
**Scope:** 35 screens. Pure-utility screens (settings, edit forms, password reset entry) are intentionally excluded — the answer for those is "follow iOS conventions, get out of the way."
**Last updated:** April 30, 2026

---

## How to use this document

This doc lives one layer above the spec. The spec defines *components, dimensions, and behaviors*; this defines *what those components together should make a person feel*. They're complementary, not redundant.

**When building a screen with Claude Code:**
> "Read PRODUCT_SPEC.md § AUTH-01 and DESIGN_INTENT.md § AUTH-01. Build the screen per the spec, with the visual posture from the intent doc."

The spec is the structural truth. The intent is the taste calibration. Both matter.

**Format per entry:**
- **Role:** One line — where this screen sits in the user's emotional arc.
- **Intent:** One paragraph — what it should feel like, what's doing emotional work, what gets the most weight.
- **Anti-patterns:** Three things — what would betray the intent. Specific references the reader has actually felt before, so the wrong direction is recognizable.

Anti-patterns are the most important part. "Make it warm" is too vague to act on. "Don't make it feel like a banking app's 2FA screen" tells you exactly what to steer away from.

---

## Cross-cutting emotional posture

Before any individual screen, this is what's true on every screen.

**Warmth over efficiency.** Rover, Wag, every competitor in this space has chosen to feel like a marketplace — clean, transactional, slightly cold. PawConnect's competitive advantage is feeling like *the app a friend would build for their neighborhood*. Slower transitions are fine. Friendlier copy is fine. A little softness in every interaction is the point.

**Quiet confidence, never loud reassurance.** Trust comes from showing competence, not asserting it. "Verified background-checked top-rated insured 5-star sitter" stacks of badges actively undermine trust — they read as defensive. A sitter's clear photo, a few specific reviews, and a transparent rate communicate trust better than any badge soup.

**The pet is family, not cargo.** Every screen that touches a pet — adding one, viewing one, handing one off — should feel weighted toward "this is your loved one" rather than "this is the booking object." The data model treats pets as objects; the UI must not.

**The neighborhood, not the world.** PawConnect is hyperlocal. The visual language should feel small-scale: warm lighting, residential streets, walkable distances. Not aerial logistics maps. Not airline-app dashboards. The map view should feel more like a paper neighborhood map than Google Maps.

**Pacing matters.** Most marketplace apps optimize for speed-to-conversion. PawConnect can afford to slow down at emotional moments (handing your pet over, seeing them being cared for, the booking completing). Those moments are when retention is built. Don't rush them.

**The asset library does the heavy lifting.** Where the brand really lives is in the illustrations — the warm sunset palette, the hand-drawn quality, the specific characters. Trust the assets. UI chrome should recede so they can breathe.

---

## EPIC 1 — Auth & Onboarding

### AUTH-01: Welcome

**Role:** First impression. Sets the entire emotional contract for the relationship.

**Intent:** This is the moment someone decides PawConnect is or isn't for them. The hero illustration carries 70% of the weight — it should feel like a friendly neighbor's front porch, not a tech demo. Copy is brief and human; "Find pet care you trust" beats "Premium pet care marketplace." The buttons feel inviting, not aggressive — you're not selling a subscription, you're opening a door. No badges, no "as featured in" logos, no scrolling required. One screen, one feeling: *this is for me*.

**Anti-patterns:**
- Don't make this feel like a SaaS landing page (no "Sign up to unlock" energy)
- Don't pile on social proof — "Join 50,000+ pet owners!" undercuts the warmth and we don't have those numbers anyway
- Don't use stock-illustration energy — this needs to feel hand-drawn even if it isn't

---

### AUTH-02: Sign Up

**Role:** First commitment moment. The user is choosing to be in the system.

**Intent:** Friction is the enemy here, but warmth is the differentiator. Apple Sign In gets primary placement because it's the path that respects the user most — fewer fields, less data, no password to forget. Email is offered without apology, but secondary. Form fields breathe with generous spacing; nothing feels cramped or transactional. Inline validation is gentle, not aggressive — errors appear after the user leaves a field, not as they type. The CTA copy is forward-looking — "Create my account" — not commanding.

**Anti-patterns:**
- Don't show a password strength meter that turns red and shouts at people
- Don't require birthday, phone, or any field that isn't strictly necessary — every extra field is a lost user
- Don't make Apple Sign In feel like a fallback; it's the recommended path

---

### AUTH-03: Sign In

**Role:** The returning user. Quiet familiarity.

**Intent:** This is muscle memory for users — they've done it before, they want to be in. The screen should be quick, calm, and already partially filled in (email remembered). Apple Sign In is again primary. There's a quiet "Forgot password?" link, but no aggressive password recovery flow stealing attention. If the user fails to sign in, the error message should be helpful rather than scolding — "We didn't recognize that combination. Try again, or reset your password." not "Invalid credentials."

**Anti-patterns:**
- Don't lock accounts after 3 attempts and bury the recovery path
- Don't require a CAPTCHA — those send everyone running
- Don't show "Last sign-in: 47 days ago" energy; that's surveillance, not memory

---

### AUTH-04b: Password Reset Sent

**Role:** Tiny relief moment. "Help is on the way."

**Intent:** This screen exists for 8 seconds before the user switches to their email app. Make those 8 seconds feel taken-care-of. The mail icon is the hero — large, centered, warm. The copy reassures without overexplaining: "Check your email. We sent a link to reset your password." A "didn't get it?" affordance is visible but quiet. The screen feels like a deep breath, not an instructional dialog.

**Anti-patterns:**
- Don't list what to do if the email doesn't arrive in a wall of text — one quiet link is plenty
- Don't show a fake countdown or "expires in 15 minutes" pressure
- Don't ask for feedback or rate-the-experience here; we just inconvenienced them

---

### AUTH-05: Role Selection

**Role:** Identity declaration. "Which side of this am I on?"

**Intent:** Two big, equally weighted cards — Owner and Sitter — that feel like genuine invitations rather than radio buttons. Each card hints at what's on the other side: the Owner card shows pet care, the Sitter card shows earning potential, both with warmth. The user shouldn't feel like they're locking themselves out of the other path; "I do both" is acknowledged at the bottom (even if MVP only lets you pick one — that's a future feature, but signaling it matters). The selection feels like stepping through a door, not filing a form.

**Anti-patterns:**
- Don't make the Sitter side feel like a gig-economy pitch (no "Earn $$$ this weekend!" copy)
- Don't make the Owner side feel like the "real" choice — both are equal first-class citizens
- Don't use abstract icons (heart vs. hands) without supporting illustration; the cards need warmth

---

### AUTH-06: Owner — Location

**Role:** First privacy ask. Trust is being negotiated.

**Intent:** Asking for location is asking for trust, and the screen should treat it that way. Lead with the *why* — "We use this to find sitters in your neighborhood" — not the ask. The "Use Current Location" button is primary because it's fastest, but a manual ZIP entry is offered without making the user feel stingy for choosing it. The map preview, if shown, is small and friendly — not a surveillance-style satellite zoom. Once a location is set, the screen confirms gently: "Got it — we'll show sitters within 5 miles."

**Anti-patterns:**
- Don't trigger the iOS location permission dialog before the user has read the screen
- Don't show a satellite or street view — feels like tracking
- Don't ask for "Always" location permission; "While Using" is correct

---

### AUTH-07: Owner — Add Pet

**Role:** Sharing what matters most. The user is introducing you to their family member.

**Intent:** This is the most emotionally weighted screen in onboarding. The user is telling you about a being they love. The form should feel like a conversation, not a database entry — "What's their name?" not "Pet Name (required)." The photo upload is large and inviting; the placeholder shows a warm illustrated avatar (not a generic gray silhouette). Pet type selection (dog/cat/other) feels playful. The screen never refers to the pet as "it" — copy uses "they" or, once a name is entered, the actual name. Birthday is optional with a soft "(approximate is fine)" hint — many rescued pets have unknown birthdays and we should never make that user feel deficient.

**Anti-patterns:**
- Don't use "Pet Name" as a label; use "What's [their] name?" with conversational tone
- Don't require breed selection — "Mixed / Unsure" is a real and valid answer for many owners
- Don't gray out the form behind the photo upload modal; the photo is a celebration, not a gatekeeper

---

### AUTH-08: Owner — Pet Care Details

**Role:** Trust deepening. The user is sharing fragile, important information.

**Intent:** Medications, feeding schedules, behavioral notes — this is where the user is trusting you with the operational details of keeping their pet alive and happy. The screen needs to feel competent and discreet. Section headers are warm but specific ("Feeding," "Medications," "Things to know"). Empty states for each section are welcoming, not pushy — "Anything else worth mentioning?" Adding a medication feels like saving information securely, not filling a pharmacy form. The screen acknowledges that some pets have nothing in these fields and some have a lot — both are normal.

**Anti-patterns:**
- Don't require any of these fields; medical and behavioral details are voluntary by definition
- Don't show a clinical or medical-app aesthetic (no white-coat vibes, no Rx symbols)
- Don't make the user feel like a worse pet parent for skipping a section

---

### AUTH-09: Onboarding Success

**Role:** The emotional peak of onboarding. The "you did it" moment.

**Intent:** The user just trusted you with their pet's life — feeding schedules, medications, the works. The screen needs to *land* that decision as the right one. The confetti illustration is the hero, but the energy is "sunlight breaking through after rain," not "party popper." Warm, settled, slightly proud. The pet's actual name is in the copy — "[Pet name] is all set up. Welcome to the neighborhood." Below the celebration, one clear next action — "Find a sitter" — but the screen doesn't push; the user can sit in this moment as long as they want. White space is more important than a busy CTA stack.

**Anti-patterns:**
- Don't celebrate too loud — this is a contented exhale, not a Vegas slot machine win
- Don't immediately push the user into the next funnel ("Now find a sitter in your area!")
- Don't show a generic success animation; the asset specifically references pets and warmth, and that matters here

---

### AUTH-10: Sitter — Service Area

**Role:** Professional setup begins. The user is shifting from "person" to "small business owner."

**Intent:** Sitters are pros. The screen respects that. The radius circle on the map preview is meaningful — it's their *real* service area, not a marketing claim. The default radius is reasonable (3 miles) with quiet hints that broader = more bookings, smaller = less travel. The screen feels like setting up a storefront, but a friendly one. There's quiet acknowledgment that adjusting the radius later is easy — no commitment anxiety.

**Anti-patterns:**
- Don't show ride-share-app aesthetic (heat maps, ETA bubbles, surge pricing)
- Don't push for a large radius to maximize platform GMV; the sitter's interest is the priority
- Don't gate this behind "Sitter Verification" steps — that comes later; right now it's setup, not application

---

### AUTH-11: Sitter — Services

**Role:** Defining the offering. Sitters declare what they do and don't do.

**Intent:** Each service (walking, drop-in, sitting, boarding, daycare) gets equal visual weight — no service is "premium" in this list. Selection feels like checking what you genuinely offer, not a menu of upsells. The icons (Claude SVG, single-color) carry the visual personality — clean, friendly, immediately legible. As the sitter selects services, a quiet hint emerges below: "Owners in your area are looking for: walking, drop-in" — informational, not pressuring. The CTA is "Continue" not "Save & Continue" — we're not making them anxious about losing data.

**Anti-patterns:**
- Don't suggest premium tiers or "Pro Sitter" badges here — earned later, not declared upfront
- Don't show competitive pricing data; that's PROF-04's job and only after they've thought about their own pricing
- Don't force a minimum number of services; one is enough for an MVP sitter

---

### AUTH-13: Sitter — Rates

**Role:** Pricing is emotional. The sitter is naming their worth.

**Intent:** This screen requires care because pricing is vulnerable territory. Per-service rate inputs are clean, with quiet anchoring info: "Most sitters in your area charge $20–$30 for a 30-min walk." Anchoring without dictating — the sitter sets their own number. The screen feels like advice from a friend who's done this before, not a market-rate enforcement engine. There's no "premium" or "competitive" labeling. The user's rates are their rates.

**Anti-patterns:**
- Don't show a "rate optimizer" or push toward higher rates; long-term retention beats GMV optimization
- Don't display competitor sitters' rates ranked alongside; it makes the moment feel adversarial
- Don't gate the next step until rates "look reasonable" by some algorithm; trust the sitter

---

### AUTH-14: Sitter — Bio & Photo

**Role:** Sitter as person, not service-provider. This is where they become trustworthy.

**Intent:** The photo upload is the centerpiece — it's how owners will recognize and trust this sitter. The placeholder is a warm illustrated person silhouette, never a generic gray icon. The bio prompt is conversational: "Tell pet owners about yourself. What kind of pets have you cared for? What's your home like?" — open-ended, not a 200-character marketing slot. Word-count limits are soft, suggested, not enforced. The screen reads like writing a friendly letter to a new neighbor, not filing a job application.

**Anti-patterns:**
- Don't include "professional headshot recommended" — feels gatekeeping, and pet sitters aren't LinkedIn profiles
- Don't show character counters that turn red; they create anxiety
- Don't suggest writing in third person ("Sarah is a passionate pet lover...") — it's their voice, in their words

---

## EPIC 2 — Pet Profiles

### PET-01: My Pets List

**Role:** Home for the family. The user's pets, gathered.

**Intent:** This screen is one of the warmest in the app. Each pet card shows a large photo, name in friendly type, and a gentle hint of personality (their species, age, maybe a quick "needs medication" or "loves walks" badge). The list feels like family photos on a fridge, not records in a database. Tapping a pet animates into their detail view smoothly — no jarring transitions. The "Add another pet" CTA at the bottom is welcoming, never demanding. If the user has just one pet, that's enough — the screen doesn't badger.

**Anti-patterns:**
- Don't sort or filter the list with table-app affordances; family doesn't get sorted by name ascending
- Don't show "Last updated" timestamps on pet cards — feels like asset tracking
- Don't put quick-action buttons (Edit, Delete, Share) on each card; tap to enter is enough

---

### PET-02: Pet Detail View

**Role:** The pet's hero moment. This is *their* page.

**Intent:** The pet's photo dominates the top of the screen — large, beautiful, full-bleed. Below, the data is organized but unhurried: vitals (age, breed, weight) in a soft row, then medications and feeding details in clearly delineated sections, then behavioral notes and vet info further down. The page breathes. There's space to scroll through and *enjoy* learning about this pet — even though the user owns them. Edit is a single quiet button in the nav bar, not buttons on every section. The page feels like a profile, not a record.

**Anti-patterns:**
- Don't show "Profile completion: 67%" — pets aren't quantified
- Don't show "Veterinary records" as a clinical-looking section header; "At the vet" is warmer
- Don't put a "Share" button prominently; the pet isn't a social media post

---

## EPIC 3 — User Profiles

### PROF-02: Sitter Profile (public view)

**Role:** Trust decision moment. The owner is deciding whether to hand over their pet.

**Intent:** This is the most consequential screen in the entire app. The owner is making a real decision about a real living creature. The screen must telegraph trust through *substance*, not chrome. The sitter's photo is large and warm, their bio is in their own voice, their reviews are real and specific. Services and rates are clear and obvious. No badge soup — verification appears once, not five times. The "Contact" and "Book" buttons in the sticky footer are accessible without being aggressive. The page feels like reading a friend's recommendation, not a marketplace listing.

**Anti-patterns:**
- Don't pile on trust badges (verified + background-checked + insured + top-rated + super-host); pick the most meaningful one
- Don't show "X people have viewed this sitter today" — gross, undermines trust
- Don't put booking pressure in the UI ("Only 2 spots left this weekend"); the data may be true but the framing is hostile

---

## EPIC 4 — Search & Discovery

### SRCH-01: Search Home

**Role:** Intentful start. The user has a need; the app helps them shape it.

**Intent:** The screen invites the user to articulate what they need without overwhelming them. Three primary fields — *what kind of care*, *when*, *where* — each in a tap-to-open sheet. Default values are sensible (location pre-filled from profile, service type defaulting to most common). The screen feels like a friendly concierge asking the right questions, not a search engine. Recent or recommended sitters appear below the search inputs as a soft suggestion — "Or browse sitters near you" — not as the primary path. The user is in control of the funnel, not pushed through it.

**Anti-patterns:**
- Don't show a wall of filters upfront; filters belong in SRCH-02 after results exist
- Don't use a hotel-booking aesthetic (calendar, rooms, guests, search); pet care is more relational
- Don't show ads or sponsored sitters as "recommended"; the trust contract requires honesty

---

### SRCH-02: Search Results (List)

**Role:** Deciding moment. The user is comparing options.

**Intent:** Each card shows what matters: photo, name, rating with review count, service offered, price, distance. Cards are scannable but not minimal — you should be able to feel something about each sitter from their card alone. The sort and filter affordances are clean and accessible without dominating. Sitters with no reviews aren't hidden or de-emphasized — they're new, not bad. The list's emotional posture is "browsing the neighborhood" rather than "screening candidates." Empty state is warm and actionable: "No sitters in this radius. Try widening?"

**Anti-patterns:**
- Don't show "Best match" or "Recommended for you" badges; they erode trust by feeling algorithmic
- Don't dim or de-prioritize sitters by perceived quality; let the user decide
- Don't add infinite scroll without pagination cues — pet sitters are a finite, discoverable set, not a content feed

---

### SRCH-03: Search Results (Map)

**Role:** Spatial trust. "Are these sitters actually near me?"

**Intent:** The map view exists because location *feels* matters more than location *data* does. Seeing a price pin on the actual map of your neighborhood is reassuring in a way a "0.4 mi" label can't be. The map aesthetic is soft, friendly, almost paper-like — not a satellite/transit map. Pins are warm-orange, easy to tap, with a price visible. Tapping a pin slides up a preview card that feels lightweight — name, rating, photo, "View profile" button. Clustering is subtle when zoomed out. Switching back to list view preserves filters and scroll position.

**Anti-patterns:**
- Don't use Google Maps' default style (gray streets, blue water); the map should feel like the rest of the app
- Don't show ride-share-style heat maps or "high demand" zones
- Don't auto-center on the user's current location every time they return; remember their last view

---

## EPIC 5 — Booking System

### BOOK-01: Booking Request

**Role:** The ask. The owner is reaching out to a sitter for a specific job.

**Intent:** This is the form that turns interest into action. Pre-filled where possible — the sitter, services they offer, the owner's pets — so the user is mostly confirming, not entering. The date/time picker is gracious about the owner's schedule. A free-text "Anything the sitter should know?" field invites context without demanding it. The total cost is calculated transparently and shown clearly — no surprises, no "service fees" hidden until checkout. The "Send request" button is clear about what it does: this isn't a charge yet; it's a request the sitter can accept or decline.

**Anti-patterns:**
- Don't show urgency ("Sitters respond fastest within 1 hour!") — pressuring is hostile
- Don't bury the cancellation policy in a tap-to-expand at the bottom; surface it inline
- Don't introduce upsells ("Add walking insurance for $5?") at this stage; that's a separate feature, not a checkout pattern

---

### BOOK-02: Bookings List (Owner)

**Role:** Status anxiety. "When is it happening? Did they accept?"

**Intent:** Owners come here to check status, often with anticipation or worry. The list should answer the implicit question — "what's happening?" — at a glance. Each booking card shows pet, sitter, date, and status (Pending / Confirmed / Active / Completed) with clear color-coded but tasteful indicators. Pending bookings are at the top, calling for attention. Past bookings recede gracefully into history. Tapping a booking opens its detail view. The screen feels like a quiet dashboard for a small, important set of things — not a notification center.

**Anti-patterns:**
- Don't show booking numbers or IDs prominently; that's filing-cabinet energy
- Don't put aggressive "Pending response" alerts; let the status indicator speak
- Don't sort completed bookings out of the list; they're memory, and seeing past care builds confidence

---

### BOOK-03: Bookings List (Sitter)

**Role:** Work pipeline. "What's coming up?"

**Intent:** Sitters are running a small business. This screen is their schedule and pipeline. Pending requests need clear attention — they're work that needs a yes/no. Confirmed upcoming bookings appear by date. Active and completed sessions are accessible but not in the way. The visual posture here is more efficient than the owner side — sitters need to scan their week — but still warm. Each card communicates: who, what pet, when, how much. A pending request shows decision affordances inline (Accept / Decline) but tapping into detail is also fine. The screen feels like a useful tool, not a corporate calendar.

**Anti-patterns:**
- Don't gamify the pipeline ("3 bookings to streak!") — sitters aren't a leaderboard
- Don't surface earnings prominently in the list; that's the wrong emotional framing for ongoing care relationships
- Don't auto-accept bookings or pre-fill a yes; respect the sitter's decision

---

### BOOK-04: Booking Detail (Owner View)

**Role:** Waiting. The owner has made the request and is checking in.

**Intent:** This screen is what the owner returns to repeatedly during the lifecycle of a booking. It must hold up to repeated visits — calm, informative, not anxiety-inducing. Status is the most prominent element near the top, clearly indicating where things stand. Below, the booking facts (pet, sitter, dates, cost) are presented as a quiet summary. A timeline of events (Requested → Accepted → Active → Completed) gives the owner orientation. Messaging the sitter is one tap away. Cancellation is accessible but not prominent — it should require deliberate intent to find.

**Anti-patterns:**
- Don't show a "loading" or "processing" indicator on a stable booking; it implies something's wrong
- Don't put rebooking CTAs on a still-pending booking
- Don't surface "Estimated response time: 2 hours" countdowns; they create anxiety without actionable info

---

### BOOK-05: Booking Detail (Sitter View)

**Role:** Responding. The sitter is deciding whether and how to take this work.

**Intent:** When pending, the screen leads with what the sitter needs to decide on — clear Accept / Decline buttons, but only after the sitter has seen the pet info, dates, owner notes, and cost. Once accepted, the screen shifts posture to "preparing for the job" — the pet's care details become more prominent (medications, feeding, behavioral notes). The sitter should feel like they have everything they need to do the job well, in one place. Owner contact is one tap away. The screen feels like a job briefing from a thoughtful client.

**Anti-patterns:**
- Don't show cancellation penalties as the first thing the sitter sees on a confirmed booking
- Don't make critical pet info (medications, allergies) hidden under a "more" toggle
- Don't show the platform's commission or fee breakdown; that's a separate financial view, not job context

---

### BOOK-11: Cancel Booking

**Role:** Delicate moment. Someone is changing plans, and likely feels bad about it.

**Intent:** Cancellation is not a failure — life happens. The screen acknowledges that. The cancellation policy is shown plainly, including any fees, but framed as information rather than punishment. A reason field is offered but not required (and the options are non-judgmental: "Plans changed," "Pet is no longer available," "Other"). Confirmation requires a real tap, not just a swipe — appropriate weight for an action that affects another human. After cancellation, the screen confirms it gracefully and offers to find another sitter if the owner needs one — supportive, not transactional.

**Anti-patterns:**
- Don't shame ("Are you sure? Sitters rely on bookings.")
- Don't auto-charge a cancellation fee without showing it on the confirmation screen first
- Don't try to retain — no "Wait! Try a different sitter?" sales tactics in this flow

---

## EPIC 6 — Live Activities (THE differentiator)

### LIVE-01: Start Session (Sitter)

**Role:** Responsibility moment. The sitter is taking ownership of someone else's pet.

**Intent:** This is the sitter's "I've got them now" moment. The screen surfaces the pet's care plan in a pre-flight check format — feeding schedule, medications, walk requirements — so the sitter can confirm they're prepared. Photos of the pet are visible (so the sitter visually confirms identity). The "Start session" button is deliberate, weighty — tapping it begins the live tracking that the owner will see. The posture is confident competence: this sitter is ready, the system supports them, nothing important will be forgotten.

**Anti-patterns:**
- Don't make the "Start" button feel like a panic button (red, large, alarmed) — it's a confident step
- Don't require the sitter to read and acknowledge a wall of legal text here
- Don't notify the owner aggressively at the moment of start; one quiet push is right

---

### LIVE-02: Care Dashboard (Sitter)

**Role:** Active care. The sitter is doing the work.

**Intent:** This is the sitter's mission control during a session. A clean checklist of care items (medications, feeding, walks) with clear "tap to complete" affordances. As items are checked off, they get a satisfying visual confirmation but don't disappear — they become "done" but visible, which provides reassurance. A timer for the session runs quietly. Quick access to add a photo, send a message, or note something is always one tap away. The screen feels like a cooking app during dinner prep — focused, calm, productive. Not a hospital chart.

**Anti-patterns:**
- Don't gamify completion ("75% of tasks done — keep it up!")
- Don't show ads, banner promotions, or rate-the-app prompts during an active session
- Don't make completed items disappear; the visible record IS the confidence

---

### LIVE-05: Walk Summary

**Role:** Small triumph. A specific job done well.

**Intent:** After a walk ends, the sitter sees a quick summary — distance, duration, route on a small map, and an option to add a note or photo. The mood is "good walk" — the sitter feels accomplished, the data is precise without being clinical. The summary feels worth showing to the owner. A clear "Save & continue" button returns to the dashboard. This is a moment of small pride, briefly held.

**Anti-patterns:**
- Don't show a Strava-style athlete-app aesthetic (pace, elevation, heart rate)
- Don't show the route in surveillance-style detail; a friendly approximation is enough
- Don't suggest the next walk yet; let this one land

---

### LIVE-07: Session Complete (Sitter)

**Role:** Job done. Settled satisfaction.

**Intent:** The session is complete. The screen shows a summary of what was done — a record of a job well executed. There's a quiet acknowledgment of completion (not a fireworks display). The sitter can review what's been logged before the owner sees the summary. A "wrap up" button finalizes the session and triggers the owner's end-of-session view. The feeling is of putting tools back on the shelf at the end of a satisfying afternoon.

**Anti-patterns:**
- Don't immediately push for the next booking ("Open for more bookings?")
- Don't show earnings as the dominant element; this isn't a paycheck moment
- Don't ask the sitter to rate the owner here; that's a separate, optional flow later

---

### LIVE-08: Live Activity (Owner — Lock Screen / Dynamic Island)

**Role:** THE moment. This is the differentiator that defines the whole app.

**Intent:** This is the screen — actually, the system surface — that justifies PawConnect's existence. An owner glances at their phone while at work, in a meeting, on a walk, and *knows* their pet is okay. The Live Activity shows current care state at a glance: "Walking now — 12 minutes in" or "Medication given ✓ — fed at 2:15." Information is dense but feels calm; the user feels reassured rather than informed. The Dynamic Island variant is even more compact but still meaningful. Tapping opens the full session view (LIVE-09). The emotional payload here is *peace of mind* — the user can return to their day knowing their pet is in good hands and they can check in any time.

**Anti-patterns:**
- Don't use a security/monitoring app aesthetic (camera-feed energy, anxious red dots)
- Don't push ads or promotions through the Live Activity surface — sacred space
- Don't show alerts or warnings unless something's actually wrong; this surface is for reassurance, not anxiety

---

### LIVE-09: Live Detail (Owner)

**Role:** Peace of mind, examined. The owner is checking in deliberately.

**Intent:** When the owner taps the Live Activity, this is what they see. A real-time view of the care session: what's been done, what's happening now, photos the sitter has shared, walk routes if applicable. The screen is more detailed than the Live Activity surface but still calm. The pet's photo is prominent. Updates appear in real-time as the sitter logs them — animated in gracefully. Messaging the sitter is one tap away if the owner has a question. The screen feels like checking on a child at daycare — you're seeing they're fine, not investigating.

**Anti-patterns:**
- Don't show a "last updated" timestamp prominently; if it's older than a minute it'll create anxiety
- Don't surface every micro-event as an animated update; pace the information
- Don't show "Sitter is typing..." or other surveillance affordances

---

### LIVE-10: Session Summary (Owner)

**Role:** Reassurance and love. "My pet was cared for."

**Intent:** After the session ends, the owner sees a complete summary — what was done, photos taken, walks logged, any sitter notes. The mood is settled, almost tender. The owner is reviewing a recent moment of care for their family member. The summary is shareable (export to PDF, perhaps) for record-keeping but it's not the primary action. The primary action is leaving a review or booking again — but neither is pushed aggressively. The screen feels like reading a kind note from someone who took good care of your pet.

**Anti-patterns:**
- Don't immediately surface a 5-star rating prompt; let the user feel the summary first
- Don't show "Tip your sitter" prominently; tipping should be optional and quiet
- Don't display a "share to social" affordance prominently; pets aren't content

---

## EPIC 7 — Messaging

### MSG-01: Conversations List

**Role:** Relationship overview. Who's the owner currently in touch with?

**Intent:** A clean list of conversations, each card showing the other person, last message preview, and time. Unread states are clear but not aggressive — a soft dot or weight change, not a red badge with a number. The list feels like a small, personal address book for current relationships, not an inbox to triage. Empty state is warm: "No conversations yet. Once you book with a sitter, you can chat here."

**Anti-patterns:**
- Don't show typing indicators on the list level; that's chat-app overload
- Don't badge the parent tab with a high unread number; small numbers feel manageable, big ones feel oppressive
- Don't introduce filters or search until the list is genuinely large

---

### MSG-02: Chat View

**Role:** Real-time human connection. Two people coordinating about a pet.

**Intent:** A familiar messaging experience, well-executed. Bubbles, timestamps, read receipts (subtle). The composer at the bottom is large enough to type comfortably. Adding a photo is one tap. The other person's name and avatar are at the top, with quick access to the related booking if relevant. The chat feels like texting a neighbor about their cat, not Slack. Slow, warm, conversational — not productivity-coded.

**Anti-patterns:**
- Don't show "delivered" + "read" + "typing" simultaneously; pick the most useful state
- Don't auto-suggest canned replies ("On my way!" "Running late!"); they make the chat feel hollow
- Don't allow message reactions in MVP; one less thing to get right in v1

---

## EPIC 8 — Reviews

### REV-01: Leave Review

**Role:** Closure plus a gift. The owner is reflecting on care received and giving the sitter something valuable.

**Intent:** A review is, at heart, a gift to a person who did good work — and a signal to other owners. The screen treats it that way. The 5-star rating is prominent but not the only thing; the written review is given at least equal weight, with a friendly prompt: "What stood out about [Sitter's name]?" Optional tags (great with anxious dogs / sent lots of photos / on time) help structure thoughts. The review composition feels generous, not extractive. After submission, the owner sees a small thanks acknowledgment — the sitter will be notified. The mood is closing a chapter well.

**Anti-patterns:**
- Don't gate booking again or app features behind leaving a review
- Don't auto-fill a review with template language ("Sarah was great!"); voice matters
- Don't show "Your review will help other owners" pressure copy — let people review for their own reasons

---

## How to invoke this with Claude Code

When sleepy and brain-dead, use one of these prompt shapes:

**Designing a new screen:**
> "Read PRODUCT_SPEC.md § AUTH-09 and DESIGN_INTENT.md § AUTH-09. Build the SwiftUI view following the spec's structural requirements with the emotional posture from the intent doc. Use design tokens from AppColor.swift, AppFont.swift, AppSpacing.swift. The hero asset is `Confetti` from `AssetImage.swift`."

**Reviewing a screen you already built:**
> "Read DESIGN_INTENT.md § PET-02. Look at PetDetailView.swift. Identify any places it violates the intent or anti-patterns. Suggest specific changes — small surgical fixes, not rewrites."

**Generating microcopy for a screen:**
> "Read DESIGN_INTENT.md § AUTH-07. Write 5 candidate placeholder/label strings for the pet name input. Tone: conversational, treats the pet as 'they' not 'it', non-clinical."

**Resolving a design question mid-build:**
> "Reading DESIGN_INTENT.md § BOOK-04. The spec doesn't say where the cancel button should go. Based on the anti-patterns ('Don't surface cancellation aggressively'), where would you place it?"

The pattern: spec for structure, intent for posture, both together for design decisions in the gray areas — which is most decisions.

---

*End of design intent. Save in `docs/` next to PRODUCT_SPEC.md. This document is canonical alongside the spec — both are sources of truth.*
