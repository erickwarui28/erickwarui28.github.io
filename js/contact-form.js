import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 6, max: 254 },
  company: { max: 120 },
  message: { min: 10, max: 4000 }
};

const COOLDOWN_MS = 60 * 1000;
const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const pageOpenedAt = Date.now();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('contactStatus');
const submitBtn = document.getElementById('contactSubmit');

function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.kind = kind || '';
}

function trimValue(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || '').trim() : '';
}

function lastSubmitAt() {
  try {
    return Number(window.localStorage.getItem('ew_contact_last') || '0');
  } catch (e) {
    return 0;
  }
}

function markSubmitted() {
  try {
    window.localStorage.setItem('ew_contact_last', String(Date.now()));
  } catch (e) {
    // ignore quota / private mode
  }
}

function validate(payload, honeypot) {
  if (honeypot) {
    return 'Please try again.';
  }
  if (Date.now() - pageOpenedAt < MIN_FILL_MS) {
    return 'Please take a moment to complete the form, then send again.';
  }
  if (Date.now() - lastSubmitAt() < COOLDOWN_MS) {
    return 'Please wait a minute before sending another message.';
  }
  if (payload.name.length < LIMITS.name.min || payload.name.length > LIMITS.name.max) {
    return 'Please enter your name (2–80 characters).';
  }
  if (!EMAIL_RE.test(payload.email) || payload.email.length > LIMITS.email.max) {
    return 'Please enter a valid email address.';
  }
  if (payload.company.length > LIMITS.company.max) {
    return 'Company name is too long.';
  }
  if (payload.message.length < LIMITS.message.min || payload.message.length > LIMITS.message.max) {
    return 'Please enter a message (10–4000 characters).';
  }
  return '';
}

if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    setStatus('', '');

    const payload = {
      name: trimValue('contactName'),
      email: trimValue('contactEmail').toLowerCase(),
      company: trimValue('contactCompany'),
      message: trimValue('contactMessage'),
      source: 'landing',
      status: 'new'
    };
    const honeypot = trimValue('website');
    const error = validate(payload, honeypot);
    if (error) {
      setStatus(error, 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        message: payload.message,
        source: payload.source,
        status: payload.status,
        createdAt: serverTimestamp()
      });
      markSubmitted();
      form.reset();
      setStatus('Thanks — your message was sent. I will get back to you by email.', 'ok');
    } catch (err) {
      setStatus('The message could not be sent. Please email me directly or try again later.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }
    }
  });
}
