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
      href: 'task-manager.html',
      label: 'Tasks',
      icon: '<path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="4" width="18" height="16" rx="3"/>'
    },
    {
      href: 'station-checklist.html',
      label: 'Stations',
      icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17 14.5v6M14 17.5h6" stroke-linecap="round"/>'
    }
  ];

  var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === ''){
    path = 'index.html';
  }

  var style = document.createElement('style');
  style.textContent =
    '.th-capsule-nav{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:10000;' +
      'display:flex;align-items:center;gap:2px;padding:6px;border-radius:999px;' +
      'background:rgba(10,14,26,0.82);border:1px solid rgba(217,184,114,0.28);' +
      'backdrop-filter:blur(20px) saturate(150%);-webkit-backdrop-filter:blur(20px) saturate(150%);' +
      'box-shadow:0 20px 50px -20px rgba(0,0,0,0.7),0 1px 0 rgba(255,255,255,0.05) inset;' +
      'padding-bottom:calc(6px + env(safe-area-inset-bottom));max-width:calc(100vw - 16px);}' +
    '.th-nav-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;' +
      'width:56px;height:52px;border-radius:999px;text-decoration:none;color:rgba(243,239,228,0.55);' +
      'font-family:"Helvetica Neue",Arial,sans-serif;transition:all .2s ease;flex:0 0 auto;}' +
    '.th-nav-item svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.6;}' +
    '.th-nav-item span{font-size:9.5px;letter-spacing:0.2px;white-space:nowrap;}' +
    '.th-nav-item:hover{color:rgba(243,239,228,0.9);}' +
    '.th-nav-item.active{color:#1b1a15;background:linear-gradient(135deg,#e3c684,#a9884f);' +
      'box-shadow:0 6px 16px -4px rgba(217,184,114,0.55);}' +
    '@media (max-width:400px){.th-nav-item{width:47px;}.th-nav-item span{font-size:8.3px;}}' +
    '@media (prefers-reduced-motion: reduce){.th-nav-item{transition:none;}}';
  document.head.appendChild(style);

  var nav = document.createElement('nav');
  nav.className = 'th-capsule-nav';
  nav.setAttribute('aria-label', 'Staff tools navigation');

  NAV_ITEMS.forEach(function(item){
    var a = document.createElement('a');
    a.href = item.href;
    a.className = 'th-nav-item' + (item.href.toLowerCase() === path ? ' active' : '');
    if(item.href.toLowerCase() === path) a.setAttribute('aria-current', 'page');
    a.innerHTML = '<svg viewBox="0 0 24 24">' + item.icon + '</svg><span>' + item.label + '</span>';
    nav.appendChild(a);
  });

  document.body.appendChild(nav);

  // Reserve layout space so page content never sits behind the fixed nav,
  // regardless of whether the page is a normal document-flow layout
  // (Task Manager, Station Checklist, Notes) or a split-panel layout
  // with independently scrolling columns (Service Calculator).
  function reserveSpace(){
    var h = nav.offsetHeight + 16;

    var right = document.querySelector('.right');
    var left = document.getElementById('left-panel') || document.querySelector('.left');

    if(right || left){
      [right, left].forEach(function(col){
        if(!col) return;
        if(!col.querySelector(':scope > .th-nav-spacer')){
          var spacer = document.createElement('div');
          spacer.className = 'th-nav-spacer';
          spacer.setAttribute('aria-hidden', 'true');
          spacer.style.height = h + 'px';
          spacer.style.flex = '0 0 auto';
          col.appendChild(spacer);
        }
      });
    } else {
      document.body.style.paddingBottom = h + 'px';
    }

    // Service Calculator's mobile sticky total bar sticks to bottom:0 —
    // lift it above the capsule nav so the two never overlap.
    var totalBlock = document.querySelector('.total-block');
    if(totalBlock){
      totalBlock.style.bottom = nav.offsetHeight + 'px';
    }
  }

  if(document.readyState === 'complete'){
    reserveSpace();
  } else {
    window.addEventListener('load', reserveSpace);
  }
  window.addEventListener('resize', reserveSpace);

})();
