export function startAnalytics(user) {
  const host = document.getElementById('analyticsDashboard');
  if (!host) return () => {};
  host.replaceChildren();
  const heading = document.createElement('h2'); heading.textContent = 'Visitor activity'; host.append(heading);
  const note = document.createElement('p'); note.textContent = 'Tracked visitors on the base URL (excluding opt-outs and supported browser privacy signals). IP addresses may be shared or masked by VPNs. Active time is an estimate; closing a browser can lose the final update. Summaries include the entire range; detail lists show the latest 200 visits and 500 events. Times use your browser timezone.'; host.append(note);
  const range = document.createElement('select'); range.setAttribute('aria-label','Analytics date range');
  for (const days of [1,7,30,90]) { const o = document.createElement('option'); o.value = days; o.textContent = `Last ${days} day${days>1?'s':''}`; o.selected = days===7; range.append(o); }
  const refresh = document.createElement('button'); refresh.type='button';refresh.textContent='Refresh';
  const status = document.createElement('p');status.setAttribute('role','status');
  const content = document.createElement('div'); host.append(range,refresh,status,content);
  let stopped=false, busy=false, interactionPage=0;
  const interactionsPerPage = 25;
  function table(title,rows,keys, destination = content) {
    const h=document.createElement('h3');h.textContent=title;destination.append(h);
    const wrap=document.createElement('div');wrap.style.overflowX='auto';
    const t=document.createElement('table');t.style.cssText='width:100%;border-collapse:collapse;text-align:left;font-size:14px';
    const head=t.createTHead().insertRow();for(const k of keys){const th=document.createElement('th');th.textContent=k.replaceAll('_',' ');th.style.padding='8px';head.append(th);}
    const body=t.createTBody();for(const row of rows){const tr=body.insertRow();for(const k of keys){const td=tr.insertCell();td.style.cssText='padding:8px;border-top:1px solid #666;max-width:260px;overflow-wrap:anywhere';td.textContent=['started','seen'].includes(k)?new Date(Number(row[k])*1000).toLocaleString():String(row[k]??'');}}
    if(!rows.length){const p=document.createElement('p');p.textContent='No activity recorded in this range.';destination.append(p);}else{wrap.append(t);destination.append(wrap);}
  }
  function recentInteractions(events) {
    const section = document.createElement('section');
    section.setAttribute('aria-label', 'Recent interactions');
    content.append(section);
    function render() {
      const pages = Math.max(1, Math.ceil(events.length / interactionsPerPage));
      interactionPage = Math.min(interactionPage, pages - 1);
      section.replaceChildren();
      const start = interactionPage * interactionsPerPage;
      table('Recent interactions', events.slice(start, start + interactionsPerPage), ['visit','type','target','value','at'], section);
      const controls = document.createElement('nav');
      controls.setAttribute('aria-label', 'Interaction pages');
      controls.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:16px';
      const previous = document.createElement('button'); previous.type = 'button'; previous.textContent = 'Previous'; previous.disabled = interactionPage === 0;
      const next = document.createElement('button'); next.type = 'button'; next.textContent = 'Next'; next.disabled = interactionPage >= pages - 1;
      const label = document.createElement('span'); label.setAttribute('role','status');
      label.textContent = `Page ${interactionPage + 1} of ${pages} | ${events.length ? start + 1 : 0}-${Math.min(start + interactionsPerPage, events.length)} of ${events.length} recent interactions`;
      previous.addEventListener('click', () => { interactionPage--; render(); });
      next.addEventListener('click', () => { interactionPage++; render(); });
      controls.append(previous,label,next); section.append(controls);
    }
    render();
  }
  async function load(){
    if(stopped||busy)return;busy=true;refresh.disabled=true;status.textContent='Loading analytics…';
    try {
      async function request(forceRefresh = false) {
        const token = await user.getIdToken(forceRefresh);
        return fetch(`https://67.211.211.236/site-analytics/report.php?days=${range.value}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
      }
      let response = await request();
      if (response.status === 401) response = await request(true);
      if(!response.ok)throw new Error(`Analytics request failed (${response.status}).`);
      const data=await response.json();if(stopped)return;content.replaceChildren();
      const cards=document.createElement('div');cards.style.cssText='display:flex;flex-wrap:wrap;gap:12px';
      for(const [key,value] of Object.entries(data.summary)){const card=document.createElement('div');card.style.cssText='background:#222;border-radius:10px;padding:16px;flex:1;min-width:140px';const number=document.createElement('strong');number.style.cssText='display:block;font-size:24px;color:#d4af37';number.textContent=value;card.append(number,document.createTextNode(key.replaceAll('_',' ')));cards.append(card);}content.append(cards);
      table('Daily totals (UTC)',data.daily,['day','visits','visitors']);
      table('Interaction summary',data.types,['type','count']);
      table('Recent visits',data.visits,['id','ip','started','seen','active','referrer','screen','language']);
      recentInteractions(data.events);
      status.textContent=`Updated ${new Date().toLocaleTimeString()} · refreshes every 30 seconds`;
    }catch(error){if(!stopped)status.textContent=error.message+' Check your connection or sign in again.';}
    finally{busy=false;refresh.disabled=false;}
  }
  range.addEventListener('change',() => { interactionPage=0; load(); });refresh.addEventListener('click',load);load();
  const interval=setInterval(load,30000);
  return ()=>{stopped=true;clearInterval(interval);host.replaceChildren();};
}
