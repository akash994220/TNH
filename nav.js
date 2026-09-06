/* Truefitt & Hill — Staff Tools: Unified Desktop Workspace Sidebar & Mobile Capsule Nav.
   Provides:
   1. Desktop (>= 1024px): A full-height, fixed left workspace sidebar inspired by modern SaaS UI (Panze & Prodify),
      featuring Truefitt & Hill Royal Crest branding, staff profile status, categorized navigation with active indicators,
      and appearance / cloud sync controls.
   2. Mobile (< 1024px): The elegant Mayfair bottom capsule nav with smooth drawer trigger.
*/
(function(){

  var NAV_GROUPS = [
    {
      group: 'MAIN MENU',
      items: [
        {
          href: 'index.html',
          label: 'Staff Hub',
          desc: 'Main salon dashboard',
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
    }
  ];

  // Flat list for mobile capsule
  var MOBILE_NAV_ITEMS = [
    { href: 'index.html', label: 'Home', icon: NAV_GROUPS[0].items[0].icon },
    { href: 'service-calculator.html', label: 'Calculator', icon: NAV_GROUPS[1].items[0].icon },
    { href: 'serial-queue.html', label: 'Queue', icon: NAV_GROUPS[1].items[1].icon },
    { href: 'task-manager.html', label: 'Tasks', icon: NAV_GROUPS[0].items[1].icon },
    { href: 'station-checklist.html', label: 'Stations', icon: NAV_GROUPS[1].items[2].icon },
    { isMore: true, label: 'More', icon: '<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>' }
  ];

  var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === '') path = 'index.html';

  var isPrimaryPage = MOBILE_NAV_ITEMS.slice(0, 5).some(function(it){
    return it.href.toLowerCase() === path;
  });

  // Inject Styles
  var style = document.createElement('style');
  style.textContent =
    /* --- Shared Reset & Variables --- */
    ':root{' +
      '--th-side-width:270px;' +
      '--th-side-bg:linear-gradient(180deg, rgba(13,20,44,0.97) 0%, rgba(7,10,24,0.99) 100%);' +
      '--th-side-border:rgba(217,184,114,0.22);' +
      '--th-gold:#d9b872;' +
      '--th-gold-soft:rgba(217,184,114,0.12);' +
    '}' +
    'body.light{' +
      '--th-side-bg:linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,248,254,0.98) 100%);' +
      '--th-side-border:rgba(26,58,143,0.14);' +
      '--th-gold:#1a3a8f;' +
      '--th-gold-soft:rgba(26,58,143,0.08);' +
    '}' +

    /* --- Desktop Sidebar Layout --- */
    '@media (min-width: 1024px){' +
      '.th-capsule-nav{display:none !important;}' +
      '.th-burger{display:none !important;}' +
      '.th-theme-btn{display:none !important;}' +
      'body{padding-left:270px !important;}' +
      'body.th-has-sidebar{transition:padding-left .2s ease;}' +
      '.th-desktop-sidebar{' +
        'position:fixed;left:0;top:0;bottom:0;width:270px;z-index:9999;' +
        'background:var(--th-side-bg);' +
        'border-right:1px solid var(--th-side-border);' +
        'backdrop-filter:blur(30px) saturate(140%);-webkit-backdrop-filter:blur(30px) saturate(140%);' +
        'box-shadow:8px 0 32px rgba(0,0,0,0.45), inset -1px 0 0 rgba(255,255,255,0.04);' +
        'display:flex;flex-direction:column;padding:22px 16px 18px;overflow-y:auto;' +
        'scrollbar-width:none;' +
      '}' +
      '.th-desktop-sidebar::-webkit-scrollbar{display:none;}' +

      /* Header / Crest in Sidebar */
      '.th-side-brand{' +
        'display:flex;align-items:center;gap:12px;padding:0 6px 18px;margin-bottom:14px;' +
        'border-bottom:1px solid var(--th-side-border);' +
      '}' +
      '.th-side-crest{' +
        'width:40px;height:40px;border-radius:12px;border:1px solid rgba(217,184,114,0.4);' +
        'background:linear-gradient(135deg, rgba(217,184,114,0.2), rgba(217,184,114,0.05));' +
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;' +
        'box-shadow:0 4px 14px rgba(0,0,0,0.3);' +
      '}' +
      'body.light .th-side-crest{border-color:rgba(26,58,143,0.3);background:rgba(26,58,143,0.06);box-shadow:0 4px 12px rgba(12,27,51,0.06);}' +
      '.th-side-crest svg{width:20px;height:20px;stroke:#d9b872;fill:none;stroke-width:1.6;}' +
      'body.light .th-side-crest svg{stroke:#1a3a8f;}' +
      '.th-side-brand-text{display:flex;flex-direction:column;}' +
      '.th-side-title{font-family:"Playfair Display",serif;font-weight:700;font-size:15px;color:var(--th-gold);letter-spacing:0.4px;line-height:1.2;}' +
      '.th-side-subtitle{font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:rgba(243,239,228,0.5);margin-top:2px;}' +
      'body.light .th-side-subtitle{color:rgba(10,31,68,0.55);}' +

      /* Staff Status Card (Prodify Inspired) */
      '.th-side-user-card{' +
        'display:flex;align-items:center;gap:11px;padding:10px 12px;margin-bottom:16px;' +
        'background:rgba(4,7,18,0.45);border:1px solid var(--th-side-border);border-radius:16px;' +
        'box-shadow:inset 0 1px 3px rgba(0,0,0,0.3);' +
      '}' +
      'body.light .th-side-user-card{background:rgba(26,58,143,0.04);box-shadow:none;}' +
      '.th-side-avatar{' +
        'width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#fae6a2,#d9b872);' +
        'display:flex;align-items:center;justify-content:center;color:#140e03;font-weight:700;font-size:12px;flex-shrink:0;' +
      '}' +
      'body.light .th-side-avatar{background:linear-gradient(135deg,#1f47b2,#10296e);color:#ffffff;}' +
      '.th-side-user-info{flex:1;min-width:0;}' +
      '.th-side-user-name{font-size:12.5px;font-weight:600;color:#f3efe4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2;}' +
      'body.light .th-side-user-name{color:#0a1f44;}' +
      '.th-side-status-pill{display:inline-flex;align-items:center;gap:5px;font-size:10px;color:#4ade80;font-weight:500;margin-top:2px;}' +
      '.th-side-status-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80;}' +

      /* Category Groups */
      '.th-side-nav-groups{display:flex;flex-direction:column;gap:14px;flex:1;}' +
      '.th-side-cat-label{font-size:9.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:rgba(217,184,114,0.65);padding:0 8px;margin-bottom:4px;}' +
      'body.light .th-side-cat-label{color:rgba(26,58,143,0.7);}' +
      '.th-side-items{display:flex;flex-direction:column;gap:3px;}' +
      '.th-side-item{' +
        'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:12px;' +
        'text-decoration:none;color:rgba(243,239,228,0.7);font-size:12.5px;font-weight:500;' +
        'transition:all .18s cubic-bezier(0.16,1,0.3,1);position:relative;' +
      '}' +
      'body.light .th-side-item{color:rgba(10,31,68,0.72);}' +
      '.th-side-item svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;transition:transform .18s ease;}' +
      '.th-side-item:hover{color:#f3efe4;background:rgba(217,184,114,0.08);transform:translateX(2px);}' +
      'body.light .th-side-item:hover{color:#0a1f44;background:rgba(26,58,143,0.06);}' +
      '.th-side-item.active{' +
        'background:linear-gradient(135deg,#fae6a2 0%,#d9b872 50%,#aa8232 100%);' +
        'color:#140e03;font-weight:700;' +
        'box-shadow:0 4px 14px rgba(217,184,114,0.4), inset 0 1px 0 rgba(255,255,255,0.6);' +
      '}' +
      '.th-side-item.active svg{stroke:#140e03;stroke-width:2;}' +
      'body.light .th-side-item.active{' +
        'background:linear-gradient(135deg,#1f47b2 0%,#10296e 100%);' +
        'color:#ffffff;font-weight:600;' +
        'box-shadow:0 4px 14px rgba(26,58,143,0.35), inset 0 1px 0 rgba(255,255,255,0.3);' +
      '}' +
      'body.light .th-side-item.active svg{stroke:#ffffff;stroke-width:2;}' +

      /* Sidebar Footer */
      '.th-side-footer{margin-top:18px;padding-top:14px;border-top:1px solid var(--th-side-border);display:flex;flex-direction:column;gap:8px;}' +
      '.th-side-toggle-btn{' +
        'display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:10px;' +
        'background:rgba(217,184,114,0.06);border:1px solid var(--th-side-border);color:var(--th-gold);' +
        'font-size:11.5px;font-weight:600;cursor:pointer;transition:all .18s ease;width:100%;' +
      '}' +
      '.th-side-toggle-btn:hover{background:rgba(217,184,114,0.14);transform:translateY(-1px);}' +
      'body.light .th-side-toggle-btn{background:rgba(26,58,143,0.05);color:#1a3a8f;}' +
      '.th-side-cloud-badge{font-size:10px;color:rgba(243,239,228,0.45);text-align:center;padding:2px 0;letter-spacing:0.3px;}' +
      'body.light .th-side-cloud-badge{color:rgba(10,31,68,0.45);}' +
    '}' +

    /* --- Mobile Styles (<1024px) --- */
    '@media (max-width: 1023px){' +
      '.th-desktop-sidebar{display:none !important;}' +
      '.th-capsule-nav{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:10000;' +
        'display:flex;align-items:center;gap:4px;padding:6px 8px;border-radius:999px;' +
        'background:linear-gradient(180deg, rgba(14,20,44,0.92) 0%, rgba(8,12,28,0.96) 100%);' +
        'border:1px solid rgba(217,184,114,0.38);' +
        'backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);' +
        'box-shadow:0 24px 60px -16px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(0,0,0,0.4);' +
        'padding-bottom:calc(6px + env(safe-area-inset-bottom));max-width:calc(100vw - 16px);transition:all .25s ease;}' +
      '.th-nav-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;' +
        'width:54px;height:48px;border-radius:999px;text-decoration:none;color:rgba(243,239,228,0.55);' +
        'font-family:"Poppins",sans-serif;transition:all .2s cubic-bezier(0.16,1,0.3,1);flex:0 0 auto;border:none;background:transparent;cursor:pointer;padding:0;position:relative;}' +
      '.th-nav-item svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.6;transition:transform .2s ease;}' +
      '.th-nav-item span{font-size:9px;font-weight:500;letter-spacing:0.3px;white-space:nowrap;line-height:1;}' +
      '.th-nav-item:hover{color:#f3efe4;background:rgba(217,184,114,0.08);transform:translateY(-1px);}' +
      '.th-nav-item:hover svg{transform:scale(1.08);}' +
      '.th-nav-item.active{color:#140e03;background:linear-gradient(135deg,#fae6a2 0%,#d9b872 50%,#aa8232 100%);' +
        'font-weight:600;box-shadow:0 6px 18px -2px rgba(217,184,114,0.55), inset 0 1px 0 rgba(255,255,255,0.6);' +
        'transform:translateY(-1px);}' +
      '.th-nav-item.active svg{stroke:#140e03;stroke-width:1.9;}' +
      'body.light .th-capsule-nav{background:linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(244,247,253,0.96) 100%);' +
        'border-color:rgba(26,58,143,0.28);' +
        'box-shadow:0 20px 50px -16px rgba(12,27,51,0.22), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(26,58,143,0.06);}' +
      'body.light .th-nav-item{color:rgba(12,27,51,0.58);}' +
      'body.light .th-nav-item:hover{color:#0a1f44;background:rgba(26,58,143,0.06);}' +
      'body.light .th-nav-item.active{color:#ffffff;background:linear-gradient(135deg,#1f47b2 0%,#10296e 100%);' +
        'box-shadow:0 6px 18px -2px rgba(26,58,143,0.45), inset 0 1px 0 rgba(255,255,255,0.35);}' +
      'body.light .th-nav-item.active svg{stroke:#ffffff;stroke-width:1.9;}' +
      '@media (max-width:390px){.th-nav-item{width:46px;height:44px;}.th-nav-item svg{width:16px;height:16px;}.th-nav-item span{font-size:8px;}}' +
    '}';
  document.head.appendChild(style);

  /* --- 1. Build Desktop Workspace Sidebar --- */
  var sidebar = document.createElement('aside');
  sidebar.className = 'th-desktop-sidebar';
  sidebar.setAttribute('aria-label', 'Atelier Desktop Sidebar');

  // Brand header
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

  // Staff status card
  var userCard = document.createElement('div');
  userCard.className = 'th-side-user-card';
  userCard.innerHTML =
    '<div class="th-side-avatar">TH</div>' +
    '<div class="th-side-user-info">' +
      '<div class="th-side-user-name">Atelier Staff</div>' +
      '<div class="th-side-status-pill"><span class="th-side-status-dot"></span>Floor Shift Active</div>' +
    '</div>';
  sidebar.appendChild(userCard);

  // Nav categories
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
      if(isCur) link.setAttribute('aria-current', 'page');
      link.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
      itemsList.appendChild(link);
    });

    grpBlock.appendChild(itemsList);
    navGroupsDiv.appendChild(grpBlock);
  });

  sidebar.appendChild(navGroupsDiv);

  // Footer with theme switch and sync status
  var footerDiv = document.createElement('div');
  footerDiv.className = 'th-side-footer';

  var toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'th-side-toggle-btn';
  toggleBtn.innerHTML = '<span>Appearance</span><span id="th-side-theme-label">' + (document.body.classList.contains('light') ? 'Light Mode' : 'Dark Mode') + '</span>';
  toggleBtn.addEventListener('click', function(){
    var isLight = document.body.classList.contains('light');
    var newTheme = isLight ? 'dark' : 'light';
    if(newTheme === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');
    try{ localStorage.setItem('th-theme', newTheme); }catch(e){}
    var lbl = document.getElementById('th-side-theme-label');
    if(lbl) lbl.textContent = (newTheme === 'light' ? 'Light Mode' : 'Dark Mode');
  });
  footerDiv.appendChild(toggleBtn);

  var cloudBadge = document.createElement('div');
  cloudBadge.className = 'th-side-cloud-badge';
  cloudBadge.innerHTML = '&bull; Live Cloud Connected';
  footerDiv.appendChild(cloudBadge);

  sidebar.appendChild(footerDiv);

  /* --- 2. Build Mobile Capsule Nav (<1024px) --- */
  var mobileNav = document.createElement('nav');
  mobileNav.className = 'th-capsule-nav';
  mobileNav.setAttribute('aria-label', 'Staff tools mobile navigation');

  MOBILE_NAV_ITEMS.forEach(function(item){
    if(item.isMore){
      var btn = document.createElement('button');
      btn.type = 'button';
      var isMoreActive = !isPrimaryPage;
      btn.className = 'th-nav-item' + (isMoreActive ? ' active' : '');
      btn.setAttribute('aria-label', 'All salon tools and settings');
      btn.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        if(window.THOpenDrawer) window.THOpenDrawer();
      });
      mobileNav.appendChild(btn);
    } else {
      var a = document.createElement('a');
      a.href = item.href;
      var isCur = (item.href.toLowerCase() === path);
      a.className = 'th-nav-item' + (isCur ? ' active' : '');
      if(isCur) a.setAttribute('aria-current', 'page');
      a.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
      mobileNav.appendChild(a);
    }
  });

  // Inject both to DOM
  function mount(){
    document.body.classList.add('th-has-sidebar');
    document.body.appendChild(sidebar);
    document.body.appendChild(mobileNav);
    reserveSpace();
  }

  function reserveSpace(){
    if(window.innerWidth >= 1024) return;
    var h = mobileNav.offsetHeight + 14;
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
          existing.style.height = h + 'px';
        }
      });
    } else {
      document.body.style.paddingBottom = h + 'px';
    }

    var totalBlock = document.querySelector('.total-block');
    if(totalBlock && window.innerWidth <= 900){
      totalBlock.style.bottom = (mobileNav.offsetHeight + 6) + 'px';
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
  window.addEventListener('resize', reserveSpace);

})();
