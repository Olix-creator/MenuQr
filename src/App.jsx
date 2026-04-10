import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ───
const T = {
  en: {
    nav: ["Services", "Pricing", "Testimonials", "Get Started"],
    ids: ["services", "pricing", "testimonials", "order"],
    heroBadge: "⚡ Smart Menus for Smart Restaurants",
    heroT1: "Turn Your Menu Into a",
    heroT2: "Smart Digital Experience",
    heroSub: "Digital menus, QR codes, and smart ordering systems for your restaurant or café.",
    heroBtn1: "Start Now",
    heroBtn2: "View Pricing",
    heroTrust: "No app required — works instantly on any phone",
    svcBadge: "Our Services",
    svcTitle: "Everything Your Business Needs",
    svcs: [
      ["Digital Menu Creation", "Beautiful, interactive menus that update instantly"],
      ["QR Code Generation", "Scannable codes that link directly to your menu"],
      ["WhatsApp Ordering", "Customers order directly via WhatsApp — no app needed"],
      ["Mobile Optimized", "Perfect experience on every phone and tablet"],
      ["We Handle Updates", "Send us changes and we update your menu for you"],
    ],
    pBadge: "Pricing",
    pTitle: "Simple, Transparent Plans",
    pSub: "Choose the plan that fits your business",
    plans: [
      { name: "Pro", price: "3,000", tag: "Best Value", best: true, features: ["Premium design", "Optimized performance", "WhatsApp ordering system", "2 updates every 3 months", "Priority support"] },
      { name: "Growth", price: "5,000", tag: "Popular", best: false, features: ["Everything in Starter", "Improved design", "1 update every 2 months", "Faster support", "WhatsApp ordering"] },
      { name: "Starter", price: "6,500", tag: null, best: false, features: ["Digital menu", "QR code", "Basic design", "WhatsApp ordering", "1 update every 2 months", "Standard support"] },
    ],
    period: "DA/month",
    choose: "Choose",
    domTag: "Add-on",
    domTitle: "Premium Domain",
    domPrice: "+5,000",
    domPeriod: "DA/year",
    domFeats: ["Custom domain (yourname.com)", "Professional branding", "Clean URL", "Better customer trust"],
    ltTag: "One-Time",
    ltTitle: "Lifetime Website",
    ltPrice: "49,000",
    ltPeriod: "DA once",
    ltFeats: ["Full website + menu + QR", "WhatsApp ordering", "Mobile optimized", "3 months support included"],
    ltNote: "⚠️ Updates: 3,000 DA each · Domain/hosting renewed yearly",
    tBadge: "★ Testimonials",
    tTitle: "Loved by Business Owners",
    tests: [
      { name: "Karim B.", role: "Café Owner, Algiers", text: "MenuQr doubled our takeaway orders in the first month. Customers love scanning the QR code!" },
      { name: "Amina T.", role: "Restaurant Manager", text: "No more printing menus every time prices change. This is a game-changer for our business." },
      { name: "Yassine M.", role: "Food Truck Owner", text: "Setup was instant and the WhatsApp ordering is genius. My customers find it so easy." },
    ],
    fBadge: "🚀 Get Started",
    fTitle: "Request Your Digital Menu",
    fSub: "Fill the form and we'll contact you on WhatsApp",
    labels: ["Full Name *", "Business Name *", "Phone Number *", "Type of Business", "Selected Plan", "Domain Option"],
    placeholders: ["Your full name", "Restaurant or café name", "05XXXXXXXX"],
    types: ["Restaurant", "Café", "Fast Food", "Food Truck", "Bakery", "Other"],
    planOpts: ["Pro", "Growth", "Starter", "Lifetime"],
    domStd: "Standard",
    domPrem: "Premium (+5,000 DA/yr)",
    submit: "Request My Website via WhatsApp",
    footer: "Digital menus & ordering for restaurants",
    fillAll: "Please fill all required fields.",
    planPrices: { Pro: "3,000 DA/month", Growth: "5,000 DA/month", Starter: "6,500 DA/month", Lifetime: "49,000 DA (one-time)" },
    waMsg: (d) => `Hello, I want to create a digital menu:\n\n📋 *Customer Info*\nName: ${d.fullName}\nBusiness: ${d.businessName}\nPhone: ${d.phone}\nType: ${d.businessType}\n\n💰 *Selected Plan*\nPlan: ${d.plan}\nPrice: ${d.planPrice}\n\n🌐 *Domain Option*\nDomain: ${d.domain}${d.domain === "Premium" ? " (+5,000 DA/year)" : " (included)"}\n\nPlease contact me to start.`,
  },
  fr: {
    nav: ["Services", "Tarifs", "Témoignages", "Commencer"],
    ids: ["services", "pricing", "testimonials", "order"],
    heroBadge: "⚡ Menus intelligents pour restaurants modernes",
    heroT1: "Transformez votre menu en",
    heroT2: "expérience digitale intelligente",
    heroSub: "Menus digitaux, QR codes et systèmes de commande en ligne pour votre restaurant ou café.",
    heroBtn1: "Commencer",
    heroBtn2: "Voir les tarifs",
    heroTrust: "Aucune application requise — fonctionne instantanément",
    svcBadge: "Nos Services",
    svcTitle: "Tout ce dont votre business a besoin",
    svcs: [
      ["Création de menu digital", "Des menus interactifs mis à jour instantanément"],
      ["Génération de QR Code", "Des codes scannables liés directement à votre menu"],
      ["Commande via WhatsApp", "Vos clients commandent via WhatsApp — sans application"],
      ["Optimisé mobile", "Expérience parfaite sur chaque téléphone et tablette"],
      ["Mises à jour gérées", "Envoyez-nous les changements, on met à jour pour vous"],
    ],
    pBadge: "Tarifs",
    pTitle: "Des forfaits simples et transparents",
    pSub: "Choisissez le plan adapté à votre business",
    plans: [
      { name: "Pro", price: "3 000", tag: "Meilleur rapport", best: true, features: ["Design premium", "Performance optimisée", "Commande WhatsApp", "2 mises à jour / 3 mois", "Support prioritaire"] },
      { name: "Growth", price: "5 000", tag: "Populaire", best: false, features: ["Tout dans Starter", "Design amélioré", "1 mise à jour / 2 mois", "Support rapide", "Commande WhatsApp"] },
      { name: "Starter", price: "6 500", tag: null, best: false, features: ["Menu digital", "QR code", "Design basique", "Commande WhatsApp", "1 mise à jour / 2 mois", "Support standard"] },
    ],
    period: "DA/mois",
    choose: "Choisir",
    domTag: "Option",
    domTitle: "Domaine Premium",
    domPrice: "+5 000",
    domPeriod: "DA/an",
    domFeats: ["Domaine personnalisé (votrenom.com)", "Image professionnelle", "URL propre", "Meilleure confiance client"],
    ltTag: "Paiement unique",
    ltTitle: "Site Web à vie",
    ltPrice: "49 000",
    ltPeriod: "DA une fois",
    ltFeats: ["Site complet + menu + QR", "Commande WhatsApp", "Optimisé mobile", "3 mois de support inclus"],
    ltNote: "⚠️ Mises à jour : 3 000 DA chacune · Domaine renouvelé annuellement",
    tBadge: "★ Témoignages",
    tTitle: "Adoré par les propriétaires",
    tests: [
      { name: "Karim B.", role: "Propriétaire de café, Alger", text: "MenuQr a doublé nos commandes à emporter le premier mois !" },
      { name: "Amina T.", role: "Gérante de restaurant", text: "Fini l'impression de menus à chaque changement de prix. Révolutionnaire." },
      { name: "Yassine M.", role: "Propriétaire food truck", text: "Installation instantanée et commande WhatsApp géniale !" },
    ],
    fBadge: "🚀 Commencer",
    fTitle: "Demandez votre menu digital",
    fSub: "Remplissez le formulaire, on vous contacte sur WhatsApp",
    labels: ["Nom complet *", "Nom du business *", "Téléphone *", "Type de business", "Plan sélectionné", "Option domaine"],
    placeholders: ["Votre nom complet", "Nom du restaurant ou café", "05XXXXXXXX"],
    types: ["Restaurant", "Café", "Fast Food", "Food Truck", "Boulangerie", "Autre"],
    planOpts: ["Pro", "Growth", "Starter", "Lifetime"],
    domStd: "Standard",
    domPrem: "Premium (+5 000 DA/an)",
    submit: "Demander mon site via WhatsApp",
    footer: "Menus digitaux et commandes pour restaurants",
    fillAll: "Veuillez remplir tous les champs obligatoires.",
    planPrices: { Pro: "3 000 DA/mois", Growth: "5 000 DA/mois", Starter: "6 500 DA/mois", Lifetime: "49 000 DA (unique)" },
    waMsg: (d) => `Bonjour, je souhaite créer un menu digital :\n\n📋 *Infos client*\nNom : ${d.fullName}\nBusiness : ${d.businessName}\nTéléphone : ${d.phone}\nType : ${d.businessType}\n\n💰 *Plan choisi*\nPlan : ${d.plan}\nPrix : ${d.planPrice}\n\n🌐 *Option domaine*\nDomaine : ${d.domain}${d.domain === "Premium" ? " (+5 000 DA/an)" : " (inclus)"}\n\nMerci de me contacter.`,
  },
};

const WA = "213541053547";
const Y = "#FFD600";

// ─── SVG ICONS ───
const Check = ({ c = Y }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>;
const Star = () => <svg width="16" height="16" viewBox="0 0 24 24" fill={Y}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const WaLogo = ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#25D366"/><path d="M23.3 18.7c-.4-.2-2.2-1.1-2.5-1.2-.4-.1-.6-.2-.8.2s-1 1.2-1.2 1.5c-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.7.2-.2.4-.4.5-.7.2-.2.2-.4.4-.6.1-.2.1-.4 0-.6s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-1 .5s-1.3 1.3-1.3 3.1c0 1.8 1.3 3.6 1.5 3.8.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4zM16.1 26.4c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.8-1.7-3.9-1.7-6C5 9.5 9.5 5 15 5c2.7 0 5.2 1 7.1 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.6-4.6 10.2-10.2 10.2l1.3.2z" fill="#fff"/></svg>;

const SvcIcons = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={Y} strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={Y} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" /></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={Y} strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={Y} strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={Y} strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 11-6.219-8.56" /><polyline points="21 3 21 9 15 9" /></svg>,
];

// ─── THEME ───
const themes = {
  dark: { "--bg": "#0A0A0A", "--bg2": "#111", "--card": "#111", "--border": "#1E1E1E", "--text": "#fff", "--text2": "#ccc", "--muted": "#888", "--muted2": "#555", "--input": "#0d0d0d", "--overlay": "rgba(10,10,10,0.94)" },
  light: { "--bg": "#F7F6F2", "--bg2": "#fff", "--card": "#fff", "--border": "#E2E0DB", "--text": "#111", "--text2": "#333", "--muted": "#666", "--muted2": "#999", "--input": "#F2F1ED", "--overlay": "rgba(247,246,242,0.96)" },
};
function applyTheme(t) { Object.entries(themes[t]).forEach(([k, v]) => document.documentElement.style.setProperty(k, v)); }

// ─── ANIMATED HERO CANVAS ───
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf, time = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      time += 0.004; ctx.clearRect(0, 0, c.width, c.height);
      const cols = 30, rows = 18, gx = c.width / cols, gy = c.height / rows;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = gx * i + gx / 2, y = gy * j + gy / 2;
        const d = Math.sqrt((x - c.width / 2) ** 2 + (y - c.height / 2) ** 2);
        const w = Math.sin(d * 0.007 - time * 3) * 0.5 + 0.5;
        ctx.beginPath(); ctx.arc(x, y, gx * 0.17 * w + 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,214,0,${w * 0.35 + 0.04})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45, pointerEvents: "none" }} />;
}

// ─── REUSABLE ───
function SectionHead({ badge, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${Y}18`, color: Y, borderRadius: 999, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>{badge}</span>
      <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, marginTop: 16 }}>{title}</h2>
      {sub && <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 16 }}>{sub}</p>}
    </div>
  );
}
function NavBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)", fontSize: 14, fontWeight: 700, fontFamily: "inherit", transition: "border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = Y} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>{children}</button>
  );
}

// ─── MAIN ───
export default function MenuQr() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [activeT, setActiveT] = useState(0);
  const [form, setForm] = useState({ fullName: "", businessName: "", phone: "", businessType: "Restaurant", plan: "Pro", domain: "Standard" });
  const formRef = useRef(null);
  const t = T[lang];

  useEffect(() => { applyTheme(dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const iv = setInterval(() => setActiveT(i => (i + 1) % t.tests.length), 5000); return () => clearInterval(iv); }, [lang]);

  const go = (id) => { setMob(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const pick = (n) => { setForm(f => ({ ...f, plan: n })); formRef.current?.scrollIntoView({ behavior: "smooth" }); };
  const send = () => {
    if (!form.fullName || !form.businessName || !form.phone) return alert(t.fillAll);
    const data = { ...form, planPrice: t.planPrices[form.plan] || form.plan };
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t.waMsg(data))}`, "_blank");
  };

  const inp = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--input)", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color .2s" };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Outfit',sans-serif", minHeight: "100vh", transition: "background .35s,color .35s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:rgba(255,214,0,.3)}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.fade-up{animation:fadeUp .45s ease both}
@keyframes ping{75%,100%{transform:scale(2);opacity:0}}.ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}
@media(max-width:768px){.desk{display:none!important}.mob-show{display:flex!important}}
@media(min-width:769px){.mob-btn{display:none!important}}`}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", transition: "all .3s", background: scrolled ? "var(--overlay)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: Y, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: 16 }}>M</div>
            <span style={{ fontWeight: 800, fontSize: 20 }}>Menu<span style={{ color: Y }}>Qr</span></span>
          </div>
          <div className="desk" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {t.nav.map((n, i) => <span key={i} onClick={() => go(t.ids[i])} style={{ fontSize: 14, color: "var(--muted)", cursor: "pointer", fontWeight: 500 }} onMouseEnter={e => e.currentTarget.style.color = Y} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>{n}</span>)}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <NavBtn onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</NavBtn>
            <NavBtn onClick={() => setLang(lang === "en" ? "fr" : "en")}>{lang === "en" ? "FR" : "EN"}</NavBtn>
            <button className="mob-btn" onClick={() => setMob(!mob)} style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)", fontSize: 18 }}>{mob ? "✕" : "☰"}</button>
          </div>
        </div>
        {mob && <div className="mob-show" style={{ display: "none", flexDirection: "column", gap: 12, padding: "12px 0 20px", background: "var(--overlay)" }}>{t.nav.map((n, i) => <span key={i} onClick={() => go(t.ids[i])} style={{ fontSize: 18, fontWeight: 600, cursor: "pointer", color: "var(--text2)", padding: "6px 0" }}>{n}</span>)}</div>}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>
        <HeroCanvas />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle,${Y}08,transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 780, textAlign: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${Y}18`, color: Y, borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            <span style={{ position: "relative", width: 8, height: 8 }}>
              <span className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: Y, opacity: 0.6 }} />
              <span style={{ position: "relative", display: "block", width: 8, height: 8, borderRadius: "50%", background: Y }} />
            </span>
            {t.heroBadge}
          </span>
          <h1 style={{ fontSize: "clamp(38px,7.5vw,72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20 }}>
            {t.heroT1}<br /><span style={{ color: Y }}>{t.heroT2}</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.65 }}>{t.heroSub}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("order")} style={{ padding: "15px 36px", borderRadius: 999, background: Y, color: "#000", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, transition: "transform .15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>{t.heroBtn1} <Arrow /></button>
            <button onClick={() => go("pricing")} style={{ padding: "15px 36px", borderRadius: 999, background: "transparent", color: "var(--text)", fontWeight: 600, fontSize: 16, border: "1.5px solid var(--border)", cursor: "pointer", fontFamily: "inherit", transition: "border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = Y} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>{t.heroBtn2}</button>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted2)", marginTop: 24 }}>{t.heroTrust}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHead badge={t.svcBadge} title={t.svcTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          {t.svcs.map(([title, desc], i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, transition: "transform .2s,border-color .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${Y}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--border)"; }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${Y}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{SvcIcons[i]}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHead badge={t.pBadge} title={t.pTitle} sub={t.pSub} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginBottom: 32 }}>
          {t.plans.map((p, i) => (
            <div key={i} style={{ background: p.best ? `linear-gradient(165deg,rgba(26,23,0,.55),var(--card) 40%)` : "var(--card)", border: `1.5px solid ${p.best ? `${Y}44` : "var(--border)"}`, borderRadius: 22, padding: "32px 26px", position: "relative", display: "flex", flexDirection: "column", minHeight: 400, transition: "transform .2s,box-shadow .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${Y}0a`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              {p.tag && <span style={{ position: "absolute", top: -13, left: 22, background: p.best ? Y : "#25D366", color: "#000", fontWeight: 700, fontSize: 12, padding: "4px 14px", borderRadius: 999, textTransform: "uppercase" }}>{p.tag}</span>}
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}><span style={{ fontSize: 38, fontWeight: 800, color: Y }}>{p.price}</span><span style={{ color: "var(--muted)", fontSize: 14 }}>{t.period}</span></div>
              <div style={{ flex: 1 }}>{p.features.map((f, j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><Check /><span style={{ color: "var(--text2)", fontSize: 14 }}>{f}</span></div>)}</div>
              <button onClick={() => pick(p.name)} style={{ marginTop: 16, width: "100%", padding: "13px 0", borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", background: p.best ? Y : "transparent", color: p.best ? "#000" : "var(--text)", border: p.best ? "none" : "1.5px solid var(--border)" }}
                onMouseEnter={e => { if (!p.best) { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; } }}
                onMouseLeave={e => { if (!p.best) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; } }}>{t.choose} {p.name}</button>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 28 }}>
            <span style={{ background: "rgba(99,102,241,.15)", color: "#818cf8", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase" }}>{t.domTag}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "12px 0 4px" }}>{t.domTitle}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}><span style={{ fontSize: 28, fontWeight: 800, color: Y }}>{t.domPrice}</span><span style={{ color: "var(--muted)", fontSize: 14 }}>{t.domPeriod}</span></div>
            {t.domFeats.map((f, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}><Check c="#818cf8" /><span style={{ color: "var(--text2)", fontSize: 14 }}>{f}</span></div>)}
          </div>
          <div style={{ background: `linear-gradient(165deg,rgba(26,18,0,.4),var(--card) 40%)`, border: `1.5px solid ${Y}33`, borderRadius: 22, padding: 28, position: "relative" }}>
            <span style={{ position: "absolute", top: -13, left: 22, background: "#f97316", color: "#000", fontWeight: 700, fontSize: 12, padding: "4px 14px", borderRadius: 999, textTransform: "uppercase" }}>{t.ltTag}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "12px 0 4px" }}>{t.ltTitle}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}><span style={{ fontSize: 28, fontWeight: 800, color: Y }}>{t.ltPrice}</span><span style={{ color: "var(--muted)", fontSize: 14 }}>{t.ltPeriod}</span></div>
            {t.ltFeats.map((f, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}><Check /><span style={{ color: "var(--text2)", fontSize: 14 }}>{f}</span></div>)}
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(128,128,128,.08)", borderRadius: 10, fontSize: 12, color: "var(--muted)" }}>{t.ltNote}</div>
            <button onClick={() => pick("Lifetime")} style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 14, background: Y, color: "#000", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 15, fontFamily: "inherit" }}>{t.choose} Lifetime</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <SectionHead badge={t.tBadge} title={t.tTitle} />
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: "36px 32px", position: "relative", minHeight: 200 }}>
          {t.tests.map((tt, i) => (
            <div key={i} className="fade-up" style={{ display: activeT === i ? "block" : "none" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array(5).fill(0).map((_, j) => <Star key={j} />)}</div>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontWeight: 500, color: "var(--text2)", marginBottom: 20 }}>"{tt.text}"</p>
              <span style={{ fontWeight: 700 }}>{tt.name}</span><span style={{ color: "var(--muted)", fontSize: 13, marginLeft: 8 }}>{tt.role}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>{t.tests.map((_, i) => <button key={i} onClick={() => setActiveT(i)} style={{ width: activeT === i ? 32 : 10, height: 10, borderRadius: 99, background: activeT === i ? Y : "var(--border)", border: "none", cursor: "pointer", transition: "all .3s" }} />)}</div>
        </div>
      </section>

      {/* FORM */}
      <section id="order" ref={formRef} style={{ padding: "80px 24px", maxWidth: 600, margin: "0 auto" }}>
        <SectionHead badge={t.fBadge} title={t.fTitle} sub={t.fSub} />
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 32 }}>
          {[{ l: t.labels[0], k: "fullName", p: t.placeholders[0] }, { l: t.labels[1], k: "businessName", p: t.placeholders[1] }, { l: t.labels[2], k: "phone", p: t.placeholders[2], type: "tel" }].map(f => (
            <div key={f.k} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>{f.l}</label>
              <input type={f.type || "text"} placeholder={f.p} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inp}
                onFocus={e => e.target.style.borderColor = Y} onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>{t.labels[3]}</label>
            <select value={form.businessType} onChange={e => setForm(p => ({ ...p, businessType: e.target.value }))} style={inp}>{t.types.map(o => <option key={o} value={o}>{o}</option>)}</select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>{t.labels[4]}</label>
            <select value={form.plan} onChange={e => setForm(p => ({ ...p, plan: e.target.value }))} style={inp}>{t.planOpts.map(o => <option key={o} value={o}>{o}</option>)}</select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 6 }}>{t.labels[5]}</label>
            <div style={{ display: "flex", gap: 12 }}>
              {[["Standard", t.domStd], ["Premium", t.domPrem]].map(([v, label]) => (
                <button key={v} onClick={() => setForm(p => ({ ...p, domain: v }))} style={{ flex: 1, padding: 12, borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", border: `1.5px solid ${form.domain === v ? Y : "var(--border)"}`, background: form.domain === v ? `${Y}18` : "transparent", color: form.domain === v ? Y : "var(--muted)" }}>{label}</button>
              ))}
            </div>
          </div>
          <button onClick={send} style={{ marginTop: 8, width: "100%", padding: 16, borderRadius: 16, background: Y, color: "#000", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "transform .15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = ""}><WaLogo /> {t.submit}</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", marginTop: 40 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: Y, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: 14 }}>M</div>
              <span style={{ fontWeight: 800, fontSize: 18 }}>Menu<span style={{ color: Y }}>Qr</span></span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>{t.footer}</p>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
            <a href="mailto:moumen0829@gmail.com" style={{ color: "var(--muted)", textDecoration: "none" }}>moumen0829@gmail.com</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" style={{ color: "#25D366", textDecoration: "none" }}>WhatsApp</a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "20px auto 0", textAlign: "center", color: "var(--muted2)", fontSize: 12 }}>© {new Date().getFullYear()} MenuQr. All rights reserved.</div>
      </footer>

      {/* FLOATING WA */}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,.4)", transition: "transform .2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"} onMouseLeave={e => e.currentTarget.style.transform = ""}><WaLogo s={28} /></a>
    </div>
  );
}
