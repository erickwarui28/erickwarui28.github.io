(function () {
  'use strict';
  if (!firebase.apps.length) firebase.initializeApp(window.WWJD_FIREBASE_CONFIG);
  const auth = firebase.auth(), base = 'https://67.211.211.236/wwjd/v2', M = window.WWJDAdminModel;
  const $ = id => document.getElementById(id);
  const pages = ['overview','users','support','account','activity','settings'];
  let state = null, timer, epoch = 0, routeEpoch = 0, activePage = 'overview', selectedContact = '', accountData = null;
  let accountRevision = 0;
  const drafts = new Map();
  let usersPage = 1, usagePage = 1, timelineLimit = 20, oldestFirst = false, editingSettings = false, accountDirty = false;
  const status = (message = '', error = false) => { $('status').textContent = message; $('status').classList.toggle('error',error); };
  const node = (tag, text, className) => { const el = document.createElement(tag); if (text !== undefined) el.textContent = String(text ?? '—'); if (className) el.className = className; return el; };
  const date = value => { const d = new Date(typeof value === 'number' || /^\d{12,}$/.test(String(value)) ? Number(value) : value); return value && !Number.isNaN(d.getTime()) ? d.toLocaleString() : '—'; };
  function link(text, href) { const el = node('a',text); el.href = href; return el; }
  function accountLink(id, deviceId, contactId) { return id ? link(deviceId || id,M.accountURL(id,contactId)) : node('span',deviceId ? deviceId+' · No linked account' : 'No linked account','muted'); }
  function cellRow(parent, values) { const tr = node('tr'); for (const value of values) { const td = node('td'); if (value instanceof Node) td.appendChild(value); else td.textContent = String(value ?? '—'); tr.appendChild(td); } parent.appendChild(tr); }
  function emptyTable(parent, columns, text) { const tr = node('tr'), td = node('td',text,'empty'); td.colSpan = columns; tr.appendChild(td); parent.appendChild(tr); }
  function showPage(name) { activePage = name; for (const id of pages) $(id).hidden = id !== name; document.querySelectorAll('[data-page]').forEach(el => { if (el.dataset.page === name) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current'); }); }
  async function api(path, method = 'GET', body) {
    const current = auth.currentUser; if (!current) throw new Error('Sign in first.');
    const response = await fetch(base + path,{method,headers:{Authorization:'Bearer '+await current.getIdToken(),'Content-Type':'application/json'},...(body === undefined ? {} : {body:JSON.stringify(body)})});
    const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Request failed.'); return data;
  }
  function paginate(id, items, current, update, render) {
    const result = M.page(items,current); update(result.current); $(id).replaceChildren();
    const previous = node('button','Previous','secondary'), next = node('button','Next','secondary'); previous.disabled = result.current === 1; next.disabled = result.current === result.pages;
    previous.onclick = () => { update(result.current-1); render(); }; next.onclick = () => { update(result.current+1); render(); };
    $(id).append(previous,node('span',`Page ${result.current} of ${result.pages} · ${result.total} records`),next); return result.items;
  }
  function chart(id, series, label) {
    const container = $(id); container.replaceChildren(); if (!series.length) { container.appendChild(node('p','No data yet.','empty')); return; }
    const ns = 'http://www.w3.org/2000/svg', width = Math.max(320,series.length*65), height = 220, max = Math.max(1,...series.map(item=>item[1]));
    const svg = document.createElementNS(ns,'svg'); svg.setAttribute('viewBox',`0 0 ${width} ${height}`); svg.style.width = width+'px'; svg.setAttribute('role','img'); svg.setAttribute('aria-label',label);
    series.forEach(([name,value],index) => {
      const w = width/series.length, x = index*w+12, barHeight = value/max*140;
      const rect = document.createElementNS(ns,'rect'); for (const [key,val] of Object.entries({x,y:165-barHeight,width:Math.max(8,w-24),height:barHeight,rx:3,class:'bar'})) rect.setAttribute(key,String(val));
      const title = document.createElementNS(ns,'title'); title.textContent = `${name}: ${value}`; rect.appendChild(title); svg.appendChild(rect);
      for (const [text,y] of [[value,155-barHeight],[name,185]]) { const item = document.createElementNS(ns,'text'); item.textContent = String(text); item.setAttribute('x',x); item.setAttribute('y',y); item.setAttribute('class','chart-label'); if (y === 185 && String(name).length > 10) item.setAttribute('transform',`rotate(20 ${x} ${y})`); svg.appendChild(item); }
    });
    container.appendChild(svg); const description = node('details'), summary = node('summary','View chart data'); description.appendChild(summary); const list = node('ul'); series.forEach(([name,value])=>list.appendChild(node('li',`${name}: ${value}`))); description.appendChild(list); container.appendChild(description);
  }
  function renderOverview() {
    const stats = M.summary(state); $('stats').replaceChildren();
    for (const [key,label] of Object.entries({users:'Total users',balance:'Total tokens',spent:'Total tokens used',newToday:'New users today',spentToday:'Tokens used today',unread:'Unread contact messages'})) {
      const card = node('div',undefined,'stat'); card.append(node('span',label),node('strong',stats[key].toLocaleString()));
      if (key === 'unread') card.appendChild(link('Open contact messages','#support')); $('stats').appendChild(card);
    }
    $('unreadBadge').textContent = stats.unread;
    chart('usersChart',M.series(state.users,user=>M.day(user.createdAt)),'Users created per day');
    chart('typeChart',M.series(state.usage.filter(entry=>entry.delta<0),entry=>entry.type || 'other',entry=>-entry.delta),'Tokens spent by type');
    chart('dailyChart',M.series(state.usage.filter(entry=>entry.delta<0),entry=>M.day(entry.createdAt),entry=>-entry.delta),'Tokens spent per day');
  }
  function renderUsers() {
    const filtered = M.userGroups(state.users, $('search').value);
    $('userRows').replaceChildren();
    for (const group of paginate('usersPagination',filtered,usersPage,value=>{usersPage=value;},renderUsers)) {
      const [user] = group.users;
      if (group.users.length === 1) {
        cellRow($('userRows'),[link(group.label,M.accountURL(user.id)),user.balance,date(user.createdAt),date(user.updatedAt),user.messageSendCount || 0,link('View / edit account',M.accountURL(user.id))]);
        continue;
      }
      const details = node('details'), accounts = node('ul');
      details.append(node('summary', `View ${group.users.length} accounts`), accounts);
      for (const record of group.users) {
        const item = node('li');
        item.append(link(record.id, M.accountURL(record.id)), node('span', ` · ${record.balance} tokens · ${date(record.createdAt)}`));
        accounts.appendChild(item);
      }
      cellRow($('userRows'),[group.label, '—', '—', '—', '—', details]);
    }
    if (!filtered.length) emptyTable($('userRows'),6,'No users found.');
  }
  function renderUsage() {
    const filtered = state.usage.filter(entry=>M.matches([entry.accountId,entry.deviceId,entry.type,entry.note],$('usageSearch').value)); $('usageRows').replaceChildren();
    for (const entry of paginate('usagePagination',filtered,usagePage,value=>{usagePage=value;},renderUsage)) cellRow($('usageRows'),[
      accountLink(entry.accountId,entry.deviceId),entry.type,entry.amount,entry.delta,entry.balanceBefore,entry.balanceAfter,entry.note,date(entry.createdAt),
      entry.accountId ? link('View account',M.accountURL(entry.accountId)) : 'No linked account',
    ]);
    if (!filtered.length) emptyTable($('usageRows'),9,'No usage found.');
    $('logRows').replaceChildren();
    for (const log of state.logs) {
      const context = node('pre',log.context ? JSON.stringify(log.context,null,2) : '—','context');
      cellRow($('logRows'),[date(log.createdAt),log.level,log.event,accountLink(log.accountId,log.deviceId),log.message,context]);
    }
    if (!state.logs.length) emptyTable($('logRows'),6,'No application events.');
  }
  function renderContactList() {
    const items = state.contacts.filter(contact=>M.matches([contact.name,contact.email,contact.deviceId,contact.accountId],$('contactSearch').value) && (!$('unreadOnly').checked || contact.adminUnreadCount>0));
    $('contactList').replaceChildren();
    for (const contact of items) {
      const item = node('div',undefined,'contact-item'+(contact.adminUnreadCount>0?' unread':'')); item.setAttribute('aria-current',String(contact.id===selectedContact));
      const open=link('',M.contactURL(contact.id));open.className='contact-open';open.append(node('strong',contact.name),node('small',contact.email));
      const owner=node('small');owner.appendChild(accountLink(contact.accountId,contact.deviceId,contact.id));
      item.append(open,owner,node('small',date(contact.lastMessageAt)));
      item.onclick=event=>{if(!event.target.closest('a'))location.href=M.contactURL(contact.id);};
      if (contact.adminUnreadCount>0) item.appendChild(node('span',`${contact.adminUnreadCount} unread`,'badge')); $('contactList').appendChild(item);
    }
    if (!items.length) $('contactList').appendChild(node('p','No matching contacts.','empty'));
  }
  function renderContactHeader() {
    const contact = state.contacts.find(item=>item.id===selectedContact); $('contactHeader').replaceChildren();
    if (!contact) { $('contactHeader').appendChild(node('p','Choose a conversation.','muted')); $('replyForm').hidden=true; return; }
    $('contactHeader').append(node('h3',contact.name),node('p',contact.email),node('p',`Status: ${contact.status || 'open'} · Last message: ${date(contact.lastMessageAt)}`));
    const detail = node('p'); detail.append(node('span','Account: '),accountLink(contact.accountId,contact.deviceId,contact.id));
    if (contact.accountId) detail.append(node('span',' · '),link('View / adjust this account',M.accountURL(contact.accountId,contact.id)));
    $('contactHeader').appendChild(detail); $('replyForm').hidden=false;
  }
  async function loadMessages(markRead = false) {
    const id = selectedContact, generation = routeEpoch; if (!id) return;
    const messages = await api('/admin/contacts/'+encodeURIComponent(id)+'/messages');
    if (generation !== routeEpoch || id !== selectedContact || !state) return;
    $('conversation').replaceChildren();
    for (const message of messages) {
      const block = node('div',undefined,'message '+message.sender); block.append(node('small',`${message.sender === 'admin' ? 'Administrator' : 'User'} · ${date(message.createdAt)}`),node('div',message.text)); $('conversation').appendChild(block);
    }
    if (!messages.length) $('conversation').appendChild(node('p','No messages yet.','empty'));
    const contact = state.contacts.find(item=>item.id===id);
    if (markRead && (contact?.adminUnreadCount>0 || messages.some(message=>message.sender==='user'&&!message.isRead))) {
      await api('/admin/contacts/'+encodeURIComponent(id)+'/read','POST',{});
      if (contact) contact.adminUnreadCount=0; renderContactList(); $('unreadBadge').textContent=M.summary(state).unread;
    }
  }
  function renderTimeline() {
    if (!accountData) return;
    const items = M.timeline(accountData,$('timelineSearch').value,oldestFirst); $('timeline').replaceChildren();
    for (const entry of items.slice(0,timelineLimit)) {
      const block = node('article',undefined,'timeline-item'); block.append(node('strong',entry.type==='account_created'?'Account created':entry.type || 'Token usage'),node('small',' · '+date(entry.createdAt)));
      if (entry.delta !== undefined) block.appendChild(node('p',`${entry.delta>0?'+':''}${entry.delta} tokens · Balance ${entry.balanceBefore ?? '—'} → ${entry.balanceAfter ?? '—'}`,`amount ${entry.delta<0?'negative':'positive'}`));
      if (entry.messageCountAfter !== undefined) block.appendChild(node('p',`Message count ${entry.messageCountBefore} → ${entry.messageCountAfter}`));
      if (entry.note) block.appendChild(node('p',entry.note)); $('timeline').appendChild(block);
    }
    if (!items.length) $('timeline').appendChild(node('p','No matching timeline events.','empty'));
    $('loadMoreTimeline').hidden=items.length<=timelineLimit; $('timelineSort').textContent=oldestFirst?'Sort: oldest first':'Sort: newest first';
  }
  function renderAccount(updateForm = true) {
    const data = accountData, account = data.account; $('accountDetails').replaceChildren(); $('accountNotice').textContent='';
    const days = account.createdAt ? Math.max(0,Math.floor((Date.now()-new Date(account.createdAt).getTime())/86400000)) : null;
    for (const [label,value] of [['Account ID',account.id],['Account email',account.email],['Primary device',account.deviceId],['Linked devices',data.devices.join(', ') || '—'],['Current balance',account.balance],['Message count',account.messageSendCount || 0],['Created',date(account.createdAt)],['Updated',date(account.updatedAt)],['Days since created',days],['Daily wisdom allowance date',account.freeWisdomDate]]) {
      const dl=node('dl'); dl.append(node('dt',label),node('dd',value)); $('accountDetails').appendChild(dl);
    }
    if (updateForm) { $('accountBalance').value=account.balance; $('accountMessageCount').value=account.messageSendCount || 0; $('accountReason').value=''; accountDirty=false; }
    $('accountContacts').replaceChildren();
    for (const contact of data.contacts) { const p=node('p'); p.appendChild(link(`${contact.name} · ${contact.email}`,M.contactURL(contact.id))); $('accountContacts').appendChild(p); }
    if (!data.contacts.length) $('accountContacts').appendChild(node('p','No contact conversations.','muted'));
    $('purchaseRows').replaceChildren();
    data.purchases.slice().sort((a,b)=>String(b.purchaseTime||b.createdAt).localeCompare(String(a.purchaseTime||a.createdAt))).forEach(purchase=>cellRow($('purchaseRows'),[date(purchase.purchaseTime||purchase.createdAt),purchase.productId,purchase.tokensCredited,purchase.orderId||purchase.transactionId]));
    if (!data.purchases.length) emptyTable($('purchaseRows'),4,'No purchases recorded.');
    $('accountForm').hidden=false; renderTimeline();
  }
  async function loadAccount(path) {
    const generation=routeEpoch, revision=accountRevision, result=await api(path); if (generation!==routeEpoch || revision!==accountRevision || !state) return;
    accountData=result; renderAccount();
  }
  async function route() {
    routeEpoch++; if (!state) return;
    const raw=location.hash.slice(1), query=new URLSearchParams(raw);
    if (query.has('account') || query.has('device') || query.has('contact') && query.get('view')!=='support') {
      showPage('account'); accountData=null; accountDirty=false; $('accountForm').hidden=true; $('accountDetails').replaceChildren(); $('timeline').replaceChildren(); $('purchaseRows').replaceChildren(); $('accountContacts').replaceChildren(); $('accountNotice').textContent='Loading account…';
      $('backToContacts').href=query.get('fromContact')?M.contactURL(query.get('fromContact')):'#users'; $('backToContacts').textContent=query.get('fromContact')?'Back to conversation':'Back to users';
      const path=query.has('account')?'/admin/accounts/'+encodeURIComponent(query.get('account')):'/admin/resolve/'+(query.has('device')?'device/':'contact/')+encodeURIComponent(query.get('device')||query.get('contact'));
      try { await loadAccount(path); } catch(e) { $('accountNotice').textContent=e.message; status(e.message,true); } return;
    }
    const name=query.get('view')==='support'?'support':pages.includes(raw)?raw:'overview'; showPage(name);
    if(name==='support') { const next=query.get('contact')||selectedContact; if(next!==selectedContact) { if(selectedContact) drafts.set(selectedContact,$('reply').value); $('reply').value=drafts.get(next)||''; $('conversation').replaceChildren(node('p','Loading messages…','muted')); } selectedContact=next; renderContactList(); renderContactHeader(); if(selectedContact) await loadMessages(true); }
  }
  async function refresh() {
    const generation=epoch, data=await api('/admin'); if(generation!==epoch) return;
    state=data; renderOverview(); renderUsers(); renderUsage(); renderContactList(); renderContactHeader();
    if(!editingSettings) { $('loginFree').checked=state.settings.loginFree; for(const key of ['freeTokens','messagesPerToken','wisdomTokensPerRefresh','callTokensPerMinute']) $(key).value=state.settings[key]; }
    $('catalog').replaceChildren(); for(const pack of state.catalog) {
      const button=node('button',`${pack.title} · ${pack.tokens+(pack.bonusTokens||0)} tokens · ${pack.priceLabel}`,'secondary');
      button.onclick=()=>{for(const [id,key] of Object.entries({packId:'id',packTitle:'title',packProduct:'productId',packPrice:'priceLabel',packTokens:'tokens',packBonus:'bonusTokens'})) $(id).value=pack[key]??'';}; $('catalog').appendChild(button);
    }
    if(activePage==='support'&&selectedContact&&!document.hidden) await loadMessages(true);
    if(activePage==='account'&&accountData&&!accountDirty) await loadAccount('/admin/accounts/'+encodeURIComponent(accountData.account.id));
    $('lastUpdated').textContent='Updated '+new Date().toLocaleTimeString();
  }
  for(const [key,title] of Object.entries({freeTokens:'New guest tokens',messagesPerToken:'Messages per token',wisdomTokensPerRefresh:'Daily wisdom refresh cost',callTokensPerMinute:'Voice tokens per minute'})) {
    const label=node('label',title),input=node('input');input.type='number';input.id=key;input.min=key==='messagesPerToken'?'1':'0';input.max='1000';input.required=true;label.appendChild(input);$('tokenSettings').appendChild(label);
  }
  window.addEventListener('hashchange',()=>route().catch(e=>status(e.message,true)));
  $('loginForm').onsubmit=async event=>{event.preventDefault();try{await auth.signInWithEmailAndPassword($('email').value.trim(),$('password').value);$('password').value='';}catch(e){status(e.message,true);}};
  $('logout').onclick=()=>auth.signOut();
  $('refresh').onclick=()=>refresh().then(()=>status('Dashboard refreshed.')).catch(e=>status(e.message,true));
  $('search').oninput=()=>{usersPage=1;renderUsers();}; $('usageSearch').oninput=()=>{usagePage=1;renderUsage();};
  $('contactSearch').oninput=renderContactList; $('unreadOnly').onchange=renderContactList;
  $('timelineSearch').oninput=()=>{timelineLimit=20;renderTimeline();}; $('timelineSort').onclick=()=>{oldestFirst=!oldestFirst;renderTimeline();}; $('loadMoreTimeline').onclick=()=>{timelineLimit+=20;renderTimeline();};
  $('accountForm').oninput=()=>{accountDirty=true;accountRevision++;};
  $('reloadAccount').onclick=()=>{if(accountData)loadAccount('/admin/accounts/'+encodeURIComponent(accountData.account.id)).catch(e=>status(e.message,true));};
  $('accountForm').onsubmit=async event=>{
    event.preventDefault();if(!accountData)return;const id=accountData.account.id,generation=routeEpoch;const controls=$('accountForm').querySelectorAll('input,button');controls.forEach(control=>{control.disabled=true;});
    try{await api('/admin/accounts/'+encodeURIComponent(id),'PUT',{balance:Number($('accountBalance').value),messageSendCount:Number($('accountMessageCount').value),reason:$('accountReason').value,expectedBalance:accountData.account.balance,expectedMessageSendCount:accountData.account.messageSendCount||0});if(generation!==routeEpoch)return;accountDirty=false;await loadAccount('/admin/accounts/'+encodeURIComponent(id));await refresh();status('Account updated. The change is recorded in its usage timeline.');}catch(e){status(e.message,true);}finally{controls.forEach(control=>{control.disabled=false;});}
  };
  $('settingsForm').oninput=()=>{editingSettings=true;};
  $('settingsForm').onsubmit=async event=>{event.preventDefault();const body={loginFree:$('loginFree').checked};for(const key of ['freeTokens','messagesPerToken','wisdomTokensPerRefresh','callTokensPerMinute'])body[key]=Number($(key).value);try{await api('/admin/settings','PUT',body);editingSettings=false;await refresh();status('Settings saved.');}catch(e){status(e.message,true);}};
  $('packForm').onsubmit=async event=>{event.preventDefault();try{await api('/admin/catalog','PUT',{id:$('packId').value,title:$('packTitle').value,productId:$('packProduct').value,priceLabel:$('packPrice').value,tokens:Number($('packTokens').value),bonusTokens:Number($('packBonus').value)});await refresh();status('Token pack saved.');}catch(e){status(e.message,true);}};
  $('reply').oninput=()=>{if(selectedContact)drafts.set(selectedContact,$('reply').value);};
  $('replyForm').onsubmit=async event=>{event.preventDefault();if(!selectedContact)return;const id=selectedContact,text=$('reply').value;$('sendReply').disabled=true;try{await api('/admin/contacts/'+encodeURIComponent(id)+'/messages','POST',{text});if(drafts.get(id)===text)drafts.delete(id);if(selectedContact===id&&$('reply').value===text)$('reply').value='';await refresh();status('Reply sent.');}catch(e){status(e.message,true);}finally{$('sendReply').disabled=false;}};
  auth.onAuthStateChanged(async user=>{
    const generation=++epoch;routeEpoch++;clearInterval(timer);state=null;accountData=null;selectedContact='';accountDirty=false;editingSettings=false;drafts.clear();usersPage=1;usagePage=1;
    for(const id of ['search','usageSearch','contactSearch','timelineSearch'])$(id).value='';$('unreadOnly').checked=false;
    for(const id of ['userRows','usageRows','logRows','contactList','contactHeader','conversation','accountDetails','accountContacts','timeline','purchaseRows','stats','usersChart','typeChart','dailyChart'])$(id).replaceChildren();
    $('reply').value='';$('accountBalance').value='';$('accountMessageCount').value='';$('accountReason').value='';$('login').hidden=!!user;$('dashboard').hidden=true;$('logout').hidden=!user;$('refresh').hidden=!user;
    if(user)try{await refresh();if(generation!==epoch)return;$('dashboard').hidden=false;await route();status('');timer=setInterval(()=>refresh().catch(e=>status(e.message,true)),15000);}catch(e){if(generation===epoch)status(e.message,true);}
    else status('');
  });
})();
