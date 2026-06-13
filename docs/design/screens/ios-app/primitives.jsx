// primitives.jsx — PawConnect design-system components (web recreation)
// Values lifted from AppColors.swift, PawButton/PawCard/PawTextField.swift,
// Constants.swift, and PRODUCT_SPEC § Design System Reference.
const { ChevronLeft, StarFill } = window;

const T = {
  sunset: 'var(--sunset)', terracotta: 'var(--terracotta)', sage: 'var(--sage)',
  amber: 'var(--amber)', peach: 'var(--peach)',
  n50: 'var(--neutral-50)', n100: 'var(--neutral-100)', n200: 'var(--neutral-200)',
  n300: 'var(--neutral-300)', n400: 'var(--neutral-400)', n500: 'var(--neutral-500)',
  n600: 'var(--neutral-600)', n700: 'var(--neutral-700)', n800: 'var(--neutral-800)',
  n900: 'var(--neutral-900)',
  bg: 'var(--bg-primary)', elevated: 'var(--bg-elevated)',
  textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  textTertiary: 'var(--text-tertiary)',
  border: 'var(--border)',
  glassBg: 'var(--glass-bg)', glassBorder: 'var(--glass-border)',
  font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  rSm: 8, rMd: 12, rLg: 16, rFull: 9999,
  shadowCard: 'var(--shadow-card)',
  shadowFloat: 'var(--shadow-float)',
  shadowModal: '0 -2px 24px rgba(31,27,23,0.12)',
};
window.T = T;

// type helpers
const tx = {
  display: { fontSize: 34, fontWeight: 700, lineHeight: '41px', letterSpacing: '-0.5px', color: T.textPrimary },
  h1: { fontSize: 24, fontWeight: 700, lineHeight: '30px', letterSpacing: '-0.2px', color: T.textPrimary },
  h2: { fontSize: 20, fontWeight: 600, lineHeight: '26px', color: T.textPrimary },
  h3: { fontSize: 17, fontWeight: 600, lineHeight: '22px', color: T.textPrimary },
  bodyLg: { fontSize: 17, fontWeight: 400, lineHeight: '24px', color: T.textSecondary },
  body: { fontSize: 15, fontWeight: 400, lineHeight: '21px', color: T.textSecondary },
  bodySm: { fontSize: 13, fontWeight: 400, lineHeight: '18px', color: T.textSecondary },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: '16px', letterSpacing: '0.1px', color: T.textTertiary },
};
window.tx = tx;

// ── Buttons ─────────────────────────────────────────────────
// PrimaryButtonStyle: 56pt, r12, solid sunset (0.6 when disabled), scale 0.98 press
function PawButton({ children, variant = 'primary', disabled, onClick, full = true, icon, style }) {
  const [pressed, setPressed] = React.useState(false);
  const base = {
    height: 56, borderRadius: T.rMd, border: 'none', cursor: disabled ? 'default' : 'pointer',
    width: full ? '100%' : 'auto', padding: full ? 0 : '0 24px',
    font: T.font, fontSize: 17, fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
    transition: 'transform .1s ease, background .15s ease, color .15s ease',
    WebkitTapHighlightColor: 'transparent', userSelect: 'none',
  };
  const variants = {
    primary: { background: disabled ? 'rgba(234,88,12,0.6)' : T.sunset, color: '#fff' },
    secondary: { background: 'transparent', color: T.sunset, boxShadow: `inset 0 0 0 1.5px ${T.sunset}` },
    destructive: { background: 'transparent', color: T.terracotta, boxShadow: `inset 0 0 0 1.5px ${T.terracotta}` },
  };
  return (
    <button onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{ ...base, ...variants[variant], ...style }}>
      {icon}{children}
    </button>
  );
}

// TextButtonStyle: sunset, terracotta on press
function TextButton({ children, onClick, style }) {
  const [p, setP] = React.useState(false);
  return (
    <button onClick={onClick} onPointerDown={() => setP(true)} onPointerUp={() => setP(false)}
      onPointerLeave={() => setP(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        font: T.font, fontSize: 15, fontWeight: 500, color: p ? T.terracotta : T.sunset,
        WebkitTapHighlightColor: 'transparent', ...style }}>
      {children}
    </button>
  );
}

// ── Card: white, r12, padding 16, soft warm shadow ──────────
function PawCard({ children, style, onClick, pad = 16 }) {
  return (
    <div onClick={onClick} style={{
      background: T.elevated, borderRadius: T.rMd, padding: pad,
      boxShadow: T.shadowCard, cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

// ── Text field: native iOS rounded-border feel, sunset tint ─
function PawTextField({ label, value, onChange, placeholder, type = 'text', secure, error, trailing }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={{ ...tx.bodySm, fontWeight: 500, color: T.textSecondary }}>{label}</span>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center',
        background: T.elevated, borderRadius: T.rSm,
        boxShadow: `inset 0 0 0 1px ${focus ? T.sunset : T.border}`,
        transition: 'box-shadow .15s' }}>
        <input value={value} onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          type={secure ? 'password' : type} placeholder={placeholder}
          style={{ flex: 1, height: 48, border: 'none', outline: 'none', background: 'transparent',
            padding: '0 16px', font: T.font, fontSize: 16, color: T.textPrimary,
            borderRadius: T.rSm }} />
        {trailing && <div style={{ paddingRight: 14, color: T.textTertiary, display: 'flex' }}>{trailing}</div>}
      </div>
      {error && <span style={{ ...tx.caption, color: T.terracotta }}>{error}</span>}
    </div>
  );
}

// ── Avatar (round, optional ring) ───────────────────────────
function Avatar({ src, size = 60, ring, fallback }) {
  return (
    <div style={{ width: size, height: size, borderRadius: T.rFull, flexShrink: 0,
      overflow: 'hidden', background: T.n200, position: 'relative',
      boxShadow: ring ? `0 0 0 3px ${T.sunset}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ color: T.sunset }}>{fallback}</span>}
    </div>
  );
}

// ── Star rating row ─────────────────────────────────────────
function StarRating({ rating, count, size = 16, showNumber = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <StarFill size={size} style={{ color: T.amber }} />
      {showNumber && <span style={{ ...tx.body, color: T.textPrimary, fontWeight: 600 }}>{rating}</span>}
      {count != null && <span style={{ ...tx.body, color: T.textSecondary }}>({count})</span>}
    </span>
  );
}

// ── Pill / chip ─────────────────────────────────────────────
function Pill({ children, active, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 38, padding: '0 16px',
      borderRadius: T.rFull, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
      font: T.font, fontSize: 14, fontWeight: 500,
      background: active ? T.sunset : T.elevated,
      color: active ? '#fff' : T.textSecondary,
      boxShadow: active ? 'none' : `inset 0 0 0 1px ${T.border}`,
      WebkitTapHighlightColor: 'transparent', ...style,
    }}>{children}</button>
  );
}

// ── Section header ──────────────────────────────────────────
function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
      <h2 style={{ ...tx.h2, margin: 0 }}>{children}</h2>
      {action && <TextButton onClick={onAction}>{action}</TextButton>}
    </div>
  );
}

// ── Divider ─────────────────────────────────────────────────
const Divider = ({ style }) => <div style={{ height: 1, background: T.border, ...style }} />;

// ── "or" divider ────────────────────────────────────────────
function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1, height: 1, background: T.border }} />
      <span style={{ ...tx.caption }}>or</span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}

// ── Progress dots (onboarding) ──────────────────────────────
function ProgressSegments({ total, active }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: T.rFull,
          background: i < active ? T.sunset : T.border }} />
      ))}
    </div>
  );
}

// ── Top safe-area spacer (clears status bar + island) ───────
const SafeTop = ({ h = 56 }) => <div style={{ height: h, flexShrink: 0 }} />;

// ── In-screen nav bar (back chevron + title + trailing) ─────
function NavBar({ onBack, title, trailing, transparent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4px 8px 4px 4px', minHeight: 44,
      background: transparent ? 'transparent' : 'transparent' }}>
      <div style={{ width: 44, display: 'flex', justifyContent: 'center' }}>
        {onBack && (
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer',
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.sunset, WebkitTapHighlightColor: 'transparent' }}>
            <ChevronLeft size={26} sw={2.4} />
          </button>
        )}
      </div>
      <span style={{ ...tx.h3, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</span>
      <div style={{ width: 44, display: 'flex', justifyContent: 'center', color: T.sunset }}>
        {trailing}
      </div>
    </div>
  );
}

Object.assign(window, {
  PawButton, TextButton, PawCard, PawTextField, Avatar, StarRating, Pill,
  SectionTitle, Divider, OrDivider, ProgressSegments, SafeTop, NavBar,
});
