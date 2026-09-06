/* Truefitt & Hill — Staff Tools: shared app behaviour.
   Include on every page (after nav.js is fine):
     <script src="shared.js"></script>

   Provides:
   1. Automatic Bangla font (Tiro Bangla) on any text — typed or rendered —
      that contains Bangla script. Nothing is translated; this only swaps
      the font used to render Bangla characters wherever they appear.
   2. A burger-menu Settings drawer (Appearance: light/dark, plus a Data
      section that a page can opt into via window.THBackup).
*/
(function(){

  /* ---------------------------------------------------------------
     1. Bangla auto-font
  --------------------------------------------------------------- */
  var BN_RE = /[\u0980-\u09FF]/;

  var bnStyle = document.createElement('style');
  bnStyle.textContent =
    '.th-bn, .th-bn input, .th-bn textarea{font-family:"Tiro Bangla",serif !important;}' +
    'input.th-bn, textarea.th-bn{font-family:"Tiro Bangla",serif !important;}';
  document.head.appendChild(bnStyle);

  function mark(el, text){
    if(!el || el.nodeType !== 1) return;
    if(BN_RE.test(text || '')) el.classList.add('th-bn');
    else el.classList.remove('th-bn');
  }

  // Live typing in inputs / textareas
  document.addEventListener('input', function(e){
    var t = e.target;
    if(t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && (t.type === 'text' || t.type === 'search')))){
      mark(t, t.value);
    }
  }, true);

  function scanExistingInputs(){
    document.querySelectorAll('textarea, input[type="text"], input[type="search"]').forEach(function(t){
      mark(t, t.value);
    });
  }

  // Rendered / dynamically-inserted text (task lists, notes, remarks, item names…)
  function scanNode(el){
    if(!el || el.nodeType !== 1) return;
    if(el.children.length === 0){
      var txt = el.textContent;
      if(txt && txt.trim()) mark(el, txt);
      return;
    }
    for(var i = 0; i < el.children.length; i++) scanNode(el.children[i]);
  }

  var mo = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.type === 'childList'){
        m.addedNodes.forEach(function(n){
          if(n.nodeType === 1) scanNode(n);
          else if(n.nodeType === 3 && n.parentElement) mark(n.parentElement, n.parentElement.textContent);
        });
      } else if(m.type === 'characterData' && m.target.parentElement){
        mark(m.target.parentElement, m.target.textContent);
      }
    });
  });

  function boot(){
    scanNode(document.body);
    scanExistingInputs();
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if(document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);

  /* ---------------------------------------------------------------
     2. Theme (light / dark) — shared across every page with manual override
  --------------------------------------------------------------- */
  function getSavedTheme(){
    try { return localStorage.getItem('th-theme'); } catch(e){ return null; }
  }
  function getSystemTheme(){
    try {
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
        return 'light';
      }
    } catch(e){}
    return 'dark';
  }
  function getTheme(){
    var saved = getSavedTheme();
    if(saved === 'light' || saved === 'dark') return saved;
    return getSystemTheme();
  }

  function updateHeaderToggle(theme){
    var btn = document.getElementById('th-header-theme-toggle');
    if(!btn) return;
    var isLight = (theme === 'light');
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    btn.setAttribute('title', isLight ? 'Switch to dark theme (overrides system preference)' : 'Switch to light theme (overrides system preference)');
    btn.classList.toggle('light-active', isLight);

    // Sun icon in dark mode (click to turn on light); Moon icon in light mode (click to turn on dark)
    var iconSvg = isLight
      ? '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';

    var labelText = isLight ? 'Dark' : 'Light';
    btn.innerHTML = iconSvg + '<span class="th-theme-label">' + labelText + '</span>';
  }

  function updateThemeStatus(){
    var statusEl = document.getElementById('th-theme-status');
    var autoBtn = document.getElementById('th-theme-auto-btn');
    var saved = getSavedTheme();
    var sys = getSystemTheme();
    if(statusEl){
      if(saved){
        statusEl.innerHTML = 'Mode: <strong>' + (saved === 'light' ? 'Light' : 'Dark') + '</strong> (Manual override active)';
        if(autoBtn) autoBtn.style.display = 'inline-block';
      } else {
        statusEl.innerHTML = 'Mode: <strong>' + (sys === 'light' ? 'Light' : 'Dark') + '</strong> (Auto-detected from system)';
        if(autoBtn) autoBtn.style.display = 'none';
      }
    }
  }

  function setTheme(theme, saveManual){
    if(saveManual !== false){
      try { localStorage.setItem('th-theme', theme); } catch(e){}
    }
    var isLight = (theme === 'light');
    if(document.body) document.body.classList.toggle('light', isLight);
    if(document.documentElement) document.documentElement.classList.toggle('light', isLight);

    var localToggle = document.getElementById('theme-toggle'); // service-calculator switch
    if(localToggle) localToggle.checked = isLight;
    var drawerToggle = document.getElementById('th-theme-toggle');
    if(drawerToggle) drawerToggle.checked = isLight;

    updateHeaderToggle(theme);
    updateThemeStatus();
  }

  function clearThemeOverride(){
    try { localStorage.removeItem('th-theme'); } catch(e){}
    setTheme(getSystemTheme(), false);
  }

  // Listen to system preference changes if no manual override is saved
  try {
    if(window.matchMedia){
      var mql = window.matchMedia('(prefers-color-scheme: light)');
      var handlePrefChange = function(e){
        if(!getSavedTheme()){
          setTheme(e.matches ? 'light' : 'dark', false);
        }
      };
      if(mql.addEventListener) mql.addEventListener('change', handlePrefChange);
      else if(mql.addListener) mql.addListener(handlePrefChange);
    }
  } catch(e){}

  setTheme(getTheme(), false); // initial application
  if(!document.body){
    document.addEventListener('DOMContentLoaded', function(){ setTheme(getTheme(), false); });
  }
  window.THTheme = {
    get: getTheme,
    set: function(t){ setTheme(t, true); },
    toggle: function(){
      var curr = getTheme();
      setTheme(curr === 'light' ? 'dark' : 'light', true);
    },
    resetToSystem: clearThemeOverride,
    getSavedTheme: getSavedTheme,
    getSystemTheme: getSystemTheme
  };

  /* ---------------------------------------------------------------
     3. Burger menu + Settings drawer + Header Theme Toggle
  --------------------------------------------------------------- */
  var style = document.createElement('style');
  style.textContent =
    ':root{' +
      '--th-gold:#d9b872;--th-gold-bright:#ffd166;--th-gold-dim:rgba(217,184,114,0.3);' +
      '--th-navy-dark:#080d1e;--th-navy-surf:#0d1535;--th-text-bright:#eef2ff;--th-text-dim:rgba(238,242,255,0.48);' +
    '}' +
    'body.light{' +
      '--th-gold:#1a3a8f;--th-gold-bright:#0f2b73;--th-gold-dim:rgba(26,58,143,0.22);' +
      '--th-navy-dark:#f5f7fc;--th-navy-surf:#ffffff;--th-text-bright:#0a1f44;--th-text-dim:rgba(10,31,68,0.52);' +
    '}' +
    '.th-burger{position:fixed;top:16px;left:16px;z-index:10001;width:42px;height:42px;border-radius:50%;' +
      'border:1px solid rgba(217,184,114,0.45);background:linear-gradient(135deg, rgba(14,20,44,0.85) 0%, rgba(8,12,28,0.92) 100%);' +
      'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;cursor:pointer;' +
      'box-shadow:0 8px 24px -4px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.15);' +
      'transition:all .2s cubic-bezier(0.16,1,0.3,1);}' +
    '.th-burger:hover{background:linear-gradient(135deg, rgba(217,184,114,0.22), rgba(14,20,44,0.9));border-color:#d9b872;transform:translateY(-1px);box-shadow:0 12px 28px -4px rgba(217,184,114,0.3), inset 0 1px 0 rgba(255,255,255,0.25);}' +
    '.th-burger:active{transform:translateY(0);}' +
    '.th-burger svg{width:19px;height:19px;stroke:#d9b872;fill:none;stroke-width:1.8;stroke-linecap:round;}' +
    'body.light .th-burger{border-color:rgba(26,58,143,0.3);background:linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(244,247,253,0.96) 100%);box-shadow:0 8px 24px -4px rgba(26,58,143,0.18), inset 0 1px 0 #ffffff;}' +
    'body.light .th-burger svg{stroke:#1a3a8f;}' +
    'body.light .th-burger:hover{background:#ffffff;border-color:#1a3a8f;box-shadow:0 12px 28px -4px rgba(26,58,143,0.25);}' +

    /* Header Theme Toggle Button */
    '.th-theme-btn{position:fixed;top:16px;right:16px;z-index:10001;height:42px;min-width:42px;border-radius:999px;' +
      'border:1px solid rgba(217,184,114,0.45);background:linear-gradient(135deg, rgba(14,20,44,0.85) 0%, rgba(8,12,28,0.92) 100%);' +
      'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:inline-flex;align-items:center;justify-content:center;gap:8px;' +
      'padding:0 14px;cursor:pointer;color:#d9b872;font-family:"Poppins",sans-serif;font-size:12px;font-weight:600;' +
      'letter-spacing:0.4px;box-shadow:0 8px 24px -4px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.15);' +
      'transition:all .2s cubic-bezier(0.16,1,0.3,1);user-select:none;-webkit-user-select:none;outline:none;}' +
    '.th-theme-btn:hover{background:linear-gradient(135deg, rgba(217,184,114,0.22), rgba(14,20,44,0.9));border-color:#d9b872;transform:translateY(-1px);box-shadow:0 12px 28px -4px rgba(217,184,114,0.3), inset 0 1px 0 rgba(255,255,255,0.25);}' +
    '.th-theme-btn:active{transform:translateY(0);}' +
    '.th-theme-btn svg{width:18px;height:18px;stroke:#d9b872;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .3s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;}' +
    '.th-theme-btn:hover svg{transform:rotate(24deg) scale(1.1);}' +
    '.th-theme-label{line-height:1;}' +
    'body.light .th-theme-btn{border-color:rgba(26,58,143,0.3);background:linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(244,247,253,0.96) 100%);color:#1a3a8f;box-shadow:0 8px 24px -4px rgba(26,58,143,0.18), inset 0 1px 0 #ffffff;}' +
    'body.light .th-theme-btn svg{stroke:#1a3a8f;}' +
    'body.light .th-theme-btn:hover{background:#ffffff;border-color:#1a3a8f;box-shadow:0 12px 28px -4px rgba(26,58,143,0.25);}' +
    '@media (max-width:520px){.th-theme-btn{width:42px;min-width:42px;padding:0;border-radius:50%;}.th-theme-btn .th-theme-label{display:none;}}' +

    '.th-overlay{position:fixed;inset:0;background:rgba(5,7,18,0.65);backdrop-filter:blur(4px);z-index:10002;' +
      'opacity:0;pointer-events:none;transition:opacity .25s ease;}' +
    '.th-overlay.open{opacity:1;pointer-events:auto;}' +
    '.th-drawer{position:fixed;top:0;left:0;height:100%;width:min(340px,88vw);z-index:10003;' +
      'background:linear-gradient(165deg,#0d1535 0%,#080d1e 55%,#130a2a 100%);' +
      'border-right:1px solid rgba(217,184,114,0.32);box-shadow:24px 0 70px -15px rgba(0,0,0,0.85);' +
      'transform:translateX(-104%);transition:transform .28s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;' +
      'font-family:"Poppins",sans-serif;color:#eef2ff;}' +
    '.th-drawer.open{transform:translateX(0);}' +
    'body.light .th-drawer{background:linear-gradient(165deg,#ffffff 0%,#f4f6fc 55%,#f1eef8 100%);color:#0a1f44;' +
      'border-right-color:rgba(26,58,143,0.22);box-shadow:24px 0 60px -15px rgba(12,27,51,0.2);}' +
    '.th-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:22px 20px 16px;' +
      'border-bottom:1px solid rgba(217,184,114,0.2);position:relative;}' +
    '.th-drawer-head::after{content:"";position:absolute;bottom:0;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,#d9b872,transparent);opacity:0.3;}' +
    'body.light .th-drawer-head{border-bottom-color:rgba(26,58,143,0.15);}' +
    'body.light .th-drawer-head::after{background:linear-gradient(90deg,transparent,#1a3a8f,transparent);}' +
    '.th-drawer-title{font-size:15px;font-weight:600;letter-spacing:0.4px;color:#d9b872;}' +
    'body.light .th-drawer-title{color:#1a3a8f;}' +
    '.th-drawer-close{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);' +
      'color:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .15s ease;}' +
    '.th-drawer-close:hover{background:rgba(217,184,114,0.15);border-color:#d9b872;color:#d9b872;}' +
    'body.light .th-drawer-close{background:rgba(26,58,143,0.06);border-color:rgba(26,58,143,0.15);}' +
    'body.light .th-drawer-close:hover{background:rgba(26,58,143,0.12);color:#1a3a8f;}' +
    '.th-drawer-body{padding:18px 20px;overflow-y:auto;flex:1 1 auto;}' +
    '.th-section-title{font-size:10.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#d9b872;' +
      'margin:20px 0 10px;display:flex;align-items:center;gap:8px;}' +
    '.th-section-title::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(217,184,114,0.3),transparent);}' +
    '.th-section-title:first-child{margin-top:0;}' +
    'body.light .th-section-title{color:#1a3a8f;}' +
    'body.light .th-section-title::after{background:linear-gradient(90deg,rgba(26,58,143,0.25),transparent);}' +

    /* Navigation items inside Drawer */
    '.th-drawer-tools{display:flex;flex-direction:column;gap:6px;margin-bottom:20px;}' +
    '.th-drawer-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;' +
      'background:rgba(255,255,255,0.04);border:1px solid rgba(217,184,114,0.16);' +
      'text-decoration:none;color:inherit;transition:all .18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 4px 12px rgba(0,0,0,0.2);}' +
    '.th-drawer-item:hover{background:rgba(217,184,114,0.12);border-color:rgba(217,184,114,0.45);transform:translateX(3px);box-shadow:0 6px 16px rgba(0,0,0,0.35);}' +
    '.th-drawer-item.active{background:linear-gradient(135deg, rgba(217,184,114,0.18), rgba(217,184,114,0.06));border-color:#d9b872;box-shadow:0 0 16px -4px rgba(217,184,114,0.35);}' +
    'body.light .th-drawer-item{background:rgba(255,255,255,0.85);border-color:rgba(26,58,143,0.14);box-shadow:0 4px 12px rgba(12,27,51,0.05);}' +
    'body.light .th-drawer-item:hover{background:#ffffff;border-color:rgba(26,58,143,0.35);transform:translateX(3px);box-shadow:0 6px 16px rgba(26,58,143,0.12);}' +
    'body.light .th-drawer-item.active{background:linear-gradient(135deg, rgba(26,58,143,0.12), rgba(26,58,143,0.04));border-color:#1a3a8f;}' +
    '.th-drawer-icon{flex:0 0 auto;width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;' +
      'background:linear-gradient(135deg, rgba(217,184,114,0.2), rgba(217,184,114,0.06));border:1px solid rgba(217,184,114,0.32);color:#d9b872;transition:transform .18s;}' +
    '.th-drawer-item:hover .th-drawer-icon{transform:scale(1.06);border-color:#d9b872;}' +
    '.th-drawer-icon svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}' +
    'body.light .th-drawer-icon{background:linear-gradient(135deg, rgba(26,58,143,0.12), rgba(26,58,143,0.03));border-color:rgba(26,58,143,0.22);color:#1a3a8f;}' +
    '.th-drawer-info{flex:1 1 auto;min-width:0;}' +
    '.th-drawer-name{font-size:13px;font-weight:600;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.th-drawer-desc{font-size:10px;opacity:0.55;line-height:1.25;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.th-drawer-badge{flex:0 0 auto;font-size:8.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;' +
      'padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#fae6a2,#d9b872);color:#140e03;box-shadow:0 2px 8px rgba(217,184,114,0.35);}' +
    'body.light .th-drawer-badge{background:linear-gradient(135deg,#1f47b2,#10296e);color:#ffffff;box-shadow:0 2px 8px rgba(26,58,143,0.3);}' +
    '.th-drawer-cat-label{font-size:9.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:rgba(217,184,114,0.7);margin:14px 4px 6px;}' +
    '.th-drawer-cat-label:first-child{margin-top:2px;}' +
    'body.light .th-drawer-cat-label{color:rgba(26,58,143,0.75);}' +

    '.th-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;' +
      'border-radius:14px;background:rgba(255,255,255,0.045);border:1px solid rgba(217,184,114,0.18);margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,0.2);}' +
    'body.light .th-row{background:rgba(255,255,255,0.75);border-color:rgba(26,58,143,0.14);box-shadow:0 4px 12px rgba(12,27,51,0.04);}' +
    '.th-row span{font-size:13px;font-weight:500;}' +
    '.th-switch{position:relative;width:42px;height:24px;flex-shrink:0;}' +
    '.th-switch input{opacity:0;width:0;height:0;}' +
    '.th-slider{position:absolute;inset:0;background:rgba(0,0,0,0.35);border:1px solid rgba(217,184,114,0.3);border-radius:999px;cursor:pointer;' +
      'transition:all .2s ease;}' +
    '.th-slider:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;border-radius:50%;' +
      'background:linear-gradient(135deg,#fae6a2,#d9b872);box-shadow:0 2px 6px rgba(0,0,0,0.5);transition:transform .2s cubic-bezier(0.16,1,0.3,1);}' +
    '.th-switch input:checked + .th-slider{background:rgba(26,58,143,0.7);border-color:#d9b872;}' +
    '.th-switch input:checked + .th-slider:before{transform:translateX(18px);background:#ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.4);}' +
    '.th-btn{width:100%;padding:12px 14px;font-size:12.5px;font-weight:600;letter-spacing:0.3px;border-radius:12px;cursor:pointer;' +
      'font-family:inherit;background:linear-gradient(135deg,rgba(217,184,114,0.16),rgba(217,184,114,0.05));border:1px solid rgba(217,184,114,0.38);' +
      'color:#d9b872;margin-bottom:8px;transition:all .18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 4px 14px rgba(0,0,0,0.25);}' +
    '.th-btn:hover{background:linear-gradient(135deg,rgba(217,184,114,0.25),rgba(217,184,114,0.1));border-color:#d9b872;transform:translateY(-1px);box-shadow:0 8px 18px rgba(217,184,114,0.25);}' +
    '.th-btn:active{transform:translateY(0);}' +
    '.th-btn.danger{color:#e08b7d;border-color:rgba(224,139,125,0.4);background:rgba(224,139,125,0.06);}' +
    '.th-btn.danger:hover{background:rgba(224,139,125,0.18);border-color:#e08b7d;box-shadow:0 8px 18px rgba(224,139,125,0.25);}' +
    'body.light .th-btn{color:#1a3a8f;border-color:rgba(26,58,143,0.32);background:rgba(26,58,143,0.06);}' +
    'body.light .th-btn:hover{background:rgba(26,58,143,0.12);box-shadow:0 8px 18px rgba(26,58,143,0.15);}' +
    'body.light .th-btn.danger{color:#b03030;border-color:rgba(176,48,48,0.35);background:rgba(176,48,48,0.05);}' +
    '.th-note{font-size:10.5px;line-height:1.5;color:rgba(238,242,255,0.45);margin-top:2px;}' +
    'body.light .th-note{color:rgba(10,31,68,0.55);}' +
    '.th-theme-reset-btn{width:100%;padding:9px 12px;font-size:11.5px;font-weight:500;letter-spacing:0.2px;border-radius:10px;cursor:pointer;' +
      'font-family:inherit;background:rgba(217,184,114,0.08);border:1px dashed rgba(217,184,114,0.4);' +
      'color:#d9b872;margin:4px 0 10px;transition:all .18s ease;}' +
    '.th-theme-reset-btn:hover{background:rgba(217,184,114,0.18);border-color:#d9b872;transform:translateY(-1px);}' +
    'body.light .th-theme-reset-btn{background:rgba(26,58,143,0.06);border-color:rgba(26,58,143,0.35);color:#1a3a8f;}' +
    'body.light .th-theme-reset-btn:hover{background:rgba(26,58,143,0.12);border-color:#1a3a8f;}' +
    '.th-drawer-foot{padding:16px 20px 22px;text-align:center;font-size:10.5px;letter-spacing:0.4px;' +
      'color:rgba(238,242,255,0.4);border-top:1px solid rgba(217,184,114,0.16);}' +
    'body.light .th-drawer-foot{color:rgba(10,31,68,0.45);border-top-color:rgba(26,58,143,0.14);}' +
    '.th-drawer-foot span{color:#d9b872;}' +
    'body.light .th-drawer-foot span{color:#1a3a8f;}';
  document.head.appendChild(style);

  var burger = document.createElement('div');
  burger.className = 'th-burger';
  burger.setAttribute('role', 'button');
  burger.setAttribute('aria-label', 'Settings');
  burger.setAttribute('title', 'Settings');
  burger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  var themeBtn = document.createElement('button');
  themeBtn.className = 'th-theme-btn';
  themeBtn.id = 'th-header-theme-toggle';
  themeBtn.setAttribute('type', 'button');
  themeBtn.addEventListener('click', function(){
    var curr = getTheme();
    setTheme(curr === 'light' ? 'dark' : 'light', true);
  });

  var overlay = document.createElement('div');
  overlay.className = 'th-overlay';

  var drawer = document.createElement('div');
  drawer.className = 'th-drawer';

  var dataSectionHtml = '';
  if(window.THBackup && typeof window.THBackup.reset === 'function'){
    dataSectionHtml =
      '<div class="th-section-title">Data</div>' +
      '<button class="th-btn" id="th-import-btn">Import backup</button>' +
      '<input type="file" id="th-import-file" accept="application/json" style="display:none;">' +
      '<button class="th-btn danger" id="th-reset-btn">Reset all</button>' +
      '<div class="th-note">' + (window.THBackup.note || 'Use Import to restore a previously exported backup file.') + '</div>';
  }

  var PORTAL_TOOLS = [
    {
      group: 'Front Desk & Floor',
      items: [
        { href: 'service-calculator.html', label: 'Service Calculator', desc: 'Billing, discounts & service tickets', icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>' },
        { href: 'serial-queue.html', label: 'Serial Queue', desc: 'Barber & therapist rotation queue', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>' },
        { href: 'station-checklist.html', label: 'Station Checklist', desc: 'Daily station inspection & supplies', icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17 14.5v6M14 17.5h6"/>' }
      ]
    },
    {
      group: 'Operations & Log',
      items: [
        { href: 'task-manager.html', label: 'Task Manager', desc: 'Daily opening, closing & team tasks', icon: '<path d="M9 11l2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="3"/>' },
        { href: 'notes.html', label: 'Shift Notes', desc: 'Shift handovers & atelier logbook', icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
        { href: 'requirements.html', label: 'Requirements', desc: 'Product shortages from checklists', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>' }
      ]
    },
    {
      group: 'Stock & Retail',
      items: [
        { href: 'products.html', label: 'Product Catalog', desc: 'Truefitt & Hill signature & salon stock', icon: '<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>' },
        { href: 'product-requests.html', label: 'Product Requests', desc: 'Stock requests & requisition lists', icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m-6 9l2 2 4-4"/>' }
      ]
    },
    {
      group: 'Staff Portal',
      items: [
        { href: 'index.html', label: 'Staff Hub (Home)', desc: 'Main salon dashboard & overview', icon: '<path d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-9"/>' }
      ]
    }
  ];

  var currPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(currPage === '') currPage = 'index.html';

  var navSectionHtml = '<div class="th-section-title">Salon Tools</div><div class="th-drawer-tools">';
  PORTAL_TOOLS.forEach(function(grp){
    navSectionHtml += '<div class="th-drawer-cat-label">' + grp.group + '</div>';
    grp.items.forEach(function(item){
      var isCur = (item.href.toLowerCase() === currPage);
      navSectionHtml +=
        '<a class="th-drawer-item' + (isCur ? ' active' : '') + '" href="' + item.href + '"' + (isCur ? ' aria-current="page"' : '') + '>' +
          '<div class="th-drawer-icon"><svg viewBox="0 0 24 24">' + item.icon + '</svg></div>' +
          '<div class="th-drawer-info">' +
            '<div class="th-drawer-name">' + item.label + '</div>' +
            '<div class="th-drawer-desc">' + item.desc + '</div>' +
          '</div>' +
          (isCur ? '<span class="th-drawer-badge">Active</span>' : '') +
        '</a>';
    });
  });
  navSectionHtml += '</div>';

  drawer.innerHTML =
    '<div class="th-drawer-head">' +
      '<div class="th-drawer-title">Salon Menu &amp; Settings</div>' +
      '<button class="th-drawer-close" id="th-drawer-close" aria-label="Close">&#10005;</button>' +
    '</div>' +
    '<div class="th-drawer-body">' +
      navSectionHtml +
      '<div class="th-section-title">Appearance</div>' +
      '<div class="th-row"><span>Light mode</span><label class="th-switch"><input type="checkbox" id="th-theme-toggle"><span class="th-slider"></span></label></div>' +
      '<div id="th-theme-status" class="th-note" style="margin:2px 0 6px;"></div>' +
      '<button type="button" class="th-theme-reset-btn" id="th-theme-auto-btn" style="display:none;">Match system preference</button>' +
      '<div class="th-note" style="margin:6px 0 4px;">English text uses Poppins. Bangla text you type — like task names — automatically renders in Tiro Bangla.</div>' +
      dataSectionHtml +
    '</div>' +
    '<div class="th-drawer-foot">Staff Portal &nbsp;<span>&middot;</span>&nbsp; Truefitt &amp; Hill</div>';

  function ready(){
    document.body.appendChild(burger);
    document.body.appendChild(themeBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    updateHeaderToggle(getTheme());
    updateThemeStatus();

    var themeToggle = document.getElementById('th-theme-toggle');
    if(themeToggle){
      themeToggle.checked = (getTheme() === 'light');
      themeToggle.addEventListener('change', function(e){
        setTheme(e.target.checked ? 'light' : 'dark', true);
      });
    }

    var autoBtn = document.getElementById('th-theme-auto-btn');
    if(autoBtn){
      autoBtn.addEventListener('click', function(){
        clearThemeOverride();
      });
    }

    function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
    function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }

    window.THOpenDrawer = openDrawer;
    window.THCloseDrawer = closeDrawer;

    burger.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
    document.getElementById('th-drawer-close').addEventListener('click', closeDrawer);

    // If an item in drawer links to the current page, close drawer smoothly instead of reloading
    var curItems = drawer.querySelectorAll('.th-drawer-item.active');
    curItems.forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        closeDrawer();
      });
    });

    if(window.THBackup && typeof window.THBackup.reset === 'function'){
      var importBtn = document.getElementById('th-import-btn');
      var importFile = document.getElementById('th-import-file');
      var resetBtn = document.getElementById('th-reset-btn');
      importBtn.addEventListener('click', function(){ importFile.click(); });
      importFile.addEventListener('change', function(){
        if(importFile.files && importFile.files[0]){
          window.THBackup.importFile(importFile.files[0]);
          importFile.value = '';
        }
      });
      resetBtn.addEventListener('click', function(){ window.THBackup.reset(); });
    }
  }
  if(document.readyState !== 'loading') ready();
  else document.addEventListener('DOMContentLoaded', ready);

  /* ---------------------------------------------------------------
     4. THDialog — site-styled replacements for alert() / confirm() / prompt()
     Usage:
       await THDialog.alert('Message', 'Optional title');
       const ok = await THDialog.confirm('Message', { title, okText, cancelText, danger });
       const value = await THDialog.prompt('Message', 'default value', { title, placeholder, okText });
     confirm() resolves false (not null) on cancel; prompt() resolves null on cancel.
  --------------------------------------------------------------- */
  var dlgStyle = document.createElement('style');
  dlgStyle.textContent =
    '.th-dlg-overlay{position:fixed;inset:0;background:rgba(5,7,18,0.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:10050;' +
      'display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .22s ease;}' +
    '.th-dlg-overlay.open{opacity:1;pointer-events:auto;}' +
    '@media (min-width:640px){.th-dlg-overlay{align-items:center;padding:24px;}}' +
    '.th-dlg-box{width:100%;max-width:420px;background:linear-gradient(165deg,#131c44 0%,#090e24 60%,#150a2e 100%);' +
      'border:1px solid rgba(217,184,114,0.38);border-radius:24px 24px 0 0;' +
      'box-shadow:0 -12px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.12);' +
      'padding:26px 24px 24px;transform:translateY(18px);transition:transform .22s cubic-bezier(0.16,1,0.3,1);font-family:"Poppins",sans-serif;color:#f3efe4;}' +
    '.th-dlg-overlay.open .th-dlg-box{transform:translateY(0);}' +
    '@media (min-width:640px){.th-dlg-box{border-radius:22px;box-shadow:0 24px 60px -15px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12);}}' +
    'body.light .th-dlg-box{background:linear-gradient(165deg,#ffffff 0%,#f4f6fc 60%,#f0edf8 100%);color:#0a1f44;' +
      'border-color:rgba(26,58,143,0.25);box-shadow:0 20px 50px -15px rgba(12,27,51,0.22), inset 0 1px 0 #ffffff;}' +
    '.th-dlg-title{font-size:16px;font-weight:600;letter-spacing:0.3px;margin:0 0 8px;color:#d9b872;}' +
    'body.light .th-dlg-title{color:#1a3a8f;}' +
    '.th-dlg-msg{font-size:13.5px;line-height:1.6;color:rgba(243,239,228,0.82);margin:0 0 18px;white-space:pre-line;}' +
    'body.light .th-dlg-msg{color:rgba(10,31,68,0.78);}' +
    '.th-dlg-input{width:100%;padding:12px 16px;font-size:13.5px;border-radius:12px;margin-bottom:18px;' +
      'border:1px solid rgba(217,184,114,0.25);background:rgba(4,7,18,0.45);color:#f3efe4;font-family:inherit;outline:none;box-sizing:border-box;' +
      'box-shadow:inset 0 2px 5px rgba(0,0,0,0.4);transition:all .18s ease;}' +
    '.th-dlg-input:focus{border-color:rgba(217,184,114,0.7);box-shadow:inset 0 2px 4px rgba(0,0,0,0.3), 0 0 0 3px rgba(217,184,114,0.16);}' +
    'body.light .th-dlg-input{background:#ffffff;border-color:rgba(26,58,143,0.22);color:#0a1f44;box-shadow:inset 0 1px 3px rgba(26,58,143,0.06);}' +
    'body.light .th-dlg-input:focus{border-color:#1a3a8f;box-shadow:0 0 0 3px rgba(26,58,143,0.15);}' +
    '.th-dlg-actions{display:flex;gap:10px;}' +
    '.th-dlg-btn{flex:1;padding:12px 16px;font-size:13px;font-weight:600;letter-spacing:0.3px;border-radius:999px;cursor:pointer;' +
      'font-family:inherit;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.06);color:#f3efe4;' +
      'transition:all .18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 2px 8px rgba(0,0,0,0.25);}' +
    '.th-dlg-btn:hover{background:rgba(255,255,255,0.12);transform:translateY(-1px);}' +
    'body.light .th-dlg-btn{border-color:rgba(26,58,143,0.2);background:rgba(26,58,143,0.06);color:#0a1f44;box-shadow:none;}' +
    'body.light .th-dlg-btn:hover{background:rgba(26,58,143,0.12);}' +
    '.th-dlg-btn.primary{border:none;background:linear-gradient(135deg,#fae6a2 0%,#d9b872 50%,#aa8232 100%);color:#140e03;' +
      'box-shadow:0 6px 18px -2px rgba(217,184,114,0.55), inset 0 1px 0 rgba(255,255,255,0.6);}' +
    '.th-dlg-btn.primary:hover{transform:translateY(-1px);box-shadow:0 8px 22px -2px rgba(217,184,114,0.7), inset 0 1px 0 rgba(255,255,255,0.7);}' +
    'body.light .th-dlg-btn.primary{background:linear-gradient(135deg,#1f47b2 0%,#10296e 100%);color:#ffffff;' +
      'box-shadow:0 6px 18px -2px rgba(26,58,143,0.4), inset 0 1px 0 rgba(255,255,255,0.35);}' +
    '.th-dlg-btn.danger{border:none;background:linear-gradient(135deg,#e8998b 0%,#c76254 100%);color:#1f0906;' +
      'box-shadow:0 6px 18px -2px rgba(224,139,125,0.45), inset 0 1px 0 rgba(255,255,255,0.4);}' +
    '.th-dlg-btn.danger:hover{transform:translateY(-1px);box-shadow:0 8px 22px -2px rgba(224,139,125,0.6);}';
  document.head.appendChild(dlgStyle);

  var dlgOverlay = null, dlgBox = null;
  function ensureDialogDom(){
    if(dlgOverlay) return;
    dlgOverlay = document.createElement('div');
    dlgOverlay.className = 'th-dlg-overlay';
    dlgBox = document.createElement('div');
    dlgBox.className = 'th-dlg-box';
    dlgOverlay.appendChild(dlgBox);
    document.body.appendChild(dlgOverlay);
  }
  function openDlg(){ dlgOverlay.classList.add('open'); }
  function closeDlg(){ dlgOverlay.classList.remove('open'); }

  // config: { title, message, input(bool), placeholder, defaultValue, buttons:[{text,primary,danger,action}], onDismiss }
  function renderDialog(config){
    dlgBox.innerHTML = '';
    if(config.title){
      var t = document.createElement('div');
      t.className = 'th-dlg-title';
      t.textContent = config.title;
      dlgBox.appendChild(t);
    }
    if(config.message){
      var m = document.createElement('div');
      m.className = 'th-dlg-msg';
      m.textContent = config.message;
      dlgBox.appendChild(m);
    }
    var inputEl = null;
    if(config.input){
      inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.className = 'th-dlg-input';
      inputEl.placeholder = config.placeholder || '';
      inputEl.value = config.defaultValue || '';
      dlgBox.appendChild(inputEl);
      inputEl.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
          var okBtn = config.buttons[config.buttons.length - 1];
          okBtn.action();
        } else if(e.key === 'Escape'){
          config.onDismiss();
        }
      });
    }
    var actions = document.createElement('div');
    actions.className = 'th-dlg-actions';
    config.buttons.forEach(function(b){
      var btn = document.createElement('button');
      btn.className = 'th-dlg-btn' + (b.primary ? ' primary' : '') + (b.danger ? ' danger' : '');
      btn.textContent = b.text;
      btn.addEventListener('click', b.action);
      actions.appendChild(btn);
    });
    dlgBox.appendChild(actions);
    return inputEl;
  }

  function dismissHandler(overlay, fn){
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) fn();
    });
    document.addEventListener('keydown', function esc(e){
      if(e.key === 'Escape' && overlay.classList.contains('open')){ fn(); }
    });
  }

  window.THDialog = {
    alert: function(message, title){
      return new Promise(function(resolve){
        ensureDialogDom();
        var done = function(){ resolve(); closeDlg(); };
        renderDialog({
          title: title || 'Notice',
          message: message,
          buttons: [{ text: 'OK', primary: true, action: done }],
          onDismiss: done
        });
        dismissHandler(dlgOverlay, done);
        openDlg();
      });
    },
    confirm: function(message, opts){
      opts = opts || {};
      return new Promise(function(resolve){
        ensureDialogDom();
        var done = function(v){ resolve(v); closeDlg(); };
        renderDialog({
          title: opts.title || 'Please confirm',
          message: message,
          buttons: [
            { text: opts.cancelText || 'Cancel', primary: false, action: function(){ done(false); } },
            { text: opts.okText || 'OK', primary: true, danger: opts.danger, action: function(){ done(true); } }
          ],
          onDismiss: function(){ done(false); }
        });
        dismissHandler(dlgOverlay, function(){ done(false); });
        openDlg();
      });
    },
    prompt: function(message, defaultValue, opts){
      opts = opts || {};
      return new Promise(function(resolve){
        ensureDialogDom();
        var done = function(v){ resolve(v); closeDlg(); };
        var inputEl = renderDialog({
          title: opts.title || 'Enter a value',
          message: message,
          input: true,
          placeholder: opts.placeholder || '',
          defaultValue: defaultValue || '',
          buttons: [
            { text: 'Cancel', primary: false, action: function(){ done(null); } },
            { text: opts.okText || 'OK', primary: true, action: function(){ done(inputEl.value); } }
          ],
          onDismiss: function(){ done(null); }
        });
        dismissHandler(dlgOverlay, function(){ done(null); });
        openDlg();
        setTimeout(function(){ inputEl.focus(); inputEl.select(); }, 30);
      });
    }
  };

})();
