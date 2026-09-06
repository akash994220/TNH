/* Truefitt & Hill — Staff Tools: shared bottom capsule nav.
   Include identically on every page, including Home:
     <script src="nav.js"></script>
   Injects its own styles + markup and reserves layout space automatically,
   so no other page needs manual CSS changes to accommodate it. */
(function(){

  var NAV_ITEMS = [
    {
      href: 'index.html',
      label: 'Home',
      icon: '<path d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-9" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      href: 'service-calculator.html',
      label: 'Calculator',
      icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" stroke-linecap="round"/>'
    },
    {
      href: 'serial-queue.html',
      label: 'Queue',
      icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      href: 'task-manager.html',
      label: 'Tasks',
      icon: '<path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="4" width="18" height="16" rx="3"/>'
    },
    {
      href: 'station-checklist.html',
      label: 'Stations',
      icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17 14.5v6M14 17.5h6" stroke-linecap="round"/>'
    },
    {
      isMore: true,
      label: 'More',
      icon: '<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>'
    }
  ];

  var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === ''){
    path = 'index.html';
  }

  var isPrimaryPage = NAV_ITEMS.slice(0, 5).some(function(it){
    return it.href.toLowerCase() === path;
  });

  var style = document.createElement('style');
  style.textContent =
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
    '@media (prefers-reduced-motion: reduce){.th-nav-item, .th-capsule-nav{transition:none;}}';
  document.head.appendChild(style);

  var nav = document.createElement('nav');
  nav.className = 'th-capsule-nav';
  nav.setAttribute('aria-label', 'Staff tools navigation');

  NAV_ITEMS.forEach(function(item){
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
      nav.appendChild(btn);
    } else {
      var a = document.createElement('a');
      a.href = item.href;
      var isCur = (item.href.toLowerCase() === path);
      a.className = 'th-nav-item' + (isCur ? ' active' : '');
      if(isCur) a.setAttribute('aria-current', 'page');
      a.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
      nav.appendChild(a);
    }
  });

  document.body.appendChild(nav);

  // Reserve layout space so page content never sits behind the fixed nav,
  // regardless of whether the page is a normal document-flow layout
  // (Task Manager, Station Checklist, Notes) or a split-panel layout
  // with independently scrolling columns (Service Calculator).
  function reserveSpace(){
    var h = nav.offsetHeight + 14;

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
      totalBlock.style.bottom = (nav.offsetHeight + 6) + 'px';
    }
  }

  if(document.readyState === 'complete'){
    reserveSpace();
  } else {
    window.addEventListener('load', reserveSpace);
  }
  window.addEventListener('resize', reserveSpace);

})();
