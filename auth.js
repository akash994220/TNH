/* Truefitt & Hill — Staff Tools: shared login gate + Firebase init.
   Include identically, AFTER the three firebase-*-compat.js CDN scripts and
   BEFORE each page's own inline app script:
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
     <script src="auth.js"></script>

   Exposes:
     window.thDB         — firebase.firestore() instance
     window.thAuthReady   — Promise that resolves once signed in (anonymously)

   Login is a single shared username/password gate (not per-person accounts).
   It only ever needs to be entered once per device — the session is saved
   locally and silently restored (and silently re-established with Firebase
   if needed) on every later visit. There is no logout option; the gate sits
   in front of every tool page and, once passed, stays passed on that device.
   Once the password is correct, the browser signs in anonymously to Firebase
   so Firestore security rules can require "must be signed in" — the actual
   shared data lives at fixed document paths under the 'th-staff-tools'
   collection, not scoped to the anonymous uid, so every device that logs in
   sees the same synced data. */
(function(){

  var firebaseConfig = {
    apiKey: "AIzaSyDiFJoweKxa36TlLapUTLZZMBc_UZAeTtE",
    authDomain: "truefitt-and-hill-66a96.firebaseapp.com",
    projectId: "truefitt-and-hill-66a96",
    storageBucket: "truefitt-and-hill-66a96.firebasestorage.app",
    messagingSenderId: "179122200566",
    appId: "1:179122200566:web:07adcf6f057dc3d38d71d7"
  };

  var VALID_USER = 'akash';
  var VALID_PASS = '1234';
  var SESSION_KEY = 'th-auth-session';

  if(typeof firebase === 'undefined'){
    console.error('Firebase SDK scripts must load before auth.js');
    return;
  }

  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.firestore();
  window.thDB = db;

  var resolveReady;
  window.thAuthReady = new Promise(function(res){ resolveReady = res; });

  // ── styles ──
  var style = document.createElement('style');
  style.textContent =
    '.th-auth-gate{position:fixed;inset:0;z-index:20000;display:flex;align-items:center;justify-content:center;' +
      'padding:20px;background:linear-gradient(160deg, rgba(8,13,30,0.97), rgba(8,9,10,0.97));backdrop-filter:blur(6px);' +
      '-webkit-backdrop-filter:blur(6px);}' +
    '.th-auth-card{width:100%;max-width:340px;padding:34px 28px;border-radius:24px;' +
      'background:rgba(255,255,255,0.055);border:1px solid rgba(217,184,114,0.28);' +
      'box-shadow:0 30px 70px -20px rgba(0,0,0,0.7);font-family:"Helvetica Neue",Arial,sans-serif;' +
      'color:#f3efe4;text-align:center;}' +
    '.th-auth-crest{width:46px;height:46px;margin:0 auto 14px;border-radius:50%;border:1px solid rgba(217,184,114,0.5);' +
      'display:flex;align-items:center;justify-content:center;background:rgba(217,184,114,0.08);}' +
    '.th-auth-crest svg{width:22px;height:22px;stroke:#d9b872;fill:none;stroke-width:1.4;}' +
    '.th-auth-title{font-family:Georgia,"Times New Roman",serif;font-size:20px;margin-bottom:4px;letter-spacing:0.2px;}' +
    '.th-auth-sub{font-size:11.5px;color:rgba(243,239,228,0.5);margin-bottom:22px;letter-spacing:0.3px;}' +
    '.th-auth-field{margin-bottom:12px;text-align:left;}' +
    '.th-auth-field input{width:100%;padding:12px 16px;font-size:14px;border-radius:12px;box-sizing:border-box;' +
      'border:1px solid rgba(255,255,255,0.14);background:rgba(0,0,0,0.25);color:#f3efe4;outline:none;font-family:inherit;}' +
    '.th-auth-field input:focus{border-color:rgba(217,184,114,0.55);}' +
    '.th-auth-btn{width:100%;margin-top:8px;padding:12px;border-radius:12px;border:none;cursor:pointer;' +
      'background:linear-gradient(135deg,#e3c684,#a9884f);color:#1b1a15;font-weight:600;font-size:13px;letter-spacing:0.3px;' +
      'font-family:inherit;transition:opacity .15s ease;}' +
    '.th-auth-btn:disabled{opacity:0.6;cursor:default;}' +
    '.th-auth-error{margin-top:12px;font-size:12px;color:#e08b7d;min-height:14px;}';
  document.head.appendChild(style);

  // ── gate markup (built up front, but only inserted into the page when actually needed) ──
  var gate = document.createElement('div');
  gate.className = 'th-auth-gate';
  gate.innerHTML =
    '<div class="th-auth-card">' +
      '<div class="th-auth-crest"><svg viewBox="0 0 24 24"><path d="M12 2l8 3v5c0 5-3.5 9-8 11C7.5 19 4 15 4 10V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg></div>' +
      '<div class="th-auth-title">Truefitt &amp; Hill</div>' +
      '<div class="th-auth-sub">Sign in to sync your data</div>' +
      '<form id="thAuthForm" autocomplete="off">' +
        '<div class="th-auth-field"><input type="text" id="thAuthUser" placeholder="Username" autocapitalize="off" autocomplete="username"></div>' +
        '<div class="th-auth-field"><input type="password" id="thAuthPass" placeholder="Password" autocomplete="current-password"></div>' +
        '<button type="submit" class="th-auth-btn" id="thAuthBtn">Sign in</button>' +
        '<div class="th-auth-error" id="thAuthError"></div>' +
      '</form>' +
    '</div>';

  var form = gate.querySelector('#thAuthForm');
  var userInput = gate.querySelector('#thAuthUser');
  var passInput = gate.querySelector('#thAuthPass');
  var btn = gate.querySelector('#thAuthBtn');
  var errorEl = gate.querySelector('#thAuthError');
  var gateShown = false;

  // Trust an existing local session immediately so returning devices never
  // see a flash of the login screen — Firebase's own auth check happens
  // silently in the background and only pulls the gate up if it disagrees.
  var hasLocalSession = localStorage.getItem(SESSION_KEY) === '1';

  function showGate(){
    if(gateShown) return;
    gateShown = true;
    document.documentElement.appendChild(gate);
    setTimeout(function(){ userInput.focus(); }, 50);
  }

  if(!hasLocalSession){
    showGate();
  }

  function showError(msg){
    errorEl.textContent = msg;
  }

  function setBusy(busy){
    btn.disabled = busy;
    btn.textContent = busy ? 'Connecting\u2026' : 'Sign in';
  }

  function completeSignIn(user){
    localStorage.setItem(SESSION_KEY, '1');
    gate.remove();
    resolveReady(user);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    showError('');
    var u = userInput.value.trim();
    var p = passInput.value;
    if(u !== VALID_USER || p !== VALID_PASS){
      showError('Incorrect username or password.');
      return;
    }
    setBusy(true);
    auth.signInAnonymously().then(function(cred){
      completeSignIn(cred.user);
    }).catch(function(err){
      setBusy(false);
      showError('Could not connect — check your internet connection.');
      console.error(err);
    });
  });

  // If this browser already has an anonymous session from a previous login
  // on this device, skip the form automatically. If Firebase's own session
  // has been lost (e.g. the browser suspended/reloaded a background tab,
  // cleared IndexedDB, or is in private browsing) even though this device
  // already passed the password gate, silently re-authenticate anonymously
  // in the background instead of flashing the login screen again. The
  // password gate has already been satisfied once on this device — signing
  // back in anonymously needs no credentials, so it never needs to be user
  // facing. Only if that silent re-auth genuinely fails (e.g. offline) do
  // we fall back to showing the gate.
  auth.onAuthStateChanged(function(user){
    if(user){
      if(localStorage.getItem(SESSION_KEY) === '1'){
        gate.remove();
        resolveReady(user);
      }
    } else if(hasLocalSession){
      auth.signInAnonymously().then(function(cred){
        gate.remove();
        resolveReady(cred.user);
      }).catch(function(){
        localStorage.removeItem(SESSION_KEY);
        showGate();
      });
    }
  });

})();
