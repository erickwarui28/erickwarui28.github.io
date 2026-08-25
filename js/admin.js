import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { ADMIN_EMAIL, firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginView = document.getElementById('loginView');
const inboxView = document.getElementById('inboxView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const contactList = document.getElementById('contactList');
const emptyState = document.getElementById('emptyState');
const inboxMeta = document.getElementById('inboxMeta');

let unsubscribeInbox = null;

function isAdminUser(user) {
  return !!(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL);
}

function showLogin() {
  if (loginView) loginView.hidden = false;
  if (inboxView) inboxView.hidden = true;
}

function showInbox() {
  if (loginView) loginView.hidden = true;
  if (inboxView) inboxView.hidden = false;
}

function setLoginError(message) {
  if (!loginError) return;
  loginError.textContent = message || '';
}

function formatWhen(value) {
  if (!value || typeof value.toDate !== 'function') return 'Just now';
  return value.toDate().toLocaleString();
}

function textEl(tag, value, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = value == null ? '' : String(value);
  return el;
}

function renderContacts(snapshot) {
  if (!contactList) return;
  contactList.replaceChildren();

  if (snapshot.empty) {
    if (emptyState) emptyState.hidden = false;
    if (inboxMeta) inboxMeta.textContent = '0 messages';
    return;
  }

  if (emptyState) emptyState.hidden = true;
  if (inboxMeta) inboxMeta.textContent = snapshot.size + (snapshot.size === 1 ? ' message' : ' messages');

  snapshot.forEach(function (item) {
    const data = item.data();
    const card = document.createElement('article');
    card.className = 'message-card status-' + (data.status || 'new');

    card.appendChild(textEl('h3', data.name || 'Unknown', 'msg-name'));
    card.appendChild(textEl('p', data.email || '', 'msg-email'));
    if (data.company) {
      card.appendChild(textEl('p', data.company, 'msg-company'));
    }
    card.appendChild(textEl('p', formatWhen(data.createdAt), 'msg-when'));
    card.appendChild(textEl('p', data.message || '', 'msg-body'));

    const actions = document.createElement('div');
    actions.className = 'msg-actions';

    if (data.status !== 'read') {
      const readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.textContent = 'Mark read';
      readBtn.addEventListener('click', function () {
        updateDoc(doc(db, 'contacts', item.id), { status: 'read' }).catch(function () {
          window.alert('Could not update this message.');
        });
      });
      actions.appendChild(readBtn);
    }

    if (data.status !== 'archived') {
      const archiveBtn = document.createElement('button');
      archiveBtn.type = 'button';
      archiveBtn.textContent = 'Archive';
      archiveBtn.addEventListener('click', function () {
        updateDoc(doc(db, 'contacts', item.id), { status: 'archived' }).catch(function () {
          window.alert('Could not archive this message.');
        });
      });
      actions.appendChild(archiveBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      if (!window.confirm('Delete this message permanently?')) return;
      deleteDoc(doc(db, 'contacts', item.id)).catch(function () {
        window.alert('Could not delete this message.');
      });
    });
    actions.appendChild(deleteBtn);

    card.appendChild(actions);
    contactList.appendChild(card);
  });
}

function startInbox() {
  if (unsubscribeInbox) unsubscribeInbox();
  const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
  unsubscribeInbox = onSnapshot(
    q,
    renderContacts,
    function () {
      if (inboxMeta) inboxMeta.textContent = 'Could not load messages. Check your account access.';
    }
  );
}

function stopInbox() {
  if (unsubscribeInbox) {
    unsubscribeInbox();
    unsubscribeInbox = null;
  }
  if (contactList) contactList.replaceChildren();
}

if (loginForm) {
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    setLoginError('');
    const email = trimLogin('adminEmail').toLowerCase();
    const password = trimLogin('adminPassword');

    if (email !== ADMIN_EMAIL) {
      setLoginError('Access denied for this account.');
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdminUser(credential.user)) {
        await signOut(auth);
        setLoginError('Access denied for this account.');
      }
    } catch (err) {
      let message = 'Invalid email or password.';
      if (err && err.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Try again later.';
      } else if (err && err.code === 'auth/network-request-failed') {
        message = 'Network error. Check your connection.';
      } else if (err && err.code === 'auth/user-disabled') {
        message = 'This account is disabled.';
      }
      setLoginError(message);
    }
  });
}

function trimLogin(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || '').trim() : '';
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    signOut(auth);
  });
}

onAuthStateChanged(auth, function (user) {
  if (isAdminUser(user)) {
    showInbox();
    startInbox();
  } else {
    if (user) signOut(auth);
    stopInbox();
    showLogin();
  }
});
