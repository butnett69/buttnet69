/* ===== BUTT69 site config — edit and push ===== */
const CFG = {
  MINT: "",                                                    // paste mint at launch; empty = pre-launch
  DEV_WALLET: "B1BKxiMvqQbSDLmMMLSizNMDTh6qW6Fr9X5GUPRQsfS4",
  X: "https://x.com/BuTTnet69",
  TG: "https://t.me/buttnet69",
  LAUNCH_UTC: "2026-09-08T12:30:00Z"
};
const ICON_X = '<svg class="ico" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
const ICON_TG = '<svg class="ico" viewBox="0 0 24 24"><path d="M9.04 15.6l-.37 5.2c.53 0 .76-.23 1.04-.5l2.5-2.4 5.18 3.8c.95.52 1.63.25 1.88-.88l3.4-15.95c.31-1.4-.5-1.95-1.43-1.6L1.3 10.9c-1.36.53-1.34 1.29-.23 1.63l5.1 1.59L18 6.66c.56-.36 1.07-.16.65.2z"/></svg>';
function fmt(n){return n==null?"—":"$"+Number(n).toLocaleString(undefined,{maximumFractionDigits:0});}
function header(active){
  const h=document.createElement("header");h.className="hdr";
  const pages=[["whitepaper","Whitepaper"],["docs","Docs"],["lore","Lore"],["vs","SN69 vs BUTT69"],["updates","Updates"]];
  h.innerHTML=`<a class="wordmark" href="index.html">Buttnet <span>69</span></a>
    <nav>${pages.map(([k,l])=>`<a href="${k}.html" class="${k===active?'on':''}">${l}</a>`).join("")}</nav>
    <div class="right"><span class="pill" id="mcap">${CFG.MINT?'mcap <b>…</b>':'<b>pre-launch</b>'}</span>
      <a href="${CFG.X}" target="_blank" rel="noopener" aria-label="X">${ICON_X}</a><a href="${CFG.TG}" target="_blank" rel="noopener" aria-label="Telegram">${ICON_TG}</a></div>`;
  document.body.prepend(h);
  addEventListener("scroll",()=>h.classList.toggle("solid",scrollY>10),{passive:true});
  if(CFG.MINT) mcap();
}
function mcap(){
  fetch(`https://api.dexscreener.com/latest/dex/tokens/${CFG.MINT}`).then(r=>r.json()).then(d=>{
    const ps=(d.pairs||[]).filter(p=>p.chainId==="solana").sort((a,b)=>((b.liquidity||{}).usd||0)-((a.liquidity||{}).usd||0));
    const el=document.getElementById("mcap"); if(!el) return;
    if(!ps.length){el.innerHTML="mcap <b>indexing…</b>";return;}
    el.innerHTML=`mcap <b>${fmt(ps[0].marketCap||ps[0].fdv)}</b>`;
    window.__pair=ps[0];
  }).catch(()=>{});
  setTimeout(mcap,30000);
}
function footer(){
  const f=document.createElement("footer");f.className="ftr";
  f.innerHTML=`Buttnet 69 is a meme token. This site describes a mechanism; it promises nothing. Not affiliated with Bittensor, the Opentensor Foundation, Herald (SN69), the people behind Buttensor, or StonkFun.<br>
  Nothing here is financial advice. Do your own research, and by research we mean reading the chain.<br><br>
  Dev wallet <a href="https://solscan.io/account/${CFG.DEV_WALLET}" target="_blank" rel="noopener" class="mono">${CFG.DEV_WALLET}</a><br>
  <br>© 2026 Buttnet 69`;
  document.body.appendChild(f);
}
function copyCA(el){ if(!CFG.MINT) return; navigator.clipboard.writeText(CFG.MINT).then(()=>{const o=el.textContent;el.textContent="copied";setTimeout(()=>el.textContent=o,1200);}); }
