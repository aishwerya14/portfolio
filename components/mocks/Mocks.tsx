/** Static, CSS-animated product mockups shown inside each project frame. */
import type { ReactElement } from 'react';

export const MOCKS: Record<string, ReactElement> = {
  'express': (
    <><div className="mock m-canvas" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>express / summer-poster</span></div><div className="mbody"><div className="tools"><b></b><b></b><b></b><b></b></div><div className="board"><div className="sun"></div><div className="hill"></div><div className="hill h2"></div><div className="ttl">Summer<br />Market</div><div className="selr"></div><div className="mcur a"><svg viewBox="0 0 16 16"><path d="M1 1l5 14 2-6 6-2z" fill="currentColor" stroke="#fff" strokeWidth="1"/></svg><em style={{background:'#E24C8F'}}>Mia</em></div><div className="mcur b"><svg viewBox="0 0 16 16"><path d="M1 1l5 14 2-6 6-2z" fill="currentColor" stroke="#fff" strokeWidth="1"/></svg><em style={{background:'#12B981'}}>Leo</em></div></div></div></div></>
  ),
  'ai': (
    <><div className="mock m-ai" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>generate / caption</span></div><div className="mbody"><div className="bubble">Write a launch caption for our spring collection</div><div className="reply"><div className="who2"><i></i>Assistant</div><div className="line"></div><div className="line"></div><div className="line"></div><div className="line"></div><div className="srcs"><span className="src">Brand guide</span><span className="src">Spring lookbook</span><span className="src">Past campaigns</span></div></div></div></div></>
  ),
  'registry': (
    <><div className="mock m-reg" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>registry / emma-and-noah</span></div><div className="mbody"><div className="reg-head">Emma &amp; Noah<span>Share list</span></div><div className="reg-grid">
              <div className="prod"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
              <div className="prod added"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
              <div className="prod"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
              <div className="prod"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
              <div className="prod"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
              <div className="prod"><div className="img"></div><div className="n"></div><div className="n2"></div></div>
            </div></div></div></>
  ),
  'vuely': (
    <><div className="mock m-admin" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>vuely / dashboard / ecommerce</span></div><div className="mbody"><div className="side"><b></b><i></i><i></i><i></i><i></i><i></i></div><div className="main"><div className="kpis"><div><span></span><b></b></div><div><span></span><b></b></div><div><span></span><b></b></div></div><div className="area"><svg viewBox="0 0 300 100" preserveAspectRatio="none"><path className="ar" d="M0 70 C 30 60, 50 80, 80 55 S 130 30, 160 45 S 220 20, 250 30 S 290 10, 300 15 L300 100 L0 100 Z"/><path className="ln" d="M0 70 C 30 60, 50 80, 80 55 S 130 30, 160 45 S 220 20, 250 30 S 290 10, 300 15"/></svg></div></div></div></div></>
  ),
  'adminify': (
    <><div className="mock m-table" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>adminify / crm / clients</span></div><div className="mbody"><div className="th"><span>Client</span><span>Project</span><span>Status</span></div><div className="tr"><span><i style={{background:'#F4A3CB'}}></i>Northwind</span><span>Website revamp</span><span className="sp ok">Active</span></div><div className="tr"><span><i style={{background:'#8C98FF'}}></i>Lumen Labs</span><span>Mobile app</span><span className="sp warn">On hold</span></div><div className="tr"><span><i style={{background:'#FFD66B'}}></i>Brightside</span><span>Brand refresh</span><span className="sp trial">New</span></div><div className="tr"><span><i style={{background:'#5FD3C6'}}></i>Oak &amp; Iron</span><span>Analytics suite</span><span className="sp ok">Active</span></div><div className="tr"><span><i style={{background:'#C9B8FF'}}></i>Paperplane</span><span>Checkout redesign</span><span className="sp off">Done</span></div></div></div></>
  ),
  'embryo-react': (
    <><div className="mock m-shop" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>embryo-react / home</span></div><div className="mbody"><div className="shead"><b>embryo</b><span className="sn"><i></i><i></i><i></i></span><span className="loc">English · USD</span><span className="cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/></svg><em>2</em></span></div><div className="banner" style={{}}><div><b>Women’s Summer Collection</b><em>Shop now</em></div></div><div className="pgrid"><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div></div></div></div></>
  ),
  'embryo-vue': (
    <><div className="mock m-shop" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>embryo-vue / home</span></div><div className="mbody"><div className="shead"><b>embryo</b><span className="sn"><i></i><i></i><i></i></span><span className="loc">Français · ₹ INR</span><span className="cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/></svg><em>2</em></span></div><div className="banner" style={{background:'linear-gradient(120deg,#0E3B2E,#12B981)'}}><div><b>Deal of the day</b><em>Shop now</em></div></div><div className="pgrid"><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div><div><i></i><span></span><span></span></div></div></div></div></>
  ),
  'a11y': (
    <><div className="mock m-dash" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>analytics / overview</span></div><div className="mbody"><div className="tabs"><span className="fring"></span><b>Traffic</b><b>Clicks</b><b>Spend</b><b>Goals</b></div><div className="chart"><span className="aa">WCAG 2.1 AA</span><i style={{height:'45%'}}></i><i style={{height:'70%'}}></i><i style={{height:'55%'}}></i><i style={{height:'88%'}}></i><i style={{height:'64%'}}></i><i style={{height:'95%'}}></i></div></div></div></>
  ),
  'reactify': (
    <><div className="mock m-admin" aria-hidden="true"><div className="mbar"><i></i><i></i><i></i><span>reactify / dashboard / crm</span></div><div className="mbody"><div className="side"><b></b><i></i><i></i><i></i><i></i><i></i></div><div className="main"><div className="kpis"><div><span></span><b></b></div><div><span></span><b></b></div><div><span></span><b></b></div></div><div className="area"><svg viewBox="0 0 300 100" preserveAspectRatio="none"><path className="ar" d="M0 70 C 30 60, 50 80, 80 55 S 130 30, 160 45 S 220 20, 250 30 S 290 10, 300 15 L300 100 L0 100 Z"/><path className="ln" d="M0 70 C 30 60, 50 80, 80 55 S 130 30, 160 45 S 220 20, 250 30 S 290 10, 300 15"/></svg></div></div></div></div></>
  ),
};
