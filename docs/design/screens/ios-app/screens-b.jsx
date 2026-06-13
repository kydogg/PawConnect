// screens-b.jsx — Sitter Profile, Live Detail, Lock Screen Activity, Map
const { T, tx, PawButton, TextButton, PawCard, SafeTop, NavBar, SitterCard, SitterAvatar,
  SERVICES, SITTERS, SESSION, ASSET,
  ChevronLeft, ChevronRight, Calendar, Heart, HeartFill, CheckSealFill, CheckCircleFill, StarFill, Check,
  User, Message, Bell, MapIcon, ListIcon, FigureWalk, PawFill } = window;

// Floating glass pill button (over hero imagery)
function GlassButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{ width: 40, height: 40, borderRadius: 9999, border: 'none',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,251,245,0.75)', backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      color: T.sunset, WebkitTapHighlightColor: 'transparent', ...style }}>{children}</button>
  );
}

// ── PROF-02 Sitter Profile ──────────────────────────────────
function SitterProfileScreen({ sitter, go }) {
  const s = sitter || SITTERS[0];
  const [fav, setFav] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const cheapest = Math.min(...s.services.map((x) => x[1]));
  const bioShort = s.bio.length > 150 && !expanded ? s.bio.slice(0, 150) + '…' : s.bio;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg, position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 300 }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(150deg, #EA580C, #DC2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.85)' }}><User size={120} sw={1.5} /></div>
          </div>
          {/* fade to bg */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120,
            background: `linear-gradient(to bottom, rgba(255,251,245,0), ${T.bg})` }} />
          {/* floating controls */}
          <div style={{ position: 'absolute', top: 54, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
            <GlassButton onClick={() => go('results')}><ChevronLeft size={24} /></GlassButton>
            <GlassButton onClick={() => setFav(!fav)}>
              {fav ? <HeartFill size={22} style={{ color: T.terracotta }} /> : <Heart size={22} />}
            </GlassButton>
          </div>
        </div>
        {/* Identity */}
        <div style={{ padding: '0 16px', marginTop: -8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ ...tx.display, fontSize: 30, margin: 0 }}>{s.name}</h1>
            {s.verified && <CheckSealFill size={22} style={{ color: T.sage }} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            <StarFill size={15} style={{ color: T.amber }} />
            <span style={{ ...tx.bodyLg, color: T.textPrimary, fontWeight: 600 }}>{s.rating}</span>
            <span style={{ ...tx.bodyLg, whiteSpace: 'nowrap' }}>({s.reviews} reviews) · {s.distance} mi</span>
          </div>
          {/* Price chips */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, overflowX: 'auto', paddingBottom: 4 }}>
            {s.services.map(([id, price]) => (
              <div key={id} style={{ flexShrink: 0, background: T.elevated, borderRadius: 12, padding: '10px 16px',
                boxShadow: T.shadowCard, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ ...tx.h3, color: T.textPrimary }}>${price}</span>
                <span style={{ ...tx.caption }}>/{SERVICES[id].unit}</span>
              </div>
            ))}
          </div>
          {/* About */}
          <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>About</h2>
          <PawCard>
            <p style={{ ...tx.bodyLg, color: T.textPrimary, margin: 0 }}>
              {bioShort}{' '}
              {s.bio.length > 150 && (
                <TextButton onClick={() => setExpanded(!expanded)} style={{ display: 'inline' }}>
                  {expanded ? 'See less' : 'See more'}
                </TextButton>
              )}
            </p>
          </PawCard>
          {/* Services */}
          <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>Services</h2>
          <PawCard pad={4}>
            {s.services.map(([id, price], i) => (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 12px',
                borderBottom: i < s.services.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <CheckCircleFill size={22} style={{ color: T.sage }} />
                <span style={{ ...tx.bodyLg, color: T.textPrimary, flex: 1 }}>{SERVICES[id].label}</span>
                <span style={{ ...tx.bodyLg }}>${price}/{SERVICES[id].unit}</span>
              </div>
            ))}
          </PawCard>
          {/* Availability */}
          <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>Availability</h2>
          <PawCard>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {days.map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ ...tx.caption }}>{d}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 15,
                    background: s.avail[i] ? T.sage : 'transparent',
                    boxShadow: s.avail[i] ? 'none' : `inset 0 0 0 1.5px ${T.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.avail[i] === 1 && <Check size={15} style={{ color: '#fff' }} sw={3} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...tx.bodySm, marginTop: 14 }}>Usually responds {s.responds}</div>
          </PawCard>
          {/* Reviews */}
          <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>Reviews</h2>
          <PawCard>
            <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFill key={i} size={15} style={{ color: i < s.review.stars ? T.amber : T.border }} />
              ))}
            </div>
            <p style={{ ...tx.bodyLg, color: T.textPrimary, margin: '0 0 8px' }}>“{s.review.text}”</p>
            <span style={{ ...tx.caption }}>— {s.review.author} · {s.review.date}</span>
            <div style={{ marginTop: 12 }}>
              <TextButton>See all {s.reviews} reviews</TextButton>
            </div>
          </PawCard>
          <div style={{ height: 24 }} />
        </div>
      </div>
      {/* Sticky footer */}
      <div style={{ flexShrink: 0, padding: '12px 16px 28px', background: T.elevated,
        boxShadow: T.shadowModal, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PawButton variant="secondary" icon={<Message size={19} />}>Contact {s.name.split(' ')[0]}</PawButton>
        <PawButton onClick={() => go('book')}>Book Now · From ${cheapest}</PawButton>
      </div>
    </div>
  );
}
window.SitterProfileScreen = SitterProfileScreen;

// ── LIVE-09 Live Detail (Owner) ─────────────────────────────
function LiveDetailScreen({ go }) {
  const x = SESSION;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
      <SafeTop h={50} />
      <NavBar onBack={() => go('home')} title="Care in progress"
        trailing={<button onClick={() => go('lock')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.sunset, display: 'flex' }}><Bell size={22} /></button>} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 24px' }}>
        {/* Live hero */}
        <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(150deg, #EA580C, #DC2626)', padding: 20, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, overflow: 'hidden', flexShrink: 0,
              boxShadow: '0 0 0 3px rgba(255,255,255,0.5)' }}>
              <img src={x.petAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: '#fff',
                  boxShadow: '0 0 0 3px rgba(255,255,255,0.35)' }} />
                <span style={{ font: T.font, fontSize: 11, fontWeight: 600, letterSpacing: '0.4px', opacity: 0.9, whiteSpace: 'nowrap' }}>WALKING NOW</span>
              </div>
              <div style={{ font: T.font, fontSize: 20, fontWeight: 700, marginTop: 5, lineHeight: '24px' }}>{x.pet} is on a walk</div>
              <div style={{ font: T.font, fontSize: 14, opacity: 0.9, marginTop: 2 }}>with {x.sitter} · {x.elapsed} min in</div>
            </div>
          </div>
          {/* progress */}
          <div style={{ marginTop: 18, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
            <div style={{ width: `${(x.elapsed / x.total) * 100}%`, height: '100%', borderRadius: 3, background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, font: T.font, fontSize: 12, opacity: 0.9 }}>
            <span>0.6 mi walked</span><span>~{x.total - x.elapsed} min left</span>
          </div>
        </div>

        {/* Care checklist */}
        <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>Today’s care</h2>
        <PawCard pad={4}>
          {x.tasks.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 12px',
              borderBottom: i < x.tasks.length - 1 ? `1px solid ${T.border}` : 'none',
              background: t.active ? 'rgba(234,88,12,0.05)' : 'transparent', borderRadius: t.active ? 10 : 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: t.done ? 'rgba(5,150,105,0.12)' : t.active ? 'rgba(234,88,12,0.12)' : T.n100,
                color: t.done ? T.sage : t.active ? T.sunset : T.textTertiary }}>
                <t.Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...tx.bodyLg, color: T.textPrimary, fontWeight: 500,
                  textDecoration: t.done ? 'none' : 'none' }}>{t.label}</div>
                <div style={{ ...tx.bodySm, color: t.active ? T.sunset : T.textSecondary }}>{t.detail}</div>
              </div>
              {t.done
                ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                    <CheckCircleFill size={22} style={{ color: T.sage }} />
                    <span style={{ ...tx.caption, fontSize: 11 }}>{t.time}</span>
                  </div>
                : t.active
                  ? <span style={{ ...tx.caption, color: T.sunset, fontWeight: 600 }}>now</span>
                  : <div style={{ width: 22, height: 22, borderRadius: 11, boxShadow: `inset 0 0 0 1.5px ${T.border}` }} />}
            </div>
          ))}
        </PawCard>

        {/* Photos */}
        <h2 style={{ ...tx.h2, margin: '24px 0 12px' }}>Photos from Maya</h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[ASSET.shibaSketch, ASSET.shibaSoft, ASSET.shibaSketch].map((src, i) => (
            <div key={i} style={{ width: 130, height: 130, borderRadius: 16, overflow: 'hidden', flexShrink: 0,
              boxShadow: T.shadowCard, background: T.n100 }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <PawButton variant="secondary" icon={<Message size={19} />}>Message Maya</PawButton>
        </div>
      </div>
    </div>
  );
}
window.LiveDetailScreen = LiveDetailScreen;

// ── LIVE-08 Lock Screen Live Activity (the differentiator) ──
function LockScreenScreen({ go }) {
  const x = SESSION;
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(165deg, #2A1A12 0%, #5D2E14 45%, #8B3A14 100%)',
      display: 'flex', flexDirection: 'column' }}>
      {/* soft warm glow */}
      <div style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)',
        width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.35), transparent 65%)' }} />
      <SafeTop h={56} />
      {/* clock */}
      <div style={{ textAlign: 'center', color: '#fff', marginTop: 12, position: 'relative' }}>
        <div style={{ font: T.font, fontSize: 17, fontWeight: 500, opacity: 0.9 }}>Friday, May 15</div>
        <div style={{ font: T.font, fontSize: 80, fontWeight: 600, lineHeight: '88px', letterSpacing: '-1px' }}>2:14</div>
      </div>
      {/* Live Activity card */}
      <div style={{ marginTop: 'auto', marginBottom: 40, padding: '0 14px' }}>
        <div style={{ borderRadius: 22, padding: 16, position: 'relative',
          background: 'rgba(28,22,17,0.55)', backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)', border: '0.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: T.sunset,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PawFill size={16} style={{ color: '#fff' }} />
            </div>
            <span style={{ font: T.font, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>PawConnect</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: '#FB923C',
                boxShadow: '0 0 8px #FB923C' }} />
              <span style={{ font: T.font, fontSize: 12, fontWeight: 600, color: '#FB923C', letterSpacing: '0.4px' }}>LIVE</span>
            </span>
          </div>
          {/* body */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, overflow: 'hidden', flexShrink: 0,
              boxShadow: '0 0 0 2px rgba(255,255,255,0.3)' }}>
              <img src={x.petAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: T.font, fontSize: 19, fontWeight: 700, color: '#fff' }}>{x.pet} is on a walk</div>
              <div style={{ font: T.font, fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                Fed ✓ · Meds ✓ · {x.elapsed} min in
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <FigureWalk size={26} style={{ color: '#FB923C', marginLeft: 'auto' }} />
            </div>
          </div>
          {/* progress */}
          <div style={{ marginTop: 14, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }}>
            <div style={{ width: `${(x.elapsed / x.total) * 100}%`, height: '100%', borderRadius: 3,
              background: 'linear-gradient(90deg, #FB923C, #FCD34D)' }} />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button onClick={() => go('live')} style={{ background: 'rgba(255,255,255,0.16)', border: 'none',
            color: '#fff', font: T.font, fontSize: 14, fontWeight: 600, padding: '10px 20px', borderRadius: 9999,
            cursor: 'pointer', backdropFilter: 'blur(12px)' }}>Tap to open full session →</button>
        </div>
      </div>
    </div>
  );
}
window.LockScreenScreen = LockScreenScreen;

// ── Simple map view (SRCH-03) ───────────────────────────────
function MapScreen({ go }) {
  const pins = [[28, 38], [55, 30], [44, 58], [70, 66]];
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden', background: '#F3EBDD' }}>
      {/* paper-style neighborhood map */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}>
        <rect width="100" height="100" fill="#F3EBDD" />
        <path d="M0 30 H100 M0 62 H100 M22 0 V100 M58 0 V100 M80 0 V100" stroke="#E4D5BE" strokeWidth="3" />
        <path d="M0 46 H100 M40 0 V100" stroke="#EADCC6" strokeWidth="6" />
        <rect x="60" y="64" width="34" height="30" fill="#CDE3C8" opacity="0.7" rx="2" />
        <path d="M-5 78 Q 30 70 60 86 T 110 80" stroke="#BBD9E8" strokeWidth="7" fill="none" opacity="0.7" />
      </svg>
      <SafeTop h={50} />
      <div style={{ position: 'relative', padding: '0 12px' }}>
        <NavBar onBack={() => go('results')} title="Dog Walking"
          trailing={<button onClick={() => go('results')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.sunset, display: 'flex' }}><ListIcon size={24} /></button>} />
      </div>
      {/* price pins */}
      {pins.map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)',
          background: i === 0 ? T.terracotta : T.sunset, color: '#fff', font: T.font, fontSize: 14, fontWeight: 700,
          padding: '7px 13px', borderRadius: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          border: '2px solid #fff', cursor: 'pointer', scale: i === 0 ? '1.12' : '1' }}
          onClick={() => go('profile', SITTERS[i])}>
          ${SITTERS[i].services[0][1]}
        </div>
      ))}
      {/* preview card */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 28 }}>
        <SitterCard sitter={SITTERS[0]} onClick={() => go('profile', SITTERS[0])} />
      </div>
    </div>
  );
}
window.MapScreen = MapScreen;

// ── BOOK-01 Booking Request (no payment — a request the sitter accepts) ──
function BookingRequestScreen({ sitter, go }) {
  const s = sitter || SITTERS[0];
  const [note, setNote] = React.useState('');
  const rate = Math.min(...s.services.map((x) => x[1]));
  const days = 3;
  const total = rate * days;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
      <SafeTop h={50} />
      <NavBar onBack={() => go('profile', s)} title="Request booking" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 24px' }}>
        {/* sitter + service summary (pre-filled) */}
        <PawCard style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <SitterAvatar initials={s.initials} size={52} />
          <div style={{ flex: 1 }}>
            <div style={{ ...tx.h3 }}>{s.name}</div>
            <div style={{ ...tx.bodySm }}>Dog Walking · 30 min</div>
          </div>
          <CheckSealFill size={18} style={{ color: T.sage }} />
        </PawCard>

        {/* pet (pre-selected) */}
        <h2 style={{ ...tx.h2, margin: '22px 0 12px' }}>Who’s it for?</h2>
        <PawCard style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', background: T.n100 }}>
            <img src={ASSET.shibaSketch} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...tx.h3 }}>Biscuit</div>
            <div style={{ ...tx.bodySm }}>Shiba Inu · needs 2pm meds</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: T.sunset,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={14} style={{ color: '#fff' }} sw={3} />
          </div>
        </PawCard>

        {/* dates (pre-filled) */}
        <h2 style={{ ...tx.h2, margin: '22px 0 12px' }}>When</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 16px',
          background: T.elevated, borderRadius: 12, boxShadow: T.shadowCard }}>
          <Calendar size={20} style={{ color: T.sunset }} />
          <span style={{ ...tx.bodyLg, color: T.textPrimary, flex: 1 }}>May 15 – 17 · 2:00 PM daily</span>
          <ChevronRight size={18} style={{ color: T.textTertiary }} />
        </div>

        {/* note */}
        <h2 style={{ ...tx.h2, margin: '22px 0 12px' }}>Anything Maya should know?</h2>
        <textarea value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Biscuit is shy at first but warms up fast — he loves the long block past the park."
          style={{ width: '100%', minHeight: 92, resize: 'none', border: 'none', outline: 'none',
            background: T.elevated, borderRadius: 12, boxShadow: `inset 0 0 0 1px ${T.border}`,
            padding: 14, font: T.font, fontSize: 15, lineHeight: '21px', color: T.textPrimary,
            boxSizing: 'border-box' }} />

        {/* transparent cost — no hidden fees */}
        <h2 style={{ ...tx.h2, margin: '22px 0 12px' }}>Cost</h2>
        <PawCard>
          {[['Dog Walking × 3 days', `$${rate * days}`], ['Service fee', '$0']].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ ...tx.bodyLg, color: T.textSecondary }}>{k}</span>
              <span style={{ ...tx.bodyLg, color: T.textPrimary }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: T.border, margin: '4px 0 12px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ ...tx.h3 }}>Total</span>
            <span style={{ ...tx.h3, color: T.sunset }}>${total}</span>
          </div>
        </PawCard>
        <p style={{ ...tx.bodySm, margin: '12px 2px 0' }}>
          Free cancellation up to 24 hours before. You can message Maya any time after she accepts.
        </p>
      </div>
      {/* sticky footer */}
      <div style={{ flexShrink: 0, padding: '12px 16px 28px', background: T.elevated, boxShadow: T.shadowModal }}>
        <PawButton onClick={() => go('live')}>Send request</PawButton>
        <p style={{ ...tx.caption, textAlign: 'center', margin: '8px 0 0' }}>
          You won’t be charged yet — Maya can accept or decline.
        </p>
      </div>
    </div>
  );
}
window.BookingRequestScreen = BookingRequestScreen;
