// shared.jsx — mock data + shared composite components
const { T, tx, PawCard, StarFill, CheckSealFill } = window;

// Pet imagery uses the real warm Shiba assets from the repo.
// Sitter (person) avatars use the spec's PersonAvatar placeholder
// (peach field + sunset silhouette) since real photos are user-supplied.
const ASSET = {
  shibaSketch: '../../assets/avatar-shiba-sketch.png',
  shibaSoft: '../../assets/app-icon-master.png',
};
window.ASSET = ASSET;

const SERVICES = {
  walking:  { label: 'Dog Walking',   unit: 'walk',  Icon: window.ServiceWalking,  blurb: '30–60 minute walks in the neighborhood' },
  dropin:   { label: 'Drop-in Visits', unit: 'visit', Icon: window.ServiceDropin,   blurb: 'Quick check-ins at your pet’s home' },
  sitting:  { label: 'House Sitting',  unit: 'night', Icon: window.ServiceSitting,  blurb: 'Overnight stays at your home' },
  boarding: { label: 'Boarding',       unit: 'night', Icon: window.ServiceBoarding, blurb: 'Pets stay overnight at the sitter’s home' },
  daycare:  { label: 'Doggy Day Care', unit: 'day',   Icon: window.ServiceDaycare,  blurb: 'Daytime care at the sitter’s home' },
};
window.SERVICES = SERVICES;

const SITTERS = [
  { id: 'maya', name: 'Maya Okafor', initials: 'MO', rating: 4.9, reviews: 127, distance: 0.4,
    specialty: 'Anxious dogs', responds: 'within an hour', verified: true,
    services: [['walking', 25], ['dropin', 22], ['sitting', 75]],
    avail: [1,1,1,1,1,0,1],
    bio: "Hi! I’m Maya — I’ve shared my home with rescue dogs for twelve years, so I know the quiet patience anxious pups need. My place has a fenced yard and a very sunny napping couch. I’ll send you photos through the day so you can see your best friend settling in.",
    review: { stars: 5, text: "Maya took such gentle care of Biscuit. He’s shy with new people but she sent photos of them on the couch within an hour. Came home to a happy, calm dog.", author: 'Daniel R.', date: 'Apr 2026' } },
  { id: 'theo', name: 'Theo Nguyen', initials: 'TN', rating: 4.8, reviews: 84, distance: 0.6,
    specialty: 'Big dogs & puppies', responds: 'within a few hours', verified: true,
    services: [['walking', 28], ['boarding', 70], ['daycare', 45]],
    avail: [1,1,0,1,1,1,1], bio: "Lifelong dog person, weekend hiker, and the neighbor whose pockets always have treats.", 
    review: { stars: 5, text: "Theo wore my husky out on a proper hike. Best sleep she’s had in weeks.", author: 'Priya S.', date: 'Mar 2026' } },
  { id: 'jules', name: 'Jules Romano', initials: 'JR', rating: 5.0, reviews: 41, distance: 0.9,
    specialty: 'Cats & seniors', responds: 'within an hour', verified: false,
    services: [['dropin', 24], ['sitting', 68]],
    avail: [0,1,1,1,1,1,0], bio: "Calm, reliable, and fluent in elderly-cat. I do slow mornings and careful medication routines.",
    review: { stars: 5, text: "Jules handled my senior cat’s meds perfectly and left the kindest notes.", author: 'Erin M.', date: 'Apr 2026' } },
  { id: 'sam', name: 'Sam Whitfield', initials: 'SW', rating: 4.7, reviews: 56, distance: 1.3,
    specialty: 'Drop-in visits', responds: 'within a day', verified: true,
    services: [['walking', 22], ['dropin', 20]],
    avail: [1,0,1,0,1,1,1], bio: "Quick, dependable midday check-ins so your pup never waits too long.",
    review: { stars: 4, text: "Always on time, always a photo. Exactly what I needed for lunchtime walks.", author: 'Casey L.', date: 'Feb 2026' } },
];
window.SITTERS = SITTERS;

// Live session mock (LIVE-09)
const SESSION = {
  pet: 'Biscuit', petAvatar: ASSET.shibaSketch, sitter: 'Maya Okafor',
  service: 'Dog Walking', elapsed: 12, total: 30,
  tasks: [
    { id: 'med', Icon: window.Pills, label: 'Morning medication', detail: '½ tablet with food', done: true, time: '2:02 PM' },
    { id: 'feed', Icon: window.Bowl, label: 'Lunch feeding', detail: '1 cup dry kibble', done: true, time: '2:08 PM' },
    { id: 'walk', Icon: window.FigureWalk, label: 'Afternoon walk', detail: 'In progress — 0.6 mi so far', done: false, active: true },
    { id: 'play', Icon: window.TennisBall, label: 'Play time', detail: 'Up next', done: false },
  ],
};
window.SESSION = SESSION;

// ── Sitter avatar placeholder (peach field + sunset silhouette) ──
function SitterAvatar({ initials, size = 60, ring }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 9999, flexShrink: 0,
      background: 'linear-gradient(150deg, #FED7AA, #FDBA8C)',
      boxShadow: ring ? `0 0 0 3px ${T.sunset}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <span style={{ font: T.font, fontSize: size * 0.36, fontWeight: 700, color: '#fff',
        letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(180,83,9,0.35)' }}>{initials}</span>
    </div>
  );
}
window.SitterAvatar = SitterAvatar;

// ── Sitter preview card (SRCH-02 SitterPreviewCard) ─────────
function SitterCard({ sitter, onClick }) {
  const cheapest = Math.min(...sitter.services.map((s) => s[1]));
  const unit = SERVICES[sitter.services.find((s) => s[1] === cheapest)[0]].unit;
  return (
    <PawCard onClick={onClick} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <SitterAvatar initials={sitter.initials} size={60} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ ...tx.h3 }}>{sitter.name}</span>
          {sitter.verified && <CheckSealFill size={15} style={{ color: T.sage }} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
          <StarFill size={13} style={{ color: T.amber }} />
          <span style={{ ...tx.bodySm, color: T.textPrimary, fontWeight: 600 }}>{sitter.rating}</span>
          <span style={{ ...tx.bodySm, color: T.textSecondary }}>· {sitter.specialty}</span>
        </div>
        <span style={{ ...tx.bodySm, color: T.textTertiary }}>{sitter.distance} mi away</span>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ ...tx.h3, color: T.sunset }}>${cheapest}</div>
        <div style={{ ...tx.caption }}>/{unit}</div>
      </div>
    </PawCard>
  );
}
window.SitterCard = SitterCard;

// ── Bottom tab bar (Liquid Glass) ───────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'search', label: 'Search', Icon: window.Search },
    { id: 'bookings', label: 'Bookings', Icon: window.Calendar },
    { id: 'live', label: 'Live', Icon: window.PawFill, filled: true },
    { id: 'messages', label: 'Messages', Icon: window.Message },
    { id: 'account', label: 'Profile', Icon: window.User },
  ];
  return (
    <div style={{ flexShrink: 0, paddingBottom: 22, paddingTop: 8,
      background: T.glassBg, backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `0.5px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {tabs.map((t) => {
        const on = active === t.id;
        const col = on ? T.sunset : T.textTertiary;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{ background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            width: 60, WebkitTapHighlightColor: 'transparent' }}>
            <div style={{ color: col }}><t.Icon size={t.filled ? 25 : 24} sw={on ? 2.4 : 2} /></div>
            <span style={{ font: T.font, fontSize: 10, fontWeight: on ? 600 : 500, color: col }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
window.TabBar = TabBar;
