// screens-c.jsx — Bookings (BOOK-02), Messages (MSG-01), Account (PROF-01)
const { T, tx, PawButton, PawCard, SafeTop, Screen, SitterAvatar, ASSET,
  ChevronRight, Calendar, Message, Bell, Sliders, User, Heart, PawFill } = window;

// Large-title screen header (iOS)
function BigTitle({ children, trailing }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '4px 16px 12px' }}>
      <h1 style={{ ...tx.display, margin: 0 }}>{children}</h1>
      {trailing}
    </div>
  );
}

const BOOKINGS = [
  { pet: 'Biscuit', petImg: ASSET.shibaSketch, sitter: 'Maya Okafor', service: 'Dog Walking',
    when: 'Today · 2:00 PM', status: 'Active', color: '#EA580C' },
  { pet: 'Biscuit', petImg: ASSET.shibaSoft, sitter: 'Theo Nguyen', service: 'Boarding',
    when: 'May 20–22', status: 'Confirmed', color: '#059669' },
  { pet: 'Biscuit', petImg: ASSET.shibaSketch, sitter: 'Jules Romano', service: 'Drop-in Visit',
    when: 'May 24 · 9:00 AM', status: 'Pending', color: '#F59E0B' },
  { pet: 'Biscuit', petImg: ASSET.shibaSoft, sitter: 'Sam Whitfield', service: 'Dog Walking',
    when: 'May 8 · 1:00 PM', status: 'Completed', color: '#B08968' },
];

// ── BOOK-02 Bookings List (Owner) ───────────────────────────
function BookingsScreen({ go }) {
  return (
    <Screen pad={0}>
      <SafeTop h={58} />
      <BigTitle>Bookings</BigTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 16px 24px' }}>
        {BOOKINGS.map((b, i) => (
          <PawCard key={i} onClick={() => b.status === 'Active' ? go('live') : null}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, overflow: 'hidden', flexShrink: 0, background: T.n100 }}>
              <img src={b.petImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...tx.h3 }}>{b.service}</span>
                <span style={{ font: T.font, fontSize: 11, fontWeight: 600, color: b.color,
                  background: `${b.color}1A`, padding: '2px 8px', borderRadius: 9999 }}>{b.status}</span>
              </div>
              <div style={{ ...tx.bodySm, marginTop: 3 }}>{b.pet} with {b.sitter}</div>
              <div style={{ ...tx.caption, marginTop: 1 }}>{b.when}</div>
            </div>
            <ChevronRight size={18} style={{ color: T.textTertiary }} />
          </PawCard>
        ))}
      </div>
    </Screen>
  );
}
window.BookingsScreen = BookingsScreen;

const CONVOS = [
  { initials: 'MO', name: 'Maya Okafor', last: 'Biscuit just settled onto the couch 🧡 sending a photo!', time: '2:08 PM', unread: true },
  { initials: 'TN', name: 'Theo Nguyen', last: 'Sounds good — see you both on the 20th!', time: 'Yesterday', unread: false },
  { initials: 'JR', name: 'Jules Romano', last: 'I’ll bring the slow-feeder for the morning meds.', time: 'Mon', unread: false },
];

// ── MSG-01 Conversations ────────────────────────────────────
function MessagesScreen() {
  return (
    <Screen pad={0}>
      <SafeTop h={58} />
      <BigTitle>Messages</BigTitle>
      <div style={{ padding: '4px 0 24px' }}>
        {CONVOS.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            borderBottom: i < CONVOS.length - 1 ? `1px solid ${T.border}` : 'none', cursor: 'pointer' }}>
            <SitterAvatar initials={c.initials} size={52} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ ...tx.h3, fontWeight: c.unread ? 700 : 600 }}>{c.name}</span>
                <span style={{ ...tx.caption }}>{c.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span style={{ ...tx.body, color: c.unread ? T.textPrimary : T.textSecondary, flex: 1,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.last}</span>
                {c.unread && <span style={{ width: 9, height: 9, borderRadius: 5, background: T.sunset, flexShrink: 0 }} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
window.MessagesScreen = MessagesScreen;

// ── PROF-01 Account / My Profile ────────────────────────────
function AccountScreen({ go }) {
  const menu1 = [
    { Icon: window.PawFill, label: 'My Pets' },
    { Icon: window.Calendar, label: 'My Bookings' },
    { Icon: window.Message, label: 'Messages', badge: 1 },
    { Icon: window.Heart, label: 'Favorite Sitters' },
  ];
  const menu2 = [
    { Icon: window.Sliders, label: 'Settings' },
    { Icon: window.Bell, label: 'Notifications' },
    { Icon: window.User, label: 'Help & Support' },
  ];
  const Row = ({ Icon, label, badge, last }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer',
      borderBottom: last ? 'none' : `1px solid ${T.border}` }}>
      <Icon size={22} style={{ color: T.textSecondary }} />
      <span style={{ ...tx.bodyLg, color: T.textPrimary, flex: 1 }}>{label}</span>
      {badge && <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: T.sunset, color: '#fff',
        font: T.font, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 6px' }}>{badge}</span>}
      <ChevronRight size={18} style={{ color: T.textTertiary }} />
    </div>
  );
  return (
    <Screen pad={0}>
      <SafeTop h={58} />
      {/* header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '12px 0 24px' }}>
        <SitterAvatar initials="DR" size={100} ring />
        <h1 style={{ ...tx.h1, margin: 0 }}>Daniel Reyes</h1>
        <span style={{ ...tx.body }}>bernal heights, sf</span>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PawCard pad={0} style={{ overflow: 'hidden' }}>
          {menu1.map((m, i) => <Row key={i} {...m} last={i === menu1.length - 1} />)}
        </PawCard>
        <PawCard pad={0} style={{ overflow: 'hidden' }}>
          {menu2.map((m, i) => <Row key={i} {...m} last={i === menu2.length - 1} />)}
        </PawCard>
        <div style={{ marginTop: 8 }}>
          <PawButton variant="destructive" onClick={() => go('welcome')}>Log Out</PawButton>
        </div>
        <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
          <span style={{ ...tx.caption }}>Version 1.0.0</span>
        </div>
      </div>
    </Screen>
  );
}
window.AccountScreen = AccountScreen;
