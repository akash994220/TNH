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
     2. Theme (light / dark) — shared across every page
  --------------------------------------------------------------- */
  function getTheme(){
    try { return localStorage.getItem('th-theme') || 'dark'; } catch(e){ return 'dark'; }
  }
  function setTheme(theme){
    try { localStorage.setItem('th-theme', theme); } catch(e){}
    document.body.classList.toggle('light', theme === 'light');
    var localToggle = document.getElementById('theme-toggle'); // service-calculator's own switch, if present
    if(localToggle) localToggle.checked = (theme === 'light');
    var drawerToggle = document.getElementById('th-theme-toggle');
    if(drawerToggle) drawerToggle.checked = (theme === 'light');
  }
  setTheme(getTheme()); // applied immediately; body may not exist yet if script is in <head>, guarded below
  if(!document.body){
    document.addEventListener('DOMContentLoaded', function(){ setTheme(getTheme()); });
  }
  window.THTheme = { get: getTheme, set: setTheme };

  /* ---------------------------------------------------------------
     3. Burger menu + Settings drawer
  --------------------------------------------------------------- */
  var style = document.createElement('style');
  style.textContent =
    '.th-burger{position:fixed;top:16px;left:16px;z-index:10001;width:42px;height:42px;border-radius:50%;' +
      'border:1px solid rgba(217,184,114,0.4);background:rgba(10,14,26,0.55);backdrop-filter:blur(14px);' +
      '-webkit-backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;cursor:pointer;' +
      'transition:background .15s ease,border-color .15s ease;}' +
    '.th-burger:hover{background:rgba(217,184,114,0.15);border-color:#c9a84c;}' +
    '.th-burger svg{width:19px;height:19px;stroke:#d9b872;fill:none;stroke-width:1.8;stroke-linecap:round;}' +
    'body.light .th-burger{border-color:rgba(26,58,143,0.35);background:rgba(255,255,255,0.6);}' +
    'body.light .th-burger svg{stroke:#1a3a8f;}' +
    '.th-overlay{position:fixed;inset:0;background:rgba(5,7,15,0.55);backdrop-filter:blur(2px);z-index:10002;' +
      'opacity:0;pointer-events:none;transition:opacity .2s ease;}' +
    '.th-overlay.open{opacity:1;pointer-events:auto;}' +
    '.th-drawer{position:fixed;top:0;left:0;height:100%;width:min(320px,86vw);z-index:10003;' +
      'background:linear-gradient(160deg,#0d1535 0%,#080d1e 55%,#120828 100%);' +
      'border-right:1px solid rgba(217,184,114,0.25);box-shadow:20px 0 60px -20px rgba(0,0,0,0.7);' +
      'transform:translateX(-104%);transition:transform .25s ease;display:flex;flex-direction:column;' +
      'font-family:"Poppins",sans-serif;color:#eef2ff;}' +
    '.th-drawer.open{transform:translateX(0);}' +
    'body.light .th-drawer{background:linear-gradient(160deg,#f5f7fc 0%,#eef1fa 55%,#f2effa 100%);color:#0a1f44;' +
      'border-right-color:rgba(26,58,143,0.18);}' +
    '.th-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:22px 20px 14px;' +
      'border-bottom:1px solid rgba(217,184,114,0.18);}' +
    'body.light .th-drawer-head{border-bottom-color:rgba(26,58,143,0.14);}' +
    '.th-drawer-title{font-size:15px;font-weight:600;letter-spacing:0.3px;color:#d9b872;}' +
    'body.light .th-drawer-title{color:#1a3a8f;}' +
    '.th-drawer-close{width:30px;height:30px;border-radius:50%;border:none;background:rgba(255,255,255,0.06);' +
      'color:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;}' +
    'body.light .th-drawer-close{background:rgba(26,58,143,0.08);}' +
    '.th-drawer-body{padding:18px 20px;overflow-y:auto;flex:1 1 auto;}' +
    '.th-section-title{font-size:10.5px;letter-spacing:1.4px;text-transform:uppercase;color:rgba(217,184,114,0.85);' +
      'margin:18px 0 10px;}' +
    '.th-section-title:first-child{margin-top:0;}' +
    'body.light .th-section-title{color:#1a3a8f;}' +
    '.th-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;' +
      'border-radius:14px;background:rgba(255,255,255,0.045);border:1px solid rgba(217,184,114,0.16);margin-bottom:8px;}' +
    'body.light .th-row{background:rgba(255,255,255,0.65);border-color:rgba(26,58,143,0.14);}' +
    '.th-row span{font-size:13px;}' +
    '.th-switch{position:relative;width:40px;height:22px;flex-shrink:0;}' +
    '.th-switch input{opacity:0;width:0;height:0;}' +
    '.th-slider{position:absolute;inset:0;background:rgba(255,255,255,0.15);border-radius:999px;cursor:pointer;' +
      'transition:background .2s ease;}' +
    '.th-slider:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;border-radius:50%;' +
      'background:#fff;transition:transform .2s ease;}' +
    '.th-switch input:checked + .th-slider{background:#1a3a8f;}' +
    '.th-switch input:checked + .th-slider:before{transform:translateX(18px);}' +
    '.th-btn{width:100%;padding:11px;font-size:12.5px;letter-spacing:0.2px;border-radius:12px;cursor:pointer;' +
      'font-family:inherit;background:rgba(255,255,255,0.05);border:1px solid rgba(217,184,114,0.3);' +
      'color:#d9b872;margin-bottom:8px;transition:all .15s ease;}' +
    '.th-btn:hover{background:rgba(217,184,114,0.12);border-color:#c9a84c;}' +
    '.th-btn.danger{color:#e08b7d;border-color:rgba(224,139,125,0.4);}' +
    '.th-btn.danger:hover{background:rgba(224,139,125,0.12);border-color:#e08b7d;}' +
    'body.light .th-btn{color:#1a3a8f;border-color:rgba(26,58,143,0.3);background:rgba(255,255,255,0.5);}' +
    'body.light .th-btn:hover{background:rgba(26,58,143,0.08);}' +
    'body.light .th-btn.danger{color:#b03030;border-color:rgba(176,48,48,0.35);}' +
    '.th-note{font-size:10.5px;line-height:1.5;color:rgba(238,242,255,0.4);margin-top:2px;}' +
    'body.light .th-note{color:rgba(10,31,68,0.5);}' +
    '.th-drawer-foot{padding:14px 20px 20px;text-align:center;font-size:10.5px;letter-spacing:0.3px;' +
      'color:rgba(238,242,255,0.35);border-top:1px solid rgba(217,184,114,0.14);}' +
    'body.light .th-drawer-foot{color:rgba(10,31,68,0.4);border-top-color:rgba(26,58,143,0.12);}' +
    '.th-drawer-foot span{color:#d9b872;}' +
    'body.light .th-drawer-foot span{color:#1a3a8f;}';
  document.head.appendChild(style);

  var burger = document.createElement('div');
  burger.className = 'th-burger';
  burger.setAttribute('role', 'button');
  burger.setAttribute('aria-label', 'Settings');
  burger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

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

  drawer.innerHTML =
    '<div class="th-drawer-head">' +
      '<div class="th-drawer-title">Settings</div>' +
      '<button class="th-drawer-close" id="th-drawer-close" aria-label="Close">&#10005;</button>' +
    '</div>' +
    '<div class="th-drawer-body">' +
      '<div class="th-section-title">Appearance</div>' +
      '<div class="th-row"><span>Light mode</span><label class="th-switch"><input type="checkbox" id="th-theme-toggle"><span class="th-slider"></span></label></div>' +
      '<div class="th-note" style="margin:2px 0 4px;">English text uses Poppins. Bangla text you type — like task names — automatically renders in Tiro Bangla.</div>' +
      dataSectionHtml +
    '</div>' +
    '<div class="th-drawer-foot">Staff Portal &nbsp;<span>&middot;</span>&nbsp; Truefitt &amp; Hill</div>';

  function ready(){
    document.body.appendChild(burger);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    var themeToggle = document.getElementById('th-theme-toggle');
    themeToggle.checked = (getTheme() === 'light');
    themeToggle.addEventListener('change', function(e){
      setTheme(e.target.checked ? 'light' : 'dark');
    });

    function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
    function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }

    burger.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
    document.getElementById('th-drawer-close').addEventListener('click', closeDrawer);

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
    '.th-dlg-overlay{position:fixed;inset:0;background:rgba(5,7,15,0.6);backdrop-filter:blur(3px);z-index:10050;' +
      'display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .18s ease;}' +
    '.th-dlg-overlay.open{opacity:1;pointer-events:auto;}' +
    '@media (min-width:640px){.th-dlg-overlay{align-items:center;padding:24px;}}' +
    '.th-dlg-box{width:100%;max-width:400px;background:linear-gradient(160deg,#16204a 0%,#0d1330 60%,#1a0f38 100%);' +
      'border:1px solid rgba(217,184,114,0.3);border-radius:20px 20px 0 0;box-shadow:0 -8px 40px rgba(0,0,0,0.5);' +
      'padding:22px 20px 20px;transform:translateY(14px);transition:transform .18s ease;font-family:"Poppins",sans-serif;color:#f3efe4;}' +
    '.th-dlg-overlay.open .th-dlg-box{transform:translateY(0);}' +
    '@media (min-width:640px){.th-dlg-box{border-radius:18px;}}' +
    'body.light .th-dlg-box{background:linear-gradient(160deg,#f5f7fc 0%,#eef1fa 55%,#f2effa 100%);color:#0a1f44;' +
      'border-color:rgba(26,58,143,0.2);}' +
    '.th-dlg-title{font-size:15.5px;font-weight:600;margin:0 0 8px;color:#d9b872;}' +
    'body.light .th-dlg-title{color:#1a3a8f;}' +
    '.th-dlg-msg{font-size:13px;line-height:1.55;color:rgba(243,239,228,0.8);margin:0 0 16px;white-space:pre-line;}' +
    'body.light .th-dlg-msg{color:rgba(10,31,68,0.75);}' +
    '.th-dlg-input{width:100%;padding:11px 14px;font-size:13.5px;border-radius:12px;margin-bottom:16px;' +
      'border:1px solid rgba(255,255,255,0.14);background:rgba(0,0,0,0.25);color:#f3efe4;font-family:inherit;outline:none;box-sizing:border-box;}' +
    '.th-dlg-input:focus{border-color:rgba(217,184,114,0.55);}' +
    'body.light .th-dlg-input{background:rgba(255,255,255,0.65);border-color:rgba(26,58,143,0.18);color:#0a1f44;}' +
    '.th-dlg-actions{display:flex;gap:10px;}' +
    '.th-dlg-btn{flex:1;padding:12px;font-size:13px;font-weight:600;border-radius:999px;cursor:pointer;' +
      'font-family:inherit;border:1px solid rgba(255,255,255,0.16);background:rgba(255,255,255,0.05);color:#f3efe4;' +
      'transition:filter .15s ease,background .15s ease;}' +
    '.th-dlg-btn:hover{background:rgba(255,255,255,0.1);}' +
    'body.light .th-dlg-btn{border-color:rgba(26,58,143,0.2);background:rgba(26,58,143,0.06);color:#0a1f44;}' +
    'body.light .th-dlg-btn:hover{background:rgba(26,58,143,0.12);}' +
    '.th-dlg-btn.primary{border:none;background:linear-gradient(135deg,#d9b872,#a9884f);color:#1a1305;}' +
    '.th-dlg-btn.primary:hover{filter:brightness(1.08);}' +
    'body.light .th-dlg-btn.primary{background:linear-gradient(135deg,#1a3a8f,#15316f);color:#fff;}' +
    '.th-dlg-btn.danger{border:none;background:linear-gradient(135deg,#e08b7d,#c76a5c);color:#2a0f0a;}' +
    '.th-dlg-btn.danger:hover{filter:brightness(1.08);}';
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
