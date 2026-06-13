// icons.jsx — PawConnect icon system
// ============================================================================
// RULE: SF Symbols for everything Apple already ships — nav chrome, status
// indicators, and standard action icons. Custom artwork is reserved for the
// FIVE service-type icons only (Walking, Drop-in, Sitting, Boarding, Daycare),
// where a bespoke glyph adds real product meaning. Brand marks, hero
// illustrations, and empty states are custom too, but those are IMAGES, not
// part of this icon layer (the paw mark itself is `pawprint.fill`).
//
// WEB NOTE: SF Symbols can't load on the web, so Section A renders faithful
// rounded-outline STAND-INS. Each one is tagged with its exact SF Symbol name —
// when porting to SwiftUI, use the named symbol, never these SVGs.
// ============================================================================

const Svg = ({ size = 24, sw = 2, fill = 'none', children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round"
    strokeLinejoin="round" style={{ display: 'block', ...style }}>
    {children}
  </svg>
);
// helper to tag a component with its SF Symbol name (handy for dev handoff)
const sf = (Comp, name) => { Comp.sfSymbol = name; return Comp; };

// ════════════════════════════════════════════════════════════════════════
// SECTION A — SF SYMBOLS (web stand-ins). Use the named symbol in SwiftUI.
// ════════════════════════════════════════════════════════════════════════

// ── Nav chrome ──────────────────────────────────────────────
const ChevronLeft  = sf((p) => <Svg {...p}><path d="M15 5l-7 7 7 7"/></Svg>, 'chevron.left');
const ChevronRight = sf((p) => <Svg {...p}><path d="M9 5l7 7-7 7"/></Svg>, 'chevron.right');
const ChevronDown  = sf((p) => <Svg {...p}><path d="M5 9l7 7 7-7"/></Svg>, 'chevron.down');
const X       = sf((p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18"/></Svg>, 'xmark');
const Ellipsis = sf((p) => <Svg {...p} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></Svg>, 'ellipsis');
const Menu    = sf((p) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Svg>, 'line.3.horizontal');
const Share   = sf((p) => <Svg {...p}><path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/></Svg>, 'square.and.arrow.up');

// ── Standard actions ────────────────────────────────────────
const Plus    = sf((p) => <Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>, 'plus');
const Pencil  = sf((p) => <Svg {...p}><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="M14 7l3 3"/></Svg>, 'pencil');
const Trash   = sf((p) => <Svg {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></Svg>, 'trash');
const Sliders = sf((p) => <Svg {...p}><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></Svg>, 'slider.horizontal.3');
const SortArrows = sf((p) => <Svg {...p}><path d="M8 4v16M8 20l-3-3M8 4l3 3M16 20V4M16 4l-3 3M16 20l3-3"/></Svg>, 'arrow.up.arrow.down');
const Gear    = sf((p) => <Svg {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1L5.3 5.3"/></Svg>, 'gearshape');
const Search  = sf((p) => <Svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Svg>, 'magnifyingglass');
const MapIcon  = sf((p) => <Svg {...p}><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"/><path d="M9 4v13M15 6.5v13"/></Svg>, 'map');
const ListIcon = sf((p) => <Svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></Svg>, 'list.bullet');
const Eye    = sf((p) => <Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></Svg>, 'eye');
const EyeOff = sf((p) => <Svg {...p}><path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.4 4.1M6.1 6.1A16 16 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 2.6-.4"/></Svg>, 'eye.slash');
const Camera = sf((p) => <Svg {...p}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><circle cx="12" cy="12.5" r="3.4"/></Svg>, 'camera.fill');

// ── Tab bar & common UI glyphs ──────────────────────────────
const Calendar = sf((p) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v4M16 3v4"/></Svg>, 'calendar');
const Message  = sf((p) => <Svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.8L3 21l1.9-4.1A8.4 8.4 0 0 1 3 11.5C3 6.8 7 3.5 12 3.5s9 3.3 9 8Z"/></Svg>, 'message.fill');
const User     = sf((p) => <Svg {...p}><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></Svg>, 'person.crop.circle');
const Bell     = sf((p) => <Svg {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></Svg>, 'bell.fill');
const Phone    = sf((p) => <Svg {...p}><path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L19 14l2 5v3a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1Z"/></Svg>, 'phone.fill');
const Send     = sf((p) => <Svg {...p}><path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3Z"/></Svg>, 'paperplane.fill');
const Clock    = sf((p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Svg>, 'clock');
const LocationFill = sf((p) => <Svg {...p} fill="currentColor" stroke="none"><path d="M12 2 4 11.5l8 3.2 8-3.2L12 2Zm0 5.5 4.2 5.1L12 11l-4.2 1.6L12 7.5Z" opacity="0"/><path d="M12 2 3.5 12 12 9l8.5 3L12 2Z"/></Svg>, 'location.fill');
const MapPin   = sf((p) => <Svg {...p}><path d="M12 21c5-5.3 7-8.5 7-11a7 7 0 1 0-14 0c0 2.5 2 5.7 7 11Z"/><circle cx="12" cy="10" r="2.6"/></Svg>, 'mappin.and.ellipse');

// ── Filled status / trust indicators ────────────────────────
const StarFill = sf(({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"/>
  </svg>
), 'star.fill');
const Star = sf((p) => <Svg {...p}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"/></Svg>, 'star');
const Heart = sf((p) => <Svg {...p}><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 4.8 5.2 4.2 7.4 3.8 9.4 5 12 7.7c2.6-2.7 4.6-3.9 6.8-3.5 3.5.6 4.9 4.2 3.2 7.5C19.5 16.4 12 21 12 21Z"/></Svg>, 'heart');
const HeartFill = sf(({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 4.8 5.2 4.2 7.4 3.8 9.4 5 12 7.7c2.6-2.7 4.6-3.9 6.8-3.5 3.5.6 4.9 4.2 3.2 7.5C19.5 16.4 12 21 12 21Z"/>
  </svg>
), 'heart.fill');
const Check = sf((p) => <Svg {...p}><path d="M5 12.5l4.5 4.5L19 6.5"/></Svg>, 'checkmark');
const CheckCircleFill = sf(({ size = 22, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M7.5 12.3l3 3 6-6.3" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
), 'checkmark.circle.fill');
const CheckSealFill = sf(({ size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <path d="M12 1.6l2.6 1.9 3.2-.2 1 3.1 2.6 1.9-1 3 1 3-2.6 1.9-1 3.1-3.2-.2L12 22.4l-2.6-1.9-3.2.2-1-3.1L2.6 15.7l1-3-1-3 2.6-1.9 1-3.1 3.2.2L12 1.6Z"/>
    <path d="M8.5 12l2.3 2.3 4.7-4.8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
), 'checkmark.seal.fill');
// Alert/feedback (PawAlert): warning + error
const WarningFill = sf(({ size = 22, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <path d="M10.3 3.2 1.6 18.4A2 2 0 0 0 3.3 21.4h17.4a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0Z"/>
    <path d="M12 9v5M12 17.2h.01" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
), 'exclamationmark.triangle.fill');
const ErrorFill = sf(({ size = 22, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 7v6M12 16.2h.01" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
), 'exclamationmark.circle.fill');

// ── Live Activity care icons → SF Symbols (Lock-Screen legible) ──
const Pills      = sf((p) => <Svg {...p}><path d="M4.5 12.5 12 5a3.5 3.5 0 0 1 5 5l-7.5 7.5a3.5 3.5 0 0 1-5-5Z"/><path d="M8.2 8.2l5.6 5.6"/></Svg>, 'pills.fill');
const Bowl       = sf((p) => <Svg {...p}><path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M7 11c0-3 2-5 5-5s5 2 5 5"/></Svg>, 'fork.knife');
const FigureWalk = sf((p) => <Svg {...p}><circle cx="13" cy="4.5" r="2"/><path d="M13 8l-3 4 1 4M10 12l-2.5 2M14 11l3 2-1.5 4M11 16l-2 5M16 17l1 4"/></Svg>, 'figure.walk');
const TennisBall = sf((p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M5 5c3.5 2 3.5 12 0 14M19 5c-3.5 2-3.5 12 0 14"/></Svg>, 'tennisball.fill');
const Tree       = sf((p) => <Svg {...p}><path d="M12 3c3 0 5 2.2 5 4.6 0 .8-.2 1.5-.6 2.1C17.8 10.4 19 12 19 13.8c0 2.4-2 4.2-4.6 4.2H9.6C7 18 5 16.2 5 13.8c0-1.8 1.2-3.4 2.6-4.1-.4-.6-.6-1.3-.6-2.1C7 5.2 9 3 12 3Z"/><path d="M12 18v3"/></Svg>, 'tree.fill');

// ── Brand paw mark → `pawprint.fill` (an SF Symbol, used inside the logo) ──
const PawFill = sf(({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <ellipse cx="6" cy="11" rx="2.1" ry="2.7"/>
    <ellipse cx="11" cy="8.2" rx="2.2" ry="2.9"/>
    <ellipse cx="16.4" cy="9.4" rx="2.1" ry="2.7"/>
    <ellipse cx="19" cy="14" rx="1.8" ry="2.3"/>
    <path d="M11.6 13.2c2.6 0 4.7 1.7 5.2 3.9.4 1.8-1 3.2-2.7 3-1-.1-1.7-.5-2.5-.5s-1.5.4-2.5.5c-1.7.2-3.1-1.2-2.7-3 .5-2.2 2.6-3.9 5.2-3.9Z"/>
  </svg>
), 'pawprint.fill');

// Apple wordmark for Sign in with Apple (system-provided button)
const AppleLogo = sf(({ size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', ...style }}>
    <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8ZM14.3 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z"/>
  </svg>
), 'apple.logo');

// ════════════════════════════════════════════════════════════════════════
// SECTION B — CUSTOM ARTWORK (the ONLY hand-drawn glyphs in the icon layer)
// The five service-type icons. Exact Claude-SVG specs from the Asset Library
// (ASSET-030..034): single color via currentColor, stroke 2, round caps,
// friendly geometric. These have no SF Symbol — the custom glyph adds meaning.
// ════════════════════════════════════════════════════════════════════════

// ASSET-030 Walking — person walking a leashed dog (clear, not abstract)
const ServiceWalking  = (p) => <Svg {...p}><circle cx="6" cy="4" r="1.7"/><path d="M6 5.7V11"/><path d="M6 11l-1.6 5M6 11l1.5 5"/><path d="M6 7.8l2.6 1.4"/><path d="M8.6 9.2c2 1.2 2.6 2.8 4.4 2.8"/><path d="M13 16v-2.2a1.4 1.4 0 0 1 1.4-1.4h3.4l1.2-1.5V16"/><path d="M14 16v1.6M17.6 16v1.6"/><path d="M13 13.6l-1.1-.9"/></Svg>;
const ServiceDropin   = (p) => <Svg {...p}><path d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M5 21h14"/><circle cx="12" cy="13.5" r="1"/><circle cx="10" cy="11.5" r=".7"/><circle cx="14" cy="11.5" r=".7"/></Svg>;
const ServiceSitting  = (p) => <Svg {...p}><path d="M4 11l8-6 8 6"/><path d="M6 10v10h12V10"/><rect x="10" y="13" width="4" height="4" rx="1"/><path d="M18.5 4.5a2 2 0 1 0 1.8 3 2.6 2.6 0 0 1-1.8-3Z"/></Svg>;
const ServiceBoarding = (p) => <Svg {...p}><path d="M4 11l8-6 8 6"/><path d="M6 10v10h12V10"/><path d="M8 17h8a0 0 0 0 1 0 0v0a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7.5" r=".9"/></Svg>;
// ASSET-034 Daycare — play: a pet paw + ball (group play, daytime energy)
const ServiceDaycare  = (p) => <Svg {...p}><circle cx="17.6" cy="6.6" r="2.4"/><path d="M16.3 5c.8 1.3.8 2.4 0 3.7"/><circle cx="5.4" cy="12.2" r="1.1"/><circle cx="8.8" cy="10.5" r="1.2"/><circle cx="12.3" cy="12.2" r="1.1"/><path d="M8.85 13.4c2.1 0 3.8 1.5 3.8 3.3 0 1.4-1.2 2.2-2.4 1.9-.6-.15-1-.35-1.4-.35s-.8.2-1.4.35c-1.2.3-2.4-.5-2.4-1.9 0-1.8 1.7-3.3 3.8-3.3Z"/></Svg>;

Object.assign(window, {
  // SF Symbols (web stand-ins)
  ChevronLeft, ChevronRight, ChevronDown, X, Ellipsis, Menu, Share,
  Plus, Pencil, Trash, Sliders, SortArrows, Gear, Search, MapIcon, ListIcon,
  Eye, EyeOff, Camera, Calendar, Message, User, Bell, Phone, Send, Clock,
  LocationFill, MapPin, StarFill, Star, Heart, HeartFill, Check,
  CheckCircleFill, CheckSealFill, WarningFill, ErrorFill,
  Pills, Bowl, FigureWalk, TennisBall, Tree, PawFill, AppleLogo,
  // Custom service-type icons
  ServiceWalking, ServiceDropin, ServiceSitting, ServiceBoarding, ServiceDaycare,
});
