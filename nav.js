/* Truefitt & Hill — Staff Tools
   Android App Style Redesign:
   1. Material Design 3 Top App Bar (Back navigation, Crest, Title, Search, Theme switch, Cloud status, Overflow menu)
   2. Material Design 3 Bottom Navigation Bar (5 core destinations with M3 active indicator pill, single-line labels, and ripple)
   3. Material Design 3 Floating Action Button (FAB) with Speed Dial (Quick Bill, Queue Turn, Handover Note, Task, Requisition)
   4. Material Design 3 Modal Bottom Sheet (App Drawer with draggable handle, real-time tool search, squircle app grid & quick settings)
   5. Android Ink Ripple & Haptic Touch Engine (tactile feedback, vibration, and active press states across all controls)
   6. Android Snackbar / Toast System (THAndroidToast)
   7. PWA Install Prompt & Service Worker Registration
   8. Responsive Desktop Workspace Sidebar + "Android Phone Preview" mode
*/
(function(){
  'use strict';

  var NAV_GROUPS = [
    {
      group: 'MAIN MENU',
      items: [
        {
          href: 'index.html',
          label: 'Staff Hub',
          desc: 'Main salon dashboard & overview',
          icon: '<path d="M3 10.5L12 3l9 7.5M5 9.5v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1v-10" stroke-linecap="round" stroke-linejoin="round"/>'
        },
        {
          href: 'task-manager.html',
          label: 'Daily Tasks',
          desc: 'Opening, closing & team tasks',
          icon: '<path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="4" width="18" height="16" rx="3"/>'
        },
        {
          href: 'notes.html',
          label: 'Shift Notes',
          desc: 'Handovers & atelier logbook',
          icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round"/>'
        }
      ]
    },
    {
      group: 'SALON OPERATIONS',
      items: [
        {
          href: 'service-calculator.html',
          label: 'Service Calculator',
          desc: 'Billing, discounts & tickets',
          icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" stroke-linecap="round"/>'
        },
        {
          href: 'serial-queue.html',
          label: 'Serial Queue',
          desc: 'Barber & therapist chair turns',
          icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round" stroke-linejoin="round"/>'
        },
        {
          href: 'station-checklist.html',
          label: 'Station Checklist',
          desc: 'Daily prep & supply checks',
          icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17 14.5v6M14 17.5h6" stroke-linecap="round"/>'
        }
      ]
    },
    {
      group: 'STOCK & INVENTORY',
      items: [
        {
          href: 'requirements.html',
          label: 'Requirements',
          desc: 'Supply shortage alerts',
          icon: '<path d="M9 3h6l1 3H8l1-3z" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 6h14l-1.2 13.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 6z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10v6M15 10v6" stroke-linecap="round"/>'
        },
        {
          href: 'products.html',
          label: 'Product Catalog',
          desc: 'Signature grooming stock',
          icon: '<path d="M21 8L12 3 3 8l9 5 9-5z" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8" stroke-linejoin="round"/><path d="M12 13v8" stroke-linecap="round"/>'
        },
        {
          href: 'product-requests.html',
          label: 'Product Requests',
          desc: 'Internal stock requisitions',
          icon: '<path d="M6 6h15l-1.5 9h-12z" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L4.5 3H2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>'
        }
      ]
    },
    {
      group: 'CONFIGURATION',
      items: [
        {
          href: 'settings.html',
          label: 'App Settings',
          desc: 'Feature toggles & salon config',
          icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-linecap="round" stroke-linejoin="round"/>'
        }
      ]
    }
  ];

  var HREF_TO_FEAT = {
    'service-calculator.html': 'service-calculator',
    'serial-queue.html': 'serial-queue',
    'station-checklist.html': 'station-checklist',
    'task-manager.html': 'task-manager',
    'requirements.html': 'requirements',
    'products.html': 'products',
    'product-requests.html': 'product-requests',
    'notes.html': 'notes',
    'index.html': null,
    'settings.html': null
  };

  var PAGE_TITLES = {
    'index.html': 'Staff Hub',
    'service-calculator.html': 'Service Calculator',
    'serial-queue.html': 'Serial Queue',
    'task-manager.html': 'Task Manager',
    'station-checklist.html': 'Station Checklist',
    'notes.html': 'Shift Notes',
    'requirements.html': 'Requirements',
    'products.html': 'Product Catalog',
    'product-requests.html': 'Product Requests',
    'settings.html': 'App Settings'
  };

  var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === '') path = 'index.html';
  var isHome = (path === 'index.html');

  // Ensure PWA head tags dynamically
  function ensurePwaMeta(){
    if(!document.querySelector('link[rel="manifest"]')){
      var l = document.createElement('link');
      l.rel = 'manifest';
      l.href = '/manifest.json';
      document.head.appendChild(l);
    }
    if(!document.querySelector('meta[name="theme-color"]')){
      var m = document.createElement('meta');
      m.name = 'theme-color';
      m.content = document.body && document.body.classList.contains('light') ? '#ffffff' : '#080d1e';
      document.head.appendChild(m);
    }
    if(!document.querySelector('meta[name="mobile-web-app-capable"]')){
      var mw = document.createElement('meta');
      mw.name = 'mobile-web-app-capable';
      mw.content = 'yes';
      document.head.appendChild(mw);
    }
    if(!document.querySelector('meta[name="apple-mobile-web-app-capable"]')){
      var ap = document.createElement('meta');
      ap.name = 'apple-mobile-web-app-capable';
      ap.content = 'yes';
      document.head.appendChild(ap);
    }
    if(!document.querySelector('link[rel="icon"]')){
      var ic = document.createElement('link');
      ic.rel = 'icon';
      ic.type = 'image/svg+xml';
      ic.href = '/icon.svg';
      document.head.appendChild(ic);
    }
  }
  ensurePwaMeta();

  // Register PWA Service Worker
  if('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').catch(function(err){
        console.warn('SW registration notice:', err);
      });
    });
  }

  // PWA Install prompt listener
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferredPrompt = e;
    var installBtns = document.querySelectorAll('.th-android-install-btn');
    installBtns.forEach(function(btn){ btn.style.display = 'inline-flex'; });
  });

  // Inject Styles for Android App Layout
  var style = document.createElement('style');
  style.textContent =
    /* --- Android Theme & App Variables --- */
    ':root{' +
      '--th-m3-surface:#0a0f24;' +
      '--th-m3-surface-card:linear-gradient(165deg, rgba(16,22,46,0.92) 0%, rgba(9,13,30,0.98) 100%);' +
      '--th-m3-primary:#d9b872;' +
      '--th-m3-primary-container:rgba(217,184,114,0.18);' +
      '--th-m3-on-primary-container:#fae6a2;' +
      '--th-m3-outline:rgba(217,184,114,0.25);' +
      '--th-m3-bottom-nav-bg:rgba(8, 12, 28, 0.94);' +
      '--th-side-width:270px;' +
      '--th-side-bg:linear-gradient(180deg, rgba(13,20,44,0.97) 0%, rgba(7,10,24,0.99) 100%);' +
      '--th-side-border:rgba(217,184,114,0.22);' +
      '--th-gold:#d9b872;' +
    '}' +
    'body.light{' +
      '--th-m3-surface:#f8f9fd;' +
      '--th-m3-surface-card:linear-gradient(165deg, rgba(255,255,255,0.96) 0%, rgba(246,248,254,0.98) 100%);' +
      '--th-m3-primary:#1a3a8f;' +
      '--th-m3-primary-container:rgba(26,58,143,0.12);' +
      '--th-m3-on-primary-container:#10296e;' +
      '--th-m3-outline:rgba(26,58,143,0.18);' +
      '--th-m3-bottom-nav-bg:rgba(255, 255, 255, 0.95);' +
      '--th-side-bg:linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,248,254,0.98) 100%);' +
      '--th-side-border:rgba(26,58,143,0.14);' +
      '--th-gold:#1a3a8f;' +
    '}' +

    /* Native App Touch & Interaction Resets */
    '*{' +
      '-webkit-tap-highlight-color:transparent;' +
      'touch-action:manipulation;' +
    '}' +
    'body{' +
      'overscroll-behavior-y:contain;' +
      '-webkit-font-smoothing:antialiased;' +
    '}' +

    /* Android Material Ripple Effect */
    '.th-ripple-surface{position:relative;overflow:hidden;}' +
    '.th-ink-ripple{' +
      'position:absolute;border-radius:50%;pointer-events:none;' +
      'transform:scale(0);animation:th-ripple-animation .48s cubic-bezier(0.1, 0.9, 0.2, 1);' +
      'background:radial-gradient(circle, rgba(217,184,114,0.35) 0%, rgba(217,184,114,0.08) 70%, transparent 100%);' +
    '}' +
    'body.light .th-ink-ripple{' +
      'background:radial-gradient(circle, rgba(26,58,143,0.25) 0%, rgba(26,58,143,0.06) 70%, transparent 100%);' +
    '}' +
    '@keyframes th-ripple-animation{' +
      'to{transform:scale(3.6);opacity:0;}' +
    '}' +
    '.th-touch-active{transform:scale(0.97) !important;transition:transform 0.08s ease !important;}' +

    /* --- Material Design 3 Top App Bar --- */
    '.th-android-top-bar{' +
      'position:fixed;top:0;left:0;right:0;height:60px;z-index:9990;' +
      'display:flex;align-items:center;justify-content:space-between;padding:0 14px;' +
      'background:var(--th-m3-bottom-nav-bg);' +
      'border-bottom:1px solid var(--th-m3-outline);' +
      'backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.35);' +
      'padding-top:env(safe-area-inset-top, 0px);' +
      'transition:all .2s ease;' +
    '}' +
    '@media (max-width: 1023px){' +
      'body.th-has-top-bar{padding-top:calc(76px + env(safe-area-inset-top, 0px)) !important;}' +
      'body{padding-bottom:calc(104px + env(safe-area-inset-bottom, 0px)) !important;}' +
    '}' +
    '@media (min-width: 1024px){' +
      '.th-android-top-bar{display:none !important;}' +
      '.th-android-bottom-nav{display:none !important;}' +
      '.th-android-fab-container{display:none !important;}' +
      '.th-burger{display:none !important;}' +
      '.th-theme-btn{display:none !important;}' +
      'body{padding-left:270px !important;box-sizing:border-box;}' +
      'body.th-page-service-calculator{padding-top:0 !important;padding-bottom:0 !important;height:100vh !important;overflow:hidden !important;}' +
    '}' +
    'body.th-page-service-calculator .th-android-fab-container{display:none !important;}' +

    '.th-top-leading{display:flex;align-items:center;gap:10px;min-width:0;flex:1;}' +
    '.th-icon-btn{' +
      'width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
      'background:transparent;border:none;color:inherit;cursor:pointer;flex-shrink:0;' +
      'transition:background .15s ease, transform .12s ease;outline:none;' +
    '}' +
    '.th-icon-btn:hover{background:var(--th-m3-primary-container);}' +
    '.th-icon-btn:active{transform:scale(0.92);}' +
    '.th-icon-btn svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}' +

    '.th-top-title-group{display:flex;flex-direction:column;min-width:0;cursor:pointer;}' +
    '.th-top-title-row{display:flex;align-items:center;gap:8px;}' +
    '.th-top-crest-mini{width:20px;height:20px;border-radius:6px;background:linear-gradient(135deg,#fae6a2,#aa8232);display:flex;align-items:center;justify-content:center;color:#140e03;font-size:10px;font-weight:700;flex-shrink:0;}' +
    'body.light .th-top-crest-mini{background:linear-gradient(135deg,#1f47b2,#10296e);color:#ffffff;}' +
    '.th-top-title{font-size:15px;font-weight:600;letter-spacing:0.2px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--th-gold);}' +
    '.th-top-subtitle{font-size:10px;letter-spacing:0.8px;text-transform:uppercase;opacity:0.6;line-height:1;margin-top:2px;}' +

    '.th-top-actions{display:flex;align-items:center;gap:4px;flex-shrink:0;}' +
    '.th-top-badge-online{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:10px;font-weight:600;background:rgba(74,222,128,0.12);color:#4ade80;border:1px solid rgba(74,222,128,0.3);margin-right:2px;}' +
    '.th-pulse-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80;animation:th-pulse 2s infinite;}' +
    '@keyframes th-pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.8);}}' +

    /* Android Overflow Dropdown */
    '.th-android-menu{position:fixed;top:62px;right:14px;z-index:9995;background:var(--th-m3-surface-card);border:1px solid var(--th-m3-outline);border-radius:18px;padding:6px;box-shadow:0 14px 40px rgba(0,0,0,0.6);display:none;flex-direction:column;min-width:210px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);}' +
    'body.light .th-android-menu{background:#ffffff;box-shadow:0 12px 36px rgba(12,27,51,0.18);}' +
    '.th-android-menu.open{display:flex;animation:th-menu-pop .18s cubic-bezier(0.16,1,0.3,1);}' +
    '@keyframes th-menu-pop{from{opacity:0;transform:scale(0.92) translateY(-6px);}to{opacity:1;transform:scale(1) translateY(0);}}' +
    '.th-menu-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:12px;text-decoration:none;color:inherit;font-size:13px;font-weight:500;border:none;background:transparent;width:100%;text-align:left;cursor:pointer;}' +
    '.th-menu-item:hover{background:var(--th-m3-primary-container);color:var(--th-gold);}' +
    '.th-menu-item svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;}' +

    /* Hide legacy floating buttons when top bar is mounted on mobile */
    '@media (max-width: 1023px){' +
      '.th-burger{display:none !important;}' +
      '.th-theme-btn{display:none !important;}' +
    '}' +

    /* --- Material Design 3 Bottom Navigation Bar --- */
    '.th-android-bottom-nav{' +
      'position:fixed;bottom:0;left:0;right:0;height:72px;z-index:9990;' +
      'display:flex;align-items:center;justify-content:space-around;padding:0 6px;' +
      'background:var(--th-m3-bottom-nav-bg);' +
      'border-top:1px solid var(--th-m3-outline);' +
      'backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);' +
      'box-shadow:0 -4px 24px rgba(0,0,0,0.4);' +
      'padding-bottom:env(safe-area-inset-bottom, 0px);' +
      'transition:transform .2s ease;' +
    '}' +
    '@media (min-width: 1024px){' +
      '.th-android-bottom-nav{display:none !important;}' +
    '}' +
    '.th-m3-nav-item{' +
      'flex:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;' +
      'text-decoration:none;color:rgba(243,239,228,0.65);border:none;background:transparent;cursor:pointer;' +
      'padding:6px 0;transition:all .18s ease;position:relative;' +
    '}' +
    'body.light .th-m3-nav-item{color:rgba(12,27,51,0.6);}' +
    '.th-m3-icon-pill{' +
      'width:56px;height:32px;border-radius:16px;display:flex;align-items:center;justify-content:center;' +
      'transition:all .22s cubic-bezier(0.2, 0, 0, 1);position:relative;' +
    '}' +
    '.th-m3-icon-pill svg{' +
      'width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.9;' +
      'transition:transform .18s ease, stroke-width .18s ease;' +
    '}' +
    '.th-m3-label{' +
      'font-size:11px;font-weight:500;letter-spacing:0.2px;line-height:1;white-space:nowrap;' +
      'transition:color .18s ease, font-weight .18s ease;' +
    '}' +
    '.th-m3-nav-item.active .th-m3-icon-pill{' +
      'background:var(--th-m3-primary-container);' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15);' +
      'transform:scale(1.04);' +
    '}' +
    '.th-m3-nav-item.active{' +
      'color:var(--th-gold) !important;' +
    '}' +
    '.th-m3-nav-item.active .th-m3-icon-pill svg{' +
      'stroke:var(--th-gold);stroke-width:2.2;' +
    '}' +
    '.th-m3-nav-item.active .th-m3-label{' +
      'font-weight:700;color:var(--th-gold);' +
    '}' +
    '.th-m3-nav-item:active .th-m3-icon-pill{transform:scale(0.92);}' +

    /* --- Material Design 3 Floating Action Button (FAB) & Speed Dial --- */
    '.th-android-fab-container{position:fixed;right:20px;bottom:84px;z-index:9985;display:flex;flex-direction:column;align-items:flex-end;gap:12px;pointer-events:none;}' +
    '@media (min-width:1024px){.th-android-fab-container{display:none !important;}}' +
    '.th-fab-scrim{position:fixed;inset:0;background:rgba(5,8,20,0.55);backdrop-filter:blur(3px);z-index:9980;opacity:0;pointer-events:none;transition:opacity .22s ease;}' +
    '.th-fab-scrim.open{opacity:1;pointer-events:auto;}' +
    '.th-speed-dial-list{display:flex;flex-direction:column;align-items:flex-end;gap:10px;transform:translateY(16px);opacity:0;pointer-events:none;transition:all .22s cubic-bezier(0.16,1,0.3,1);}' +
    '.th-speed-dial-list.open{transform:translateY(0);opacity:1;pointer-events:auto;}' +
    '.th-speed-dial-item{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit;cursor:pointer;border:none;background:transparent;}' +
    '.th-speed-dial-label{background:var(--th-m3-surface-card);border:1px solid var(--th-m3-outline);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,0.4);white-space:nowrap;color:var(--th-gold);}' +
    'body.light .th-speed-dial-label{background:#ffffff;box-shadow:0 4px 12px rgba(12,27,51,0.12);}' +
    '.th-speed-dial-mini-fab{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#fae6a2,#aa8232);border:none;display:flex;align-items:center;justify-content:center;color:#140e03;box-shadow:0 6px 16px rgba(0,0,0,0.4);transition:transform .15s ease;}' +
    'body.light .th-speed-dial-mini-fab{background:linear-gradient(135deg,#1f47b2,#10296e);color:#ffffff;}' +
    '.th-speed-dial-mini-fab svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}' +
    '.th-speed-dial-item:active .th-speed-dial-mini-fab{transform:scale(0.92);}' +
    '.th-main-fab{' +
      'width:56px;height:56px;border-radius:18px;pointer-events:auto;cursor:pointer;border:none;' +
      'background:linear-gradient(135deg,#fae6a2 0%,#d9b872 50%,#aa8232 100%);' +
      'color:#140e03;display:flex;align-items:center;justify-content:center;' +
      'box-shadow:0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6);' +
      'transition:transform .22s cubic-bezier(0.16,1,0.3,1), box-shadow .2s ease;outline:none;' +
    '}' +
    'body.light .th-main-fab{' +
      'background:linear-gradient(135deg,#1f47b2 0%,#10296e 100%);color:#ffffff;' +
      'box-shadow:0 8px 22px rgba(26,58,143,0.35), inset 0 1px 0 rgba(255,255,255,0.4);' +
    '}' +
    '.th-main-fab:hover{transform:scale(1.05);box-shadow:0 12px 28px rgba(217,184,114,0.4);}' +
    '.th-main-fab:active{transform:scale(0.92);}' +
    '.th-main-fab svg{width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:2.2;transition:transform .24s cubic-bezier(0.16,1,0.3,1);}' +
    '.th-main-fab.open svg{transform:rotate(135deg);}' +

    /* --- Material Design 3 Modal Bottom Sheet (App Drawer Launcher) --- */
    '.th-m3-sheet-scrim{position:fixed;inset:0;background:rgba(5,7,18,0.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:10010;opacity:0;pointer-events:none;transition:opacity .25s ease;}' +
    '.th-m3-sheet-scrim.open{opacity:1;pointer-events:auto;}' +
    '.th-m3-bottom-sheet{' +
      'position:fixed;left:0;right:0;bottom:0;z-index:10015;max-height:92vh;display:flex;flex-direction:column;' +
      'background:linear-gradient(175deg, #0d1535 0%, #070b1c 65%, #130a2a 100%);' +
      'border-top:1px solid var(--th-m3-outline);border-radius:28px 28px 0 0;' +
      'box-shadow:0 -16px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14);' +
      'transform:translateY(102%);transition:transform .32s cubic-bezier(0.2, 0.9, 0.2, 1);' +
      'padding-bottom:calc(18px + env(safe-area-inset-bottom, 0px));' +
    '}' +
    'body.light .th-m3-bottom-sheet{background:linear-gradient(175deg,#ffffff 0%,#f5f7fc 65%,#f0edf8 100%);border-top-color:rgba(26,58,143,0.22);box-shadow:0 -12px 45px rgba(12,27,51,0.2);}' +
    '.th-m3-bottom-sheet.open{transform:translateY(0);}' +
    '@media (min-width: 640px){' +
      '.th-m3-bottom-sheet{max-width:540px;margin:0 auto;border-radius:28px;bottom:24px;border:1px solid var(--th-m3-outline);}' +
      '.th-m3-bottom-sheet.open{transform:translateY(0);}' +
    '}' +
    '.th-sheet-drag-handle{width:40px;height:5px;border-radius:999px;background:rgba(217,184,114,0.4);margin:12px auto 6px;cursor:grab;flex-shrink:0;}' +
    'body.light .th-sheet-drag-handle{background:rgba(26,58,143,0.3);}' +

    '.th-sheet-header{padding:8px 22px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--th-m3-outline);}' +
    '.th-sheet-title{font-size:17px;font-weight:600;letter-spacing:0.2px;color:var(--th-gold);}' +
    '.th-sheet-close{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,0.08);color:inherit;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;}' +

    /* App search bar in bottom sheet */
    '.th-sheet-search-wrap{padding:12px 20px 8px;}' +
    '.th-sheet-search-box{display:flex;align-items:center;gap:10px;background:rgba(4,7,18,0.5);border:1px solid var(--th-m3-outline);border-radius:14px;padding:8px 14px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.3);}' +
    'body.light .th-sheet-search-box{background:rgba(255,255,255,0.9);box-shadow:inset 0 1px 2px rgba(26,58,143,0.06);}' +
    '.th-sheet-search-box svg{width:16px;height:16px;stroke:var(--th-gold);fill:none;stroke-width:2;flex-shrink:0;}' +
    '.th-sheet-search-input{width:100%;border:none;background:transparent;outline:none;font-family:inherit;font-size:13px;color:inherit;}' +

    /* App Grid (Android Launcher style) */
    '.th-sheet-body{padding:10px 18px 20px;overflow-y:auto;flex:1 1 auto;display:flex;flex-direction:column;gap:14px;}' +
    '.th-app-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;}' +
    '@media (max-width:380px){.th-app-grid{grid-template-columns:repeat(3, 1fr);gap:8px;}}' +
    '.th-app-tile{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:12px 6px;border-radius:18px;text-decoration:none;color:inherit;background:rgba(255,255,255,0.03);border:1px solid transparent;transition:all .18s ease;position:relative;}' +
    '.th-app-tile:hover{background:var(--th-m3-primary-container);border-color:var(--th-m3-outline);transform:translateY(-2px);}' +
    '.th-app-tile.active{border-color:var(--th-gold);background:var(--th-m3-primary-container);}' +
    '.th-app-tile-icon{width:46px;height:46px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, rgba(217,184,114,0.22), rgba(217,184,114,0.06));border:1px solid var(--th-m3-outline);color:var(--th-gold);box-shadow:0 4px 14px rgba(0,0,0,0.3);flex-shrink:0;}' +
    'body.light .th-app-tile-icon{background:linear-gradient(135deg, rgba(26,58,143,0.12), rgba(26,58,143,0.03));color:#1a3a8f;box-shadow:0 4px 12px rgba(12,27,51,0.06);}' +
    '.th-app-tile-icon svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}' +
    '.th-app-tile-label{font-size:11.5px;font-weight:600;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:96%;}' +
    '.th-app-tile-tag{font-size:8.5px;padding:2px 6px;border-radius:999px;background:var(--th-gold);color:#140e03;font-weight:700;text-transform:uppercase;margin-top:2px;}' +
    'body.light .th-app-tile-tag{background:#1a3a8f;color:#ffffff;}' +

    /* Quick settings inside sheet */
    '.th-sheet-settings{display:flex;flex-direction:column;gap:8px;padding-top:10px;border-top:1px solid var(--th-m3-outline);}' +
    '.th-sheet-row{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid var(--th-m3-outline);font-size:12.5px;font-weight:500;}' +
    'body.light .th-sheet-row{background:rgba(255,255,255,0.8);}' +

    /* --- Material Design 3 Snackbar / Toast --- */
    '.th-m3-snackbar{' +
      'position:fixed;bottom:84px;left:50%;transform:translateX(-50%) translateY(20px);z-index:10040;' +
      'display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;' +
      'border-radius:999px;background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);color:#f8fafc;' +
      'border:1px solid rgba(217,184,114,0.35);box-shadow:0 12px 36px rgba(0,0,0,0.65);' +
      'font-size:13px;font-weight:500;opacity:0;pointer-events:none;transition:all .25s cubic-bezier(0.16,1,0.3,1);' +
      'max-width:calc(100vw - 32px);white-space:nowrap;' +
    '}' +
    '.th-m3-snackbar.open{opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto;}' +
    '.th-m3-snackbar-action{border:none;background:transparent;color:var(--th-gold);font-weight:700;cursor:pointer;font-size:12.5px;text-transform:uppercase;letter-spacing:0.5px;outline:none;padding:2px 6px;border-radius:6px;}' +
    '.th-m3-snackbar-action:hover{background:rgba(217,184,114,0.15);}' +

    /* --- Desktop Sidebar Layout (Preserved for wide displays) --- */
    '@media (min-width: 1024px){' +
      'body{padding-left:270px !important;}' +
      'body.th-has-sidebar{transition:padding-left .2s ease;}' +
      '.th-desktop-sidebar{' +
        'position:fixed;left:0;top:0;bottom:0;width:270px;z-index:9999;' +
        'background:var(--th-side-bg);' +
        'border-right:1px solid var(--th-side-border);' +
        'backdrop-filter:blur(30px) saturate(140%);-webkit-backdrop-filter:blur(30px) saturate(140%);' +
        'box-shadow:8px 0 32px rgba(0,0,0,0.45);' +
        'display:flex;flex-direction:column;padding:22px 16px 18px;overflow-y:auto;' +
        'scrollbar-width:none;' +
      '}' +
      '.th-desktop-sidebar::-webkit-scrollbar{display:none;}' +
      '.th-side-brand{display:flex;align-items:center;gap:12px;padding:0 6px 18px;margin-bottom:14px;border-bottom:1px solid var(--th-side-border);}' +
      '.th-side-crest{width:40px;height:40px;border-radius:12px;border:1px solid rgba(217,184,114,0.4);background:linear-gradient(135deg, rgba(217,184,114,0.2), rgba(217,184,114,0.05));display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(0,0,0,0.3);}' +
      'body.light .th-side-crest{border-color:rgba(26,58,143,0.3);background:rgba(26,58,143,0.06);}' +
      '.th-side-crest svg{width:20px;height:20px;stroke:#d9b872;fill:none;stroke-width:1.6;}' +
      'body.light .th-side-crest svg{stroke:#1a3a8f;}' +
      '.th-side-brand-text{display:flex;flex-direction:column;}' +
      '.th-side-title{font-family:"Playfair Display",serif;font-weight:700;font-size:15px;color:var(--th-gold);letter-spacing:0.4px;line-height:1.2;}' +
      '.th-side-subtitle{font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:rgba(243,239,228,0.5);margin-top:2px;}' +
      'body.light .th-side-subtitle{color:rgba(10,31,68,0.55);}' +
      '.th-side-user-card{display:flex;align-items:center;gap:11px;padding:10px 12px;margin-bottom:16px;background:rgba(4,7,18,0.45);border:1px solid var(--th-side-border);border-radius:16px;}' +
      'body.light .th-side-user-card{background:rgba(26,58,143,0.04);}' +
      '.th-side-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#fae6a2,#d9b872);display:flex;align-items:center;justify-content:center;color:#140e03;font-weight:700;font-size:12px;flex-shrink:0;}' +
      'body.light .th-side-avatar{background:linear-gradient(135deg,#1f47b2,#10296e);color:#ffffff;}' +
      '.th-side-user-info{flex:1;min-width:0;}' +
      '.th-side-user-name{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2;}' +
      '.th-side-status-pill{display:inline-flex;align-items:center;gap:5px;font-size:10px;color:#4ade80;font-weight:500;margin-top:2px;}' +
      '.th-side-status-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80;}' +
      '.th-side-nav-groups{display:flex;flex-direction:column;gap:14px;flex:1;}' +
      '.th-side-cat-label{font-size:9.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:rgba(217,184,114,0.65);padding:0 8px;margin-bottom:4px;}' +
      'body.light .th-side-cat-label{color:rgba(26,58,143,0.7);}' +
      '.th-side-items{display:flex;flex-direction:column;gap:3px;}' +
      '.th-side-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:12px;text-decoration:none;color:rgba(243,239,228,0.7);font-size:12.5px;font-weight:500;transition:all .18s ease;}' +
      'body.light .th-side-item{color:rgba(10,31,68,0.72);}' +
      '.th-side-item svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;}' +
      '.th-side-item:hover{color:#f3efe4;background:rgba(217,184,114,0.08);transform:translateX(2px);}' +
      'body.light .th-side-item:hover{color:#0a1f44;background:rgba(26,58,143,0.06);}' +
      '.th-side-item.active{background:linear-gradient(135deg,#fae6a2 0%,#d9b872 50%,#aa8232 100%);color:#140e03;font-weight:700;box-shadow:0 4px 14px rgba(217,184,114,0.4);}' +
      '.th-side-item.active svg{stroke:#140e03;stroke-width:2;}' +
      'body.light .th-side-item.active{background:linear-gradient(135deg,#1f47b2 0%,#10296e 100%);color:#ffffff;font-weight:600;box-shadow:0 4px 14px rgba(26,58,143,0.35);}' +
      'body.light .th-side-item.active svg{stroke:#ffffff;stroke-width:2;}' +
      '.th-side-footer{margin-top:18px;padding-top:14px;border-top:1px solid var(--th-side-border);display:flex;flex-direction:column;gap:8px;}' +
      '.th-side-toggle-btn{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:10px;background:rgba(217,184,114,0.06);border:1px solid var(--th-side-border);color:var(--th-gold);font-size:11.5px;font-weight:600;cursor:pointer;transition:all .18s ease;width:100%;}' +
      '.th-side-toggle-btn:hover{background:rgba(217,184,114,0.14);transform:translateY(-1px);}' +
      'body.light .th-side-toggle-btn{background:rgba(26,58,143,0.05);color:#1a3a8f;}' +
      '.th-side-cloud-badge{font-size:10px;color:rgba(243,239,228,0.45);text-align:center;padding:2px 0;}' +
      'body.light .th-side-cloud-badge{color:rgba(10,31,68,0.45);}' +
    '}';
  document.head.appendChild(style);

  /* --- Android Ink Ripple & Haptic Touch Listener --- */
  function setupAndroidRipple(){
    document.addEventListener('pointerdown', function(e){
      var target = e.target.closest('button, a, .th-icon-btn, .th-m3-nav-item, .th-speed-dial-item, .th-app-tile, .card, .btn, .pill, .kpi-card, [data-ripple]');
      if(!target) return;

      // Haptic vibration on Android devices
      try {
        if(navigator.vibrate) navigator.vibrate(10);
      } catch(ex){}

      // Active press effect
      target.classList.add('th-touch-active');
      var release = function(){
        target.classList.remove('th-touch-active');
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);

      // Create expanding ink ripple
      var rect = target.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 1.5;
      var ripple = document.createElement('span');
      ripple.className = 'th-ink-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';

      target.classList.add('th-ripple-surface');
      target.appendChild(ripple);

      setTimeout(function(){
        if(ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 550);
    }, { passive: true });
  }
  setupAndroidRipple();

  /* --- Android Snackbar Toast System --- */
  var snackbarEl = document.createElement('div');
  snackbarEl.className = 'th-m3-snackbar';
  document.body.appendChild(snackbarEl);
  var snackbarTimer = null;

  window.THAndroidToast = function(msg, actionLabel, onAction){
    if(snackbarTimer) clearTimeout(snackbarTimer);
    snackbarEl.innerHTML = '<span>' + msg + '</span>';
    if(actionLabel){
      var btn = document.createElement('button');
      btn.className = 'th-m3-snackbar-action';
      btn.textContent = actionLabel;
      btn.addEventListener('click', function(){
        snackbarEl.classList.remove('open');
        if(typeof onAction === 'function') onAction();
      });
      snackbarEl.appendChild(btn);
    }
    snackbarEl.classList.add('open');
    snackbarTimer = setTimeout(function(){
      snackbarEl.classList.remove('open');
    }, 3600);
  };

  /* --- 1. Build Android Material 3 Top App Bar --- */
  var topBar = document.createElement('header');
  topBar.className = 'th-android-top-bar';
  topBar.setAttribute('aria-label', 'Android Top App Bar');

  // Leading: Back button on sub-pages, or Drawer button on home
  var leadingCol = document.createElement('div');
  leadingCol.className = 'th-top-leading';

  var navBtn = document.createElement('button');
  navBtn.type = 'button';
  navBtn.className = 'th-icon-btn';

  if(!isHome){
    navBtn.setAttribute('aria-label', 'Navigate Back to Hub');
    navBtn.setAttribute('title', 'Back to Hub');
    navBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
    navBtn.addEventListener('click', function(){
      if(window.history.length > 1 && document.referrer.indexOf(window.location.host) !== -1){
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  } else {
    navBtn.setAttribute('aria-label', 'Open Atelier App Drawer');
    navBtn.setAttribute('title', 'All Apps');
    navBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    navBtn.addEventListener('click', function(){
      openAndroidSheet();
    });
  }
  leadingCol.appendChild(navBtn);

  // Title Group
  var titleGroup = document.createElement('div');
  titleGroup.className = 'th-top-title-group';
  var pageTitle = PAGE_TITLES[path] || 'Staff Tools';
  titleGroup.innerHTML =
    '<div class="th-top-title-row">' +
      '<div class="th-top-crest-mini">TH</div>' +
      '<div class="th-top-title">' + pageTitle + '</div>' +
    '</div>' +
    '<div class="th-top-subtitle">Mayfair Atelier &middot; Floor Operations</div>';
  titleGroup.addEventListener('click', function(){
    if(!isHome) window.location.href = 'index.html';
  });
  leadingCol.appendChild(titleGroup);
  topBar.appendChild(leadingCol);

  // Actions on Right: Theme toggle, Online badge, Overflow menu
  var actionsCol = document.createElement('div');
  actionsCol.className = 'th-top-actions';

  var onlineBadge = document.createElement('div');
  onlineBadge.className = 'th-top-badge-online';
  onlineBadge.innerHTML = '<span class="th-pulse-dot"></span><span>Live</span>';
  actionsCol.appendChild(onlineBadge);

  // Quick theme toggle
  var themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.className = 'th-icon-btn';
  themeBtn.setAttribute('aria-label', 'Toggle Dark or Light Mode');
  function updateThemeIcon(){
    var isLight = document.body.classList.contains('light');
    themeBtn.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  }
  updateThemeIcon();
  themeBtn.addEventListener('click', function(){
    if(window.THTheme && window.THTheme.toggle){
      window.THTheme.toggle();
    } else {
      var isLight = document.body.classList.contains('light');
      if(isLight) document.body.classList.remove('light');
      else document.body.classList.add('light');
      try{ localStorage.setItem('th-theme', isLight ? 'dark' : 'light'); }catch(e){}
    }
    updateThemeIcon();
    window.THAndroidToast(document.body.classList.contains('light') ? 'Switched to Light Theme' : 'Switched to Dark Theme');
  });
  actionsCol.appendChild(themeBtn);

  // Android Overflow 3-dots Menu Button
  var overflowBtn = document.createElement('button');
  overflowBtn.type = 'button';
  overflowBtn.className = 'th-icon-btn';
  overflowBtn.setAttribute('aria-label', 'More options');
  overflowBtn.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>';

  var overflowMenu = document.createElement('div');
  overflowMenu.className = 'th-android-menu';
  overflowMenu.innerHTML =
    '<button type="button" class="th-menu-item th-android-install-btn" id="th-menu-install" style="display:none;">' +
      '<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' +
      '<span>Install Android App</span>' +
    '</button>' +
    '<a href="settings.html" class="th-menu-item">' +
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
      '<span>Salon Settings</span>' +
    '</a>' +
    '<button type="button" class="th-menu-item" id="th-menu-fullscreen">' +
      '<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>' +
      '<span>Toggle Fullscreen</span>' +
    '</button>' +
    '<button type="button" class="th-menu-item" id="th-menu-refresh">' +
      '<svg viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>' +
      '<span>Refresh Salon State</span>' +
    '</button>';

  overflowBtn.addEventListener('click', function(e){
    e.stopPropagation();
    overflowMenu.classList.toggle('open');
  });
  document.addEventListener('click', function(){
    overflowMenu.classList.remove('open');
  });

  actionsCol.appendChild(overflowBtn);
  document.body.appendChild(overflowMenu);
  topBar.appendChild(actionsCol);

  // Wire overflow menu events
  setTimeout(function(){
    var installItem = document.getElementById('th-menu-install');
    if(installItem){
      installItem.addEventListener('click', function(){
        overflowMenu.classList.remove('open');
        if(deferredPrompt){
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function(res){
            if(res.outcome === 'accepted'){
              window.THAndroidToast('Installing Truefitt & Hill App...');
            }
            deferredPrompt = null;
          });
        } else {
          window.THAndroidToast('To install: open browser menu and tap "Add to Home screen"');
        }
      });
    }

    var fullItem = document.getElementById('th-menu-fullscreen');
    if(fullItem){
      fullItem.addEventListener('click', function(){
        overflowMenu.classList.remove('open');
        if(!document.fullscreenElement){
          document.documentElement.requestFullscreen().catch(function(){});
          window.THAndroidToast('Entered Fullscreen');
        } else {
          document.exitFullscreen().catch(function(){});
          window.THAndroidToast('Exited Fullscreen');
        }
      });
    }

    var refreshItem = document.getElementById('th-menu-refresh');
    if(refreshItem){
      refreshItem.addEventListener('click', function(){
        overflowMenu.classList.remove('open');
        window.THAndroidToast('Syncing salon state...');
        setTimeout(function(){ window.location.reload(); }, 350);
      });
    }
  }, 100);

  /* --- 2. Build Material Design 3 Bottom Navigation Bar --- */
  var M3_DESTINATIONS = [
    {
      href: 'index.html',
      label: 'Hub',
      icon: '<path d="M3 10.5L12 3l9 7.5M5 9.5v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1v-10"/>'
    },
    {
      href: 'service-calculator.html',
      label: 'Billing',
      icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>'
    },
    {
      href: 'serial-queue.html',
      label: 'Queue',
      icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'
    },
    {
      href: 'task-manager.html',
      label: 'Tasks',
      icon: '<path d="M9 11l2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="3"/>'
    },
    {
      isSheet: true,
      label: 'Apps',
      icon: '<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>'
    }
  ];

  var bottomNav = document.createElement('nav');
  bottomNav.className = 'th-android-bottom-nav';
  bottomNav.setAttribute('aria-label', 'Android Navigation Bar');

  var isKnownBottomTab = M3_DESTINATIONS.slice(0, 4).some(function(it){
    return it.href.toLowerCase() === path;
  });

  M3_DESTINATIONS.forEach(function(item){
    if(item.isSheet){
      var btn = document.createElement('button');
      btn.type = 'button';
      var isAppsActive = !isKnownBottomTab;
      btn.className = 'th-m3-nav-item' + (isAppsActive ? ' active' : '');
      btn.setAttribute('aria-label', 'Open all atelier salon apps');
      btn.innerHTML =
        '<div class="th-m3-icon-pill"><svg viewBox="0 0 24 24">' + item.icon + '</svg></div>' +
        '<span class="th-m3-label">' + item.label + '</span>';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        openAndroidSheet();
      });
      bottomNav.appendChild(btn);
    } else {
      var a = document.createElement('a');
      a.href = item.href;
      var isCur = (item.href.toLowerCase() === path);
      a.className = 'th-m3-nav-item' + (isCur ? ' active' : '');
      var featKey = HREF_TO_FEAT[item.href];
      if(featKey) a.setAttribute('data-feat', featKey);
      if(isCur) a.setAttribute('aria-current', 'page');
      a.innerHTML =
        '<div class="th-m3-icon-pill"><svg viewBox="0 0 24 24">' + item.icon + '</svg></div>' +
        '<span class="th-m3-label">' + item.label + '</span>';
      bottomNav.appendChild(a);
    }
  });

  /* --- 3. Build Material Design 3 Floating Action Button (FAB) & Speed Dial --- */
  var fabScrim = document.createElement('div');
  fabScrim.className = 'th-fab-scrim';
  document.body.appendChild(fabScrim);

  var fabContainer = document.createElement('div');
  fabContainer.className = 'th-android-fab-container';

  var speedDialList = document.createElement('div');
  speedDialList.className = 'th-speed-dial-list';
  speedDialList.innerHTML =
    '<a href="service-calculator.html" class="th-speed-dial-item">' +
      '<span class="th-speed-dial-label">Quick Bill &middot; Calculator</span>' +
      '<div class="th-speed-dial-mini-fab"><svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/></svg></div>' +
    '</a>' +
    '<a href="serial-queue.html" class="th-speed-dial-item">' +
      '<span class="th-speed-dial-label">Chair Rotation Turn</span>' +
      '<div class="th-speed-dial-mini-fab"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></div>' +
    '</a>' +
    '<a href="notes.html" class="th-speed-dial-item">' +
      '<span class="th-speed-dial-label">Shift Handover Note</span>' +
      '<div class="th-speed-dial-mini-fab"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>' +
    '</a>' +
    '<a href="task-manager.html" class="th-speed-dial-item">' +
      '<span class="th-speed-dial-label">Add Daily Shift Task</span>' +
      '<div class="th-speed-dial-mini-fab"><svg viewBox="0 0 24 24"><path d="M9 11l2 2 4-4"/><rect x="3" y="4" width="18" height="16" rx="3"/></svg></div>' +
    '</a>' +
    '<a href="product-requests.html" class="th-speed-dial-item">' +
      '<span class="th-speed-dial-label">Stock Requisition</span>' +
      '<div class="th-speed-dial-mini-fab"><svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/></svg></div>' +
    '</a>';

  var mainFab = document.createElement('button');
  mainFab.type = 'button';
  mainFab.className = 'th-main-fab';
  mainFab.setAttribute('aria-label', 'Quick Actions Speed Dial');
  mainFab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';

  function toggleSpeedDial(){
    var isOpen = mainFab.classList.contains('open');
    if(isOpen){
      mainFab.classList.remove('open');
      speedDialList.classList.remove('open');
      fabScrim.classList.remove('open');
    } else {
      mainFab.classList.add('open');
      speedDialList.classList.add('open');
      fabScrim.classList.add('open');
    }
  }

  mainFab.addEventListener('click', toggleSpeedDial);
  fabScrim.addEventListener('click', toggleSpeedDial);

  fabContainer.appendChild(speedDialList);
  fabContainer.appendChild(mainFab);

  /* --- 4. Build Material Design 3 Modal Bottom Sheet (App Drawer Launcher) --- */
  var sheetScrim = document.createElement('div');
  sheetScrim.className = 'th-m3-sheet-scrim';

  var bottomSheet = document.createElement('div');
  bottomSheet.className = 'th-m3-bottom-sheet';
  bottomSheet.setAttribute('role', 'dialog');
  bottomSheet.setAttribute('aria-modal', 'true');
  bottomSheet.setAttribute('aria-label', 'Atelier App Drawer');

  // Drag handle
  var handle = document.createElement('div');
  handle.className = 'th-sheet-drag-handle';
  bottomSheet.appendChild(handle);

  // Header
  var sheetHeader = document.createElement('div');
  sheetHeader.className = 'th-sheet-header';
  sheetHeader.innerHTML =
    '<div class="th-sheet-title">Atelier Apps &amp; Suites</div>' +
    '<button type="button" class="th-sheet-close" id="th-sheet-close-btn" aria-label="Close sheet">&#10005;</button>';
  bottomSheet.appendChild(sheetHeader);

  // Real-time Search Box
  var searchWrap = document.createElement('div');
  searchWrap.className = 'th-sheet-search-wrap';
  searchWrap.innerHTML =
    '<div class="th-sheet-search-box">' +
      '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="text" class="th-sheet-search-input" id="th-app-search-input" placeholder="Search salon tools &amp; suites...">' +
    '</div>';
  bottomSheet.appendChild(searchWrap);

  // Body with 9 App Launcher Tiles
  var sheetBody = document.createElement('div');
  sheetBody.className = 'th-sheet-body';

  var appGrid = document.createElement('div');
  appGrid.className = 'th-app-grid';
  appGrid.id = 'th-apps-grid-container';

  var ALL_TOOLS = [
    { href: 'index.html', name: 'Staff Hub', tag: 'Core', icon: NAV_GROUPS[0].items[0].icon },
    { href: 'service-calculator.html', name: 'Billing', tag: 'Front Desk', icon: NAV_GROUPS[1].items[0].icon },
    { href: 'serial-queue.html', name: 'Queue', tag: 'Chairs', icon: NAV_GROUPS[1].items[1].icon },
    { href: 'task-manager.html', name: 'Tasks', tag: 'Daily', icon: NAV_GROUPS[0].items[1].icon },
    { href: 'station-checklist.html', name: 'Stations', tag: 'Inspection', icon: NAV_GROUPS[1].items[2].icon },
    { href: 'notes.html', name: 'Shift Notes', tag: 'Logbook', icon: NAV_GROUPS[0].items[2].icon },
    { href: 'requirements.html', name: 'Requirements', tag: 'Shortages', icon: NAV_GROUPS[2].items[0].icon },
    { href: 'products.html', name: 'Catalog', tag: 'Stock', icon: NAV_GROUPS[2].items[1].icon },
    { href: 'product-requests.html', name: 'Requests', tag: 'Internal', icon: NAV_GROUPS[2].items[2].icon },
    { href: 'settings.html', name: 'Settings', tag: 'Config', icon: NAV_GROUPS[3].items[0].icon }
  ];

  ALL_TOOLS.forEach(function(tool){
    var isCur = (tool.href.toLowerCase() === path);
    var a = document.createElement('a');
    a.href = tool.href;
    a.className = 'th-app-tile' + (isCur ? ' active' : '');
    a.setAttribute('data-name', tool.name.toLowerCase());
    var featKey = HREF_TO_FEAT[tool.href];
    if(featKey) a.setAttribute('data-feat', featKey);
    a.innerHTML =
      '<div class="th-app-tile-icon"><svg viewBox="0 0 24 24">' + tool.icon + '</svg></div>' +
      '<span class="th-app-tile-label">' + tool.name + '</span>' +
      '<span class="th-app-tile-tag">' + tool.tag + '</span>';
    appGrid.appendChild(a);
  });
  sheetBody.appendChild(appGrid);

  // Quick settings section
  var sheetSettings = document.createElement('div');
  sheetSettings.className = 'th-sheet-settings';
  sheetSettings.innerHTML =
    '<div class="th-sheet-row">' +
      '<span>Dark / Light Appearance</span>' +
      '<button type="button" class="th-icon-btn" id="th-sheet-theme-btn" style="width:auto;padding:4px 12px;border-radius:999px;background:var(--th-m3-primary-container);color:var(--th-gold);font-size:12px;font-weight:600;">Switch Theme</button>' +
    '</div>' +
    '<button type="button" class="th-sheet-row th-android-install-btn" id="th-sheet-install-btn" style="width:100%;cursor:pointer;color:var(--th-gold);text-align:left;display:none;">' +
      '<span>Install Truefitt &amp; Hill Android App</span>' +
      '<span style="font-size:11px;opacity:0.8;">Add to Home &rarr;</span>' +
    '</button>';
  sheetBody.appendChild(sheetSettings);
  bottomSheet.appendChild(sheetBody);

  function openAndroidSheet(){
    bottomSheet.classList.add('open');
    sheetScrim.classList.add('open');
  }
  function closeAndroidSheet(){
    bottomSheet.classList.remove('open');
    sheetScrim.classList.remove('open');
  }

  // Connect to global window functions so existing drawers trigger this smooth sheet
  window.THOpenDrawer = openAndroidSheet;
  window.THCloseDrawer = closeAndroidSheet;

  sheetScrim.addEventListener('click', closeAndroidSheet);
  var sheetCloseBtn = bottomSheet.querySelector('#th-sheet-close-btn');
  if(sheetCloseBtn) sheetCloseBtn.addEventListener('click', closeAndroidSheet);

  // App Search filtering
  var searchInput = document.getElementById('th-app-search-input');
  if(searchInput){
    searchInput.addEventListener('input', function(e){
      var q = e.target.value.toLowerCase().trim();
      var tiles = appGrid.querySelectorAll('.th-app-tile');
      tiles.forEach(function(tile){
        var name = tile.getAttribute('data-name') || '';
        if(!q || name.indexOf(q) !== -1){
          tile.style.display = '';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  }

  // Sheet quick theme button
  var sheetThemeBtn = document.getElementById('th-sheet-theme-btn');
  if(sheetThemeBtn){
    sheetThemeBtn.addEventListener('click', function(){
      if(window.THTheme && window.THTheme.toggle){
        window.THTheme.toggle();
      } else {
        var isLight = document.body.classList.contains('light');
        if(isLight) document.body.classList.remove('light');
        else document.body.classList.add('light');
        try{ localStorage.setItem('th-theme', isLight ? 'dark' : 'light'); }catch(e){}
      }
      updateThemeIcon();
      window.THAndroidToast(document.body.classList.contains('light') ? 'Light Theme Active' : 'Dark Theme Active');
    });
  }

  // Sheet install button
  var sheetInstallBtn = document.getElementById('th-sheet-install-btn');
  if(sheetInstallBtn){
    sheetInstallBtn.addEventListener('click', function(){
      closeAndroidSheet();
      if(deferredPrompt){
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(res){
          if(res.outcome === 'accepted'){
            window.THAndroidToast('Installing Truefitt & Hill App...');
          }
          deferredPrompt = null;
        });
      } else {
        window.THAndroidToast('To install: open browser menu and tap "Add to Home screen"');
      }
    });
  }

  /* --- 5. Build Desktop Workspace Sidebar (for wide screens) --- */
  var sidebar = document.createElement('aside');
  sidebar.className = 'th-desktop-sidebar';
  sidebar.setAttribute('aria-label', 'Atelier Desktop Sidebar');

  var brandDiv = document.createElement('div');
  brandDiv.className = 'th-side-brand';
  brandDiv.innerHTML =
    '<div class="th-side-crest">' +
      '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v5c0 5-3.5 9-8 11C7.5 19 4 15 4 10V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>' +
    '</div>' +
    '<div class="th-side-brand-text">' +
      '<div class="th-side-title">Truefitt &amp; Hill</div>' +
      '<div class="th-side-subtitle">London &middot; Mayfair</div>' +
    '</div>';
  sidebar.appendChild(brandDiv);

  var userCard = document.createElement('div');
  userCard.className = 'th-side-user-card';
  userCard.innerHTML =
    '<div class="th-side-avatar">TH</div>' +
    '<div class="th-side-user-info">' +
      '<div class="th-side-user-name">Atelier Staff</div>' +
      '<div class="th-side-status-pill"><span class="th-side-status-dot"></span>Floor Shift Active</div>' +
    '</div>';
  sidebar.appendChild(userCard);

  var navGroupsDiv = document.createElement('div');
  navGroupsDiv.className = 'th-side-nav-groups';

  NAV_GROUPS.forEach(function(grp){
    var grpBlock = document.createElement('div');
    grpBlock.className = 'th-side-grp';

    var label = document.createElement('div');
    label.className = 'th-side-cat-label';
    label.textContent = grp.group;
    grpBlock.appendChild(label);

    var itemsList = document.createElement('div');
    itemsList.className = 'th-side-items';

    grp.items.forEach(function(item){
      var isCur = (item.href.toLowerCase() === path);
      var link = document.createElement('a');
      link.href = item.href;
      link.className = 'th-side-item' + (isCur ? ' active' : '');
      var featKey = HREF_TO_FEAT[item.href];
      if(featKey) link.setAttribute('data-feat', featKey);
      if(isCur) link.setAttribute('aria-current', 'page');
      link.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
      itemsList.appendChild(link);
    });

    grpBlock.appendChild(itemsList);
    navGroupsDiv.appendChild(grpBlock);
  });
  sidebar.appendChild(navGroupsDiv);

  var footerDiv = document.createElement('div');
  footerDiv.className = 'th-side-footer';

  var toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'th-side-toggle-btn';
  toggleBtn.innerHTML = '<span>Appearance</span><span id="th-side-theme-label">' + (document.body.classList.contains('light') ? 'Light Mode' : 'Dark Mode') + '</span>';
  toggleBtn.addEventListener('click', function(){
    if(window.THTheme && window.THTheme.toggle){
      window.THTheme.toggle();
    } else {
      var isLight = document.body.classList.contains('light');
      if(isLight) document.body.classList.remove('light');
      else document.body.classList.add('light');
      try{ localStorage.setItem('th-theme', isLight ? 'dark' : 'light'); }catch(e){}
    }
    var currentIsLight = document.body.classList.contains('light');
    var lbl = document.getElementById('th-side-theme-label');
    if(lbl) lbl.textContent = (currentIsLight ? 'Light Mode' : 'Dark Mode');
    updateThemeIcon();
  });
  footerDiv.appendChild(toggleBtn);

  var cloudBadge = document.createElement('div');
  cloudBadge.className = 'th-side-cloud-badge';
  cloudBadge.innerHTML = '&bull; Live Cloud Connected';
  footerDiv.appendChild(cloudBadge);
  sidebar.appendChild(footerDiv);

  /* --- Dynamic Feature Filtering --- */
  function updateNavVisibility(){
    if(!window.THFeatures) return;
    document.querySelectorAll('[data-feat]').forEach(function(el){
      var f = el.getAttribute('data-feat');
      if(!f) return;
      var enabled = window.THFeatures.isEnabled(f);
      el.style.display = enabled ? '' : 'none';
    });
    document.querySelectorAll('.th-side-grp').forEach(function(grp){
      var visibleItems = grp.querySelectorAll('.th-side-item:not([style*="display: none"])');
      grp.style.display = (visibleItems.length === 0) ? 'none' : '';
    });
  }

  /* --- Mount to DOM --- */
  function mount(){
    if(!document.body){
      document.addEventListener('DOMContentLoaded', mount);
      return;
    }
    document.body.classList.add('th-has-sidebar');
    document.body.classList.add('th-has-top-bar');
    if(path === 'service-calculator.html'){
      document.body.classList.add('th-page-service-calculator');
    }
    document.body.appendChild(topBar);
    document.body.appendChild(sidebar);
    document.body.appendChild(bottomNav);
    document.body.appendChild(fabContainer);
    document.body.appendChild(sheetScrim);
    document.body.appendChild(bottomSheet);
    reserveSpace();
    updateNavVisibility();
    window.addEventListener('th-features-changed', updateNavVisibility);
  }

  function reserveSpace(){
    if(window.innerWidth >= 1024){
      var spacers = document.querySelectorAll('.th-nav-spacer');
      spacers.forEach(function(s){ s.style.display = 'none'; });
      var totalBlockDesktop = document.querySelector('.total-block');
      if(totalBlockDesktop) totalBlockDesktop.style.bottom = '';
      return;
    }
    var navHeight = bottomNav.offsetHeight || 72;
    var h = navHeight + 24;
    var right = document.querySelector('.right');
    var left = document.getElementById('left-panel') || document.querySelector('.left');

    if(right || left){
      [right, left].forEach(function(col){
        if(!col) return;
        var existing = col.querySelector(':scope > .th-nav-spacer');
        if(!existing){
          var spacer = document.createElement('div');
          spacer.className = 'th-nav-spacer';
          spacer.setAttribute('aria-hidden', 'true');
          spacer.style.height = h + 'px';
          spacer.style.flex = '0 0 auto';
          col.appendChild(spacer);
        } else {
          existing.style.display = 'block';
          existing.style.height = h + 'px';
        }
      });
    }

    var totalBlock = document.querySelector('.total-block');
    if(totalBlock && window.innerWidth < 1024){
      totalBlock.style.bottom = navHeight + 'px';
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
  window.addEventListener('resize', reserveSpace);

})();
