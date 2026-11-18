(function () {
  'use strict';
  firebase.initializeApp(window.WWJD_FIREBASE_CONFIG);
  const auth = firebase.auth(), base = 'https://67.211.211.236/wwjd/v2';
  const $ = id => document.getElementById(id);
  let state = null, timer = null, editingSettings = false;
  const status = message => { $('status').textContent = message || ''; };
  async function api(path, method = 'GET', body) {
    if (!auth.currentUser) throw new Error('Sign in first.');
    const response = await fetch(base + path, { method, headers: { Authorization: 'Bearer ' + await auth.currentUser.getIdToken(), 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Request failed.'); return data;
  }
  function row(parent, values) { const tr = document.createElement('tr'); values.forEach(value => { const td = document.createElement('td'); if (value instanceof Node) td.appendChild(value); else td.textContent = String(value ?? ''); tr.appendChild(td); }); parent.appendChild(tr); }
  function renderUsers() {
    $('userRows').replaceChildren();
    const filter = $('search').value.toLowerCase();
    state.users.filter(user => (user.id + ' ' + user.deviceId).toLowerCase().includes(filter)).forEach(user => {
      const button = document.createElement('button'); button.textContent = 'Adjust';
      button.onclick = async () => {
        const input = prompt('Tokens to add (use a negative number to deduct):'); if (input === null) return;
        const delta = Number(input), reason = prompt('Reason for this adjustment:'); if (!reason) return;
        try { await api('/admin/balance', 'POST', { id: user.id, delta, reason }); status('Balance updated.'); await refresh(); } catch (e) { status(e.message); }
      };
      row($('userRows'), [user.id + ' / ' + user.deviceId, user.balance, user.createdAt, button]);
    });
  }
  async function loadMessages() {
    const id = $('contacts').value; $('conversation').replaceChildren(); if (!id) return;
    const messages = await api('/admin/contacts/' + encodeURIComponent(id) + '/messages');
    messages.sort((a,b) => String(a.createdAt).localeCompare(String(b.createdAt))).forEach(message => {
      const div = document.createElement('div'); div.className = 'message'; div.textContent = `${message.sender} · ${message.createdAt}\n${message.text}`; $('conversation').appendChild(div);
    });
  }
  async function refresh() {
    state = await api('/admin');
    if (!editingSettings) {
      $('loginFree').checked = state.settings.loginFree;
      for (const key of ['freeTokens','messagesPerToken','wisdomTokensPerRefresh','callTokensPerMinute']) $(key).value = state.settings[key];
    }
    renderUsers();
    $('catalog').replaceChildren(); state.catalog.forEach(pack => {
      const button = document.createElement('button'); button.textContent = `${pack.title} · ${pack.tokens + (pack.bonusTokens || 0)} tokens · ${pack.priceLabel}`;
      button.onclick = () => { for (const [id,key] of Object.entries({ packId:'id', packTitle:'title', packProduct:'productId', packPrice:'priceLabel', packTokens:'tokens', packBonus:'bonusTokens' })) $(id).value = pack[key] || (key === 'bonusTokens' ? 0 : ''); };
      $('catalog').appendChild(button);
    });
    const selected = $('contacts').value; $('contacts').replaceChildren(new Option('Choose a conversation', ''));
    state.contacts.forEach(contact => $('contacts').add(new Option(`${contact.name} (${contact.email}) · ${contact.adminUnreadCount || 0} unread`, contact.id)));
    $('contacts').value = selected;
    if (selected && document.activeElement !== $('reply')) await loadMessages();
    $('usageRows').replaceChildren(); state.usage.slice().reverse().forEach(entry => row($('usageRows'), [entry.createdAt, entry.type, entry.delta, entry.note || entry.id]));
    $('logs').replaceChildren(); state.logs.slice().reverse().forEach(entry => { const p = document.createElement('p'); p.textContent = `${entry.createdAt} · ${entry.level} · ${entry.event}`; $('logs').appendChild(p); });
  }
  for (const [key, title] of Object.entries({ freeTokens: 'New guest tokens', messagesPerToken: 'Messages per token', wisdomTokensPerRefresh: 'Daily wisdom refresh cost', callTokensPerMinute: 'Voice tokens per minute' })) {
    const label = document.createElement('label'); label.textContent = title;
    const input = document.createElement('input'); input.type = 'number'; input.id = key; input.min = key === 'messagesPerToken' ? '1' : '0'; input.max = '1000'; input.required = true; label.appendChild(input); $('tokenSettings').appendChild(label);
  }
  document.querySelectorAll('[data-page]').forEach(button => button.onclick = () => { ['settings','users','support','activity'].forEach(id => { $(id).hidden = id !== button.dataset.page; }); });
  $('loginForm').onsubmit = async event => { event.preventDefault(); try { await auth.signInWithEmailAndPassword($('email').value.trim(), $('password').value); $('password').value = ''; } catch (e) { status(e.message); } };
  $('logout').onclick = () => auth.signOut();
  $('settingsForm').oninput = () => { editingSettings = true; };
  $('settingsForm').onsubmit = async event => {
    event.preventDefault(); const body = { loginFree: $('loginFree').checked };
    for (const key of ['freeTokens','messagesPerToken','wisdomTokensPerRefresh','callTokensPerMinute']) body[key] = Number($(key).value);
    try { await api('/admin/settings', 'PUT', body); editingSettings = false; status('Settings saved. Access changes apply immediately on the server.'); await refresh(); } catch (e) { status(e.message); }
  };
  $('search').oninput = renderUsers;
  $('packForm').onsubmit = async event => {
    event.preventDefault();
    try { await api('/admin/catalog', 'PUT', { id: $('packId').value, title: $('packTitle').value, productId: $('packProduct').value, priceLabel: $('packPrice').value, tokens: Number($('packTokens').value), bonusTokens: Number($('packBonus').value) }); status('Token pack saved.'); await refresh(); } catch (e) { status(e.message); }
  };
  $('contacts').onchange = () => loadMessages().catch(e => status(e.message));
  $('replyForm').onsubmit = async event => { event.preventDefault(); if (!$('contacts').value) return; try { await api('/admin/contacts/' + encodeURIComponent($('contacts').value) + '/messages', 'POST', { text: $('reply').value }); $('reply').value = ''; await loadMessages(); status('Reply sent.'); } catch (e) { status(e.message); } };
  auth.onAuthStateChanged(async user => {
    clearInterval(timer); $('login').hidden = !!user; $('dashboard').hidden = !user; $('logout').hidden = !user;
    if (user) { try { await refresh(); status(''); timer = setInterval(() => refresh().catch(e => status(e.message)), 15000); } catch (e) { $('dashboard').hidden = true; status(e.message); } }
  });
})();
