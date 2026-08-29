// explorations.jsx — design explorations for canvas review
// Reuses primitives/icons/shared (window globals). Dark artboards wrap content
// in [data-theme="dark"] so the var-based tokens invert automatically.
const { T, tx, PawButton, PawCard, Pill, SitterCard, SitterAvatar, SERVICES, SITTERS,
  PawFill, FigureWalk, Search, LocationFill, Calendar, ChevronDown, ChevronLeft,
  Sliders, MapIcon, StarFill, CheckSealFill, X } = window;

// ── Faux status bar ─────────────────────────────────────────
function StatusBar({ dark }) {
  const c = dark ? '#fff' : '#1F1B17';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 22px 4px', fontFamily: T.font }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="6" width="2.6" height="5" rx="0.5" fill={c}/><rect x="4" y="4" width="2.6" height="7" rx="0.5" fill={c}/><rect x="8" y="2" width="2.6" height="9" rx="0.5" fill={c}/><rect x="12" y="0" width="2.6" height="11" rx="0.5" fill={c}/></svg>
        <svg width="22" height="11" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill={c}/><rect x="21.5" y="4" width="1.5" height="4" rx="0.75" fill={c} fillOpacity="0.5"/></svg>
      </div>
    </div>
  );
}

// Lightweight phone screen frame for the canvas
function PhoneScreen({ children, dark, w = 300 }) {
  return (
    <div data-theme={dark ? 'dark' : undefined} style={{ width: w, background: 'var(--bg-primary)',
      borderRadius: 28, overflow: 'hidden', boxShadow: '0 10px 30px rgba(31,27,23,0.16)',
      fontFamily: T.font, border: '1px solid rgba(31,27,23,0.08)' }}>
      <StatusBar dark={dark} />
      {children}
    </div>
  );
}
window.PhoneScreen = PhoneScreen;

// ════════════════════════════════════════════════════════════
// LIVE ACTIVITY — icon vs route preview, light & dark
// ════════════════════════════════════════════════════════════

// the walked route on a minimal neighbourhood map
function RouteThumb({ dark, size = 58 }) {
  const map = dark ? '#221C16' : '#F1E7D7';
  const street = dark ? '#34291F' : '#E4D5BE';
  return (
    <div style={{ width: size, height: size, borderRadius: 13, overflow: 'hidden', flexShrink: 0,
      boxShadow: dark ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'inset 0 0 0 1px rgba(120,60,20,0.10)' }}>
      <svg width={size} height={size} viewBox="0 0 58 58">
        <rect width="58" height="58" fill={map}/>
        <path d="M0 20 H58 M0 40 H58 M20 0 V58 M40 0 V58" stroke={street} strokeWidth="4"/>
        {/* walked path */}
        <path d="M12 47 C 16 38, 26 40, 28 32 S 30 20, 42 14" fill="none"
          stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"/>
        <circle cx="12" cy="47" r="3" fill={map} stroke="#EA580C" strokeWidth="2.4"/>
        <circle cx="42" cy="14" r="4.4" fill="#EA580C"/>
        <circle cx="42" cy="14" r="4.4" fill="none" stroke="#EA580C" strokeOpacity="0.3" strokeWidth="3"/>
      </svg>
    </div>
  );
}

function ActivityCard({ dark, variant }) {
  const cardBg = dark ? 'rgba(28,22,17,0.5)' : 'rgba(255,255,255,0.55)';
  const brand = dark ? 'rgba(255,255,255,0.8)' : '#5D4E37';
  const title = dark ? '#fff' : '#1F1B17';
  const sub = dark ? 'rgba(255,255,255,0.7)' : '#5D4E37';
  const pbBg = dark ? 'rgba(255,255,255,0.2)' : 'rgba(120,60,20,0.18)';
  return (
    <div style={{ borderRadius: 20, padding: 14, background: cardBg,
      backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      border: dark ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid rgba(255,255,255,0.6)',
      boxShadow: dark ? '0 8px 28px rgba(0,0,0,0.4)' : '0 8px 24px rgba(120,60,20,0.18)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: '#EA580C',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PawFill size={13} style={{ color: '#fff' }} /></div>
        <span style={{ fontSize: 12, fontWeight: 600, color: brand }}>PawConnect</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10,
          fontWeight: 600, color: '#EA580C', letterSpacing: '0.4px' }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#FB923C', boxShadow: '0 0 6px #FB923C' }} />LIVE
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 46, height: 46, borderRadius: 23, overflow: 'hidden', flexShrink: 0,
          boxShadow: '0 0 0 2px rgba(234,88,12,0.4)' }}>
          <img src="../../assets/avatar-shiba-sketch.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: title }}>Biscuit is on a walk</div>
          <div style={{ fontSize: 12, color: sub, marginTop: 2 }}>Fed ✓ · Meds ✓ · 12 min in</div>
        </div>
        {variant === 'route'
          ? <RouteThumb dark={dark} />
          : <FigureWalk size={24} style={{ color: dark ? '#FB923C' : '#EA580C', flexShrink: 0 }} />}
      </div>
      <div style={{ marginTop: 12, height: 5, borderRadius: 3, background: pbBg }}>
        <div style={{ width: '40%', height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#FB923C,#FCD34D)' }} />
      </div>
    </div>
  );
}

function LockMini({ dark, variant }) {
  const wall = dark ? 'linear-gradient(165deg,#2A1A12,#5D2E14 55%,#8B3A14)' : 'linear-gradient(160deg,#FFF3E4,#FBC79A)';
  const clock = dark ? '#fff' : '#3B2A18';
  return (
    <div style={{ width: 300, height: 430, borderRadius: 28, overflow: 'hidden', position: 'relative',
      background: wall, fontFamily: T.font, boxShadow: '0 10px 30px rgba(31,27,23,0.18)' }}>
      <div style={{ textAlign: 'center', marginTop: 34, color: clock }}>
        <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Friday, May 15</div>
        <div style={{ fontSize: 62, fontWeight: 600, lineHeight: '66px', letterSpacing: '-1px' }}>2:14</div>
      </div>
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 16 }}>
        <ActivityCard dark={dark} variant={variant} />
      </div>
    </div>
  );
}
window.LockMini = LockMini;

// ════════════════════════════════════════════════════════════
// SRCH-01 — three input presentations
// ════════════════════════════════════════════════════════════
function FieldRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 54, padding: '0 16px',
      background: T.elevated, borderRadius: 12, boxShadow: T.shadowCard }}>
      <span style={{ color: T.sunset, display: 'flex' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ ...tx.caption, fontSize: 11 }}>{label}</div>
        <div style={{ ...tx.body, color: T.textPrimary, fontWeight: 500 }}>{value}</div>
      </div>
      <ChevronDown size={16} style={{ color: T.textTertiary }} />
    </div>
  );
}

// V1 — vertical form
function SearchVertical() {
  return (
    <PhoneScreen>
      <div style={{ padding: '8px 16px 22px' }}>
        <h1 style={{ ...tx.display, fontSize: 28, margin: '8px 0 18px' }}>Find a sitter</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FieldRow icon={<Search size={20} />} label="Service" value="Dog Walking" />
          <FieldRow icon={<Calendar size={20} />} label="When" value="May 15 – 17" />
          <FieldRow icon={<LocationFill size={20} />} label="Where" value="Bernal Heights, SF" />
        </div>
        <div style={{ marginTop: 20 }}><PawButton icon={<Search size={19} sw={2.4} />}>Search</PawButton></div>
        <h3 style={{ ...tx.h3, margin: '26px 0 12px' }}>Recommended for Biscuit</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SITTERS.slice(0, 2).map((s) => <SitterCard key={s.id} sitter={s} />)}
        </div>
      </div>
    </PhoneScreen>
  );
}

// V2 — horizontal pill bar
function SearchPillBar() {
  const cell = (icon, top, bottom, border) => (
    <div style={{ flex: 1, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8,
      borderRight: border ? `1px solid ${T.border}` : 'none' }}>
      <span style={{ color: T.sunset, display: 'flex' }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ ...tx.caption, fontSize: 10 }}>{top}</div>
        <div style={{ ...tx.bodySm, color: T.textPrimary, fontWeight: 600, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis' }}>{bottom}</div>
      </div>
    </div>
  );
  return (
    <PhoneScreen>
      <div style={{ padding: '8px 16px 22px' }}>
        <h1 style={{ ...tx.display, fontSize: 28, margin: '8px 0 16px' }}>Find a sitter</h1>
        {/* one horizontal pill, three cells + search button */}
        <div style={{ display: 'flex', alignItems: 'center', height: 60, background: T.elevated,
          borderRadius: 30, boxShadow: T.shadowFloat, paddingRight: 6 }}>
          {cell(<Search size={18} />, 'Service', 'Walking', true)}
          {cell(<Calendar size={18} />, 'When', 'May 15', true)}
          {cell(<LocationFill size={18} />, 'Where', 'Bernal', false)}
          <button style={{ width: 48, height: 48, borderRadius: 24, background: T.sunset, border: 'none',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
            <Search size={20} sw={2.6} />
          </button>
        </div>
        <h3 style={{ ...tx.h3, margin: '24px 0 12px' }}>Sitters near you</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SITTERS.slice(0, 3).map((s) => <SitterCard key={s.id} sitter={s} />)}
        </div>
      </div>
    </PhoneScreen>
  );
}

// V3 — hero entry block
function SearchHero() {
  return (
    <PhoneScreen>
      <div style={{ padding: '8px 16px 22px' }}>
        {/* hero block */}
        <div style={{ borderRadius: 22, padding: 20, background: 'linear-gradient(155deg, #EA580C, #DC2626)',
          color: '#fff', marginTop: 6 }}>
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: '29px' }}>Who’s caring for<br/>Biscuit today?</div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Dog Walking', <Search size={18} />], ['May 15 – 17', <Calendar size={18} />], ['Bernal Heights', <LocationFill size={18} />]].map(([v, ic], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 14px',
                background: 'rgba(255,255,255,0.18)', borderRadius: 12, backdropFilter: 'blur(8px)' }}>
                <span style={{ display: 'flex', opacity: 0.95 }}>{ic}</span>
                <span style={{ fontSize: 15, fontWeight: 500, flex: 1 }}>{v}</span>
                <ChevronDown size={16} style={{ opacity: 0.8 }} />
              </div>
            ))}
          </div>
          <button style={{ marginTop: 16, width: '100%', height: 50, borderRadius: 12, border: 'none',
            background: '#fff', color: T.sunset, fontSize: 16, fontWeight: 600, cursor: 'pointer',
            fontFamily: T.font }}>Search</button>
        </div>
        <h3 style={{ ...tx.h3, margin: '22px 0 12px' }}>Recent sitters</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          {SITTERS.slice(0, 4).map((s) => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 56 }}>
              <SitterAvatar initials={s.initials} size={52} />
              <span style={{ ...tx.caption, color: T.textPrimary }}>{s.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneScreen>
  );
}
window.SearchVertical = SearchVertical;
window.SearchPillBar = SearchPillBar;
window.SearchHero = SearchHero;

// ════════════════════════════════════════════════════════════
// SRCH-02 — two filter patterns
// ════════════════════════════════════════════════════════════
function ResultsSticky() {
  return (
    <PhoneScreen>
      <div style={{ padding: '4px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px 8px' }}>
          <ChevronLeft size={24} style={{ color: T.sunset }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...tx.h3 }}>Dog Walking</div>
            <div style={{ ...tx.caption }}>May 15–17 · Bernal Heights</div>
          </div>
          <MapIcon size={22} style={{ color: T.sunset }} />
        </div>
        {/* sticky filter + sort bar */}
        <div style={{ display: 'flex', gap: 8, padding: '8px 12px', background: T.elevated,
          borderTop: `0.5px solid ${T.border}`, borderBottom: `0.5px solid ${T.border}` }}>
          {['Price', 'Rating 4.5+', 'Verified'].map((f, i) => (
            <Pill key={i} active={i === 1} style={{ height: 32, fontSize: 12.5, padding: '0 12px' }}>{f}</Pill>
          ))}
          <Pill style={{ height: 32, fontSize: 12.5, padding: '0 12px', marginLeft: 'auto' }}>Sort ▾</Pill>
        </div>
        <div style={{ padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SITTERS.map((s) => <SitterCard key={s.id} sitter={s} />)}
        </div>
      </div>
    </PhoneScreen>
  );
}

function ResultsSheet() {
  return (
    <PhoneScreen>
      <div style={{ position: 'relative', padding: '4px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px 10px' }}>
          <ChevronLeft size={24} style={{ color: T.sunset }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...tx.h3 }}>Dog Walking</div>
            <div style={{ ...tx.caption }}>4 sitters · Bernal Heights</div>
          </div>
          <MapIcon size={22} style={{ color: T.sunset }} />
        </div>
        <div style={{ padding: '0 16px 90px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SITTERS.map((s) => <SitterCard key={s.id} sitter={s} />)}
        </div>
        {/* peeking filter sheet */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: T.elevated,
          borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: '0 -6px 24px rgba(31,27,23,0.16)',
          padding: '10px 16px 16px' }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: T.border, margin: '0 auto 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...tx.h3 }}>Filters</span>
            <X size={20} style={{ color: T.textTertiary }} />
          </div>
        </div>
        {/* the single floating filter button that opens it */}
        <div style={{ position: 'absolute', right: 16, bottom: 78 }}>
          <div style={{ height: 44, padding: '0 18px', borderRadius: 22, background: T.sunset, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(234,88,12,0.4)',
            fontFamily: T.font, fontSize: 14, fontWeight: 600 }}>
            <Sliders size={18} /> Filters · 1
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
window.ResultsSticky = ResultsSticky;
window.ResultsSheet = ResultsSheet;
