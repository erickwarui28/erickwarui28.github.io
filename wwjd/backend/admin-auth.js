/**
 * Shared Firebase Auth helpers for WWJD admin pages (Spark-plan friendly).
 * Credentials live in Firebase Auth + Firestore adminSecrets — not in static files.
 */
(function (global) {
  const ADMIN_EMAIL = (global.WWJD_ADMIN_EMAIL || '').toLowerCase();

  let initialized = false;
  let auth = null;
  let db = null;
  let onAuthenticated = null;
  let onLoggedOut = null;

  function isAdminUser(user) {
    return !!(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL);
  }

  function showLogin() {
    const login = document.getElementById('loginContainer');
    const dash = document.getElementById('dashboard');
    if (login) login.style.display = 'flex';
    if (dash) dash.classList.remove('active');
  }

  function showDashboard() {
    const login = document.getElementById('loginContainer');
    const dash = document.getElementById('dashboard');
    if (login) login.style.display = 'none';
    if (dash) dash.classList.add('active');
  }

  async function initializeFirebase(options) {
    onAuthenticated = options && options.onAuthenticated;
    onLoggedOut = options && options.onLoggedOut;

    if (!global.WWJD_FIREBASE_CONFIG) {
      throw new Error('Missing WWJD_FIREBASE_CONFIG. Load firebase-config.js first.');
    }

    let app;
    try {
      app = firebase.app();
    } catch (e) {
      app = firebase.initializeApp(global.WWJD_FIREBASE_CONFIG);
    }

    auth = firebase.auth(app);
    db = firebase.firestore(app);
    global.db = db;
    global.auth = auth;

    if (db && !db._settingsApplied) {
      try {
        db.settings({ ignoreUndefinedProperties: true });
        db._settingsApplied = true;
      } catch (e) {
        // settings may already be locked after first use
      }
    }

    initialized = true;

    auth.onAuthStateChanged(async function (user) {
      if (isAdminUser(user)) {
        showDashboard();
        if (typeof onAuthenticated === 'function') {
          await onAuthenticated(user);
        }
      } else {
        if (user) {
          await auth.signOut();
        }
        showLogin();
        if (typeof onLoggedOut === 'function') {
          onLoggedOut();
        }
      }
    });

    return { app: app, auth: auth, db: db };
  }

  async function loginWithEmailPassword(email, password) {
    if (!initialized) {
      throw new Error('Firebase Auth is not initialized yet.');
    }

    const normalized = (email || '').trim().toLowerCase();
    if (normalized !== ADMIN_EMAIL) {
      const err = new Error('Access denied for this account.');
      err.code = 'auth/admin-only';
      throw err;
    }

    const credential = await auth.signInWithEmailAndPassword(normalized, password);
    if (!isAdminUser(credential.user)) {
      await auth.signOut();
      const err = new Error('Access denied for this account.');
      err.code = 'auth/admin-only';
      throw err;
    }

    return credential.user;
  }

  async function logout() {
    if (auth) {
      await auth.signOut();
    }
    showLogin();
  }

  /**
   * Loads adminSecrets/credentials after Auth. Returns null if missing/denied.
   */
  async function loadAdminSecrets() {
    if (!db || !auth || !auth.currentUser || !isAdminUser(auth.currentUser)) {
      return null;
    }
    const snap = await db.collection('adminSecrets').doc('credentials').get();
    return snap.exists ? snap.data() : null;
  }

  function wireLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('email') || document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const errorMsg = document.getElementById('errorMessage');
      const email = emailInput ? emailInput.value : '';
      const password = passwordInput ? passwordInput.value : '';

      if (errorMsg) {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
      }

      try {
        if (!initialized) {
          await initializeFirebase({ onAuthenticated: onAuthenticated, onLoggedOut: onLoggedOut });
        }
        await loginWithEmailPassword(email, password);
      } catch (err) {
        let message = 'Invalid email or password.';
        if (err && err.code === 'auth/admin-only') {
          message = 'Access denied. Only the authorized admin account can sign in.';
        } else if (err && err.code === 'auth/too-many-requests') {
          message = 'Too many attempts. Try again later.';
        } else if (err && err.code === 'auth/network-request-failed') {
          message = 'Network error. Check your connection.';
        }
        if (errorMsg) {
          errorMsg.textContent = message;
          errorMsg.style.display = 'block';
        }
      }
    });
  }

  global.WWJDAdminAuth = {
    initializeFirebase: initializeFirebase,
    loginWithEmailPassword: loginWithEmailPassword,
    logout: logout,
    loadAdminSecrets: loadAdminSecrets,
    wireLoginForm: wireLoginForm,
    isAdminUser: isAdminUser,
    get authReady() {
      return initialized;
    },
    get currentUser() {
      return auth ? auth.currentUser : null;
    }
  };
})(window);
