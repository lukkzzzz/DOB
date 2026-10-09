/* ============================================================
   Diocese of Boac — Renderer
   ============================================================
   Dynamically renders every section of every page from the
   SiteData object defined in site-data.js.

   Each HTML page only needs:
     <script src="site-data.js"></script>
     <script src="renderer.js"></script>
     <script>initPage('pageKey');</script>
   ============================================================ */

/* ── Helpers ─────────────────────────────────────────────── */

function safe(val, fallback) {
  return (val !== undefined && val !== null && val !== '') ? val : (fallback || '');
}

async function loadPageSnapshot(pageKey) {
  const [siteData, navbarData, footerData, homeData, historyData, visionData, bishopData, formerData, clergyData, parishesData, curiaData, newsItems, eventsItems, galleryData, contactData, privacyData] = await Promise.all([
    dGet(DKEYS.site),
    dGet(DKEYS.navbar),
    dGet(DKEYS.footer),
    dGet(DKEYS.home),
    dGet(DKEYS.history),
    dGet(DKEYS.visionMission),
    dGet(DKEYS.bishop),
    dGet(DKEYS.formerBishops),
    dGet(DKEYS.clergy),
    dGet(DKEYS.parishes),
    dGet(DKEYS.curia),
    dGet(DKEYS.news),
    dGet(DKEYS.events),
    dGet(DKEYS.gallery),
    dGet(DKEYS.contact),
    dGet(DKEYS.privacy),
  ]);

  return {
    site: siteData || SiteData.site,
    navbar: navbarData || SiteData.navbar,
    footer: footerData || SiteData.footer,
    homepage: homeData || SiteData.homepage,
    history: historyData || SiteData.history,
    visionMission: visionData || SiteData.visionMission,
    bishop: bishopData || SiteData.bishop,
    formerBishops: formerData || SiteData.formerBishops,
    clergy: clergyData || SiteData.clergy,
    parishes: parishesData || SiteData.parishes,
    curia: curiaData || SiteData.curia,
    news: {
      ...(SiteData.news || {}),
      articles: (newsItems && newsItems.length ? newsItems : (SiteData.news || {}).articles || []),
    },
    events: {
      ...(SiteData.events || {}),
      events: (eventsItems && eventsItems.length ? eventsItems : (SiteData.events || {}).events || []),
    },
    gallery: galleryData || SiteData.gallery,
    contact: contactData || SiteData.contact,
    privacy: privacyData || SiteData.privacy,
    bulletins: SiteData.bulletins,
  };
}

function applySnapshotToSiteData(snapshot) {
  const merged = snapshot || {};
  if (merged.site) SiteData.site = { ...(SiteData.site || {}), ...merged.site };
  if (merged.navbar) SiteData.navbar = { ...(SiteData.navbar || {}), ...merged.navbar };
  if (merged.footer) SiteData.footer = { ...(SiteData.footer || {}), ...merged.footer };
  if (merged.homepage) SiteData.homepage = { ...(SiteData.homepage || {}), ...merged.homepage };
  if (merged.history) SiteData.history = { ...(SiteData.history || {}), ...merged.history };
  if (merged.visionMission) SiteData.visionMission = { ...(SiteData.visionMission || {}), ...merged.visionMission };
  if (merged.bishop) SiteData.bishop = { ...(SiteData.bishop || {}), ...merged.bishop };
  if (merged.formerBishops) SiteData.formerBishops = { ...(SiteData.formerBishops || {}), ...merged.formerBishops };
  if (merged.clergy) SiteData.clergy = { ...(SiteData.clergy || {}), ...merged.clergy };
  if (merged.parishes) SiteData.parishes = { ...(SiteData.parishes || {}), ...merged.parishes };
  if (merged.curia) SiteData.curia = { ...(SiteData.curia || {}), ...merged.curia };
  if (merged.news) SiteData.news = { ...(SiteData.news || {}), ...merged.news };
  if (merged.events) SiteData.events = { ...(SiteData.events || {}), ...merged.events };
  if (merged.gallery) SiteData.gallery = { ...(SiteData.gallery || {}), ...merged.gallery };
  if (merged.contact) SiteData.contact = { ...(SiteData.contact || {}), ...merged.contact };
  if (merged.privacy) SiteData.privacy = { ...(SiteData.privacy || {}), ...merged.privacy };
}

/* ── Utility Bar ─────────────────────────────────────────── */

function renderUtilityBar() {
  const s = SiteData.site || {};
  const socials = (s.socialLinks || []).map(l =>
    `<a href="${safe(l.url, '#')}" class="opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity duration-200">${safe(l.label)}</a>`
  ).join('');

  return `<div class="bg-maroon-deep text-parchment-dark font-mono text-[0.7rem] sm:text-[0.74rem] tracking-[0.03em]">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
      <span>${safe(s.utilityBarAddress)}</span>
      <div class="flex gap-4 sm:gap-[18px] flex-wrap justify-center">
        ${socials}
        <a href="${safe(s.contactUrl, 'contact.html')}" class="opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity duration-200">Contact Us</a>
        ${s.adminUrl ? `<a href="${s.adminUrl}" class="opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity duration-200">Admin</a>` : ''}
      </div>
    </div>
  </div>`;
}

/* ── Navbar ──────────────────────────────────────────────── */

function renderNavbar() {
  const s = SiteData.site || {};
  const nav = SiteData.navbar || {};
  const items = nav.items || [];

  const menuItems = items.map(item => {
    if (item.children && item.children.length) {
      const subs = item.children.map(c =>
        `<a href="${safe(c.href, '#')}" class="block px-[18px] py-[7px] font-newsreader text-[0.92rem] text-ink-soft hover:text-maroon">${safe(c.label)}</a>`
      ).join('');
      return `<div class="group relative">
        <button class="w-full lg:w-auto text-left font-mono text-[0.76rem] tracking-[0.06em] uppercase px-[14px] py-[10px] bg-transparent cursor-pointer text-ink font-medium hover:text-maroon hover:bg-parchment lg:hover:bg-transparent transition-colors duration-200">${safe(item.label)}</button>
        <div class="lg:absolute top-full left-0 bg-white lg:border border-parchment-dark min-w-[210px] lg:shadow-[0_12px_28px_rgba(42,36,32,0.12)] hidden group-hover:block lg:group-hover:opacity-100 lg:group-hover:visible py-1.5 z-[60] pl-4 lg:pl-0">
          ${subs}
        </div>
      </div>`;
    }
    return `<div><a href="${safe(item.href, '#')}" class="block font-mono text-[0.76rem] tracking-[0.06em] uppercase px-[14px] py-[10px] text-ink font-medium hover:text-maroon hover:bg-parchment lg:hover:bg-transparent transition-colors duration-200">${safe(item.label)}</a></div>`;
  }).join('');

  return `<header class="bg-white border-b border-parchment-dark sticky top-0 z-50">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 relative">
      <a href="index.html" class="flex items-center gap-3 sm:gap-[14px]">
        <img src="${safe(s.logoUrl)}" alt="Logo" class="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full object-cover shrink-0 border border-gold shadow-md"/>
        <div>
          <h1 class="font-fraunces font-semibold text-maroon-deep text-base sm:text-[1.15rem] tracking-[0.01em] leading-tight">${safe(s.name, 'Diocese of Boac')}</h1>
          <span class="font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-ink-soft block">${safe(s.subtitle, 'Official Diocesan Website')}</span>
        </div>
      </a>

      <button id="menu-toggle" class="lg:hidden p-2 rounded text-maroon hover:bg-parchment focus:outline-none" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <nav id="main-nav" class="hidden lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 lg:top-auto lg:left-auto lg:right-auto bg-white lg:bg-transparent border-b lg:border-none border-parchment-dark shadow-lg lg:shadow-none p-4 lg:p-0 gap-1 lg:gap-[2px] z-50">
        ${menuItems}
      </nav>
    </div>
  </header>`;
}

/* ── Footer ──────────────────────────────────────────────── */

function renderFooter() {
  const f = SiteData.footer || {};

  const infoLinks = (f.infoLinks || []).map(l =>
    `<a href="${safe(l.href, '#')}" class="block text-sm sm:text-[0.92rem] py-1 opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity">${safe(l.label)}</a>`
  ).join('');

  const socialLinks = (f.socialLinks || []).map(l =>
    `<a href="${safe(l.href, '#')}" class="block text-sm sm:text-[0.92rem] py-1 opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity">${safe(l.label)}</a>`
  ).join('');

  return `<footer class="bg-maroon-deep text-parchment-dark pt-12 sm:pt-14 px-4 sm:px-6 pb-6">
    <div class="max-w-[1180px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-8 sm:gap-10">
      <div class="sm:col-span-2 md:col-span-1">
        <div class="flex items-center gap-3 mb-3.5">
          <img src="${safe(f.logoUrl)}" alt="Logo" class="w-[38px] h-[38px] rounded-full object-cover border border-gold shadow-md"/>
          <h1 class="text-white text-base font-fraunces font-semibold">${safe(f.name, 'Diocese of Boac')}</h1>
        </div>
        <p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(f.addressLine1)}</p>
        <p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(f.addressLine2)}</p>
        <p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(f.email)}</p>
        <p class="text-sm sm:text-[0.92rem]">${safe(f.phone)}</p>
      </div>
      <div>
        <h5 class="font-mono text-[0.74rem] tracking-[0.1em] uppercase text-gold-light mb-3 sm:mb-4">Diocesan Info</h5>
        ${infoLinks}
      </div>
      <div>
        <h5 class="font-mono text-[0.74rem] tracking-[0.1em] uppercase text-gold-light mb-3 sm:mb-4">Connect</h5>
        ${socialLinks}
      </div>
    </div>
    <div class="max-w-[1180px] mx-auto mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-white/10 flex justify-between flex-wrap gap-2 font-mono text-[0.7rem] sm:text-[0.72rem] opacity-70">
      <span>${safe(f.copyright)}</span>
      <span>${safe(f.version)}</span>
    </div>
  </footer>`;
}

/* ── Subpage Banner ──────────────────────────────────────── */

function renderPageBanner(eyebrow, title) {
  return `<section class="relative bg-maroon-deep text-parchment overflow-hidden py-14 sm:py-16 px-4 sm:px-6">
    <div class="absolute inset-0 opacity-[0.07]" style="background-image: radial-gradient(circle at 85% 20%, #d9b877, transparent 55%);"></div>
    <div class="max-w-[1180px] mx-auto relative z-10">
      <span class="eyebrow text-gold-light">${safe(eyebrow)}</span>
      <h2 class="font-fraunces font-semibold text-white text-3xl sm:text-4xl md:text-[2.6rem] mt-2">${safe(title)}</h2>
    </div>
  </section>`;
}

/* ── Prose Content Wrapper ───────────────────────────────── */

function renderProseSection(html) {
  return `<section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
    <div class="max-w-[820px] mx-auto text-ink-soft text-base sm:text-[1.02rem] leading-relaxed space-y-5">
      ${safe(html)}
    </div>
  </section>`;
}

/* ── Homepage ────────────────────────────────────────────── */

function renderHomepage(data = {}) {
  const hp = (data.homepage || SiteData.homepage || {});
  const hero = hp.hero || {};
  const lit = hp.liturgical || {};
  const vis = hp.vision || {};
  const mis = hp.mission || {};
  const ns = hp.newsSection || {};
  const es = hp.eventsSection || {};
  const dir = hp.directories || {};
  const newsData = data.news || SiteData.news || {};
  const eventsData = data.events || SiteData.events || {};
  const liveDateText = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const heroButtons = (hero.buttons || []).map(b => {
    if (b.style === 'primary') {
      return `<a href="${safe(b.href, '#')}" class="font-mono text-[0.76rem] tracking-[0.08em] uppercase py-3.5 px-6 rounded-sm font-medium text-center transition-all duration-200 bg-gold text-maroon-deep hover:bg-gold-light">${safe(b.label)}</a>`;
    }
    return `<a href="${safe(b.href, '#')}" class="font-mono text-[0.76rem] tracking-[0.08em] uppercase py-3.5 px-6 rounded-sm font-medium text-center transition-all duration-200 border border-white/50 text-parchment hover:border-gold-light hover:text-gold-light">${safe(b.label)}</a>`;
  }).join('');

  const articles = (newsData.articles || []).slice(0, 3);
  const newsCards = articles.map((n, i) => {
    const extra = i === 2 ? ' sm:col-span-2 lg:col-span-1' : '';
    return `<article class="bg-white border border-parchment-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col${extra}">
      <div class="h-44 sm:h-48 relative overflow-hidden bg-parchment-dark">
        <img src="${safe(n.image, 'https://placehold.co/600x400/ece2cd/4a1420?text=News')}" alt="${safe(n.title, 'News')}" class="w-full h-full object-cover">
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span class="font-mono text-[0.7rem] tracking-[0.06em] text-gold uppercase">${fmtDate(n.date)}</span>
          <h4 class="font-fraunces font-semibold text-maroon-deep leading-tight text-base sm:text-[1.08rem] my-2">${safe(n.title)}</h4>
        </div>
        <a href="news.html" class="font-mono text-[0.72rem] tracking-[0.06em] uppercase text-maroon border-b border-gold self-start mt-3">Read More</a>
      </div>
    </article>`;
  }).join('');

  const eventItems = (eventsData.events || []).map(e => eventRowHTML(e)).join('');

  const missionItems = (mis.items || []).map(item => `<li>${item}</li>`).join('');

  const dirCards = (dir.items || []).map(d =>
    `<a href="${safe(d.href, '#')}" class="block bg-white border border-parchment-dark p-5 sm:py-6 sm:px-[22px] transition-all duration-200 hover:border-gold hover:-translate-y-1">
      <span class="font-mono text-[0.72rem] text-gold tracking-[0.06em]">${safe(d.number)}</span>
      <h4 class="font-fraunces font-semibold text-maroon-deep leading-tight text-base sm:text-[1.08rem] mt-2 mb-1.5">${safe(d.title)}</h4>
      <p class="text-sm sm:text-[0.9rem] text-ink-soft">${safe(d.description)}</p>
    </a>`
  ).join('');

  return `
  <!-- Hero -->
  <section class="relative bg-cover bg-center bg-no-repeat text-parchment overflow-hidden py-14 sm:py-20 md:py-28 px-4 sm:px-6" style="background-image: url('${safe(hero.backgroundImage)}');">
    <div class="absolute inset-0 bg-gradient-to-r from-maroon-deep/95 via-maroon-deep/85 to-maroon-deep/65 pointer-events-none"></div>
    <div class="max-w-[1180px] mx-auto relative z-10">
      <span class="eyebrow text-gold-light block mb-2 sm:mb-3">${safe(hero.eyebrow)}</span>
      <h2 id="hero-headline" class="font-fraunces font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white max-w-[15ch] leading-tight mb-4 sm:mb-6 italic">${safe(hero.headline)}</h2>
      <p id="hero-subtext" class="max-w-[50ch] text-base sm:text-lg text-parchment-dark mb-6 sm:mb-8 leading-relaxed">${safe(hero.subtext)}</p>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-[14px]">
        ${heroButtons}
      </div>
    </div>
  </section>

  <!-- Liturgical strip -->
  <div class="bg-gold text-maroon-deep">
    <div class="max-w-[1180px] mx-auto py-2.5 px-4 sm:px-6 flex items-center gap-2 sm:gap-3 flex-wrap font-mono text-[0.72rem] sm:text-[0.78rem]">
      <span class="w-2.5 h-2.5 rounded-full bg-maroon-deep shrink-0"></span>
      <strong class="font-semibold">Today</strong>
      <span class="opacity-50">&middot;</span>
      <span>${safe(lit.date || liveDateText)}</span>
      <span class="hidden sm:inline opacity-50">&middot;</span>
      <span class="w-full sm:w-auto">${safe(lit.season)}</span>
    </div>
  </div>

  <!-- Vision / Mission -->
  <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
    <div class="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      <div>
        <span class="eyebrow block mb-2">${safe(vis.eyebrow, 'Vision')}</span>
        <h4 class="font-fraunces font-semibold text-maroon-deep leading-tight text-xl sm:text-2xl italic mb-3">${safe(vis.title)}</h4>
        <p class="text-ink-soft text-base sm:text-[1.02rem]">${safe(vis.text)}</p>
      </div>
      <div>
        <span class="eyebrow block mb-2">${safe(mis.eyebrow, 'Mission')}</span>
        <h4 class="font-fraunces font-semibold text-maroon-deep leading-tight text-xl sm:text-2xl italic mb-3">${safe(mis.title)}</h4>
        <ol class="pl-5 text-ink-soft text-base sm:text-[1.02rem] list-decimal space-y-1.5">
          ${missionItems}
        </ol>
      </div>
    </div>
  </section>

  <!-- News -->
  <section id="news" class="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
    <div class="max-w-[1180px] mx-auto">
      <div class="mb-8 sm:mb-10 max-w-[60ch]">
        <span class="eyebrow">${safe(ns.eyebrow)}</span>
        <h3 class="font-fraunces font-semibold text-maroon-deep leading-tight text-2xl sm:text-3xl md:text-4xl mt-1.5">${safe(ns.title)}</h3>
      </div>
      <div id="home-news-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        ${newsCards}
      </div>
    </div>
  </section>

  <!-- Events -->
  <section id="events" class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-maroon-deep text-parchment">
    <div class="max-w-[1180px] mx-auto">
      <div class="mb-8 sm:mb-10 max-w-[60ch]">
        <span class="eyebrow !text-gold-light">${safe(es.eyebrow)}</span>
        <h3 class="font-fraunces font-semibold leading-tight text-2xl sm:text-3xl md:text-4xl mt-1.5 text-white">${safe(es.title)}</h3>
      </div>
      <div class="divide-y divide-white/10">
        ${eventItems}
      </div>
    </div>
  </section>

  <!-- Directories -->
  <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-parchment">
    <div class="max-w-[1180px] mx-auto">
      <div class="mb-8 sm:mb-10 max-w-[60ch]">
        <span class="eyebrow">${safe(dir.eyebrow)}</span>
        <h3 class="font-fraunces font-semibold text-maroon-deep leading-tight text-2xl sm:text-3xl md:text-4xl mt-1.5">${safe(dir.title)}</h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        ${dirCards}
      </div>
    </div>
  </section>`;
}

/* ── History ─────────────────────────────────────────────── */

function renderHistory(d = SiteData.history || {}) {
  const historyImage = safe(d.image, 'https://placehold.co/1200x700/ece2cd/4a1420?text=History+Photo');
  const html = `
    <div class="grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-start not-prose">
      <div class="bg-parchment-dark border border-parchment-dark overflow-hidden">
        <img src="${historyImage}" alt="${safe(d.bannerTitle, 'History photo')}" class="w-full h-full object-cover aspect-[16/10]">
      </div>
      <div class="space-y-4">${safe(d.content)}</div>
    </div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Vision & Mission ────────────────────────────────────── */

function renderVisionMission(d = SiteData.visionMission || {}) {
  const items = (d.missionItems || []).map(i => `<li>${i}</li>`).join('');
  const html = `
    <h3 class="font-fraunces text-maroon-deep text-xl font-semibold italic">${safe(d.visionTitle, 'Vision')}</h3>
    <p>${safe(d.visionText)}</p>
    <h3 class="font-fraunces text-maroon-deep text-xl font-semibold italic pt-4">${safe(d.missionTitle, 'Mission')}</h3>
    <ol class="list-decimal pl-5 space-y-2">${items}</ol>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Bishop ──────────────────────────────────────────────── */

function renderBishop(d = SiteData.bishop || {}) {
  const bishopImage = safe(d.image, 'https://placehold.co/800x1000/ece2cd/4a1420?text=Bishop+Portrait');
  const html = `
    <div class="grid md:grid-cols-[320px_1fr] gap-6 md:gap-8 items-start not-prose">
      <div class="bg-parchment-dark border border-parchment-dark overflow-hidden">
        <img src="${bishopImage}" alt="${safe(d.bannerTitle, 'Bishop portrait')}" class="w-full h-full object-cover aspect-[4/5]">
      </div>
      <div class="space-y-4">${safe(d.content)}</div>
    </div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Former Bishops ──────────────────────────────────────── */

function renderFormerBishops(d = SiteData.formerBishops || {}) {
  const rows = (d.bishops || []).map(b => {
    const photo = safe(b.photo, 'https://placehold.co/600x800/ece2cd/4a1420?text=Former+Bishop');
    return `<div class="p-4 flex flex-col sm:flex-row gap-4 items-start border-b border-parchment-dark last:border-b-0">
      <div class="w-full sm:w-[120px] shrink-0 bg-parchment-dark overflow-hidden">
        <img src="${photo}" alt="${safe(b.name, 'Former bishop portrait')}" class="w-full aspect-[4/5] object-cover">
      </div>
      <div class="flex-1">
        <span class="font-fraunces text-maroon-deep font-semibold block">${safe(b.name)}</span>
        <span class="text-sm">${safe(b.years)}</span>
      </div>
    </div>`;
  }).join('');
  const html = `
    <p>${safe(d.intro)}</p>
    <div class="border border-parchment-dark mt-4">${rows}</div>
    <p class="text-sm">${safe(d.note)}</p>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Clergy ──────────────────────────────────────────────── */

function renderClergy(d = SiteData.clergy || {}) {
  const rows = (d.members || []).map(c => clergyRowHTML(c)).join('');
  const html = `<div class="divide-y divide-parchment-dark border-t border-b border-parchment-dark not-prose">${rows}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Parishes ────────────────────────────────────────────── */

function renderParishes(d = SiteData.parishes || {}) {
  const cards = (d.parishes || []).map(p => parishCardHTML(p)).join('');
  const html = `<div class="grid sm:grid-cols-2 gap-4 not-prose">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Curia ───────────────────────────────────────────────── */

function renderCuria(d = SiteData.curia || {}) {
  const cards = (d.offices || []).map(o => {
    const photo = safe(o.photo, 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo');
    return `<div class="border border-parchment-dark overflow-hidden bg-white">
      <div class="h-40 bg-parchment-dark"><img src="${photo}" alt="${safe(o.name, 'Curia office')}" class="w-full h-full object-cover"></div>
      <div class="p-4"><h4 class="font-fraunces font-semibold text-maroon-deep mb-1">${safe(o.name)}</h4><p class="text-sm">${safe(o.description)}</p></div>
    </div>`;
  }).join('');
  const html = `<p>${safe(d.intro)}</p><div class="grid sm:grid-cols-2 gap-4 mt-4">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── News ────────────────────────────────────────────────── */

function renderNews(d = SiteData.news || {}) {
  const cards = (d.articles || []).map(n => newsCardPageHTML(n)).join('');
  const html = `<div class="grid sm:grid-cols-2 gap-6 not-prose">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Events ──────────────────────────────────────────────── */

function renderEvents(d = SiteData.events || {}) {
  const rows = (d.events || []).map(e => eventRowPageHTML(e)).join('');
  const html = `<div class="divide-y divide-parchment-dark border-t border-b border-parchment-dark not-prose">${rows}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Gallery ─────────────────────────────────────────────── */

function renderGallery(d = SiteData.gallery || {}) {
  const featuredImage = safe(d.image, 'https://placehold.co/1200x700/ece2cd/4a1420?text=Gallery+Photo');
  const imgs = (d.images || []).map(img =>
    `<img src="${safe(img.src)}" alt="${safe(img.alt, 'Photo')}" class="w-full aspect-square object-cover">`
  ).join('');
  const html = `
    <div class="mb-6 not-prose">
      <img src="${featuredImage}" alt="${safe(d.bannerTitle, 'Gallery photo')}" class="w-full h-[260px] sm:h-[360px] object-cover rounded-xl border border-parchment-dark">
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose">${imgs}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Bulletins ───────────────────────────────────────────── */

function renderBulletins(d = SiteData.bulletins || {}) {
  const bulletinImage = safe(d.image, 'https://placehold.co/900x600/ece2cd/4a1420?text=Bulletin+Photo');
  const html = `
    <div class="grid md:grid-cols-[1fr_0.9fr] gap-6 md:gap-8 items-start not-prose">
      <div class="bg-parchment-dark border border-parchment-dark overflow-hidden">
        <img src="${bulletinImage}" alt="${safe(d.bannerTitle, 'Bulletin photo')}" class="w-full h-full object-cover aspect-[16/10]">
      </div>
      <div class="space-y-4">
        <p class="italic">${safe(d.message)}</p>
        <p class="text-sm">${safe(d.author)}</p>
        <p class="pt-4"><a href="${safe(d.ctaHref, 'events.html')}" class="font-mono text-xs uppercase text-maroon border-b border-gold">${safe(d.ctaLabel, 'View the Diocesan Calendar &rarr;')}</a></p>
      </div>
    </div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Contact ─────────────────────────────────────────────── */

function renderContact(d = SiteData.contact || {}) {
  const html = `
    <p><strong>Address:</strong> ${safe(d.address)}</p>
    <p><strong>Email:</strong> ${safe(d.email)}</p>
    <p><strong>Phone:</strong> ${safe(d.phone)}</p>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Menu Toggle ─────────────────────────────────────────── */

function initMenuToggle() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });
  }
}

/* ── Admin Storage Override ──────────────────────────────── */

async function applyAdminOverrides(pageKey) {
  try {
    // Home hero overrides
    if (pageKey === 'home') {
      const homeData = await dGet(DKEYS.home);
      if (homeData) {
        const h = document.getElementById('hero-headline');
        const s = document.getElementById('hero-subtext');
        if (h && homeData.headline) h.textContent = homeData.headline;
        if (s && homeData.subtext) s.textContent = homeData.subtext;
      }
      // Admin news overrides for homepage
      const newsItems = await dGet(DKEYS.news);
      if (newsItems && newsItems.length) {
        const sorted = [...newsItems].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const el = document.getElementById('home-news-list');
        if (el) el.innerHTML = sorted.slice(0, 3).map(newsCardHTML).join('');
      }
    }
  } catch (e) {
    // Storage not available — silently use SiteData defaults
  }
}

/* ── Page Renderers Map ──────────────────────────────────── */

const PAGE_RENDERERS = {
  home: renderHomepage,
  history: renderHistory,
  visionMission: renderVisionMission,
  bishop: renderBishop,
  formerBishops: renderFormerBishops,
  clergy: renderClergy,
  parishes: renderParishes,
  curia: renderCuria,
  news: renderNews,
  events: renderEvents,
  gallery: renderGallery,
  bulletins: renderBulletins,
  contact: renderContact,
};

/* Page title map (pulled from SiteData) */
function getPageTitle(pageKey) {
  const map = {
    home: 'Diocese of Boac | Official Website',
    history: (SiteData.history || {}).pageTitle,
    visionMission: (SiteData.visionMission || {}).pageTitle,
    bishop: (SiteData.bishop || {}).pageTitle,
    formerBishops: (SiteData.formerBishops || {}).pageTitle,
    clergy: (SiteData.clergy || {}).pageTitle,
    parishes: (SiteData.parishes || {}).pageTitle,
    curia: (SiteData.curia || {}).pageTitle,
    news: (SiteData.news || {}).pageTitle,
    events: (SiteData.events || {}).pageTitle,
    gallery: (SiteData.gallery || {}).pageTitle,
    bulletins: (SiteData.bulletins || {}).pageTitle,
    contact: (SiteData.contact || {}).pageTitle,
  };
  return map[pageKey] || 'Diocese of Boac';
}

/* ── Master Init ─────────────────────────────────────────── */

async function initPage(pageKey) {
  const pageSnapshot = await loadPageSnapshot(pageKey);
  applySnapshotToSiteData(pageSnapshot);

  // Set page title
  document.title = getPageTitle(pageKey);

  // Render utility bar
  const utilBar = document.getElementById('utility-bar');
  if (utilBar) utilBar.innerHTML = renderUtilityBar(SiteData.site || {});

  // Render navbar
  const header = document.getElementById('site-header');
  if (header) header.outerHTML = renderNavbar(SiteData.navbar || {}, SiteData.site || {});

  // Render page content
  const content = document.getElementById('page-content');
  const renderFn = PAGE_RENDERERS[pageKey];
  if (content && renderFn) {
    content.innerHTML = renderFn();
  }

  // Render footer
  const footer = document.getElementById('site-footer');
  if (footer) footer.outerHTML = renderFooter(SiteData.footer || {});

  // Init menu toggle
  initMenuToggle();

  // Apply admin overrides (async, non-blocking)
  applyAdminOverrides(pageKey);
}
