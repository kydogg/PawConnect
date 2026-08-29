// screens-a.jsx — Welcome, Sign In, Search Home, Search Results
const { T, tx, PawButton, TextButton, PawCard, PawTextField, Pill, OrDivider,
  SafeTop, NavBar, Avatar, SitterCard, SitterAvatar, ASSET, SERVICES, SITTERS,
  PawFill, AppleLogo, Eye, EyeOff, Search, LocationFill, Calendar, ChevronDown, Check } = window;

// Scrollable screen body with cream background
function Screen({ children, pad = 16, style }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg,
      display: 'flex', flexDirection: 'column', WebkitOverflowScrolling: 'touch', ...style }}>
      <div style={{ padding: `0 ${pad}px`, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
window.Screen = Screen;

// Brand logo lockup
function LogoLockup({ tagline }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: T.sunset,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        boxShadow: '0 4px 12px rgba(234,88,12,0.3)' }}>
        <PawFill size={26} />
      </div>
      <span style={{ ...tx.display, fontSize: 30 }}>PawConnect</span>
      {tagline && <span style={{ ...tx.bodyLg }}>Peace of mind, one paw at a time</span>}
    </div>
  );
}
window.LogoLockup = LogoLockup;

// ── AUTH-01 Welcome ─────────────────────────────────────────
function WelcomeScreen({ go }) {
  return (
    <Screen>
      <SafeTop h={64} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <LogoLockup tagline />
        {/* Illustration area */}
        <div style={{ borderRadius: 24, height: 220, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(150deg, rgba(234,88,12,0.10), rgba(251,146,60,0.12))',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={ASSET.shibaSoft} alt="" style={{ width: 200, height: 200, objectFit: 'contain',
            filter: 'drop-shadow(0 8px 16px rgba(180,83,9,0.18))' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 8 }}>
        <PawButton onClick={() => go('signin')}>Get Started</PawButton>
        <PawButton variant="secondary" onClick={() => go('signin')}>I already have an account</PawButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '16px 0 28px' }}>
        <TextButton style={{ fontSize: 12 }}>Terms</TextButton>
        <span style={{ ...tx.caption }}>·</span>
        <TextButton style={{ fontSize: 12 }}>Privacy</TextButton>
      </div>
    </Screen>
  );
}
window.WelcomeScreen = WelcomeScreen;

// ── AUTH-03 Sign In ─────────────────────────────────────────
function SignInScreen({ go }) {
  const [email, setEmail] = React.useState('maya@neighbor.co');
  const [pw, setPw] = React.useState('paws1234');
  const [show, setShow] = React.useState(false);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
      <SafeTop h={50} />
      <NavBar onBack={() => go('welcome')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <h1 style={{ ...tx.display, margin: 0 }}>Welcome back</h1>
          <span style={{ ...tx.bodyLg }}>Sign in to continue caring for your pets</span>
        </div>
        {/* Apple */}
        <button style={{ marginTop: 28, width: '100%', height: 56, borderRadius: 12, border: 'none',
          background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, cursor: 'pointer', font: T.font, fontSize: 17, fontWeight: 600 }}>
          <AppleLogo size={19} /> Sign in with Apple
        </button>
        <div style={{ margin: '24px 0' }}><OrDivider /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PawTextField label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <PawTextField label="Password" value={pw} onChange={setPw} placeholder="Password" secure={!show}
            trailing={<button onClick={() => setShow(!show)} style={{ background: 'none', border: 'none',
              cursor: 'pointer', color: T.textTertiary, display: 'flex' }}>{show ? <EyeOff size={20} /> : <Eye size={20} />}</button>} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <TextButton>Forgot password?</TextButton>
        </div>
        <div style={{ marginTop: 24 }}>
          <PawButton onClick={() => go('home')}>Sign In</PawButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 24 }}>
          <span style={{ ...tx.body }}>Don’t have an account?</span>
          <TextButton style={{ fontWeight: 600 }}>Sign Up</TextButton>
        </div>
      </div>
    </div>
  );
}
window.SignInScreen = SignInScreen;

// Tappable input-style row (location / date)
function TapRow({ icon, text, placeholder, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 16px',
      background: T.elevated, borderRadius: 12, boxShadow: T.shadowCard, cursor: 'pointer' }}>
      <span style={{ color: T.sunset, display: 'flex' }}>{icon}</span>
      <span style={{ ...tx.bodyLg, color: value ? T.textPrimary : T.textTertiary, flex: 1 }}>
        {value || placeholder}
      </span>
      <ChevronDown size={18} style={{ color: T.textTertiary }} />
    </div>
  );
}

// ── SRCH-01 Search Home ─────────────────────────────────────
function SearchHomeScreen({ go }) {
  const [pets, setPets] = React.useState(['dog']);
  const [service, setService] = React.useState('walking');
  const togglePet = (p) => setPets((s) => s.includes(p) ? s.filter((x) => x !== p) : [...s, p]);
  const recents = SITTERS.slice(0, 4);
  return (
    <Screen pad={0}>
      <SafeTop h={58} />
      <div style={{ padding: '0 16px' }}>
        <h1 style={{ ...tx.display, margin: '0 0 20px' }}>Find a Sitter</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TapRow icon={<LocationFill size={20} />} value="Bernal Heights, SF" />
          <TapRow icon={<Calendar size={20} />} placeholder="Select dates" value="May 15 – 17" />
        </div>
        {/* Pet type */}
        <div style={{ marginTop: 20 }}>
          <span style={{ ...tx.bodySm, fontWeight: 500, color: T.textSecondary }}>Pet type</span>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['dog', '🐕 Dogs'], ['cat', '🐈 Cats'], ['other', '🐾 Other']].map(([id, label]) => (
              <Pill key={id} active={pets.includes(id)} onClick={() => togglePet(id)} style={{ flex: 1, justifyContent: 'center' }}>{label}</Pill>
            ))}
          </div>
        </div>
        {/* Service type */}
        <div style={{ marginTop: 20 }}>
          <span style={{ ...tx.bodySm, fontWeight: 500, color: T.textSecondary }}>Service type</span>
          <PawCard pad={4} style={{ marginTop: 8 }}>
            {Object.entries(SERVICES).map(([id, s], i, arr) => (
              <div key={id} onClick={() => setService(id)} style={{ display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 12px', cursor: 'pointer',
                borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ color: service === id ? T.sunset : T.textSecondary, display: 'flex' }}><s.Icon size={22} /></span>
                <span style={{ ...tx.bodyLg, color: T.textPrimary, flex: 1 }}>{s.label}</span>
                <div style={{ width: 22, height: 22, borderRadius: 11,
                  boxShadow: service === id ? 'none' : `inset 0 0 0 2px ${T.border}`,
                  background: service === id ? T.sunset : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {service === id && <Check size={14} style={{ color: '#fff' }} sw={3} />}
                </div>
              </div>
            ))}
          </PawCard>
        </div>
        <div style={{ marginTop: 24 }}>
          <PawButton icon={<Search size={20} sw={2.4} />} onClick={() => go('results')}>Search</PawButton>
        </div>
      </div>
      {/* Recent sitters */}
      <div style={{ marginTop: 32, padding: '0 0 0 16px' }}>
        <h3 style={{ ...tx.h3, margin: '0 0 14px' }}>Recent sitters</h3>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, paddingRight: 16 }}>
          {recents.map((s) => (
            <div key={s.id} onClick={() => go('profile', s)} style={{ display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6, width: 64, flexShrink: 0, cursor: 'pointer' }}>
              <SitterAvatar initials={s.initials} size={60} />
              <span style={{ ...tx.caption, color: T.textPrimary, textAlign: 'center', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 64 }}>{s.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div style={{ marginTop: 24, padding: '0 16px 24px' }}>
        <h3 style={{ ...tx.h3, margin: '0 0 2px' }}>Recommended for Biscuit</h3>
        <span style={{ ...tx.caption }}>Based on your preferences</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
          {SITTERS.slice(0, 2).map((s) => <SitterCard key={s.id} sitter={s} onClick={() => go('profile', s)} />)}
        </div>
      </div>
    </Screen>
  );
}
window.SearchHomeScreen = SearchHomeScreen;

// ── SRCH-02 Search Results ──────────────────────────────────
function SearchResultsScreen({ go }) {
  const [sort, setSort] = React.useState('Distance');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
      <SafeTop h={50} />
      <NavBar onBack={() => go('home')} title="Dog Walking"
        trailing={<button onClick={() => go('map')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.sunset, display: 'flex' }}><MapIcon size={24} /></button>} />
      <div style={{ textAlign: 'center', marginTop: -4, marginBottom: 6 }}>
        <span style={{ ...tx.caption }}>May 15–17 · Bernal Heights</span>
      </div>
      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderTop: `0.5px solid ${T.border}`, borderBottom: `0.5px solid ${T.border}`,
        background: T.elevated }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          cursor: 'pointer', color: T.textPrimary, font: T.font, fontSize: 15, fontWeight: 500 }}>
          <Sliders size={18} style={{ color: T.sunset }} /> Filters
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
          cursor: 'pointer', color: T.textPrimary, font: T.font, fontSize: 15, fontWeight: 500 }}>
          Sort: {sort} <ChevronDown size={16} style={{ color: T.textTertiary }} />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 24px' }}>
        <span style={{ ...tx.bodySm }}>{SITTERS.length} sitters available</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          {SITTERS.map((s) => <SitterCard key={s.id} sitter={s} onClick={() => go('profile', s)} />)}
        </div>
      </div>
    </div>
  );
}
window.SearchResultsScreen = SearchResultsScreen;
