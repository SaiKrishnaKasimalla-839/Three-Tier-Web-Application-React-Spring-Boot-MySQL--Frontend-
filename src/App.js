import { useState, useEffect } from "react";
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#03050a;--surface:#080d18;--surface2:#0d1525;--surface3:#111c32;
  --border:rgba(56,189,248,0.12);--border2:rgba(56,189,248,0.06);
  --accent:#38bdf8;--accent2:#7c3aed;--accent3:#10b981;--warn:#f59e0b;
  --text:#e2e8f0;--muted:#64748b;--danger:#ef4444;
  --fh:'Syne',sans-serif;--fb:'Inter',sans-serif;--fm:'DM Mono',monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--fb);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--accent2);border-radius:2px}
.grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(56,189,248,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.025) 1px,transparent 1px);
  background-size:56px 56px;}
.grid-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 45% at 50% -5%,rgba(124,58,237,0.18),transparent);}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* NAVBAR */
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;background:rgba(3,5,10,.75);backdrop-filter:blur(20px);border-bottom:1px solid var(--border2);transition:background .3s}
.navbar.scrolled{background:rgba(3,5,10,.97)}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.logo-icon{border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-text{font-family:var(--fh);font-weight:800;color:#fff;letter-spacing:-.4px}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-link{background:none;border:none;font-family:var(--fb);font-size:14px;color:var(--muted);cursor:pointer;padding:8px 14px;border-radius:8px;transition:color .2s,background .2s}
.nav-link:hover{color:var(--text);background:rgba(255,255,255,.04)}
.nav-cta-row{display:flex;align-items:center;gap:10px}
.btn-ghost{background:none;border:1px solid var(--border);border-radius:9px;padding:9px 18px;font-family:var(--fb);font-size:13px;font-weight:500;color:var(--text);cursor:pointer;transition:border-color .2s,color .2s}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.btn-cta{background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:9px;padding:9px 20px;font-family:var(--fb);font-size:13px;font-weight:600;color:#fff;cursor:pointer;box-shadow:0 4px 16px rgba(56,189,248,.2);transition:opacity .2s,transform .15s}
.btn-cta:hover{opacity:.9;transform:translateY(-1px)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 24px 80px;position:relative;z-index:1}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.2);border-radius:100px;padding:6px 16px;font-size:12px;color:var(--accent);font-family:var(--fm);margin-bottom:28px;animation:fadeUp .6s ease both}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--accent3);box-shadow:0 0 8px var(--accent3);animation:pulse 2s ease infinite}
.hero-title{font-family:var(--fh);font-size:clamp(38px,6vw,78px);font-weight:800;line-height:1.07;color:#fff;max-width:860px;margin-bottom:24px;animation:fadeUp .6s .1s ease both}
.grad{background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 55%,#ec4899 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:17px;color:var(--muted);max-width:560px;line-height:1.7;margin-bottom:40px;animation:fadeUp .6s .2s ease both}
.hero-btns{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;animation:fadeUp .6s .3s ease both;margin-bottom:60px}
.btn-lg{border-radius:12px;padding:16px 32px;font-family:var(--fh);font-size:15px;font-weight:700;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s}
.btn-lg.fill{background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;color:#fff;box-shadow:0 6px 28px rgba(56,189,248,.28)}
.btn-lg.fill:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 10px 36px rgba(56,189,248,.38)}
.btn-lg.out{background:none;border:1px solid var(--border);color:var(--text)}
.btn-lg.out:hover{border-color:var(--accent);background:rgba(56,189,248,.05)}
.hero-term{width:100%;max-width:680px;background:rgba(8,13,24,.92);border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.6),0 0 60px rgba(56,189,248,.06);animation:fadeUp .7s .4s ease both;text-align:left}
.term-bar{background:var(--surface2);padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border2)}
.tdot{width:12px;height:12px;border-radius:50%}
.term-title{margin:0 auto;font-family:var(--fm);font-size:11px;color:var(--muted)}
.term-body{padding:20px 24px;font-family:var(--fm);font-size:12px;line-height:1.9}
.tp{color:var(--accent2)}.tc{color:var(--accent)}.to{color:var(--accent3)}.ti{color:var(--muted)}.tw{color:var(--warn)}
.tcursor{display:inline-block;width:8px;height:14px;background:var(--accent);animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px}

/* LOGOS */
.logos-strip{position:relative;z-index:1;padding:28px 6%;border-top:1px solid var(--border2);border-bottom:1px solid var(--border2);background:rgba(8,13,24,.5)}
.logos-label{text-align:center;font-size:11px;color:var(--muted);margin-bottom:22px;letter-spacing:.1em;text-transform:uppercase}
.logos-row{display:flex;align-items:center;justify-content:center;gap:44px;flex-wrap:wrap}
.logo-pill{font-family:var(--fh);font-size:14px;font-weight:700;color:var(--muted);opacity:.45;transition:opacity .2s;cursor:default}
.logo-pill:hover{opacity:.85}

/* SECTION */
.section{position:relative;z-index:1;padding:96px 6%}
.sec-alt{background:rgba(8,13,24,.55)}
.stag{display:inline-block;font-family:var(--fm);font-size:11px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
.stitle{font-family:var(--fh);font-size:clamp(26px,4vw,46px);font-weight:800;color:#fff;line-height:1.13;margin-bottom:16px}
.ssub{font-size:16px;color:var(--muted);line-height:1.7;max-width:560px}
.sec-center{text-align:center}.sec-center .ssub{margin:0 auto}

/* FEATURES GRID */
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.feat-card{background:var(--surface);border:1px solid var(--border2);border-radius:16px;padding:28px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .2s}
.feat-card:hover{border-color:var(--border);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.4)}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--fc,var(--accent)),transparent)}
.feat-card:nth-child(1){--fc:#38bdf8}.feat-card:nth-child(2){--fc:#7c3aed}.feat-card:nth-child(3){--fc:#10b981}
.feat-card:nth-child(4){--fc:#f59e0b}.feat-card:nth-child(5){--fc:#ec4899}.feat-card:nth-child(6){--fc:#38bdf8}
.ficon{width:48px;height:48px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px}
.ftitle{font-family:var(--fh);font-size:16px;font-weight:700;color:#fff;margin-bottom:8px}
.fdesc{font-size:13px;color:var(--muted);line-height:1.7}

/* HOW IT WORKS */
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:56px;position:relative}
.how-grid::before{content:'';position:absolute;top:31px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent);opacity:.25}
.how-step{text-align:center;padding:0 16px}
.how-num{width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,rgba(56,189,248,.1),rgba(124,58,237,.1));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-family:var(--fh);font-size:19px;font-weight:800;color:var(--accent)}
.how-title{font-family:var(--fh);font-size:15px;font-weight:700;color:#fff;margin-bottom:8px}
.how-desc{font-size:13px;color:var(--muted);line-height:1.65}

/* AGENTS SHOWCASE */
.ag-showcase{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start;margin-top:56px}
.ag-list{display:flex;flex-direction:column;gap:10px}
.ag-row{display:flex;align-items:center;gap:13px;background:var(--surface);border:1px solid var(--border2);border-radius:13px;padding:15px;cursor:pointer;transition:border-color .2s,background .2s}
.ag-row:hover,.ag-row.active{border-color:var(--accent);background:rgba(56,189,248,.04)}
.ag-row-icon{width:42px;height:42px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:19px}
.ag-row-name{font-family:var(--fh);font-size:13px;font-weight:700;color:#fff}
.ag-row-sub{font-size:11px;color:var(--muted);margin-top:2px}
.ag-badge{margin-left:auto;padding:2px 10px;border-radius:20px;font-size:10px;font-weight:600;background:rgba(16,185,129,.12);color:#6ee7b7;flex-shrink:0}
.ag-badge.idle{background:rgba(100,116,139,.1);color:var(--muted)}
.ag-detail{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:28px}
.ad-hdr{display:flex;align-items:center;gap:13px;margin-bottom:18px}
.ad-icon{width:54px;height:54px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:25px}
.ad-name{font-family:var(--fh);font-size:20px;font-weight:800;color:#fff}
.ad-type{font-size:12px;color:var(--muted);margin-top:3px}
.ad-desc{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:18px}
.ad-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ad-stat{background:var(--surface2);border-radius:10px;padding:12px;text-align:center}
.ad-stat-val{font-family:var(--fh);font-size:18px;font-weight:800;color:var(--accent)}
.ad-stat-lbl{font-size:10px;color:var(--muted);margin-top:2px;text-transform:uppercase;letter-spacing:.06em}

/* PRICING */
.price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px;align-items:start}
.price-card{background:var(--surface);border:1px solid var(--border2);border-radius:20px;padding:32px;transition:transform .2s,box-shadow .2s}
.price-card.feat{border-color:var(--accent);background:linear-gradient(135deg,rgba(8,13,24,1),rgba(13,21,37,1));box-shadow:0 0 60px rgba(56,189,248,.1),0 20px 60px rgba(0,0,0,.4);transform:scale(1.03)}
.price-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.3)}
.price-card.feat:hover{transform:scale(1.03) translateY(-4px)}
.ptag{display:inline-block;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:14px;background:rgba(56,189,248,.1);color:var(--accent)}
.pname{font-family:var(--fh);font-size:18px;font-weight:800;color:#fff;margin-bottom:6px}
.pdesc{font-size:13px;color:var(--muted);margin-bottom:22px;line-height:1.6}
.pamount{display:flex;align-items:flex-end;gap:4px;margin-bottom:5px}
.pdollar{font-family:var(--fh);font-size:40px;font-weight:800;color:#fff;line-height:1}
.pperiod{font-size:13px;color:var(--muted);margin-bottom:5px}
.pper{font-size:12px;color:var(--muted);margin-bottom:26px}
.pdiv{height:1px;background:var(--border2);margin-bottom:18px}
.pfeat{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--muted);padding:5px 0}
.pfeat .chk{color:var(--accent3);flex-shrink:0}.pfeat .x{color:var(--muted);flex-shrink:0}
.pbtn{width:100%;margin-top:22px;padding:13px;border-radius:11px;font-family:var(--fh);font-size:14px;font-weight:700;cursor:pointer;transition:opacity .2s,transform .15s}
.pbtn.out{background:none;border:1px solid var(--border);color:var(--text)}
.pbtn.out:hover{border-color:var(--accent);color:var(--accent)}
.pbtn.fill{background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;color:#fff;box-shadow:0 4px 20px rgba(56,189,248,.22)}
.pbtn.fill:hover{opacity:.9;transform:translateY(-1px)}

/* TESTIMONIALS */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.testi-card{background:var(--surface);border:1px solid var(--border2);border-radius:16px;padding:28px;transition:border-color .2s}
.testi-card:hover{border-color:var(--border)}
.stars{color:var(--warn);font-size:12px;margin-bottom:14px}
.tquote{font-size:14px;color:var(--text);line-height:1.75;margin-bottom:18px;font-style:italic}
.tquote::before{content:'"';font-size:32px;color:var(--accent2);line-height:0;vertical-align:-12px;margin-right:4px}
.tauthor{display:flex;align-items:center;gap:11px}
.tavatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
.tname{font-family:var(--fh);font-size:13px;font-weight:700;color:#fff}
.trole{font-size:11px;color:var(--muted);margin-top:2px}

/* CTA BANNER */
.cta-banner{position:relative;z-index:1;margin:0 6%;padding:64px;background:linear-gradient(135deg,rgba(56,189,248,.08),rgba(124,58,237,.08));border:1px solid rgba(56,189,248,.15);border-radius:24px;text-align:center;overflow:hidden}
.cta-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 120%,rgba(124,58,237,.15),transparent)}
.cta-title{font-family:var(--fh);font-size:clamp(24px,4vw,44px);font-weight:800;color:#fff;margin-bottom:14px;position:relative}
.cta-sub{font-size:16px;color:var(--muted);margin-bottom:34px;position:relative}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative}

/* FOOTER */
.footer{position:relative;z-index:1;margin-top:80px;border-top:1px solid var(--border2);background:rgba(8,13,24,.85)}
.footer-main{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:48px;padding:60px 6% 44px}
.fbrand-desc{font-size:13px;color:var(--muted);line-height:1.7;margin-top:14px;max-width:230px}
.fcol-title{font-family:var(--fh);font-size:13px;font-weight:700;color:#fff;margin-bottom:15px}
.flink{display:block;font-size:13px;color:var(--muted);margin-bottom:10px;cursor:pointer;transition:color .2s;background:none;border:none;text-align:left;font-family:var(--fb)}
.flink:hover{color:var(--accent)}
.footer-bottom{border-top:1px solid var(--border2);padding:22px 6%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.fcopy{font-size:12px;color:var(--muted)}
.fsocials{display:flex;gap:8px}
.fsoc{width:34px;height:34px;border-radius:8px;background:var(--surface2);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;transition:border-color .2s,transform .15s}
.fsoc:hover{border-color:var(--accent);transform:translateY(-1px)}
.fbadges{display:flex;gap:8px;flex-wrap:wrap}
.fbadge{font-size:10px;padding:3px 9px;border-radius:20px;font-family:var(--fm);background:rgba(56,189,248,.05);border:1px solid var(--border2);color:var(--muted)}

/* AUTH PAGE */
.auth-page{min-height:100vh;display:flex;position:relative;z-index:1}
.auth-left{flex:1;display:flex;flex-direction:column;justify-content:center;padding:60px 5%;background:linear-gradient(135deg,rgba(8,13,24,.6),rgba(13,21,37,.4));border-right:1px solid var(--border2)}
.auth-left-h{font-family:var(--fh);font-size:clamp(26px,3.5vw,44px);font-weight:800;color:#fff;line-height:1.1;margin-bottom:18px;max-width:440px}
.auth-left-sub{font-size:15px;color:var(--muted);line-height:1.7;max-width:380px;margin-bottom:36px}
.proof-list{display:flex;flex-direction:column;gap:12px}
.proof-item{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--muted)}
.proof-icon{width:36px;height:36px;border-radius:9px;background:rgba(56,189,248,.08);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.auth-right{width:500px;display:flex;align-items:center;justify-content:center;padding:40px}
.auth-card{width:100%;background:linear-gradient(135deg,rgba(8,13,24,.97),rgba(13,21,37,.97));border:1px solid var(--border);border-radius:20px;padding:40px 36px;animation:fadeUp .5s ease both;box-shadow:0 0 60px rgba(56,189,248,.06),0 24px 80px rgba(0,0,0,.5)}
.auth-topbar{padding:20px 6%}
.auth-title{font-family:var(--fh);font-size:24px;font-weight:800;color:#fff;margin-bottom:4px}
.auth-sub2{font-size:13px;color:var(--muted);margin-bottom:26px}
.auth-sub2 button{all:unset;color:var(--accent);cursor:pointer;text-decoration:underline;font-size:13px}
.form-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.field{margin-bottom:13px}
.field label{display:block;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:7px;font-family:var(--fm)}
.field-inner{position:relative;display:flex;align-items:center}
.field-inner .icon{position:absolute;left:12px;color:var(--muted);font-size:14px;pointer-events:none;transition:color .2s}
.field input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:9px;padding:11px 12px 11px 36px;font-family:var(--fm);font-size:13px;color:var(--text);outline:none;transition:border-color .2s,box-shadow .2s}
.field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(56,189,248,.1)}
.field input::placeholder{color:var(--muted)}
.field-inner:focus-within .icon{color:var(--accent)}
.btn-auth{width:100%;padding:13px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:10px;font-family:var(--fh);font-size:14px;font-weight:700;color:#fff;cursor:pointer;margin-top:4px;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 4px 20px rgba(56,189,248,.2)}
.btn-auth:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 8px 28px rgba(56,189,248,.3)}
.err-msg{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.18);border-radius:8px;padding:9px 12px;font-size:12px;color:#fca5a5;margin-bottom:13px}
.ok-msg{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.18);border-radius:8px;padding:9px 12px;font-size:12px;color:#6ee7b7;margin-bottom:13px}
.auth-footer{text-align:center;margin-top:16px;font-size:12px;color:var(--muted)}
.auth-footer button{all:unset;color:var(--accent);cursor:pointer;font-size:12px;text-decoration:underline}

/* DASHBOARD */
.app{display:flex;min-height:100vh;position:relative;z-index:1}
.sidebar{width:252px;min-height:100vh;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border2);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto}
.sb-logo{display:flex;align-items:center;gap:10px;padding:24px 20px 20px;border-bottom:1px solid var(--border2)}
.sb-section{padding:16px 12px 4px}
.sb-lbl{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:0 8px;margin-bottom:4px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--muted);font-family:var(--fb);transition:background .15s,color .15s;border:none;background:none;width:100%;text-align:left}
.nav-item:hover{background:var(--surface2);color:var(--text)}
.nav-item.active{background:rgba(56,189,248,.08);color:var(--accent)}
.nav-item .ni{font-size:15px}
.nav-item .badge{margin-left:auto;background:var(--accent2);color:#fff;border-radius:20px;padding:1px 7px;font-size:9px;font-weight:600}
.sb-footer{margin-top:auto;padding:13px;border-top:1px solid var(--border2)}
.user-chip{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--surface2)}
.user-av{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:13px;font-weight:800;color:#fff}
.u-name{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u-role{font-size:10px;color:var(--muted)}
.logout{background:none;border:none;color:var(--muted);cursor:pointer;font-size:15px;padding:4px;transition:color .2s}
.logout:hover{color:var(--danger)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 26px;border-bottom:1px solid var(--border2);background:rgba(3,5,10,.87);backdrop-filter:blur(12px);position:sticky;top:0;z-index:10}
.tb-title{font-family:var(--fh);font-size:17px;font-weight:700;color:#fff}
.tb-right{display:flex;align-items:center;gap:9px}
.ib{width:34px;height:34px;border-radius:8px;background:var(--surface2);border:1px solid var(--border2);color:var(--muted);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color .2s,border-color .2s}
.ib:hover{color:var(--accent);border-color:var(--accent)}
.content{flex:1;overflow-y:auto;padding:26px}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:22px}
.stat-card{background:var(--surface);border:1px solid var(--border2);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s}
.stat-card:hover{border-color:var(--border);transform:translateY(-2px)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--sc,var(--accent)),transparent)}
.stat-card:nth-child(1){--sc:#38bdf8}.stat-card:nth-child(2){--sc:#7c3aed}.stat-card:nth-child(3){--sc:#10b981}.stat-card:nth-child(4){--sc:#f59e0b}
.sl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
.sv{font-family:var(--fh);font-size:26px;font-weight:800;color:#fff}
.sc{font-size:11px;color:var(--accent3);margin-top:4px}
.si{position:absolute;top:14px;right:14px;font-size:20px;opacity:.35}
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px}
.ds-title{font-family:var(--fh);font-size:15px;font-weight:700;color:#fff}
.view-all{font-size:12px;color:var(--accent);cursor:pointer;background:none;border:none;font-family:var(--fb)}
.ag-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-bottom:22px}
.agc{background:var(--surface);border:1px solid var(--border2);border-radius:13px;padding:17px;cursor:pointer;transition:border-color .2s,transform .2s,box-shadow .2s}
.agc:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 8px 26px rgba(56,189,248,.08)}
.agc-hdr{display:flex;align-items:flex-start;gap:10px;margin-bottom:9px}
.agc-ico{width:38px;height:38px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px}
.agc-name{font-family:var(--fh);font-size:13px;font-weight:700;color:#fff}
.agc-type{font-size:11px;color:var(--muted);margin-top:2px}
.agc-desc{font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:11px}
.agc-foot{display:flex;align-items:center;justify-content:space-between}
.agc-status{display:flex;align-items:center;gap:5px;font-size:11px}
.sdot{width:6px;height:6px;border-radius:50%}
.sdot.on{background:var(--accent3);box-shadow:0 0 5px var(--accent3)}.sdot.off{background:var(--muted)}
.run-btn{padding:5px 11px;border-radius:6px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.18);color:var(--accent);font-family:var(--fb);font-size:11px;font-weight:500;cursor:pointer;transition:background .2s}
.run-btn:hover{background:rgba(56,189,248,.18)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:22px}
.panel{background:var(--surface);border:1px solid var(--border2);border-radius:13px;padding:18px}
.act-item{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border2)}
.act-item:last-child{border-bottom:none}
.adot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:5px}
.atext{font-size:12px;color:var(--text);line-height:1.5}
.atime{font-size:10px;color:var(--muted);margin-top:2px}
.rt{width:100%;border-collapse:collapse}
.rt th{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);padding:0 7px 8px;text-align:left;border-bottom:1px solid var(--border2)}
.rt td{padding:9px 7px;font-size:12px;color:var(--text);border-bottom:1px solid var(--border2)}
.rt tr:last-child td{border-bottom:none}
.bs{padding:2px 9px;border-radius:20px;font-size:10px;font-weight:600}
.bs.done{background:rgba(16,185,129,.1);color:#6ee7b7}.bs.running{background:rgba(56,189,248,.1);color:var(--accent)}.bs.failed{background:rgba(239,68,68,.1);color:#fca5a5}
.pp{display:flex;align-items:center;overflow-x:auto;padding:10px 0}
.pnode{flex-shrink:0;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:8px 13px;font-size:11px;color:var(--text);display:flex;flex-direction:column;align-items:center;gap:3px;min-width:76px;transition:border-color .2s}
.pnode:hover{border-color:var(--accent)}
.pni{font-size:16px}
.parr{color:var(--muted);font-size:15px;padding:0 3px;flex-shrink:0}

@media(max-width:1200px){.stats-row{grid-template-columns:repeat(2,1fr)}.ag-grid{grid-template-columns:repeat(2,1fr)}.feat-grid{grid-template-columns:repeat(2,1fr)}.ag-showcase{grid-template-columns:1fr}.footer-main{grid-template-columns:1fr 1fr;gap:30px}}
@media(max-width:960px){.auth-left{display:none}.auth-right{width:100%;padding:50px 24px}.price-grid{grid-template-columns:1fr}.price-card.feat{transform:none}.testi-grid{grid-template-columns:1fr}.how-grid{grid-template-columns:repeat(2,1fr)}.how-grid::before{display:none}.nav-links{display:none}}
@media(max-width:700px){.sidebar{display:none}.stats-row{grid-template-columns:1fr 1fr}.ag-grid{grid-template-columns:1fr}.two-col{grid-template-columns:1fr}.content{padding:14px}.topbar{padding:0 14px}.cta-banner{padding:36px 20px;margin:0 14px}.section{padding:64px 5%}.logos-row{gap:24px}}
`;

/* DATA */
const AGENTS_DATA = [
  {id:1,icon:"🤖",bg:"rgba(56,189,248,.12)",name:"DataSynth",type:"Data Processing",desc:"Autonomously scrapes, cleans, and synthesizes datasets from multiple sources in real-time.",status:"active",runs:12400,latency:"0.8s",uptime:"99.9%"},
  {id:2,icon:"🧠",bg:"rgba(124,58,237,.12)",name:"ReasonCore",type:"Reasoning Engine",desc:"Multi-step chain-of-thought agent for complex decision trees and reasoning pipelines.",status:"active",runs:8930,latency:"2.1s",uptime:"99.7%"},
  {id:3,icon:"🔍",bg:"rgba(16,185,129,.12)",name:"WebSurfer",type:"Web Research",desc:"Crawls and summarizes web pages, extracting structured insights automatically.",status:"idle",runs:4510,latency:"3.2s",uptime:"98.5%"},
  {id:4,icon:"📊",bg:"rgba(245,158,11,.12)",name:"AnalyticsBot",type:"Analytics",desc:"Generates charts, reports, and anomaly alerts from real-time data streams.",status:"active",runs:20340,latency:"1.1s",uptime:"99.99%"},
  {id:5,icon:"💬",bg:"rgba(236,72,153,.12)",name:"DialogFlow",type:"Conversational",desc:"Context-aware dialogue agent with persistent memory and persona customization.",status:"idle",runs:6780,latency:"0.5s",uptime:"99.8%"},
  {id:6,icon:"⚙️",bg:"rgba(56,189,248,.12)",name:"AutoOps",type:"DevOps Automation",desc:"Monitors infra, triggers alerts, and auto-remediates incidents 24/7.",status:"active",runs:31020,latency:"0.3s",uptime:"99.99%"},
];
const ACTIVITY=[
  {color:"#38bdf8",text:"DataSynth completed pipeline #2847 — 14,200 records processed",time:"2 min ago"},
  {color:"#10b981",text:"New agent WebSurfer deployed to production cluster",time:"15 min ago"},
  {color:"#7c3aed",text:"ReasonCore task queue reached 95% capacity threshold",time:"32 min ago"},
  {color:"#f59e0b",text:"AnalyticsBot generated Q4 anomaly report (3 critical)",time:"1 hr ago"},
  {color:"#ec4899",text:"DialogFlow updated conversation memory model v2.1",time:"2 hr ago"},
];
const RUNS=[
  {id:"#4821",agent:"DataSynth",dur:"1m 42s",status:"done",time:"Just now"},
  {id:"#4820",agent:"ReasonCore",dur:"8m 15s",status:"running",time:"5 min ago"},
  {id:"#4819",agent:"AnalyticsBot",dur:"3m 03s",status:"done",time:"12 min ago"},
  {id:"#4818",agent:"WebSurfer",dur:"—",status:"failed",time:"30 min ago"},
  {id:"#4817",agent:"AutoOps",dur:"0m 08s",status:"done",time:"1 hr ago"},
];
const PNODES=[{i:"📥",l:"Ingest"},{i:"🔄",l:"Parse"},{i:"🧹",l:"Clean"},{i:"🤖",l:"Reason"},{i:"📤",l:"Output"}];
const NAV_ITEMS=[
  {icon:"🏠",label:"Dashboard",id:"dashboard"},
  {icon:"🤖",label:"Agents",id:"agents",badge:"6"},
  {icon:"⚡",label:"Pipelines",id:"pipelines"},
  {icon:"📊",label:"Analytics",id:"analytics"},
  {icon:"📜",label:"Logs",id:"logs"},
  {icon:"🔑",label:"API Keys",id:"api"},
  {icon:"⚙️",label:"Settings",id:"settings"},
];
const FEATURES=[
  {icon:"⚡",bg:"rgba(56,189,248,.1)",title:"Real-Time Orchestration",desc:"Coordinate hundreds of AI agents simultaneously with sub-second latency and zero message loss."},
  {icon:"🔗",bg:"rgba(124,58,237,.1)",title:"Visual Pipeline Builder",desc:"Drag-and-drop workflow editor with 50+ pre-built nodes, conditional logic, and live debugging."},
  {icon:"🛡️",bg:"rgba(16,185,129,.1)",title:"Enterprise Security",desc:"SOC2 Type II certified. End-to-end encryption, RBAC, audit logs, and VPC deployment options."},
  {icon:"📈",bg:"rgba(245,158,11,.1)",title:"Observability Suite",desc:"Full trace visibility, token usage analytics, cost breakdowns, and custom alerting thresholds."},
  {icon:"🔌",bg:"rgba(236,72,153,.1)",title:"Universal Integrations",desc:"Native connectors for Slack, GitHub, Jira, Salesforce, Databricks, and 120+ more services."},
  {icon:"🚀",bg:"rgba(56,189,248,.1)",title:"Auto-Scaling Infra",desc:"Burst to 10,000 concurrent agents with automatic provisioning. Pay only for what you use."},
];
const TESTIMONIALS=[
  {q:"NeuralOps cut our data pipeline build time from 3 weeks to 2 days. The visual builder is genuinely magical.",name:"Sarah Chen",role:"Head of Data Eng · Stripe",g:"linear-gradient(135deg,#38bdf8,#7c3aed)",stars:5},
  {q:"We run 400+ agents across 12 product teams. The observability alone saved us $140K in wasted API calls last quarter.",name:"Marcus Reid",role:"VP Engineering · Notion",g:"linear-gradient(135deg,#7c3aed,#ec4899)",stars:5},
  {q:"Finally an AI ops platform that feels like it was built by engineers. The DevOps agent is a game changer for our SRE team.",name:"Priya Nair",role:"Staff SRE · Figma",g:"linear-gradient(135deg,#10b981,#38bdf8)",stars:5},
];
const PRICING=[
  {name:"Starter",badge:"Free forever",price:0,period:"/mo",per:"Up to 2 agents",desc:"Perfect for solo builders and side projects exploring AI automation.",feats:[
    {ok:true,t:"2 active agents"},{ok:true,t:"5K runs / month"},{ok:true,t:"Community support"},
    {ok:true,t:"Basic analytics"},{ok:false,t:"Custom integrations"},{ok:false,t:"Team seats"},
  ]},
  {name:"Pro",badge:"Most popular",price:79,period:"/mo",per:"Up to 20 agents",desc:"Everything you need to ship AI-powered workflows to production at scale.",feats:[
    {ok:true,t:"20 active agents"},{ok:true,t:"Unlimited runs"},{ok:true,t:"Priority support"},
    {ok:true,t:"Advanced analytics"},{ok:true,t:"50+ integrations"},{ok:false,t:"SSO / SAML"},
  ],feat:true},
  {name:"Enterprise",badge:"Custom pricing",price:"Custom",period:"",per:"Unlimited agents",desc:"Dedicated infrastructure, SLAs, and white-glove onboarding for large teams.",feats:[
    {ok:true,t:"Unlimited agents"},{ok:true,t:"Unlimited runs"},{ok:true,t:"24/7 dedicated support"},
    {ok:true,t:"Custom analytics"},{ok:true,t:"All integrations"},{ok:true,t:"SSO / SAML / RBAC"},
  ]},
];

/* HELPERS */
function LogoMark({sz=36,fs=18}) {
  return(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div className="logo-icon" style={{width:sz,height:sz,fontSize:sz*.5}}>⚡</div>
      <span className="logo-text" style={{fontSize:fs}}>NeuralOps</span>
    </div>
  );
}
function Field({label,icon,type="text",name,value,onChange,placeholder}){
  return(
    <div className="field">
      <label>{label}</label>
      <div className="field-inner">
        <span className="icon">{icon}</span>
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off"/>
      </div>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({onSignIn,onSignUp}){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>20);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return(
    <nav className={`navbar${scrolled?" scrolled":""}`}>
      <div className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><LogoMark sz={34} fs={17}/></div>
      <div className="nav-links">
        {[["features","Features"],["howitworks","How it Works"],["agents","Agents"],["pricing","Pricing"],["testimonials","Customers"]].map(([id,l])=>(
          <button key={id} className="nav-link" onClick={()=>go(id)}>{l}</button>
        ))}
      </div>
      <div className="nav-cta-row">
        <button className="btn-ghost" onClick={onSignIn}>Sign In</button>
        <button className="btn-cta" onClick={onSignUp}>Get Started Free →</button>
      </div>
    </nav>
  );
}

/* ── FOOTER ── */
function Footer({onSignUp}){
  return(
    <footer className="footer">
      <div className="footer-main">
        <div>
          <LogoMark sz={30} fs={16}/>
          <div className="fbrand-desc">The AI agent orchestration platform built for modern engineering teams. From prototype to production in minutes.</div>
          <div style={{display:"flex",gap:8,marginTop:18}}>
            {["🐦","💼","🐙","▶️"].map((i,k)=><div className="fsoc" key={k}>{i}</div>)}
          </div>
        </div>
        {[
          {title:"Product",links:["Features","Pricing","Changelog","Roadmap","Status"]},
          {title:"Developers",links:["Documentation","API Reference","SDKs","Open Source","Community"]},
          {title:"Company",links:["About Us","Blog","Careers","Press Kit","Contact"]},
          {title:"Legal",links:["Privacy Policy","Terms of Service","Security","Cookie Policy","SLA"]},
        ].map(col=>(
          <div key={col.title}>
            <div className="fcol-title">{col.title}</div>
            {col.links.map(l=><button className="flink" key={l}>{l}</button>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="fcopy">© 2026 NeuralOps, Inc. All rights reserved.</div>
        <div className="fbadges">
          {["SOC2 Type II","GDPR Ready","ISO 27001","99.99% Uptime"].map(b=><span className="fbadge" key={b}>{b}</span>)}
        </div>
      </div>
    </footer>
  );
}

/* ── LANDING ── */
function Landing({onSignIn,onSignUp}){
  const [activeAg,setActiveAg]=useState(0);
  const ag=AGENTS_DATA[activeAg];
  return(
    <div style={{position:"relative",zIndex:1}}>
      <Navbar onSignIn={onSignIn} onSignUp={onSignUp}/>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge"><div className="pulse-dot"/>&nbsp;Now in public beta — 12,000+ teams building with NeuralOps</div>
        <h1 className="hero-title">Orchestrate <span className="grad">AI Agents</span><br/>at Production Scale</h1>
        <p className="hero-sub">Build, deploy, and monitor autonomous AI agent workflows with a visual pipeline builder, real-time observability, and enterprise-grade security — all in one platform.</p>
        <div className="hero-btns">
          <button className="btn-lg fill" onClick={onSignUp}>Start Building Free →</button>
          <button className="btn-lg out" onClick={()=>document.getElementById("features")?.scrollIntoView({behavior:"smooth"})}>See Platform Features</button>
        </div>
        <div className="hero-term">
          <div className="term-bar">
            <div className="tdot" style={{background:"#ff5f57"}}/><div className="tdot" style={{background:"#febc2e"}}/><div className="tdot" style={{background:"#28c840"}}/>
            <div className="term-title">neuralops — pipeline runner v3.2.1</div>
          </div>
          <div className="term-body">
            <div><span className="tp">❯ </span><span className="tc">neuralops deploy --agent DataSynth --env production</span></div>
            <div><span className="to">✔ Agent image built successfully (2.1s)</span></div>
            <div><span className="to">✔ Health checks passed (3/3 replicas healthy)</span></div>
            <div><span className="to">✔ Deployed to cluster us-east-1 (4 replicas)</span></div>
            <div><span className="ti">  Endpoint: https://api.neuralops.io/agents/datasynth-v3</span></div>
            <div><span className="tw">⚠ Cost forecast: $0.0012/run · Est. $48/mo at current volume</span></div>
            <div><span className="to">✔ Pipeline #2847 executing — 14,200 records in 1m 42s</span></div>
            <div><span className="tp">❯ </span><div className="tcursor"/></div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-strip">
        <div className="logos-label">Trusted by engineering teams at</div>
        <div className="logos-row">
          {["Stripe","Notion","Figma","Vercel","Linear","Anthropic","Supabase","Railway"].map(l=>(
            <div className="logo-pill" key={l}>{l}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="sec-center">
          <div className="stag">Platform Features</div>
          <h2 className="stitle">Everything you need to run<br/>agents in production</h2>
          <p className="ssub">From prototype to 10,000 concurrent agents — NeuralOps gives your team the infrastructure, tooling, and visibility to move fast and stay reliable.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f,i)=>(
            <div className="feat-card" key={i}>
              <div className="ficon" style={{background:f.bg}}>{f.icon}</div>
              <div className="ftitle">{f.title}</div>
              <div className="fdesc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section sec-alt" id="howitworks">
        <div className="sec-center">
          <div className="stag">How It Works</div>
          <h2 className="stitle">From idea to production<br/>in four steps</h2>
        </div>
        <div className="how-grid">
          {[
            {n:"01",icon:"🎨",title:"Design your pipeline",desc:"Use the visual drag-and-drop builder to map out your agent workflow with triggers, conditions, and branches."},
            {n:"02",icon:"⚙️",title:"Configure your agents",desc:"Choose from 20+ pre-built agent templates or import your own model. Set prompts, tools, and memory settings."},
            {n:"03",icon:"🚀",title:"Deploy with one click",desc:"Push to staging or production instantly. NeuralOps handles containerization, scaling, and health checks automatically."},
            {n:"04",icon:"📊",title:"Monitor & optimize",desc:"Track every run with full trace visibility. Get cost insights, latency alerts, and auto-remediation suggestions."},
          ].map((s,i)=>(
            <div className="how-step" key={i}>
              <div className="how-num">{s.n}</div>
              <div style={{fontSize:28,marginBottom:14}}>{s.icon}</div>
              <div className="how-title">{s.title}</div>
              <div className="how-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTS SHOWCASE */}
      <section className="section" id="agents">
        <div className="stag">Agent Library</div>
        <h2 className="stitle">Pre-built agents for<br/>every use case</h2>
        <p className="ssub" style={{marginBottom:0}}>Deploy production-ready agents in seconds, or fork them as starting points for your own custom workflows.</p>
        <div className="ag-showcase">
          <div className="ag-list">
            {AGENTS_DATA.map((a,i)=>(
              <div key={a.id} className={`ag-row${i===activeAg?" active":""}`} onClick={()=>setActiveAg(i)}>
                <div className="ag-row-icon" style={{background:a.bg}}>{a.icon}</div>
                <div><div className="ag-row-name">{a.name}</div><div className="ag-row-sub">{a.type}</div></div>
                <span className={`ag-badge${a.status==="idle"?" idle":""}`}>{a.status}</span>
              </div>
            ))}
          </div>
          <div className="ag-detail">
            <div className="ad-hdr">
              <div className="ad-icon" style={{background:ag.bg}}>{ag.icon}</div>
              <div><div className="ad-name">{ag.name}</div><div className="ad-type">{ag.type}</div></div>
            </div>
            <div className="ad-desc">{ag.desc}</div>
            <div className="ad-stats">
              <div className="ad-stat"><div className="ad-stat-val">{ag.runs.toLocaleString()}</div><div className="ad-stat-lbl">Total Runs</div></div>
              <div className="ad-stat"><div className="ad-stat-val">{ag.latency}</div><div className="ad-stat-lbl">Avg Latency</div></div>
              <div className="ad-stat"><div className="ad-stat-val">{ag.uptime}</div><div className="ad-stat-lbl">Uptime SLA</div></div>
            </div>
            <div style={{marginTop:20,display:"flex",gap:10}}>
              <button className="btn-cta" style={{flex:1,padding:"11px 0",fontSize:13}} onClick={onSignUp}>Deploy This Agent →</button>
              <button className="btn-ghost" style={{flex:1,padding:"11px 0",fontSize:13}}>View Source</button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section sec-alt" id="pricing">
        <div className="sec-center">
          <div className="stag">Pricing</div>
          <h2 className="stitle">Simple, transparent pricing.<br/>Scale as you grow.</h2>
          <p className="ssub">No surprises. No per-seat fees on Pro. Cancel anytime.</p>
        </div>
        <div className="price-grid">
          {PRICING.map((p,i)=>(
            <div className={`price-card${p.feat?" feat":""}`} key={i}>
              <div className="ptag">{p.badge}</div>
              <div className="pname">{p.name}</div>
              <div className="pdesc">{p.desc}</div>
              <div className="pamount">
                {typeof p.price==="number"
                  ?<><span className="pdollar">${p.price}</span><span className="pperiod">{p.period}</span></>
                  :<span className="pdollar" style={{fontSize:28}}>Custom</span>}
              </div>
              <div className="pper">{p.per}</div>
              <div className="pdiv"/>
              {p.feats.map((f,j)=>(
                <div className="pfeat" key={j}>
                  <span className={f.ok?"chk":"x"}>{f.ok?"✓":"–"}</span>
                  <span style={{color:f.ok?"var(--text)":"var(--muted)"}}>{f.t}</span>
                </div>
              ))}
              <button className={`pbtn${p.feat?" fill":" out"}`} onClick={onSignUp}>
                {p.price===0?"Get Started Free":p.price==="Custom"?"Contact Sales":"Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials">
        <div className="sec-center">
          <div className="stag">Customer Stories</div>
          <h2 className="stitle">Loved by teams at<br/>world-class companies</h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t,i)=>(
            <div className="testi-card" key={i}>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <div className="tquote">{t.q}</div>
              <div className="tauthor">
                <div className="tavatar" style={{background:t.g}}>{t.name[0]}</div>
                <div><div className="tname">{t.name}</div><div className="trole">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <h2 className="cta-title">Ready to orchestrate your<br/>first AI agent?</h2>
        <p className="cta-sub">Join 12,000+ engineering teams shipping faster with NeuralOps.</p>
        <div className="cta-btns">
          <button className="btn-lg fill" onClick={onSignUp}>Start Building Free →</button>
          <button className="btn-lg out">Book a Demo</button>
        </div>
      </div>

      {/* FOOTER */}
      <Footer onSignUp={onSignUp}/>
    </div>
  );
}

/* ── SIGN IN ── */
function SignIn({onSignIn,onGoSignUp,onGoHome}){
  const [form,setForm]=useState({email:"",password:""});
  const [err,setErr]=useState("");
  const [busy,setBusy]=useState(false);
  const set=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));

  const handle=async()=>{
    setErr("");
    if(!form.email||!form.password) return setErr("Please fill in all fields.");
    setBusy(true);
    try{
      const res=await fetch("https://backendserver22-f7eaf3hyhbgpbjh2.canadacentral-01.azurewebsites.net/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:form.email,password:form.password})
      });
      const data=await res.text();
      if(!res.ok){ setBusy(false); return setErr(data||"Login failed. Please try again."); }
     
      const raw=form.email.split("@")[0]||"User";
      const userObj={
        email:form.email.trim().toLowerCase(),
        firstName:raw.charAt(0).toUpperCase()+raw.slice(1),
        lastName:"",
        mobile:"",
        github:"",
        token:data
      };
      sessionStorage.setItem("no_session",JSON.stringify(userObj));
      setBusy(false);
      onSignIn(userObj);   // ← App sets user → renders <Dashboard/>
    }catch(e){
      setBusy(false);
      setErr("Cannot reach server. Please check your connection. ❌");
    }
  };

  const onKey=e=>{ if(e.key==="Enter") handle(); };

  return(
    <div style={{minHeight:"100vh",position:"relative",zIndex:1,display:"flex",flexDirection:"column"}}>
      <div className="auth-topbar"><div style={{cursor:"pointer"}} onClick={onGoHome}><LogoMark sz={30} fs={15}/></div></div>
      <div className="auth-page" style={{flex:1}}>
        <div className="auth-left">
          <h2 className="auth-left-h">Welcome back to<br/>NeuralOps</h2>
          <p className="auth-left-sub">Thousands of engineering teams rely on NeuralOps to run mission-critical AI agent workflows — every day, at scale.</p>
          <div className="proof-list">
            {[{i:"✅",t:"99.99% uptime SLA across all regions"},{i:"⚡",t:"Sub-second agent dispatch latency"},{i:"🔒",t:"SOC2 Type II certified infrastructure"}].map((p,k)=>(
              <div className="proof-item" key={k}><div className="proof-icon">{p.i}</div><span>{p.t}</span></div>
            ))}
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-title">Sign in</div>
            <div className="auth-sub2">Don't have an account? <button onClick={onGoSignUp}>Sign up free</button></div>
            {err&&<div className="err-msg">⚠ {err}</div>}
            <Field label="Email / Username" icon="✉️" type="text" name="email" value={form.email} onChange={set} onKeyDown={onKey} placeholder="you@company.com"/>
            <Field label="Password" icon="🔒" type="password" name="password" value={form.password} onChange={set} onKeyDown={onKey} placeholder="••••••••"/>
            <button className="btn-auth" onClick={handle} disabled={busy} style={{opacity:busy?0.7:1,cursor:busy?"not-allowed":"pointer"}}>
              {busy?"Signing in…":"Sign In →"}
            </button>
            <div className="auth-footer">New to NeuralOps? <button onClick={onGoSignUp}>Create free account</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SIGN UP ── */
function SignUp({onGoSignIn,onSignUp,onGoHome}){
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",mobile:"",github:"",password:""});
  const [err,setErr]=useState("");
  const [ok,setOk]=useState("");
//  const [busy,setBusy]=useState(false);
  const set=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));

  const handle=async()=>{
    setErr(""); setOk("");
    if(Object.values(form).some(v=>!v.trim())) return setErr("All fields are required.");
    if(!/\S+@\S+\.\S+/.test(form.email)) return setErr("Enter a valid email address.");
    if(!/^\+?\d{7,15}$/.test(form.mobile.replace(/\s/g,""))) return setErr("Enter a valid mobile number (digits only).");
    if(form.password.length<8) return setErr("Password must be at least 8 characters.");
    setBusy(true);
    try{
      const res=await fetch("https://backendserver22-f7eaf3hyhbgpbjh2.canadacentral-01.azurewebsites.net/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:form.email,password:form.password})
      });
      const data=await res.text();
      if(!res.ok){ setBusy(false); return setErr(data||"Signup failed. Please try again."); }
      /* ✅ SUCCESS — store session and redirect to dashboard */
      setOk("Account created! Taking you to your dashboard…");
      const userObj={
        firstName:form.firstName.trim(),
        lastName:form.lastName.trim(),
        email:form.email.trim().toLowerCase(),
        mobile:form.mobile.trim(),
        github:form.github.trim(),
        token:data
      };
      sessionStorage.setItem("no_session",JSON.stringify(userObj));
      setBusy(false);
      setTimeout(()=>onSignUp(userObj),900);
    }catch(e){
      setBusy(false);
      setErr("Cannot reach server. Please check your connection. ❌");
    }
  };
  return(
    <div style={{minHeight:"100vh",position:"relative",zIndex:1,display:"flex",flexDirection:"column"}}>
      <div className="auth-topbar"><div style={{cursor:"pointer"}} onClick={onGoHome}><LogoMark sz={30} fs={15}/></div></div>
      <div className="auth-page" style={{flex:1}}>
        <div className="auth-left">
          <h2 className="auth-left-h">Build your first<br/>AI agent today</h2>
          <p className="auth-left-sub">No credit card required. Get up and running with 2 free agents and 5,000 runs per month — forever.</p>
          <div className="proof-list">
            {[{i:"🚀",t:"Deploy your first agent in under 5 minutes"},{i:"🆓",t:"Free tier — no credit card required"},{i:"🌍",t:"12,000+ teams already onboard"}].map((p,k)=>(
              <div className="proof-item" key={k}><div className="proof-icon">{p.i}</div><span>{p.t}</span></div>
            ))}
          </div>
        </div>
        <div className="auth-right" style={{width:520}}>
          <div className="auth-card">
            <div className="auth-title">Create your account</div>
            <div className="auth-sub2">Already have one? <button onClick={onGoSignIn}>Sign in</button></div>
            {err&&<div className="err-msg">⚠ {err}</div>}
            {ok&&<div className="ok-msg">✓ {ok}</div>}
            <div className="form-row2">
              <Field label="First Name" icon="👤" name="firstName" value={form.firstName} onChange={set} placeholder="Ada"/>
              <Field label="Last Name" icon="👤" name="lastName" value={form.lastName} onChange={set} placeholder="Lovelace"/>
            </div>
            <Field label="Email Address" icon="✉️" type="email" name="email" value={form.email} onChange={set} placeholder="you@company.com"/>
            <Field label="Mobile Number" icon="📱" type="tel" name="mobile" value={form.mobile} onChange={set} placeholder="+1 555 000 0000"/>
            <Field label="GitHub Username" icon="🐙" name="github" value={form.github} onChange={set} placeholder="octocat"/>
            <Field label="Password" icon="🔒" type="password" name="password" value={form.password} onChange={set} placeholder="Min 8 characters"/>
            <button className="btn-auth" onClick={handle}>Create Account →</button>
            <div className="auth-footer">By signing up you agree to our <button>Terms</button> & <button>Privacy Policy</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD PAGES ── */
function AgentCard({a}){
  return(
    <div className="agc">
      <div className="agc-hdr">
        <div className="agc-ico" style={{background:a.bg}}>{a.icon}</div>
        <div><div className="agc-name">{a.name}</div><div className="agc-type">{a.type}</div></div>
      </div>
      <div className="agc-desc">{a.desc}</div>
      <div className="agc-foot">
        <div className="agc-status">
          <div className={`sdot ${a.status==="active"?"on":"off"}`}/>
          <span style={{color:a.status==="active"?"var(--accent3)":"var(--muted)"}}>{a.status}</span>
          <span style={{marginLeft:6,color:"var(--muted)",fontSize:10}}>· {a.runs.toLocaleString()} runs</span>
        </div>
        <button className="run-btn">▶ Run</button>
      </div>
    </div>
  );
}

function DashPage({user,setPage}){
  return(
    <>
      <div style={{marginBottom:22}}>
        <div style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800,color:"#fff",marginBottom:4}}>Good morning, {user.firstName} 👋</div>
        <div style={{fontSize:13,color:"var(--muted)"}}>Your NeuralOps workspace overview</div>
      </div>
      <div className="stats-row">
        {[{l:"Active Agents",v:"6",c:"↑ 2 this week",i:"🤖"},{l:"Tasks Completed",v:"8.4K",c:"↑ 14% vs last week",i:"✅"},{l:"Avg Response",v:"1.2s",c:"↓ 0.3s improvement",i:"⚡"},{l:"API Calls Today",v:"12.1K",c:"↑ 8% vs yesterday",i:"📡"}].map((s,i)=>(
          <div className="stat-card" key={i}>
            <div className="sl">{s.l}</div><div className="sv">{s.v}</div><div className="sc">{s.c}</div><div className="si">{s.i}</div>
          </div>
        ))}
      </div>
      <div className="sec-hdr">
        <div className="ds-title">Active Agents</div>
        <button className="view-all" onClick={()=>setPage("agents")}>View all →</button>
      </div>
      <div className="ag-grid">{AGENTS_DATA.slice(0,3).map(a=><AgentCard key={a.id} a={a}/>)}</div>
      <div className="two-col">
        <div className="panel">
          <div className="sec-hdr"><div className="ds-title">Activity Feed</div></div>
          {ACTIVITY.map((a,i)=>(
            <div className="act-item" key={i}>
              <div className="adot" style={{background:a.color}}/>
              <div><div className="atext">{a.text}</div><div className="atime">{a.time}</div></div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="sec-hdr"><div className="ds-title">Recent Runs</div><button className="view-all" onClick={()=>setPage("logs")}>View all →</button></div>
          <table className="rt">
            <thead><tr><th>Run</th><th>Agent</th><th>Duration</th><th>Status</th></tr></thead>
            <tbody>{RUNS.map(r=>(
              <tr key={r.id}>
                <td style={{color:"var(--muted)"}}>{r.id}</td><td>{r.agent}</td><td style={{color:"var(--muted)"}}>{r.dur}</td>
                <td><span className={`bs ${r.status}`}>{r.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div className="panel">
        <div className="sec-hdr"><div className="ds-title">Pipeline Builder</div><button className="view-all" onClick={()=>setPage("pipelines")}>Open →</button></div>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>Drag nodes to build complex agent workflows</div>
        <div className="pp">
          {PNODES.map((n,i)=>(
            <span key={i} style={{display:"contents"}}>
              <div className="pnode"><span className="pni">{n.i}</span><span>{n.l}</span></div>
              {i<PNODES.length-1&&<span className="parr">→</span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function AgentsPage(){
  return(
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <div><div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff"}}>All Agents</div><div style={{fontSize:12,color:"var(--muted)"}}>6 agents deployed</div></div>
        <button style={{background:"linear-gradient(135deg,var(--accent),var(--accent2))",border:"none",borderRadius:9,padding:"10px 20px",color:"#fff",fontFamily:"var(--fh)",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Deploy New Agent</button>
      </div>
      <div className="ag-grid">{AGENTS_DATA.map(a=><AgentCard key={a.id} a={a}/>)}</div>
    </>
  );
}
function PipelinesPage(){
  const pipes=[{name:"ETL Pipeline Alpha",nodes:5,status:"active",runs:492},{name:"NLP Enrichment Flow",nodes:4,status:"active",runs:310},{name:"Anomaly Detection",nodes:6,status:"idle",runs:87}];
  return(
    <>
      <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16}}>Pipelines</div>
      {pipes.map((p,i)=>(
        <div className="panel" style={{marginBottom:11,cursor:"pointer"}} key={i}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div><div style={{fontFamily:"var(--fh)",fontWeight:700,color:"#fff",marginBottom:3}}>{p.name}</div><div style={{fontSize:12,color:"var(--muted)"}}>{p.nodes} nodes · {p.runs} runs</div></div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span className={`bs ${p.status==="active"?"done":"idle"}`}>{p.status}</span>
              <button className="run-btn">▶ Run</button>
            </div>
          </div>
          <div className="pp">
            {PNODES.slice(0,p.nodes).map((n,j)=>(
              <span key={j} style={{display:"contents"}}>
                <div className="pnode"><span className="pni">{n.i}</span><span>{n.l}</span></div>
                {j<p.nodes-1&&<span className="parr">→</span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
function AnalyticsPage(){
  return(
    <>
      <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16}}>Analytics</div>
      <div className="stats-row" style={{marginBottom:18}}>
        {[{l:"Total Runs",v:"52.3K",i:"🔢"},{l:"Success Rate",v:"98.7%",i:"✅"},{l:"Avg Tokens",v:"1.4K",i:"🪙"},{l:"Uptime",v:"99.99%",i:"🟢"}].map((s,i)=>(
          <div className="stat-card" key={i}><div className="sl">{s.l}</div><div className="sv">{s.v}</div><div className="si">{s.i}</div></div>
        ))}
      </div>
      <div className="panel">
        <div className="ds-title" style={{marginBottom:14}}>Run Volume — Last 7 Days</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100}}>
          {[45,72,60,88,95,70,100].map((h,i)=>(
            <div key={i} style={{flex:1,background:`rgba(56,189,248,${.2+h/200})`,borderRadius:5,height:`${h}%`}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:10,color:"var(--muted)"}}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><span key={d}>{d}</span>)}
        </div>
      </div>
    </>
  );
}
function LogsPage(){
  return(
    <>
      <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16}}>Run Logs</div>
      <div className="panel">
        <table className="rt">
          <thead><tr><th>Run ID</th><th>Agent</th><th>Started</th><th>Duration</th><th>Status</th></tr></thead>
          <tbody>
            {[...RUNS,...RUNS.map(r=>({...r,id:"#48"+Math.floor(Math.random()*100)}))].map((r,i)=>(
              <tr key={i}>
                <td style={{color:"var(--accent)",fontFamily:"var(--fm)"}}>{r.id}</td><td>{r.agent}</td>
                <td style={{color:"var(--muted)"}}>{r.time}</td><td style={{color:"var(--muted)"}}>{r.dur}</td>
                <td><span className={`bs ${r.status}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function APIKeysPage(){
  return(
    <>
      <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16}}>API Keys</div>
      <div className="panel">
        {["Production Key","Development Key","Staging Key"].map((k,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid var(--border2)"}}>
            <div><div style={{fontSize:13,color:"#fff",marginBottom:3}}>{k}</div><div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--fm)"}}>no_•••••••••••••{i+1}abc</div></div>
            <div style={{display:"flex",gap:8}}>
              <button className="run-btn">Copy</button>
              <button className="run-btn" style={{color:"var(--danger)",borderColor:"rgba(239,68,68,.2)"}}>Revoke</button>
            </div>
          </div>
        ))}
        <button style={{width:"100%",marginTop:14,padding:12,background:"linear-gradient(135deg,var(--accent),var(--accent2))",border:"none",borderRadius:9,color:"#fff",fontFamily:"var(--fh)",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Generate New Key</button>
      </div>
    </>
  );
}
function SettingsPage({user}){
  return(
    <>
      <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16}}>Settings</div>
      <div className="panel" style={{maxWidth:480}}>
        <div style={{fontFamily:"var(--fh)",fontWeight:700,color:"#fff",marginBottom:13}}>Profile</div>
        {[{l:"First Name",v:user.firstName},{l:"Last Name",v:user.lastName},{l:"Email",v:user.email},{l:"Mobile",v:user.mobile},{l:"GitHub",v:"@"+user.github}].map((f,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--border2)",fontSize:13}}>
            <span style={{color:"var(--muted)"}}>{f.l}</span><span style={{color:"var(--text)"}}>{f.v}</span>
          </div>
        ))}
        <button style={{width:"100%",marginTop:16,padding:12,background:"linear-gradient(135deg,var(--accent),var(--accent2))",border:"none",borderRadius:9,color:"#fff",fontFamily:"var(--fh)",fontSize:13,fontWeight:700,cursor:"pointer"}}>Save Changes</button>
      </div>
    </>
  );
}

/* ── DASHBOARD SHELL ── */
function Dashboard({user,onLogout}){
  const [page,setPage]=useState("dashboard");
  const fn=user.firstName||user.email||"U"; const ln=user.lastName||""; const initials=(fn[0]+(ln[0]||fn[1]||"?")).toUpperCase();
  return(
    <div className="app">
      <aside className="sidebar">
        <div className="sb-logo"><div className="logo-icon" style={{width:28,height:28,fontSize:13}}>⚡</div><span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:15,color:"#fff"}}>NeuralOps</span></div>
        <div className="sb-section">
          <div className="sb-lbl">Workspace</div>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} className={`nav-item${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
              <span className="ni">{n.icon}</span>{n.label}
              {n.badge&&<span className="badge">{n.badge}</span>}
            </button>
          ))}
        </div>
        <div className="sb-footer">
          <div className="user-chip">
            <div className="user-av">{initials}</div>
            <div style={{flex:1,minWidth:0}}><div className="u-name">{user.firstName} {user.lastName}</div><div className="u-role">AI Engineer</div></div>
            <button className="logout" onClick={onLogout} title="Sign out">↩</button>
          </div>
        </div>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="tb-title">{NAV_ITEMS.find(n=>n.id===page)?.label||"Dashboard"}</div>
          <div className="tb-right">
            <div className="ib">🔔</div><div className="ib">🔎</div><div className="ib">❓</div>
          </div>
        </div>
        <div className="content">
          {page==="dashboard"&&<DashPage user={user} setPage={setPage}/>}
          {page==="agents"&&<AgentsPage/>}
          {page==="pipelines"&&<PipelinesPage/>}
          {page==="analytics"&&<AnalyticsPage/>}
          {page==="logs"&&<LogsPage/>}
          {page==="api"&&<APIKeysPage/>}
          {page==="settings"&&<SettingsPage user={user}/>}
        </div>
      </div>
    </div>
  );
}

/* ── APP ROOT ── */
export default function App(){
  const [screen,setScreen]=useState("home");
  const [user,setUser]=useState(null);

  // Restore session on page load / refresh
  useEffect(()=>{
    const s=sessionStorage.getItem("no_session");
    if(s){ try{ setUser(JSON.parse(s)); }catch(_){ sessionStorage.removeItem("no_session"); } }
  },[]);

  // Called after successful login or signup — saves user & redirects to dashboard
  const handleAuth=u=>{
    sessionStorage.setItem("no_session",JSON.stringify(u));
    setUser(u);
  };

  // Logout — clears session and returns to landing page
  const handleLogout=async()=>{
    const session=sessionStorage.getItem("no_session");
    const token=session?JSON.parse(session).token:null;
    try{
      if(token){
        await fetch("http://20.164.2.140:8080/api/logout",{
          method:"POST",
          headers:{"Content-Type":"application/json","Authorization":"Bearer "+token}
        });
      }
    }catch(_){}
    sessionStorage.removeItem("no_session");
    setUser(null);
    setScreen("home");
  };

  return(
    <>
      <style>{STYLES}</style>
      <div className="grid-bg"/>
      {user
        ?<Dashboard user={user} onLogout={handleLogout}/>
        :screen==="signin"
          ?<SignIn onSignIn={handleAuth} onGoSignUp={()=>setScreen("signup")} onGoHome={()=>setScreen("home")}/>
          :screen==="signup"
            ?<SignUp onGoSignIn={()=>setScreen("signin")} onSignUp={handleAuth} onGoHome={()=>setScreen("home")}/>
            :<Landing onSignIn={()=>setScreen("signin")} onSignUp={()=>setScreen("signup")}/>
      }
    </>
  );
}
