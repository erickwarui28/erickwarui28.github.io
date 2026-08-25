/**
 * Public Firebase web client config for the GitHub Pages contact form.
 * Safe to ship in the browser — the API key is not a secret.
 * Access control is Firebase Auth + Firestore security rules + custom claims.
 * Do not put passwords or private keys in this file.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyBjiSjeUUP7ry17FsecRE1L-_gGzTceXxw',
  authDomain: 'erickwarui-site.firebaseapp.com',
  projectId: 'erickwarui-site',
  storageBucket: 'erickwarui-site.firebasestorage.app',
  messagingSenderId: '969150193867',
  appId: '1:969150193867:web:447e3e5ad5ce18f543fb4e'
};

export const ADMIN_EMAIL = 'erickwarui28@gmail.com';
