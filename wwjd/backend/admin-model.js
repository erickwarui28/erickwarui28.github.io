(function (root) {
  'use strict';
  const day = value => { if(value === null || value === undefined || value === '') return null; const d = new Date(value); return Number.isNaN(d.getTime()) ? null : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const text = value => String(value ?? '').toLowerCase();
  const matches = (values, query) => values.some(value => text(value).includes(text(query).trim()));
  const model = {
    day, matches,
    accountURL: (id, contactId) => `index.html#account=${encodeURIComponent(id)}${contactId ? '&fromContact='+encodeURIComponent(contactId) : ''}`,
    contactURL: id => `index.html#view=support&contact=${encodeURIComponent(id)}`,
    page(items, number, size = 10) { const pages = Math.max(1,Math.ceil(items.length/size)), current = Math.max(1,Math.min(number,pages)); return { items:items.slice((current-1)*size,current*size), current,pages,total:items.length }; },
    summary(state, now = new Date()) {
      const today = day(now), spent = state.usage.filter(entry => entry.delta < 0);
      return { users:state.users.length, balance:state.users.reduce((n,user)=>n+(Number(user.balance)||0),0), spent:spent.reduce((n,entry)=>n-entry.delta,0),
        newToday:state.users.filter(user=>day(user.createdAt)===today).length, spentToday:spent.filter(entry=>day(entry.createdAt)===today).reduce((n,entry)=>n-entry.delta,0),
        unread:state.contacts.reduce((n,contact)=>n+(Number(contact.adminUnreadCount)||0),0) };
    },
    series(items, getLabel, getValue = () => 1) {
      const values = new Map(); for (const item of items) { const label = getLabel(item); if (label) values.set(label,(values.get(label)||0)+getValue(item)); }
      return [...values].sort(([a],[b])=>a.localeCompare(b));
    },
    timeline(details, query, oldestFirst) {
      const items = [{id:'created',createdAt:details.account.createdAt,type:'account_created',note:'Account created'},...details.usage];
      return items.filter(item=>matches([item.type,item.note,item.deviceId,item.delta,item.amount,item.balanceBefore,item.balanceAfter],query))
        .sort((a,b)=>(String(a.createdAt||'').localeCompare(String(b.createdAt||'')) || String(a.id).localeCompare(String(b.id)))*(oldestFirst?1:-1));
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else root.WWJDAdminModel = model;
})(typeof window !== 'undefined' ? window : globalThis);
