/* @ds-bundle: {"format":3,"namespace":"PawConnectDesignSystem_445bf4","components":[],"sourceHashes":{"ui_kits/ios-app/design-canvas.jsx":"d3ddcf4241b9","ui_kits/ios-app/explorations.jsx":"c637498a7050","ui_kits/ios-app/icons.jsx":"136e37c24aaa","ui_kits/ios-app/ios-frame.jsx":"39f3a091d97d","ui_kits/ios-app/primitives.jsx":"031d8693ad62","ui_kits/ios-app/screens-a.jsx":"2c29a4687b84","ui_kits/ios-app/screens-b.jsx":"4dc0b0993a07","ui_kits/ios-app/screens-c.jsx":"ae7c6c09dc85","ui_kits/ios-app/shared.jsx":"f108e05ad2e4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PawConnectDesignSystem_445bf4 = window.PawConnectDesignSystem_445bf4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/ios-app/design-canvas.jsx
try { (() => {
/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/explorations.jsx
try { (() => {
// explorations.jsx — design explorations for canvas review
// Reuses primitives/icons/shared (window globals). Dark artboards wrap content
// in [data-theme="dark"] so the var-based tokens invert automatically.
const {
  T,
  tx,
  PawButton,
  PawCard,
  Pill,
  SitterCard,
  SitterAvatar,
  SERVICES,
  SITTERS,
  PawFill,
  FigureWalk,
  Search,
  LocationFill,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Sliders,
  MapIcon,
  StarFill,
  CheckSealFill,
  X
} = window;

// ── Faux status bar ─────────────────────────────────────────
function StatusBar({
  dark
}) {
  const c = dark ? '#fff' : '#1F1B17';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 22px 4px',
      fontFamily: T.font
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: c
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "2.6",
    height: "5",
    rx: "0.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "2.6",
    height: "7",
    rx: "0.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "2.6",
    height: "9",
    rx: "0.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "0",
    width: "2.6",
    height: "11",
    rx: "0.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "11",
    viewBox: "0 0 24 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "20",
    height: "11",
    rx: "3",
    stroke: c,
    strokeOpacity: "0.4",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "16",
    height: "8",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21.5",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: c,
    fillOpacity: "0.5"
  }))));
}

// Lightweight phone screen frame for the canvas
function PhoneScreen({
  children,
  dark,
  w = 300
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": dark ? 'dark' : undefined,
    style: {
      width: w,
      background: 'var(--bg-primary)',
      borderRadius: 28,
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(31,27,23,0.16)',
      fontFamily: T.font,
      border: '1px solid rgba(31,27,23,0.08)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: dark
  }), children);
}
window.PhoneScreen = PhoneScreen;

// ════════════════════════════════════════════════════════════
// LIVE ACTIVITY — icon vs route preview, light & dark
// ════════════════════════════════════════════════════════════

// the walked route on a minimal neighbourhood map
function RouteThumb({
  dark,
  size = 58
}) {
  const map = dark ? '#221C16' : '#F1E7D7';
  const street = dark ? '#34291F' : '#E4D5BE';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 13,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: dark ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'inset 0 0 0 1px rgba(120,60,20,0.10)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 58 58"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "58",
    height: "58",
    fill: map
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 20 H58 M0 40 H58 M20 0 V58 M40 0 V58",
    stroke: street,
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 47 C 16 38, 26 40, 28 32 S 30 20, 42 14",
    fill: "none",
    stroke: "#EA580C",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: "0.95"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "47",
    r: "3",
    fill: map,
    stroke: "#EA580C",
    strokeWidth: "2.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "14",
    r: "4.4",
    fill: "#EA580C"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "14",
    r: "4.4",
    fill: "none",
    stroke: "#EA580C",
    strokeOpacity: "0.3",
    strokeWidth: "3"
  })));
}
function ActivityCard({
  dark,
  variant
}) {
  const cardBg = dark ? 'rgba(28,22,17,0.5)' : 'rgba(255,255,255,0.55)';
  const brand = dark ? 'rgba(255,255,255,0.8)' : '#5D4E37';
  const title = dark ? '#fff' : '#1F1B17';
  const sub = dark ? 'rgba(255,255,255,0.7)' : '#5D4E37';
  const pbBg = dark ? 'rgba(255,255,255,0.2)' : 'rgba(120,60,20,0.18)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      padding: 14,
      background: cardBg,
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      border: dark ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid rgba(255,255,255,0.6)',
      boxShadow: dark ? '0 8px 28px rgba(0,0,0,0.4)' : '0 8px 24px rgba(120,60,20,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      background: '#EA580C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(PawFill, {
    size: 13,
    style: {
      color: '#fff'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: brand
    }
  }, "PawConnect"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 10,
      fontWeight: 600,
      color: '#EA580C',
      letterSpacing: '0.4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: '#FB923C',
      boxShadow: '0 0 6px #FB923C'
    }
  }), "LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 23,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 0 0 2px rgba(234,88,12,0.4)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/avatar-shiba-sketch.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: title
    }
  }, "Biscuit is on a walk"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: sub,
      marginTop: 2
    }
  }, "Fed \u2713 \xB7 Meds \u2713 \xB7 12 min in")), variant === 'route' ? /*#__PURE__*/React.createElement(RouteThumb, {
    dark: dark
  }) : /*#__PURE__*/React.createElement(FigureWalk, {
    size: 24,
    style: {
      color: dark ? '#FB923C' : '#EA580C',
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 5,
      borderRadius: 3,
      background: pbBg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40%',
      height: '100%',
      borderRadius: 3,
      background: 'linear-gradient(90deg,#FB923C,#FCD34D)'
    }
  })));
}
function LockMini({
  dark,
  variant
}) {
  const wall = dark ? 'linear-gradient(165deg,#2A1A12,#5D2E14 55%,#8B3A14)' : 'linear-gradient(160deg,#FFF3E4,#FBC79A)';
  const clock = dark ? '#fff' : '#3B2A18';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      height: 430,
      borderRadius: 28,
      overflow: 'hidden',
      position: 'relative',
      background: wall,
      fontFamily: T.font,
      boxShadow: '0 10px 30px rgba(31,27,23,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 34,
      color: clock
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: 0.9
    }
  }, "Friday, May 15"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 62,
      fontWeight: 600,
      lineHeight: '66px',
      letterSpacing: '-1px'
    }
  }, "2:14")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 16
    }
  }, /*#__PURE__*/React.createElement(ActivityCard, {
    dark: dark,
    variant: variant
  })));
}
window.LockMini = LockMini;

// ════════════════════════════════════════════════════════════
// SRCH-01 — three input presentations
// ════════════════════════════════════════════════════════════
function FieldRow({
  icon,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 54,
      padding: '0 16px',
      background: T.elevated,
      borderRadius: 12,
      boxShadow: T.shadowCard
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.sunset,
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption,
      fontSize: 11
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.body,
      color: T.textPrimary,
      fontWeight: 500
    }
  }, value)), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16,
    style: {
      color: T.textTertiary
    }
  }));
}

// V1 — vertical form
function SearchVertical() {
  return /*#__PURE__*/React.createElement(PhoneScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 22px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      fontSize: 28,
      margin: '8px 0 18px'
    }
  }, "Find a sitter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FieldRow, {
    icon: /*#__PURE__*/React.createElement(Search, {
      size: 20
    }),
    label: "Service",
    value: "Dog Walking"
  }), /*#__PURE__*/React.createElement(FieldRow, {
    icon: /*#__PURE__*/React.createElement(Calendar, {
      size: 20
    }),
    label: "When",
    value: "May 15 \u2013 17"
  }), /*#__PURE__*/React.createElement(FieldRow, {
    icon: /*#__PURE__*/React.createElement(LocationFill, {
      size: 20
    }),
    label: "Where",
    value: "Bernal Heights, SF"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    icon: /*#__PURE__*/React.createElement(Search, {
      size: 19,
      sw: 2.4
    })
  }, "Search")), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...tx.h3,
      margin: '26px 0 12px'
    }
  }, "Recommended for Biscuit"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SITTERS.slice(0, 2).map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s
  })))));
}

// V2 — horizontal pill bar
function SearchPillBar() {
  const cell = (icon, top, bottom, border) => /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      borderRight: border ? `1px solid ${T.border}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.sunset,
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption,
      fontSize: 10
    }
  }, top), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm,
      color: T.textPrimary,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, bottom)));
  return /*#__PURE__*/React.createElement(PhoneScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 22px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      fontSize: 28,
      margin: '8px 0 16px'
    }
  }, "Find a sitter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 60,
      background: T.elevated,
      borderRadius: 30,
      boxShadow: T.shadowFloat,
      paddingRight: 6
    }
  }, cell(/*#__PURE__*/React.createElement(Search, {
    size: 18
  }), 'Service', 'Walking', true), cell(/*#__PURE__*/React.createElement(Calendar, {
    size: 18
  }), 'When', 'May 15', true), cell(/*#__PURE__*/React.createElement(LocationFill, {
    size: 18
  }), 'Where', 'Bernal', false), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 24,
      background: T.sunset,
      border: 'none',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 20,
    sw: 2.6
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...tx.h3,
      margin: '24px 0 12px'
    }
  }, "Sitters near you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SITTERS.slice(0, 3).map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s
  })))));
}

// V3 — hero entry block
function SearchHero() {
  return /*#__PURE__*/React.createElement(PhoneScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      padding: 20,
      background: 'linear-gradient(155deg, #EA580C, #DC2626)',
      color: '#fff',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: '29px'
    }
  }, "Who\u2019s caring for", /*#__PURE__*/React.createElement("br", null), "Biscuit today?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['Dog Walking', /*#__PURE__*/React.createElement(Search, {
    size: 18
  })], ['May 15 – 17', /*#__PURE__*/React.createElement(Calendar, {
    size: 18
  })], ['Bernal Heights', /*#__PURE__*/React.createElement(LocationFill, {
    size: 18
  })]].map(([v, ic], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 46,
      padding: '0 14px',
      background: 'rgba(255,255,255,0.18)',
      borderRadius: 12,
      backdropFilter: 'blur(8px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      opacity: 0.95
    }
  }, ic), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      flex: 1
    }
  }, v), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16,
    style: {
      opacity: 0.8
    }
  })))), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 16,
      width: '100%',
      height: 50,
      borderRadius: 12,
      border: 'none',
      background: '#fff',
      color: T.sunset,
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: T.font
    }
  }, "Search")), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...tx.h3,
      margin: '22px 0 12px'
    }
  }, "Recent sitters"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, SITTERS.slice(0, 4).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      width: 56
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: s.initials,
    size: 52
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption,
      color: T.textPrimary
    }
  }, s.name.split(' ')[0]))))));
}
window.SearchVertical = SearchVertical;
window.SearchPillBar = SearchPillBar;
window.SearchHero = SearchHero;

// ════════════════════════════════════════════════════════════
// SRCH-02 — two filter patterns
// ════════════════════════════════════════════════════════════
function ResultsSticky() {
  return /*#__PURE__*/React.createElement(PhoneScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 12px 8px'
    }
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 24,
    style: {
      color: T.sunset
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.h3
    }
  }, "Dog Walking"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption
    }
  }, "May 15\u201317 \xB7 Bernal Heights")), /*#__PURE__*/React.createElement(MapIcon, {
    size: 22,
    style: {
      color: T.sunset
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '8px 12px',
      background: T.elevated,
      borderTop: `0.5px solid ${T.border}`,
      borderBottom: `0.5px solid ${T.border}`
    }
  }, ['Price', 'Rating 4.5+', 'Verified'].map((f, i) => /*#__PURE__*/React.createElement(Pill, {
    key: i,
    active: i === 1,
    style: {
      height: 32,
      fontSize: 12.5,
      padding: '0 12px'
    }
  }, f)), /*#__PURE__*/React.createElement(Pill, {
    style: {
      height: 32,
      fontSize: 12.5,
      padding: '0 12px',
      marginLeft: 'auto'
    }
  }, "Sort \u25BE")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SITTERS.map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s
  })))));
}
function ResultsSheet() {
  return /*#__PURE__*/React.createElement(PhoneScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 12px 10px'
    }
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 24,
    style: {
      color: T.sunset
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.h3
    }
  }, "Dog Walking"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption
    }
  }, "4 sitters \xB7 Bernal Heights")), /*#__PURE__*/React.createElement(MapIcon, {
    size: 22,
    style: {
      color: T.sunset
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 90px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, SITTERS.map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      background: T.elevated,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      boxShadow: '0 -6px 24px rgba(31,27,23,0.16)',
      padding: '10px 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 5,
      borderRadius: 3,
      background: T.border,
      margin: '0 auto 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3
    }
  }, "Filters"), /*#__PURE__*/React.createElement(X, {
    size: 20,
    style: {
      color: T.textTertiary
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 78
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      padding: '0 18px',
      borderRadius: 22,
      background: T.sunset,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: '0 4px 14px rgba(234,88,12,0.4)',
      fontFamily: T.font,
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Sliders, {
    size: 18
  }), " Filters \xB7 1"))));
}
window.ResultsSticky = ResultsSticky;
window.ResultsSheet = ResultsSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/explorations.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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

const Svg = ({
  size = 24,
  sw = 2,
  fill = 'none',
  children,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    display: 'block',
    ...style
  }
}, children);
// helper to tag a component with its SF Symbol name (handy for dev handoff)
const sf = (Comp, name) => {
  Comp.sfSymbol = name;
  return Comp;
};

// ════════════════════════════════════════════════════════════════════════
// SECTION A — SF SYMBOLS (web stand-ins). Use the named symbol in SwiftUI.
// ════════════════════════════════════════════════════════════════════════

// ── Nav chrome ──────────────────────────────────────────────
const ChevronLeft = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M15 5l-7 7 7 7"
})), 'chevron.left');
const ChevronRight = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M9 5l7 7-7 7"
})), 'chevron.right');
const ChevronDown = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 9l7 7 7-7"
})), 'chevron.down');
const X = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M6 6l12 12M18 6L6 18"
})), 'xmark');
const Ellipsis = sf(p => /*#__PURE__*/React.createElement(Svg, _extends({}, p, {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "5",
  cy: "12",
  r: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "19",
  cy: "12",
  r: "2"
})), 'ellipsis');
const Menu = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 7h16M4 12h16M4 17h16"
})), 'line.3.horizontal');
const Share = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 15V4M8 8l4-4 4 4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"
})), 'square.and.arrow.up');

// ── Standard actions ────────────────────────────────────────
const Plus = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14M5 12h14"
})), 'plus');
const Pencil = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 7l3 3"
})), 'pencil');
const Trash = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"
})), 'trash');
const Sliders = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 7h10M18 7h2M4 17h2M10 17h10"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "7",
  r: "2.2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "17",
  r: "2.2"
})), 'slider.horizontal.3');
const SortArrows = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M8 4v16M8 20l-3-3M8 4l3 3M16 20V4M16 4l-3 3M16 20l3-3"
})), 'arrow.up.arrow.down');
const Gear = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3.2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1L5.3 5.3"
})), 'gearshape');
const Search = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 21l-4.3-4.3"
})), 'magnifyingglass');
const MapIcon = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 4v13M15 6.5v13"
})), 'map');
const ListIcon = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
})), 'list.bullet');
const Eye = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
})), 'eye');
const EyeOff = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.4 4.1M6.1 6.1A16 16 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 2.6-.4"
})), 'eye.slash');
const Camera = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12.5",
  r: "3.4"
})), 'camera.fill');

// ── Tab bar & common UI glyphs ──────────────────────────────
const Calendar = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "5",
  width: "18",
  height: "16",
  rx: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 9h18M8 3v4M16 3v4"
})), 'calendar');
const Message = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.8L3 21l1.9-4.1A8.4 8.4 0 0 1 3 11.5C3 6.8 7 3.5 12 3.5s9 3.3 9 8Z"
})), 'message.fill');
const User = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"
})), 'person.crop.circle');
const Bell = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13.7 21a2 2 0 0 1-3.4 0"
})), 'bell.fill');
const Phone = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L19 14l2 5v3a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1Z"
})), 'phone.fill');
const Send = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 3 10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3Z"
})), 'paperplane.fill');
const Clock = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 7v5l3.5 2"
})), 'clock');
const LocationFill = sf(p => /*#__PURE__*/React.createElement(Svg, _extends({}, p, {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2 4 11.5l8 3.2 8-3.2L12 2Zm0 5.5 4.2 5.1L12 11l-4.2 1.6L12 7.5Z",
  opacity: "0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2 3.5 12 12 9l8.5 3L12 2Z"
})), 'location.fill');
const MapPin = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 21c5-5.3 7-8.5 7-11a7 7 0 1 0-14 0c0 2.5 2 5.7 7 11Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "2.6"
})), 'mappin.and.ellipse');

// ── Filled status / trust indicators ────────────────────────
const StarFill = sf(({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"
})), 'star.fill');
const Star = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"
})), 'star');
const Heart = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 4.8 5.2 4.2 7.4 3.8 9.4 5 12 7.7c2.6-2.7 4.6-3.9 6.8-3.5 3.5.6 4.9 4.2 3.2 7.5C19.5 16.4 12 21 12 21Z"
})), 'heart');
const HeartFill = sf(({
  size = 24,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 4.8 5.2 4.2 7.4 3.8 9.4 5 12 7.7c2.6-2.7 4.6-3.9 6.8-3.5 3.5.6 4.9 4.2 3.2 7.5C19.5 16.4 12 21 12 21Z"
})), 'heart.fill');
const Check = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 12.5l4.5 4.5L19 6.5"
})), 'checkmark');
const CheckCircleFill = sf(({
  size = 22,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7.5 12.3l3 3 6-6.3",
  stroke: "#fff",
  strokeWidth: "2.2",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), 'checkmark.circle.fill');
const CheckSealFill = sf(({
  size = 18,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 1.6l2.6 1.9 3.2-.2 1 3.1 2.6 1.9-1 3 1 3-2.6 1.9-1 3.1-3.2-.2L12 22.4l-2.6-1.9-3.2.2-1-3.1L2.6 15.7l1-3-1-3 2.6-1.9 1-3.1 3.2.2L12 1.6Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.5 12l2.3 2.3 4.7-4.8",
  stroke: "#fff",
  strokeWidth: "2",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), 'checkmark.seal.fill');
// Alert/feedback (PawAlert): warning + error
const WarningFill = sf(({
  size = 22,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M10.3 3.2 1.6 18.4A2 2 0 0 0 3.3 21.4h17.4a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 9v5M12 17.2h.01",
  stroke: "#fff",
  strokeWidth: "2",
  fill: "none",
  strokeLinecap: "round"
})), 'exclamationmark.triangle.fill');
const ErrorFill = sf(({
  size = 22,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 7v6M12 16.2h.01",
  stroke: "#fff",
  strokeWidth: "2",
  fill: "none",
  strokeLinecap: "round"
})), 'exclamationmark.circle.fill');

// ── Live Activity care icons → SF Symbols (Lock-Screen legible) ──
const Pills = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4.5 12.5 12 5a3.5 3.5 0 0 1 5 5l-7.5 7.5a3.5 3.5 0 0 1-5-5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.2 8.2l5.6 5.6"
})), 'pills.fill');
const Bowl = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 11h18a9 9 0 0 1-18 0Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 11c0-3 2-5 5-5s5 2 5 5"
})), 'fork.knife');
const FigureWalk = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "13",
  cy: "4.5",
  r: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 8l-3 4 1 4M10 12l-2.5 2M14 11l3 2-1.5 4M11 16l-2 5M16 17l1 4"
})), 'figure.walk');
const TennisBall = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 5c3.5 2 3.5 12 0 14M19 5c-3.5 2-3.5 12 0 14"
})), 'tennisball.fill');
const Tree = sf(p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 3c3 0 5 2.2 5 4.6 0 .8-.2 1.5-.6 2.1C17.8 10.4 19 12 19 13.8c0 2.4-2 4.2-4.6 4.2H9.6C7 18 5 16.2 5 13.8c0-1.8 1.2-3.4 2.6-4.1-.4-.6-.6-1.3-.6-2.1C7 5.2 9 3 12 3Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 18v3"
})), 'tree.fill');

// ── Brand paw mark → `pawprint.fill` (an SF Symbol, used inside the logo) ──
const PawFill = sf(({
  size = 24,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("ellipse", {
  cx: "6",
  cy: "11",
  rx: "2.1",
  ry: "2.7"
}), /*#__PURE__*/React.createElement("ellipse", {
  cx: "11",
  cy: "8.2",
  rx: "2.2",
  ry: "2.9"
}), /*#__PURE__*/React.createElement("ellipse", {
  cx: "16.4",
  cy: "9.4",
  rx: "2.1",
  ry: "2.7"
}), /*#__PURE__*/React.createElement("ellipse", {
  cx: "19",
  cy: "14",
  rx: "1.8",
  ry: "2.3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11.6 13.2c2.6 0 4.7 1.7 5.2 3.9.4 1.8-1 3.2-2.7 3-1-.1-1.7-.5-2.5-.5s-1.5.4-2.5.5c-1.7.2-3.1-1.2-2.7-3 .5-2.2 2.6-3.9 5.2-3.9Z"
})), 'pawprint.fill');

// Apple wordmark for Sign in with Apple (system-provided button)
const AppleLogo = sf(({
  size = 18,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  style: {
    display: 'block',
    ...style
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8ZM14.3 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z"
})), 'apple.logo');

// ════════════════════════════════════════════════════════════════════════
// SECTION B — CUSTOM ARTWORK (the ONLY hand-drawn glyphs in the icon layer)
// The five service-type icons. Exact Claude-SVG specs from the Asset Library
// (ASSET-030..034): single color via currentColor, stroke 2, round caps,
// friendly geometric. These have no SF Symbol — the custom glyph adds meaning.
// ════════════════════════════════════════════════════════════════════════

// ASSET-030 Walking — person walking a leashed dog (clear, not abstract)
const ServiceWalking = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "6",
  cy: "4",
  r: "1.7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 5.7V11"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 11l-1.6 5M6 11l1.5 5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 7.8l2.6 1.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.6 9.2c2 1.2 2.6 2.8 4.4 2.8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 16v-2.2a1.4 1.4 0 0 1 1.4-1.4h3.4l1.2-1.5V16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 16v1.6M17.6 16v1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 13.6l-1.1-.9"
}));
const ServiceDropin = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 21h14"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13.5",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "10",
  cy: "11.5",
  r: ".7"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "14",
  cy: "11.5",
  r: ".7"
}));
const ServiceSitting = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 11l8-6 8 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 10v10h12V10"
}), /*#__PURE__*/React.createElement("rect", {
  x: "10",
  y: "13",
  width: "4",
  height: "4",
  rx: "1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18.5 4.5a2 2 0 1 0 1.8 3 2.6 2.6 0 0 1-1.8-3Z"
}));
const ServiceBoarding = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 11l8-6 8 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 10v10h12V10"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 17h8a0 0 0 0 1 0 0v0a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "7.5",
  r: ".9"
}));
// ASSET-034 Daycare — play: a pet paw + ball (group play, daytime energy)
const ServiceDaycare = p => /*#__PURE__*/React.createElement(Svg, p, /*#__PURE__*/React.createElement("circle", {
  cx: "17.6",
  cy: "6.6",
  r: "2.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.3 5c.8 1.3.8 2.4 0 3.7"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "5.4",
  cy: "12.2",
  r: "1.1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "8.8",
  cy: "10.5",
  r: "1.2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12.3",
  cy: "12.2",
  r: "1.1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.85 13.4c2.1 0 3.8 1.5 3.8 3.3 0 1.4-1.2 2.2-2.4 1.9-.6-.15-1-.35-1.4-.35s-.8.2-1.4.35c-1.2.3-2.4-.5-2.4-1.9 0-1.8 1.7-3.3 3.8-3.3Z"
}));
Object.assign(window, {
  // SF Symbols (web stand-ins)
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Ellipsis,
  Menu,
  Share,
  Plus,
  Pencil,
  Trash,
  Sliders,
  SortArrows,
  Gear,
  Search,
  MapIcon,
  ListIcon,
  Eye,
  EyeOff,
  Camera,
  Calendar,
  Message,
  User,
  Bell,
  Phone,
  Send,
  Clock,
  LocationFill,
  MapPin,
  StarFill,
  Star,
  Heart,
  HeartFill,
  Check,
  CheckCircleFill,
  CheckSealFill,
  WarningFill,
  ErrorFill,
  Pills,
  Bowl,
  FigureWalk,
  TennisBall,
  Tree,
  PawFill,
  AppleLogo,
  // Custom service-type icons
  ServiceWalking,
  ServiceDropin,
  ServiceSitting,
  ServiceBoarding,
  ServiceDaycare
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/ios-frame.jsx
try { (() => {
/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/primitives.jsx
try { (() => {
// primitives.jsx — PawConnect design-system components (web recreation)
// Values lifted from AppColors.swift, PawButton/PawCard/PawTextField.swift,
// Constants.swift, and PRODUCT_SPEC § Design System Reference.
const {
  ChevronLeft,
  StarFill
} = window;
const T = {
  sunset: 'var(--sunset)',
  terracotta: 'var(--terracotta)',
  sage: 'var(--sage)',
  amber: 'var(--amber)',
  peach: 'var(--peach)',
  n50: 'var(--neutral-50)',
  n100: 'var(--neutral-100)',
  n200: 'var(--neutral-200)',
  n300: 'var(--neutral-300)',
  n400: 'var(--neutral-400)',
  n500: 'var(--neutral-500)',
  n600: 'var(--neutral-600)',
  n700: 'var(--neutral-700)',
  n800: 'var(--neutral-800)',
  n900: 'var(--neutral-900)',
  bg: 'var(--bg-primary)',
  elevated: 'var(--bg-elevated)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textTertiary: 'var(--text-tertiary)',
  border: 'var(--border)',
  glassBg: 'var(--glass-bg)',
  glassBorder: 'var(--glass-border)',
  font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  rSm: 8,
  rMd: 12,
  rLg: 16,
  rFull: 9999,
  shadowCard: 'var(--shadow-card)',
  shadowFloat: 'var(--shadow-float)',
  shadowModal: '0 -2px 24px rgba(31,27,23,0.12)'
};
window.T = T;

// type helpers
const tx = {
  display: {
    fontSize: 34,
    fontWeight: 700,
    lineHeight: '41px',
    letterSpacing: '-0.5px',
    color: T.textPrimary
  },
  h1: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '30px',
    letterSpacing: '-0.2px',
    color: T.textPrimary
  },
  h2: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '26px',
    color: T.textPrimary
  },
  h3: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: '22px',
    color: T.textPrimary
  },
  bodyLg: {
    fontSize: 17,
    fontWeight: 400,
    lineHeight: '24px',
    color: T.textSecondary
  },
  body: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '21px',
    color: T.textSecondary
  },
  bodySm: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    color: T.textSecondary
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.1px',
    color: T.textTertiary
  }
};
window.tx = tx;

// ── Buttons ─────────────────────────────────────────────────
// PrimaryButtonStyle: 56pt, r12, solid sunset (0.6 when disabled), scale 0.98 press
function PawButton({
  children,
  variant = 'primary',
  disabled,
  onClick,
  full = true,
  icon,
  style
}) {
  const [pressed, setPressed] = React.useState(false);
  const base = {
    height: 56,
    borderRadius: T.rMd,
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    width: full ? '100%' : 'auto',
    padding: full ? 0 : '0 24px',
    font: T.font,
    fontSize: 17,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
    transition: 'transform .1s ease, background .15s ease, color .15s ease',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: disabled ? 'rgba(234,88,12,0.6)' : T.sunset,
      color: '#fff'
    },
    secondary: {
      background: 'transparent',
      color: T.sunset,
      boxShadow: `inset 0 0 0 1.5px ${T.sunset}`
    },
    destructive: {
      background: 'transparent',
      color: T.terracotta,
      boxShadow: `inset 0 0 0 1.5px ${T.terracotta}`
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, icon, children);
}

// TextButtonStyle: sunset, terracotta on press
function TextButton({
  children,
  onClick,
  style
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      font: T.font,
      fontSize: 15,
      fontWeight: 500,
      color: p ? T.terracotta : T.sunset,
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, children);
}

// ── Card: white, r12, padding 16, soft warm shadow ──────────
function PawCard({
  children,
  style,
  onClick,
  pad = 16
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: T.elevated,
      borderRadius: T.rMd,
      padding: pad,
      boxShadow: T.shadowCard,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, children);
}

// ── Text field: native iOS rounded-border feel, sunset tint ─
function PawTextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  secure,
  error,
  trailing
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      fontWeight: 500,
      color: T.textSecondary
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: T.elevated,
      borderRadius: T.rSm,
      boxShadow: `inset 0 0 0 1px ${focus ? T.sunset : T.border}`,
      transition: 'box-shadow .15s'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    type: secure ? 'password' : type,
    placeholder: placeholder,
    style: {
      flex: 1,
      height: 48,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 16px',
      font: T.font,
      fontSize: 16,
      color: T.textPrimary,
      borderRadius: T.rSm
    }
  }), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingRight: 14,
      color: T.textTertiary,
      display: 'flex'
    }
  }, trailing)), error && /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption,
      color: T.terracotta
    }
  }, error));
}

// ── Avatar (round, optional ring) ───────────────────────────
function Avatar({
  src,
  size = 60,
  ring,
  fallback
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: T.rFull,
      flexShrink: 0,
      overflow: 'hidden',
      background: T.n200,
      position: 'relative',
      boxShadow: ring ? `0 0 0 3px ${T.sunset}` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.sunset
    }
  }, fallback));
}

// ── Star rating row ─────────────────────────────────────────
function StarRating({
  rating,
  count,
  size = 16,
  showNumber = true
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(StarFill, {
    size: size,
    style: {
      color: T.amber
    }
  }), showNumber && /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.body,
      color: T.textPrimary,
      fontWeight: 600
    }
  }, rating), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.body,
      color: T.textSecondary
    }
  }, "(", count, ")"));
}

// ── Pill / chip ─────────────────────────────────────────────
function Pill({
  children,
  active,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 38,
      padding: '0 16px',
      borderRadius: T.rFull,
      border: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      font: T.font,
      fontSize: 14,
      fontWeight: 500,
      background: active ? T.sunset : T.elevated,
      color: active ? '#fff' : T.textSecondary,
      boxShadow: active ? 'none' : `inset 0 0 0 1px ${T.border}`,
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, children);
}

// ── Section header ──────────────────────────────────────────
function SectionTitle({
  children,
  action,
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: 0
    }
  }, children), action && /*#__PURE__*/React.createElement(TextButton, {
    onClick: onAction
  }, action));
}

// ── Divider ─────────────────────────────────────────────────
const Divider = ({
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    height: 1,
    background: T.border,
    ...style
  }
});

// ── "or" divider ────────────────────────────────────────────
function OrDivider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: T.border
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "or"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: T.border
    }
  }));
}

// ── Progress dots (onboarding) ──────────────────────────────
function ProgressSegments({
  total,
  active
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, Array.from({
    length: total
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 4,
      borderRadius: T.rFull,
      background: i < active ? T.sunset : T.border
    }
  })));
}

// ── Top safe-area spacer (clears status bar + island) ───────
const SafeTop = ({
  h = 56
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    height: h,
    flexShrink: 0
  }
});

// ── In-screen nav bar (back chevron + title + trailing) ─────
function NavBar({
  onBack,
  title,
  trailing,
  transparent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 8px 4px 4px',
      minHeight: 44,
      background: transparent ? 'transparent' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      display: 'flex',
      justifyContent: 'center'
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: T.sunset,
      WebkitTapHighlightColor: 'transparent'
    }
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 26,
    sw: 2.4
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      display: 'flex',
      justifyContent: 'center',
      color: T.sunset
    }
  }, trailing));
}
Object.assign(window, {
  PawButton,
  TextButton,
  PawCard,
  PawTextField,
  Avatar,
  StarRating,
  Pill,
  SectionTitle,
  Divider,
  OrDivider,
  ProgressSegments,
  SafeTop,
  NavBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/screens-a.jsx
try { (() => {
// screens-a.jsx — Welcome, Sign In, Search Home, Search Results
const {
  T,
  tx,
  PawButton,
  TextButton,
  PawCard,
  PawTextField,
  Pill,
  OrDivider,
  SafeTop,
  NavBar,
  Avatar,
  SitterCard,
  SitterAvatar,
  ASSET,
  SERVICES,
  SITTERS,
  PawFill,
  AppleLogo,
  Eye,
  EyeOff,
  Search,
  LocationFill,
  Calendar,
  ChevronDown,
  Check
} = window;

// Scrollable screen body with cream background
function Screen({
  children,
  pad = 16,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: T.bg,
      display: 'flex',
      flexDirection: 'column',
      WebkitOverflowScrolling: 'touch',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `0 ${pad}px`,
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  }, children));
}
window.Screen = Screen;

// Brand logo lockup
function LogoLockup({
  tagline
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: T.sunset,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(234,88,12,0.3)'
    }
  }, /*#__PURE__*/React.createElement(PawFill, {
    size: 26
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.display,
      fontSize: 30
    }
  }, "PawConnect"), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg
    }
  }, "Peace of mind, one paw at a time"));
}
window.LogoLockup = LogoLockup;

// ── AUTH-01 Welcome ─────────────────────────────────────────
function WelcomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(SafeTop, {
    h: 64
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(LogoLockup, {
    tagline: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      height: 220,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(150deg, rgba(234,88,12,0.10), rgba(251,146,60,0.12))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET.shibaSoft,
    alt: "",
    style: {
      width: 200,
      height: 200,
      objectFit: 'contain',
      filter: 'drop-shadow(0 8px 16px rgba(180,83,9,0.18))'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    onClick: () => go('signin')
  }, "Get Started"), /*#__PURE__*/React.createElement(PawButton, {
    variant: "secondary",
    onClick: () => go('signin')
  }, "I already have an account")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 6,
      padding: '16px 0 28px'
    }
  }, /*#__PURE__*/React.createElement(TextButton, {
    style: {
      fontSize: 12
    }
  }, "Terms"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "\xB7"), /*#__PURE__*/React.createElement(TextButton, {
    style: {
      fontSize: 12
    }
  }, "Privacy")));
}
window.WelcomeScreen = WelcomeScreen;

// ── AUTH-03 Sign In ─────────────────────────────────────────
function SignInScreen({
  go
}) {
  const [email, setEmail] = React.useState('maya@neighbor.co');
  const [pw, setPw] = React.useState('paws1234');
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 50
  }), /*#__PURE__*/React.createElement(NavBar, {
    onBack: () => go('welcome')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      margin: 0
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg
    }
  }, "Sign in to continue caring for your pets")), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 28,
      width: '100%',
      height: 56,
      borderRadius: 12,
      border: 'none',
      background: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: 'pointer',
      font: T.font,
      fontSize: 17,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(AppleLogo, {
    size: 19
  }), " Sign in with Apple"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '24px 0'
    }
  }, /*#__PURE__*/React.createElement(OrDivider, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PawTextField, {
    label: "Email",
    value: email,
    onChange: setEmail,
    placeholder: "you@example.com"
  }), /*#__PURE__*/React.createElement(PawTextField, {
    label: "Password",
    value: pw,
    onChange: setPw,
    placeholder: "Password",
    secure: !show,
    trailing: /*#__PURE__*/React.createElement("button", {
      onClick: () => setShow(!show),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: T.textTertiary,
        display: 'flex'
      }
    }, show ? /*#__PURE__*/React.createElement(EyeOff, {
      size: 20
    }) : /*#__PURE__*/React.createElement(Eye, {
      size: 20
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(TextButton, null, "Forgot password?")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    onClick: () => go('home')
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 5,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.body
    }
  }, "Don\u2019t have an account?"), /*#__PURE__*/React.createElement(TextButton, {
    style: {
      fontWeight: 600
    }
  }, "Sign Up"))));
}
window.SignInScreen = SignInScreen;

// Tappable input-style row (location / date)
function TapRow({
  icon,
  text,
  placeholder,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 56,
      padding: '0 16px',
      background: T.elevated,
      borderRadius: 12,
      boxShadow: T.shadowCard,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.sunset,
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: value ? T.textPrimary : T.textTertiary,
      flex: 1
    }
  }, value || placeholder), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 18,
    style: {
      color: T.textTertiary
    }
  }));
}

// ── SRCH-01 Search Home ─────────────────────────────────────
function SearchHomeScreen({
  go
}) {
  const [pets, setPets] = React.useState(['dog']);
  const [service, setService] = React.useState('walking');
  const togglePet = p => setPets(s => s.includes(p) ? s.filter(x => x !== p) : [...s, p]);
  const recents = SITTERS.slice(0, 4);
  return /*#__PURE__*/React.createElement(Screen, {
    pad: 0
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 58
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      margin: '0 0 20px'
    }
  }, "Find a Sitter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TapRow, {
    icon: /*#__PURE__*/React.createElement(LocationFill, {
      size: 20
    }),
    value: "Bernal Heights, SF"
  }), /*#__PURE__*/React.createElement(TapRow, {
    icon: /*#__PURE__*/React.createElement(Calendar, {
      size: 20
    }),
    placeholder: "Select dates",
    value: "May 15 \u2013 17"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      fontWeight: 500,
      color: T.textSecondary
    }
  }, "Pet type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 8
    }
  }, [['dog', '🐕 Dogs'], ['cat', '🐈 Cats'], ['other', '🐾 Other']].map(([id, label]) => /*#__PURE__*/React.createElement(Pill, {
    key: id,
    active: pets.includes(id),
    onClick: () => togglePet(id),
    style: {
      flex: 1,
      justifyContent: 'center'
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      fontWeight: 500,
      color: T.textSecondary
    }
  }, "Service type"), /*#__PURE__*/React.createElement(PawCard, {
    pad: 4,
    style: {
      marginTop: 8
    }
  }, Object.entries(SERVICES).map(([id, s], i, arr) => /*#__PURE__*/React.createElement("div", {
    key: id,
    onClick: () => setService(id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 12px',
      cursor: 'pointer',
      borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: service === id ? T.sunset : T.textSecondary,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(s.Icon, {
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      flex: 1
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      boxShadow: service === id ? 'none' : `inset 0 0 0 2px ${T.border}`,
      background: service === id ? T.sunset : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, service === id && /*#__PURE__*/React.createElement(Check, {
    size: 14,
    style: {
      color: '#fff'
    },
    sw: 3
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    icon: /*#__PURE__*/React.createElement(Search, {
      size: 20,
      sw: 2.4
    }),
    onClick: () => go('results')
  }, "Search"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      padding: '0 0 0 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...tx.h3,
      margin: '0 0 14px'
    }
  }, "Recent sitters"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      overflowX: 'auto',
      paddingBottom: 8,
      paddingRight: 16
    }
  }, recents.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    onClick: () => go('profile', s),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      width: 64,
      flexShrink: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: s.initials,
    size: 60
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption,
      color: T.textPrimary,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 64
    }
  }, s.name.split(' ')[0]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: '0 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...tx.h3,
      margin: '0 0 2px'
    }
  }, "Recommended for Biscuit"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "Based on your preferences"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 14
    }
  }, SITTERS.slice(0, 2).map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s,
    onClick: () => go('profile', s)
  })))));
}
window.SearchHomeScreen = SearchHomeScreen;

// ── SRCH-02 Search Results ──────────────────────────────────
function SearchResultsScreen({
  go
}) {
  const [sort, setSort] = React.useState('Distance');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 50
  }), /*#__PURE__*/React.createElement(NavBar, {
    onBack: () => go('home'),
    title: "Dog Walking",
    trailing: /*#__PURE__*/React.createElement("button", {
      onClick: () => go('map'),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: T.sunset,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(MapIcon, {
      size: 24
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: -4,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "May 15\u201317 \xB7 Bernal Heights")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderTop: `0.5px solid ${T.border}`,
      borderBottom: `0.5px solid ${T.border}`,
      background: T.elevated
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: T.textPrimary,
      font: T.font,
      fontSize: 15,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Sliders, {
    size: 18,
    style: {
      color: T.sunset
    }
  }), " Filters"), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: T.textPrimary,
      font: T.font,
      fontSize: 15,
      fontWeight: 500
    }
  }, "Sort: ", sort, " ", /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16,
    style: {
      color: T.textTertiary
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '14px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm
    }
  }, SITTERS.length, " sitters available"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 12
    }
  }, SITTERS.map(s => /*#__PURE__*/React.createElement(SitterCard, {
    key: s.id,
    sitter: s,
    onClick: () => go('profile', s)
  })))));
}
window.SearchResultsScreen = SearchResultsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/screens-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/screens-b.jsx
try { (() => {
// screens-b.jsx — Sitter Profile, Live Detail, Lock Screen Activity, Map
const {
  T,
  tx,
  PawButton,
  TextButton,
  PawCard,
  SafeTop,
  NavBar,
  SitterCard,
  SitterAvatar,
  SERVICES,
  SITTERS,
  SESSION,
  ASSET,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Heart,
  HeartFill,
  CheckSealFill,
  CheckCircleFill,
  StarFill,
  Check,
  User,
  Message,
  Bell,
  MapIcon,
  ListIcon,
  FigureWalk,
  PawFill
} = window;

// Floating glass pill button (over hero imagery)
function GlassButton({
  children,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,251,245,0.75)',
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      color: T.sunset,
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, children);
}

// ── PROF-02 Sitter Profile ──────────────────────────────────
function SitterProfileScreen({
  sitter,
  go
}) {
  const s = sitter || SITTERS[0];
  const [fav, setFav] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const cheapest = Math.min(...s.services.map(x => x[1]));
  const bioShort = s.bio.length > 150 && !expanded ? s.bio.slice(0, 150) + '…' : s.bio;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: T.bg,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(150deg, #EA580C, #DC2626)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(255,255,255,0.85)'
    }
  }, /*#__PURE__*/React.createElement(User, {
    size: 120,
    sw: 1.5
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 120,
      background: `linear-gradient(to bottom, rgba(255,251,245,0), ${T.bg})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 54,
      left: 12,
      right: 12,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(GlassButton, {
    onClick: () => go('results')
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 24
  })), /*#__PURE__*/React.createElement(GlassButton, {
    onClick: () => setFav(!fav)
  }, fav ? /*#__PURE__*/React.createElement(HeartFill, {
    size: 22,
    style: {
      color: T.terracotta
    }
  }) : /*#__PURE__*/React.createElement(Heart, {
    size: 22
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      marginTop: -8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      fontSize: 30,
      margin: 0
    }
  }, s.name), s.verified && /*#__PURE__*/React.createElement(CheckSealFill, {
    size: 22,
    style: {
      color: T.sage
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StarFill, {
    size: 15,
    style: {
      color: T.amber
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      fontWeight: 600
    }
  }, s.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      whiteSpace: 'nowrap'
    }
  }, "(", s.reviews, " reviews) \xB7 ", s.distance, " mi")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, s.services.map(([id, price]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      flexShrink: 0,
      background: T.elevated,
      borderRadius: 12,
      padding: '10px 16px',
      boxShadow: T.shadowCard,
      display: 'flex',
      alignItems: 'baseline',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3,
      color: T.textPrimary
    }
  }, "$", price), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "/", SERVICES[id].unit)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "About"), /*#__PURE__*/React.createElement(PawCard, null, /*#__PURE__*/React.createElement("p", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      margin: 0
    }
  }, bioShort, ' ', s.bio.length > 150 && /*#__PURE__*/React.createElement(TextButton, {
    onClick: () => setExpanded(!expanded),
    style: {
      display: 'inline'
    }
  }, expanded ? 'See less' : 'See more'))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "Services"), /*#__PURE__*/React.createElement(PawCard, {
    pad: 4
  }, s.services.map(([id, price], i) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 12px',
      borderBottom: i < s.services.length - 1 ? `1px solid ${T.border}` : 'none'
    }
  }, /*#__PURE__*/React.createElement(CheckCircleFill, {
    size: 22,
    style: {
      color: T.sage
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      flex: 1
    }
  }, SERVICES[id].label), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg
    }
  }, "$", price, "/", SERVICES[id].unit)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "Availability"), /*#__PURE__*/React.createElement(PawCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, days.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: s.avail[i] ? T.sage : 'transparent',
      boxShadow: s.avail[i] ? 'none' : `inset 0 0 0 1.5px ${T.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, s.avail[i] === 1 && /*#__PURE__*/React.createElement(Check, {
    size: 15,
    style: {
      color: '#fff'
    },
    sw: 3
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm,
      marginTop: 14
    }
  }, "Usually responds ", s.responds)), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "Reviews"), /*#__PURE__*/React.createElement(PawCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      marginBottom: 8
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement(StarFill, {
    key: i,
    size: 15,
    style: {
      color: i < s.review.stars ? T.amber : T.border
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      margin: '0 0 8px'
    }
  }, "\u201C", s.review.text, "\u201D"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "\u2014 ", s.review.author, " \xB7 ", s.review.date), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(TextButton, null, "See all ", s.reviews, " reviews"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: '12px 16px 28px',
      background: T.elevated,
      boxShadow: T.shadowModal,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Message, {
      size: 19
    })
  }, "Contact ", s.name.split(' ')[0]), /*#__PURE__*/React.createElement(PawButton, {
    onClick: () => go('book')
  }, "Book Now \xB7 From $", cheapest)));
}
window.SitterProfileScreen = SitterProfileScreen;

// ── LIVE-09 Live Detail (Owner) ─────────────────────────────
function LiveDetailScreen({
  go
}) {
  const x = SESSION;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 50
  }), /*#__PURE__*/React.createElement(NavBar, {
    onBack: () => go('home'),
    title: "Care in progress",
    trailing: /*#__PURE__*/React.createElement("button", {
      onClick: () => go('lock'),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: T.sunset,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Bell, {
      size: 22
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(150deg, #EA580C, #DC2626)',
      padding: 20,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 32,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 0 0 3px rgba(255,255,255,0.5)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: x.petAvatar,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: '#fff',
      boxShadow: '0 0 0 3px rgba(255,255,255,0.35)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: T.font,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.4px',
      opacity: 0.9,
      whiteSpace: 'nowrap'
    }
  }, "WALKING NOW")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 20,
      fontWeight: 700,
      marginTop: 5,
      lineHeight: '24px'
    }
  }, x.pet, " is on a walk"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 14,
      opacity: 0.9,
      marginTop: 2
    }
  }, "with ", x.sitter, " \xB7 ", x.elapsed, " min in"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      height: 6,
      borderRadius: 3,
      background: 'rgba(255,255,255,0.25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${x.elapsed / x.total * 100}%`,
      height: '100%',
      borderRadius: 3,
      background: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      font: T.font,
      fontSize: 12,
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement("span", null, "0.6 mi walked"), /*#__PURE__*/React.createElement("span", null, "~", x.total - x.elapsed, " min left"))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "Today\u2019s care"), /*#__PURE__*/React.createElement(PawCard, {
    pad: 4
  }, x.tasks.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 12px',
      borderBottom: i < x.tasks.length - 1 ? `1px solid ${T.border}` : 'none',
      background: t.active ? 'rgba(234,88,12,0.05)' : 'transparent',
      borderRadius: t.active ? 10 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: t.done ? 'rgba(5,150,105,0.12)' : t.active ? 'rgba(234,88,12,0.12)' : T.n100,
      color: t.done ? T.sage : t.active ? T.sunset : T.textTertiary
    }
  }, /*#__PURE__*/React.createElement(t.Icon, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      fontWeight: 500,
      textDecoration: t.done ? 'none' : 'none'
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm,
      color: t.active ? T.sunset : T.textSecondary
    }
  }, t.detail)), t.done ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(CheckCircleFill, {
    size: 22,
    style: {
      color: T.sage
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption,
      fontSize: 11
    }
  }, t.time)) : t.active ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption,
      color: T.sunset,
      fontWeight: 600
    }
  }, "now") : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      boxShadow: `inset 0 0 0 1.5px ${T.border}`
    }
  })))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '24px 0 12px'
    }
  }, "Photos from Maya"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, [ASSET.shibaSketch, ASSET.shibaSoft, ASSET.shibaSketch].map((src, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 130,
      height: 130,
      borderRadius: 16,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: T.shadowCard,
      background: T.n100
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Message, {
      size: 19
    })
  }, "Message Maya"))));
}
window.LiveDetailScreen = LiveDetailScreen;

// ── LIVE-08 Lock Screen Live Activity (the differentiator) ──
function LockScreenScreen({
  go
}) {
  const x = SESSION;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(165deg, #2A1A12 0%, #5D2E14 45%, #8B3A14 100%)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '12%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 420,
      height: 420,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(251,146,60,0.35), transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement(SafeTop, {
    h: 56
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: '#fff',
      marginTop: 12,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 17,
      fontWeight: 500,
      opacity: 0.9
    }
  }, "Friday, May 15"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 80,
      fontWeight: 600,
      lineHeight: '88px',
      letterSpacing: '-1px'
    }
  }, "2:14")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      marginBottom: 40,
      padding: '0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      padding: 16,
      position: 'relative',
      background: 'rgba(28,22,17,0.55)',
      backdropFilter: 'blur(24px) saturate(160%)',
      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      border: '0.5px solid rgba(255,255,255,0.12)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      background: T.sunset,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(PawFill, {
    size: 16,
    style: {
      color: '#fff'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: T.font,
      fontSize: 14,
      fontWeight: 600,
      color: 'rgba(255,255,255,0.8)'
    }
  }, "PawConnect"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 4,
      background: '#FB923C',
      boxShadow: '0 0 8px #FB923C'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: T.font,
      fontSize: 12,
      fontWeight: 600,
      color: '#FB923C',
      letterSpacing: '0.4px'
    }
  }, "LIVE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 0 0 2px rgba(255,255,255,0.3)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: x.petAvatar,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 19,
      fontWeight: 700,
      color: '#fff'
    }
  }, x.pet, " is on a walk"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: T.font,
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      marginTop: 2
    }
  }, "Fed \u2713 \xB7 Meds \u2713 \xB7 ", x.elapsed, " min in")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(FigureWalk, {
    size: 26,
    style: {
      color: '#FB923C',
      marginLeft: 'auto'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      height: 5,
      borderRadius: 3,
      background: 'rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${x.elapsed / x.total * 100}%`,
      height: '100%',
      borderRadius: 3,
      background: 'linear-gradient(90deg, #FB923C, #FCD34D)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('live'),
    style: {
      background: 'rgba(255,255,255,0.16)',
      border: 'none',
      color: '#fff',
      font: T.font,
      fontSize: 14,
      fontWeight: 600,
      padding: '10px 20px',
      borderRadius: 9999,
      cursor: 'pointer',
      backdropFilter: 'blur(12px)'
    }
  }, "Tap to open full session \u2192"))));
}
window.LockScreenScreen = LockScreenScreen;

// ── Simple map view (SRCH-03) ───────────────────────────────
function MapScreen({
  go
}) {
  const pins = [[28, 38], [55, 30], [44, 58], [70, 66]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: '#F3EBDD'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    fill: "#F3EBDD"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 30 H100 M0 62 H100 M22 0 V100 M58 0 V100 M80 0 V100",
    stroke: "#E4D5BE",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 46 H100 M40 0 V100",
    stroke: "#EADCC6",
    strokeWidth: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "64",
    width: "34",
    height: "30",
    fill: "#CDE3C8",
    opacity: "0.7",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5 78 Q 30 70 60 86 T 110 80",
    stroke: "#BBD9E8",
    strokeWidth: "7",
    fill: "none",
    opacity: "0.7"
  })), /*#__PURE__*/React.createElement(SafeTop, {
    h: 50
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    onBack: () => go('results'),
    title: "Dog Walking",
    trailing: /*#__PURE__*/React.createElement("button", {
      onClick: () => go('results'),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: T.sunset,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(ListIcon, {
      size: 24
    }))
  })), pins.map(([x, y], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%,-50%)',
      background: i === 0 ? T.terracotta : T.sunset,
      color: '#fff',
      font: T.font,
      fontSize: 14,
      fontWeight: 700,
      padding: '7px 13px',
      borderRadius: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      border: '2px solid #fff',
      cursor: 'pointer',
      scale: i === 0 ? '1.12' : '1'
    },
    onClick: () => go('profile', SITTERS[i])
  }, "$", SITTERS[i].services[0][1])), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 28
    }
  }, /*#__PURE__*/React.createElement(SitterCard, {
    sitter: SITTERS[0],
    onClick: () => go('profile', SITTERS[0])
  })));
}
window.MapScreen = MapScreen;

// ── BOOK-01 Booking Request (no payment — a request the sitter accepts) ──
function BookingRequestScreen({
  sitter,
  go
}) {
  const s = sitter || SITTERS[0];
  const [note, setNote] = React.useState('');
  const rate = Math.min(...s.services.map(x => x[1]));
  const days = 3;
  const total = rate * days;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: T.bg
    }
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 50
  }), /*#__PURE__*/React.createElement(NavBar, {
    onBack: () => go('profile', s),
    title: "Request booking"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement(PawCard, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: s.initials,
    size: 52
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.h3
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm
    }
  }, "Dog Walking \xB7 30 min")), /*#__PURE__*/React.createElement(CheckSealFill, {
    size: 18,
    style: {
      color: T.sage
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '22px 0 12px'
    }
  }, "Who\u2019s it for?"), /*#__PURE__*/React.createElement(PawCard, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 24,
      overflow: 'hidden',
      background: T.n100
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET.shibaSketch,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.h3
    }
  }, "Biscuit"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm
    }
  }, "Shiba Inu \xB7 needs 2pm meds")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      background: T.sunset,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    style: {
      color: '#fff'
    },
    sw: 3
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '22px 0 12px'
    }
  }, "When"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 56,
      padding: '0 16px',
      background: T.elevated,
      borderRadius: 12,
      boxShadow: T.shadowCard
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 20,
    style: {
      color: T.sunset
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      flex: 1
    }
  }, "May 15 \u2013 17 \xB7 2:00 PM daily"), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18,
    style: {
      color: T.textTertiary
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '22px 0 12px'
    }
  }, "Anything Maya should know?"), /*#__PURE__*/React.createElement("textarea", {
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "e.g. Biscuit is shy at first but warms up fast \u2014 he loves the long block past the park.",
    style: {
      width: '100%',
      minHeight: 92,
      resize: 'none',
      border: 'none',
      outline: 'none',
      background: T.elevated,
      borderRadius: 12,
      boxShadow: `inset 0 0 0 1px ${T.border}`,
      padding: 14,
      font: T.font,
      fontSize: 15,
      lineHeight: '21px',
      color: T.textPrimary,
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...tx.h2,
      margin: '22px 0 12px'
    }
  }, "Cost"), /*#__PURE__*/React.createElement(PawCard, null, [['Dog Walking × 3 days', `$${rate * days}`], ['Service fee', '$0']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textSecondary
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: T.border,
      margin: '4px 0 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3,
      color: T.sunset
    }
  }, "$", total))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...tx.bodySm,
      margin: '12px 2px 0'
    }
  }, "Free cancellation up to 24 hours before. You can message Maya any time after she accepts.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: '12px 16px 28px',
      background: T.elevated,
      boxShadow: T.shadowModal
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    onClick: () => go('live')
  }, "Send request"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...tx.caption,
      textAlign: 'center',
      margin: '8px 0 0'
    }
  }, "You won\u2019t be charged yet \u2014 Maya can accept or decline.")));
}
window.BookingRequestScreen = BookingRequestScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/screens-b.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/screens-c.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// screens-c.jsx — Bookings (BOOK-02), Messages (MSG-01), Account (PROF-01)
const {
  T,
  tx,
  PawButton,
  PawCard,
  SafeTop,
  Screen,
  SitterAvatar,
  ASSET,
  ChevronRight,
  Calendar,
  Message,
  Bell,
  Sliders,
  User,
  Heart,
  PawFill
} = window;

// Large-title screen header (iOS)
function BigTitle({
  children,
  trailing
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.display,
      margin: 0
    }
  }, children), trailing);
}
const BOOKINGS = [{
  pet: 'Biscuit',
  petImg: ASSET.shibaSketch,
  sitter: 'Maya Okafor',
  service: 'Dog Walking',
  when: 'Today · 2:00 PM',
  status: 'Active',
  color: '#EA580C'
}, {
  pet: 'Biscuit',
  petImg: ASSET.shibaSoft,
  sitter: 'Theo Nguyen',
  service: 'Boarding',
  when: 'May 20–22',
  status: 'Confirmed',
  color: '#059669'
}, {
  pet: 'Biscuit',
  petImg: ASSET.shibaSketch,
  sitter: 'Jules Romano',
  service: 'Drop-in Visit',
  when: 'May 24 · 9:00 AM',
  status: 'Pending',
  color: '#F59E0B'
}, {
  pet: 'Biscuit',
  petImg: ASSET.shibaSoft,
  sitter: 'Sam Whitfield',
  service: 'Dog Walking',
  when: 'May 8 · 1:00 PM',
  status: 'Completed',
  color: '#B08968'
}];

// ── BOOK-02 Bookings List (Owner) ───────────────────────────
function BookingsScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(Screen, {
    pad: 0
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 58
  }), /*#__PURE__*/React.createElement(BigTitle, null, "Bookings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '4px 16px 24px'
    }
  }, BOOKINGS.map((b, i) => /*#__PURE__*/React.createElement(PawCard, {
    key: i,
    onClick: () => b.status === 'Active' ? go('live') : null,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 54,
      borderRadius: 27,
      overflow: 'hidden',
      flexShrink: 0,
      background: T.n100
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: b.petImg,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3
    }
  }, b.service), /*#__PURE__*/React.createElement("span", {
    style: {
      font: T.font,
      fontSize: 11,
      fontWeight: 600,
      color: b.color,
      background: `${b.color}1A`,
      padding: '2px 8px',
      borderRadius: 9999
    }
  }, b.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.bodySm,
      marginTop: 3
    }
  }, b.pet, " with ", b.sitter), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption,
      marginTop: 1
    }
  }, b.when)), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18,
    style: {
      color: T.textTertiary
    }
  })))));
}
window.BookingsScreen = BookingsScreen;
const CONVOS = [{
  initials: 'MO',
  name: 'Maya Okafor',
  last: 'Biscuit just settled onto the couch 🧡 sending a photo!',
  time: '2:08 PM',
  unread: true
}, {
  initials: 'TN',
  name: 'Theo Nguyen',
  last: 'Sounds good — see you both on the 20th!',
  time: 'Yesterday',
  unread: false
}, {
  initials: 'JR',
  name: 'Jules Romano',
  last: 'I’ll bring the slow-feeder for the morning meds.',
  time: 'Mon',
  unread: false
}];

// ── MSG-01 Conversations ────────────────────────────────────
function MessagesScreen() {
  return /*#__PURE__*/React.createElement(Screen, {
    pad: 0
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 58
  }), /*#__PURE__*/React.createElement(BigTitle, null, "Messages"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0 24px'
    }
  }, CONVOS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      borderBottom: i < CONVOS.length - 1 ? `1px solid ${T.border}` : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: c.initials,
    size: 52
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3,
      fontWeight: c.unread ? 700 : 600
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, c.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.body,
      color: c.unread ? T.textPrimary : T.textSecondary,
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.last), c.unread && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 5,
      background: T.sunset,
      flexShrink: 0
    }
  })))))));
}
window.MessagesScreen = MessagesScreen;

// ── PROF-01 Account / My Profile ────────────────────────────
function AccountScreen({
  go
}) {
  const menu1 = [{
    Icon: window.PawFill,
    label: 'My Pets'
  }, {
    Icon: window.Calendar,
    label: 'My Bookings'
  }, {
    Icon: window.Message,
    label: 'Messages',
    badge: 1
  }, {
    Icon: window.Heart,
    label: 'Favorite Sitters'
  }];
  const menu2 = [{
    Icon: window.Sliders,
    label: 'Settings'
  }, {
    Icon: window.Bell,
    label: 'Notifications'
  }, {
    Icon: window.User,
    label: 'Help & Support'
  }];
  const Row = ({
    Icon,
    label,
    badge,
    last
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      cursor: 'pointer',
      borderBottom: last ? 'none' : `1px solid ${T.border}`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 22,
    style: {
      color: T.textSecondary
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodyLg,
      color: T.textPrimary,
      flex: 1
    }
  }, label), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      background: T.sunset,
      color: '#fff',
      font: T.font,
      fontSize: 12,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 6px'
    }
  }, badge), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18,
    style: {
      color: T.textTertiary
    }
  }));
  return /*#__PURE__*/React.createElement(Screen, {
    pad: 0
  }, /*#__PURE__*/React.createElement(SafeTop, {
    h: 58
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '12px 0 24px'
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: "DR",
    size: 100,
    ring: true
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...tx.h1,
      margin: 0
    }
  }, "Daniel Reyes"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.body
    }
  }, "bernal heights, sf")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PawCard, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, menu1.map((m, i) => /*#__PURE__*/React.createElement(Row, _extends({
    key: i
  }, m, {
    last: i === menu1.length - 1
  })))), /*#__PURE__*/React.createElement(PawCard, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, menu2.map((m, i) => /*#__PURE__*/React.createElement(Row, _extends({
    key: i
  }, m, {
    last: i === menu2.length - 1
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(PawButton, {
    variant: "destructive",
    onClick: () => go('welcome')
  }, "Log Out")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '8px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.caption
    }
  }, "Version 1.0.0"))));
}
window.AccountScreen = AccountScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/screens-c.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios-app/shared.jsx
try { (() => {
// shared.jsx — mock data + shared composite components
const {
  T,
  tx,
  PawCard,
  StarFill,
  CheckSealFill
} = window;

// Pet imagery uses the real warm Shiba assets from the repo.
// Sitter (person) avatars use the spec's PersonAvatar placeholder
// (peach field + sunset silhouette) since real photos are user-supplied.
const ASSET = {
  shibaSketch: '../../assets/avatar-shiba-sketch.png',
  shibaSoft: '../../assets/app-icon-master.png'
};
window.ASSET = ASSET;
const SERVICES = {
  walking: {
    label: 'Dog Walking',
    unit: 'walk',
    Icon: window.ServiceWalking,
    blurb: '30–60 minute walks in the neighborhood'
  },
  dropin: {
    label: 'Drop-in Visits',
    unit: 'visit',
    Icon: window.ServiceDropin,
    blurb: 'Quick check-ins at your pet’s home'
  },
  sitting: {
    label: 'House Sitting',
    unit: 'night',
    Icon: window.ServiceSitting,
    blurb: 'Overnight stays at your home'
  },
  boarding: {
    label: 'Boarding',
    unit: 'night',
    Icon: window.ServiceBoarding,
    blurb: 'Pets stay overnight at the sitter’s home'
  },
  daycare: {
    label: 'Doggy Day Care',
    unit: 'day',
    Icon: window.ServiceDaycare,
    blurb: 'Daytime care at the sitter’s home'
  }
};
window.SERVICES = SERVICES;
const SITTERS = [{
  id: 'maya',
  name: 'Maya Okafor',
  initials: 'MO',
  rating: 4.9,
  reviews: 127,
  distance: 0.4,
  specialty: 'Anxious dogs',
  responds: 'within an hour',
  verified: true,
  services: [['walking', 25], ['dropin', 22], ['sitting', 75]],
  avail: [1, 1, 1, 1, 1, 0, 1],
  bio: "Hi! I’m Maya — I’ve shared my home with rescue dogs for twelve years, so I know the quiet patience anxious pups need. My place has a fenced yard and a very sunny napping couch. I’ll send you photos through the day so you can see your best friend settling in.",
  review: {
    stars: 5,
    text: "Maya took such gentle care of Biscuit. He’s shy with new people but she sent photos of them on the couch within an hour. Came home to a happy, calm dog.",
    author: 'Daniel R.',
    date: 'Apr 2026'
  }
}, {
  id: 'theo',
  name: 'Theo Nguyen',
  initials: 'TN',
  rating: 4.8,
  reviews: 84,
  distance: 0.6,
  specialty: 'Big dogs & puppies',
  responds: 'within a few hours',
  verified: true,
  services: [['walking', 28], ['boarding', 70], ['daycare', 45]],
  avail: [1, 1, 0, 1, 1, 1, 1],
  bio: "Lifelong dog person, weekend hiker, and the neighbor whose pockets always have treats.",
  review: {
    stars: 5,
    text: "Theo wore my husky out on a proper hike. Best sleep she’s had in weeks.",
    author: 'Priya S.',
    date: 'Mar 2026'
  }
}, {
  id: 'jules',
  name: 'Jules Romano',
  initials: 'JR',
  rating: 5.0,
  reviews: 41,
  distance: 0.9,
  specialty: 'Cats & seniors',
  responds: 'within an hour',
  verified: false,
  services: [['dropin', 24], ['sitting', 68]],
  avail: [0, 1, 1, 1, 1, 1, 0],
  bio: "Calm, reliable, and fluent in elderly-cat. I do slow mornings and careful medication routines.",
  review: {
    stars: 5,
    text: "Jules handled my senior cat’s meds perfectly and left the kindest notes.",
    author: 'Erin M.',
    date: 'Apr 2026'
  }
}, {
  id: 'sam',
  name: 'Sam Whitfield',
  initials: 'SW',
  rating: 4.7,
  reviews: 56,
  distance: 1.3,
  specialty: 'Drop-in visits',
  responds: 'within a day',
  verified: true,
  services: [['walking', 22], ['dropin', 20]],
  avail: [1, 0, 1, 0, 1, 1, 1],
  bio: "Quick, dependable midday check-ins so your pup never waits too long.",
  review: {
    stars: 4,
    text: "Always on time, always a photo. Exactly what I needed for lunchtime walks.",
    author: 'Casey L.',
    date: 'Feb 2026'
  }
}];
window.SITTERS = SITTERS;

// Live session mock (LIVE-09)
const SESSION = {
  pet: 'Biscuit',
  petAvatar: ASSET.shibaSketch,
  sitter: 'Maya Okafor',
  service: 'Dog Walking',
  elapsed: 12,
  total: 30,
  tasks: [{
    id: 'med',
    Icon: window.Pills,
    label: 'Morning medication',
    detail: '½ tablet with food',
    done: true,
    time: '2:02 PM'
  }, {
    id: 'feed',
    Icon: window.Bowl,
    label: 'Lunch feeding',
    detail: '1 cup dry kibble',
    done: true,
    time: '2:08 PM'
  }, {
    id: 'walk',
    Icon: window.FigureWalk,
    label: 'Afternoon walk',
    detail: 'In progress — 0.6 mi so far',
    done: false,
    active: true
  }, {
    id: 'play',
    Icon: window.TennisBall,
    label: 'Play time',
    detail: 'Up next',
    done: false
  }]
};
window.SESSION = SESSION;

// ── Sitter avatar placeholder (peach field + sunset silhouette) ──
function SitterAvatar({
  initials,
  size = 60,
  ring
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 9999,
      flexShrink: 0,
      background: 'linear-gradient(150deg, #FED7AA, #FDBA8C)',
      boxShadow: ring ? `0 0 0 3px ${T.sunset}` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: T.font,
      fontSize: size * 0.36,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '0.3px',
      textShadow: '0 1px 2px rgba(180,83,9,0.35)'
    }
  }, initials));
}
window.SitterAvatar = SitterAvatar;

// ── Sitter preview card (SRCH-02 SitterPreviewCard) ─────────
function SitterCard({
  sitter,
  onClick
}) {
  const cheapest = Math.min(...sitter.services.map(s => s[1]));
  const unit = SERVICES[sitter.services.find(s => s[1] === cheapest)[0]].unit;
  return /*#__PURE__*/React.createElement(PawCard, {
    onClick: onClick,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SitterAvatar, {
    initials: sitter.initials,
    size: 60
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.h3
    }
  }, sitter.name), sitter.verified && /*#__PURE__*/React.createElement(CheckSealFill, {
    size: 15,
    style: {
      color: T.sage
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(StarFill, {
    size: 13,
    style: {
      color: T.amber
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      color: T.textPrimary,
      fontWeight: 600
    }
  }, sitter.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      color: T.textSecondary
    }
  }, "\xB7 ", sitter.specialty)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...tx.bodySm,
      color: T.textTertiary
    }
  }, sitter.distance, " mi away")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.h3,
      color: T.sunset
    }
  }, "$", cheapest), /*#__PURE__*/React.createElement("div", {
    style: {
      ...tx.caption
    }
  }, "/", unit)));
}
window.SitterCard = SitterCard;

// ── Bottom tab bar (Liquid Glass) ───────────────────────────
function TabBar({
  active,
  onChange
}) {
  const tabs = [{
    id: 'search',
    label: 'Search',
    Icon: window.Search
  }, {
    id: 'bookings',
    label: 'Bookings',
    Icon: window.Calendar
  }, {
    id: 'live',
    label: 'Live',
    Icon: window.PawFill,
    filled: true
  }, {
    id: 'messages',
    label: 'Messages',
    Icon: window.Message
  }, {
    id: 'account',
    label: 'Profile',
    Icon: window.User
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      paddingBottom: 22,
      paddingTop: 8,
      background: T.glassBg,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `0.5px solid ${T.border}`,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  }, tabs.map(t => {
    const on = active === t.id;
    const col = on ? T.sunset : T.textTertiary;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange(t.id),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        width: 60,
        WebkitTapHighlightColor: 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: col
      }
    }, /*#__PURE__*/React.createElement(t.Icon, {
      size: t.filled ? 25 : 24,
      sw: on ? 2.4 : 2
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: T.font,
        fontSize: 10,
        fontWeight: on ? 600 : 500,
        color: col
      }
    }, t.label));
  }));
}
window.TabBar = TabBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios-app/shared.jsx", error: String((e && e.message) || e) }); }

})();
