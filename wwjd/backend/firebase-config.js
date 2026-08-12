/**
 * Public Firebase web client config for the WWJD admin dashboard.
 * Safe to ship on GitHub Pages — security comes from Firebase Auth + Firestore rules.
 * Do NOT put passwords or private API secrets in this file.
 */
window.WWJD_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyARFup3M8n8E1n31pfmvBjmgvDKw186kIM',
  authDomain: 'wwjd-232a9.firebaseapp.com',
  projectId: 'wwjd-232a9',
  storageBucket: 'wwjd-232a9.firebasestorage.app',
  messagingSenderId: '768889482555',
  appId: '1:768889482555:web:27675fe47a7d8c297a5b1e',
  measurementId: 'G-QS4QK37S5S'
};

/** Only this Firebase Auth email may use the admin UI / adminSecrets. */
window.WWJD_ADMIN_EMAIL = 'erickwarui28@gmail.com';
