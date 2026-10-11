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
  const [siteData, navbarData, footerData, homeData, historyData, visionData, bishopData, formerData, clergyData, parishesData, curiaData, newsItems, eventsItems, galleryData, contactData, privacyData, bulletinData] = await Promise.all([
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
    dGet(DKEYS.bulletin),
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
    clergy: {
      ...(SiteData.clergy || {}),
      members: (Array.isArray(clergyData) ? clergyData : (clergyData && Array.isArray(clergyData.members) ? clergyData.members : (SiteData.clergy || {}).members || [])),
    },
    parishes: {
      ...(SiteData.parishes || {}),
      parishes: (Array.isArray(parishesData) ? parishesData : (parishesData && Array.isArray(parishesData.parishes) ? parishesData.parishes : (SiteData.parishes || {}).parishes || [])),
    },
    curia: (function() {
      const base = curiaData || SiteData.curia || {};
      let offices = base.offices;
      if (typeof offices === 'string') {
        try { offices = JSON.parse(offices); } catch(e) { offices = []; }
      }
      return { ...base, offices: Array.isArray(offices) ? offices : ((SiteData.curia || {}).offices || []) };
    })(),
    news: {
      ...(SiteData.news || {}),
      articles: Array.isArray(newsItems) ? newsItems : ((SiteData.news || {}).articles || []),
    },
    events: {
      ...(SiteData.events || {}),
      events: Array.isArray(eventsItems) ? eventsItems : ((SiteData.events || {}).events || []),
    },
    gallery: (function() {
      const base = galleryData || SiteData.gallery || {};
      let images = base.images;
      if (typeof images === 'string') {
        try { images = JSON.parse(images); } catch(e) { images = []; }
      }
      return { ...base, images: Array.isArray(images) ? images : ((SiteData.gallery || {}).images || []) };
    })(),
    contact: contactData || SiteData.contact,
    privacy: privacyData || SiteData.privacy,
    bulletins: bulletinData || SiteData.bulletins,
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
  if (merged.bulletins) SiteData.bulletins = { ...(SiteData.bulletins || {}), ...merged.bulletins };
}

/* ── Utility Bar ─────────────────────────────────────────── */

function renderUtilityBar() {
  const s = SiteData.site || {};
  const c = SiteData.contact || {};
  const addressText = c.address || s.utilityBarAddress || 'Sacred Heart Pastoral Center · Boac, 4900 Marinduque';
  const adminUrl = s.adminUrl || '1978.html';
  const socials = (s.socialLinks || []).map(l =>
    `<a href="${safe(l.url, '#')}" class="opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity duration-200">${safe(l.label)}</a>`
  ).join('');

  return `<div class="bg-maroon-deep text-parchment-dark font-sans text-[0.75rem] tracking-wide">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
      <span>${safe(addressText)}</span>
      <div class="flex gap-4 sm:gap-[18px] flex-wrap justify-center items-center">
        ${socials}
        <a href="${safe(s.contactUrl, 'contact.html')}" class="opacity-85 hover:opacity-100 hover:text-gold-light transition-opacity duration-200">Contact Us</a>
        <a href="${safe(adminUrl, '1978.html')}" class="opacity-85 hover:opacity-100 text-gold-light hover:text-white transition-opacity duration-200 font-semibold uppercase tracking-wider">Admin</a>
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
        `<a href="${safe(c.href, '#')}" class="block px-[18px] py-[7px] font-sans text-[0.92rem] text-ink-soft hover:text-maroon">${safe(c.label)}</a>`
      ).join('');
      return `<div class="group relative">
        <button class="w-full lg:w-auto text-left nav-link px-[14px] py-[10px] bg-transparent cursor-pointer text-ink font-medium hover:text-maroon hover:bg-parchment lg:hover:bg-transparent transition-colors duration-200">${safe(item.label)}</button>
        <div class="lg:absolute top-full left-0 bg-white lg:border border-parchment-dark min-w-[210px] lg:shadow-[0_12px_28px_rgba(42,36,32,0.12)] hidden group-hover:block lg:group-hover:opacity-100 lg:group-hover:visible py-1.5 z-[60] pl-4 lg:pl-0">
          ${subs}
        </div>
      </div>`;
    }
    return `<div><a href="${safe(item.href, '#')}" class="block nav-link px-[14px] py-[10px] text-ink font-medium hover:text-maroon hover:bg-parchment lg:hover:bg-transparent transition-colors duration-200">${safe(item.label)}</a></div>`;
  }).join('');

  return `<header class="bg-white border-b border-parchment-dark sticky top-0 z-50">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 relative">
      <a href="index.html" class="flex items-center gap-3 sm:gap-[14px]">
        <img src="${safe(s.logoUrl)}" alt="Logo" class="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full object-cover shrink-0 border border-gold shadow-md"/>
        <div>
          <h1 class="heading-3 text-maroon-deep text-base sm:text-[1.15rem] tracking-[0.01em] leading-tight">${safe(s.name, 'Diocese of Boac')}</h1>
          <span class="eyebrow text-ink-soft block">${safe(s.subtitle, 'Official Diocesan Website')}</span>
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
  const c = SiteData.contact || {};
  const address1 = c.address || f.addressLine1 || 'Sacred Heart Pastoral Center';
  const address2 = c.address ? '' : (f.addressLine2 || 'Boac, 4900 Marinduque, Philippines');
  const email = c.email ? (c.email.toLowerCase().startsWith('email:') ? c.email : 'Email: ' + c.email) : (f.email || 'Email: info@dioceseofboac.com');
  const phone = c.phone ? (c.phone.toLowerCase().startsWith('phone:') ? c.phone : 'Phone: ' + c.phone) : (f.phone || 'Phone: (042) 332-1014');

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
          <h1 class="text-white text-base font-serif font-semibold">${safe(f.name, 'Diocese of Boac')}</h1>
        </div>
        <p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(address1)}</p>
        ${address2 ? `<p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(address2)}</p>` : ''}
        <p class="text-sm sm:text-[0.92rem] mb-1.5">${safe(email)}</p>
        <p class="text-sm sm:text-[0.92rem]">${safe(phone)}</p>
      </div>
      <div>
        <h5 class="eyebrow text-gold-light mb-3 sm:mb-4">Diocesan Info</h5>
        ${infoLinks}
      </div>
      <div>
        <h5 class="eyebrow text-gold-light mb-3 sm:mb-4">Connect</h5>
        ${socialLinks}
      </div>
    </div>
    <div class="max-w-[1180px] mx-auto mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-white/10 flex justify-between flex-wrap gap-2 font-sans text-[0.7rem] sm:text-[0.72rem] opacity-70">
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
      <h2 class="heading-1 text-maroon-deep mt-2">${safe(title)}</h2>
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

  const heroEyebrow = safe(hp.eyebrow || hero.eyebrow, 'The Roman Catholic Diocese of Boac · Province of Marinduque');
  const heroHeadline = safe(hp.headline || hero.headline, 'Walking together in faith, hope, and service');
  const heroSubtext = safe(hp.subtext || hero.subtext, "Here you'll find news from our 14 parishes, the Bishop's messages, our diocesan calendar, and resources to support your spiritual journey — under the patronage of Mahal na Birhen ng Biglang-Awa. We're glad you're here.");
  const heroBg = safe(hp.backgroundImage || hero.backgroundImage);

  const b1Label = safe(hp.button1Label || (hero.buttons && hero.buttons[0] ? hero.buttons[0].label : null), 'Find a Parish');
  const b1Href = safe(hp.button1Href || (hero.buttons && hero.buttons[0] ? hero.buttons[0].href : null), 'parishes.html');
  const b2Label = safe(hp.button2Label || (hero.buttons && hero.buttons[1] ? hero.buttons[1].label : null), 'Upcoming Events');
  const b2Href = safe(hp.button2Href || (hero.buttons && hero.buttons[1] ? hero.buttons[1].href : null), 'events.html');

  const heroButtons = `
    <a href="${b1Href}" class="btn py-3.5 px-6 rounded-sm font-medium text-center transition-all duration-200 bg-gold text-maroon-deep hover:bg-gold-light">${b1Label}</a>
    <a href="${b2Href}" class="btn py-3.5 px-6 rounded-sm font-medium text-center transition-all duration-200 border border-white/50 text-parchment hover:border-gold-light hover:text-gold-light">${b2Label}</a>
  `;

  const litDate = safe(hp.liturgicalDate || lit.date || liveDateText);
  const litSeason = safe(hp.liturgicalSeason || lit.season, 'Ordinary Time &mdash; Liturgical color: Green');

  // Filter only published news
  const publishedArticles = (newsData.articles || []).filter(n => n && n.status !== 'draft');
  const articles = publishedArticles.slice(0, 3);
  const newsCards = articles.length > 0 ? articles.map((n, i) => {
    const extra = i === 2 ? ' sm:col-span-2 lg:col-span-1' : '';
    const detailHref = 'news-detail.html?id=' + encodeURIComponent(n.id || '');
    return `<article class="bg-white border border-parchment-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col${extra}">
      <div class="h-44 sm:h-48 relative overflow-hidden bg-parchment-dark">
        <a href="${detailHref}"><img src="${safe(n.image, 'https://placehold.co/600x400/ece2cd/4a1420?text=News')}" alt="${safe(n.title, 'News')}" class="w-full h-full object-cover"></a>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span class="font-sans text-[0.7rem] tracking-[0.06em] text-gold uppercase">${fmtDate(n.date)}</span>
          <h4 class="heading-3 text-maroon-deep leading-tight text-base sm:text-[1.08rem] my-2"><a href="${detailHref}" class="hover:text-maroon">${safe(n.title)}</a></h4>
        </div>
        <a href="${detailHref}" class="eyebrow text-maroon border-b border-gold self-start mt-3">Read More</a>
      </div>
    </article>`;
  }).join('') : `<div class="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 text-ink-soft"><p>No recent news at this time.</p></div>`;

  // Filter only published and upcoming events for homepage
  const todayStr = new Date().toISOString().split('T')[0];
  const publishedEvents = (eventsData.events || []).filter(e => e && e.status !== 'draft');
  const upcomingEvents = publishedEvents.filter(e => !e.date || e.date >= todayStr).slice(0, 5);
  const eventItems = upcomingEvents.length > 0
    ? upcomingEvents.map(e => eventRowHTML(e)).join('')
    : `<div class="py-8 text-center text-parchment-dark"><p>No upcoming events currently scheduled.</p></div>`;

  const missionItems = (mis.items || []).map(item => `<li>${item}</li>`).join('');

  const dirCards = (dir.items || []).map(d =>
    `<a href="${safe(d.href, '#')}" class="block bg-white border border-parchment-dark p-5 sm:py-6 sm:px-[22px] transition-all duration-200 hover:border-gold hover:-translate-y-1">
      <span class="eyebrow text-gold">${safe(d.number)}</span>
      <h4 class="heading-3 text-maroon-deep leading-tight text-base sm:text-[1.08rem] mt-2 mb-1.5">${safe(d.title)}</h4>
      <p class="text-sm sm:text-[0.9rem] text-ink-soft">${safe(d.description)}</p>
    </a>`
  ).join('');

  return `
  <!-- Hero -->
  <section class="relative bg-cover bg-center bg-no-repeat text-parchment overflow-hidden py-14 sm:py-20 md:py-28 px-4 sm:px-6" style="background-image: url('${heroBg}');">
    <div class="absolute inset-0 bg-gradient-to-r from-maroon-deep/95 via-maroon-deep/85 to-maroon-deep/65 pointer-events-none"></div>
    <div class="max-w-[1180px] mx-auto relative z-10">
      <span class="eyebrow text-gold-light block mb-2 sm:mb-3">${heroEyebrow}</span>
      <h2 id="hero-headline" class="heading-1 text-white max-w-[15ch] mb-4 sm:mb-6">${heroHeadline}</h2>
      <p id="hero-subtext" class="max-w-[50ch] text-base sm:text-lg text-parchment-dark mb-6 sm:mb-8 leading-relaxed">${heroSubtext}</p>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-[14px]">
        ${heroButtons}
      </div>
    </div>
  </section>

  <!-- Liturgical strip -->
  <div class="bg-gold text-maroon-deep">
    <div class="max-w-[1180px] mx-auto py-2.5 px-4 sm:px-6 flex items-center gap-2 sm:gap-3 flex-wrap font-sans text-[0.72rem] sm:text-[0.78rem]">
      <span class="w-2.5 h-2.5 rounded-full bg-maroon-deep shrink-0"></span>
      <strong class="font-semibold">Today</strong>
      <span class="opacity-50">&middot;</span>
      <span>${litDate}</span>
      <span class="hidden sm:inline opacity-50">&middot;</span>
      <span class="w-full sm:w-auto">${litSeason}</span>
    </div>
  </div>

  <!-- Vision / Mission -->
  <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
    <div class="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      <div>
        <span class="eyebrow block mb-2">${safe(vis.eyebrow, 'Vision')}</span>
        <h4 class="heading-3 text-maroon-deep mb-3">${safe(vis.title)}</h4>
        <p class="text-ink-soft text-base sm:text-[1.02rem]">${safe(vis.text)}</p>
      </div>
      <div>
        <span class="eyebrow block mb-2">${safe(mis.eyebrow, 'Mission')}</span>
        <h4 class="heading-3 text-maroon-deep mb-3">${safe(mis.title)}</h4>
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
        <h3 class="heading-2 text-maroon-deep">${safe(ns.title)}</h3>
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
        <h3 class="heading-2 text-white">${safe(es.title, 'Upcoming Events')}</h3>
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
        <h3 class="heading-2 text-maroon-deep">${safe(dir.title)}</h3>
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
    <h3 class="heading-3 text-maroon-deep">${safe(d.visionTitle, 'Vision')}</h3>
    <p>${safe(d.visionText)}</p>
    <h3 class="heading-3 text-maroon-deep pt-4">${safe(d.missionTitle, 'Mission')}</h3>
    <ol class="list-decimal pl-5 space-y-2">${items}</ol>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Bishop ──────────────────────────────────────────────── */

function renderBishop(d = SiteData.bishop || {}) {
  const bishopImage = safe(d.image, 'https://placehold.co/800x1000/ece2cd/4a1420?text=Bishop+Portrait');
  const html = `
    <div class="grid md:grid-cols-[320px_1fr] gap-6 md:gap-8 items-start not-prose">
      <div class="flex flex-col gap-6">
        <div class="bg-parchment-dark border border-parchment-dark overflow-hidden rounded-md shadow-sm">
          <img src="${bishopImage}" alt="${safe(d.bannerTitle, 'Bishop portrait')}" class="w-full h-full object-cover aspect-[4/5]">
        </div>
        ${d.coatOfArms ? `
        <div class="bg-white border border-parchment-dark p-6 rounded-md shadow-sm flex flex-col items-center justify-center">
          <img src="${safe(d.coatOfArms)}" alt="Coat of Arms" class="w-40 h-auto object-contain">
          <span class="text-gold mt-4 text-xs font-semibold uppercase tracking-widest text-center">Coat of Arms</span>
        </div>` : ''}
      </div>
      <div class="space-y-4">${safe(d.content)}</div>
    </div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Former Bishops ──────────────────────────────────────── */

function renderFormerBishops(d = SiteData.formerBishops || {}) {
  setTimeout(async () => {
    try {
      const res = await fetch('database/api_bishops.php');
      const data = await res.json();
      const container = document.getElementById('bishops-container');
      if (!container) return;
      if (!data.ok) throw new Error(data.error);
      
      window.loadedBishops = data.bishops; // Store for modal access

      if (data.bishops.length === 0) {
        container.innerHTML = '<p class="text-ink-soft">No former bishops found.</p>';
        return;
      }

      const cards = data.bishops.map(b => {
        const photo = b.photo || 'https://placehold.co/600x800/ece2cd/4a1420?text=Former+Bishop';
        return `
          <button onclick="openBishopModal(${b.id})" class="text-left group relative bg-white border border-parchment-dark shadow-sm hover:shadow-md hover:border-gold transition-all duration-300 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold flex flex-col h-full">
            <div class="aspect-[4/5] w-full bg-parchment-dark overflow-hidden relative">
              <img src="${safe(photo)}" alt="${safe(b.full_name)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
              <div class="absolute inset-0 bg-maroon opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              ${b.coat_of_arms ? `<div class="absolute bottom-3 right-3 w-16 h-16 bg-white p-1.5 rounded-full shadow-md border border-parchment-dark flex items-center justify-center transition-transform group-hover:scale-110"><img src="${safe(b.coat_of_arms)}" alt="Coat of Arms" class="w-full h-full object-contain"></div>` : ''}
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="font-serif text-maroon-deep text-xl font-semibold mb-1 group-hover:text-maroon transition-colors">${safe(b.full_name)}</h3>
              <p class="text-ink-soft text-sm font-medium mb-4">${b.start_year} &mdash; ${b.end_year || 'Present'}</p>
              
              <div class="mt-auto pt-4 border-t border-parchment-dark flex items-center justify-between text-gold">
                <span class="text-[0.8125rem] font-sans font-semibold uppercase tracking-wider">Read Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </button>
        `;
      }).join('');
      
      // We use a grid instead of rows
      container.className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8';
      container.innerHTML = cards;
    } catch(e) {
      const container = document.getElementById('bishops-container');
      if (container) container.innerHTML = `<p class="text-red-600">Error loading bishops: ${e.message}</p>`;
    }
  }, 0);

  const html = `
    <div class="max-w-3xl mx-auto text-center mb-12">
      <p class="text-lg leading-relaxed">${safe(d.intro)}</p>
    </div>
    
    <div id="bishops-container" class="mt-8 text-center"><p class="text-ink-soft">Loading bishops...</p></div>
    
    <div id="bishop-modal-root"></div>
    
    <div class="mt-16 pt-8 border-t border-parchment-dark text-center">
      <p class="text-small text-ink-soft max-w-2xl mx-auto">${safe(d.note)}</p>
    </div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + `<section class="py-16 md:py-24 px-5 max-w-[1200px] mx-auto">${html}</section>`;
}

function closeBishopModal() {
  const root = document.getElementById('bishop-modal-root');
  if (root) root.innerHTML = '';
  document.body.style.overflow = '';
}

function openBishopModal(id) {
  const bishop = (window.loadedBishops || []).find(b => b.id == id);
  if (!bishop) return;
  
  const root = document.getElementById('bishop-modal-root');
  if (!root) return;
  
  const photo = bishop.photo || 'https://placehold.co/600x800/ece2cd/4a1420?text=Former+Bishop';
  
  // Conditionally render fields
  const renderField = (label, value) => {
    if (!value || String(value).trim() === '') return '';
    return `
      <div class="mb-4">
        <span class="block text-[0.75rem] font-sans font-semibold uppercase tracking-[0.1em] text-gold mb-1">${label}</span>
        <span class="block text-ink">${safe(value)}</span>
      </div>
    `;
  };

  const renderProse = (label, value) => {
    if (!value || String(value).trim() === '') return '';
    return `
      <div class="mt-8 border-t border-parchment-dark pt-6">
        <h4 class="font-serif text-maroon-deep text-xl font-semibold mb-3">${label}</h4>
        <div class="prose prose-sm prose-p:text-ink prose-p:leading-relaxed max-w-none">${safe(value).replace(/\n/g, '<br>')}</div>
      </div>
    `;
  };

  document.body.style.overflow = 'hidden';
  
  root.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-sm opacity-0 transition-opacity duration-300" id="bmodal-overlay" onclick="if(event.target === this) closeBishopModal()">
      <div class="bg-parchment w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative translate-y-4 transition-transform duration-300" id="bmodal-content">
        
        <button onclick="closeBishopModal()" class="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ink hover:bg-white hover:text-maroon transition shadow-sm focus:outline-none focus:ring-2 focus:ring-maroon" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="md:w-2/5 bg-parchment-dark relative shrink-0 flex flex-col justify-center items-center overflow-hidden">
          <div class="absolute inset-0">
            <img src="${safe(photo)}" alt="${safe(bishop.full_name)}" class="w-full h-full object-cover opacity-90">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-ink/70"></div>
          </div>
          ${bishop.coat_of_arms ? `<div class="relative z-10 p-6 flex flex-col items-center justify-center mt-auto w-full"><img src="${safe(bishop.coat_of_arms)}" alt="Coat of Arms" class="w-40 h-40 object-contain drop-shadow-xl"><p class="text-gold-light mt-3 text-sm tracking-widest uppercase font-semibold">Coat of Arms</p></div>` : ''}
          <!-- Mobile header overlay -->
          <div class="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20">
            <h2 class="font-serif text-3xl font-semibold text-white mb-1">${safe(bishop.full_name)}</h2>
            <p class="text-gold-light font-medium">${bishop.start_year} &mdash; ${bishop.end_year || 'Present'}</p>
          </div>
        </div>
        
        <div class="md:w-3/5 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-white">
          <div class="hidden md:block mb-8 pb-6 border-b border-parchment-dark">
            <h2 class="font-serif text-4xl font-semibold text-maroon-deep mb-2">${safe(bishop.full_name)}</h2>
            <p class="text-gold font-medium text-lg">${bishop.start_year} &mdash; ${bishop.end_year || 'Present'}</p>
          </div>
          
          <div class="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            ${renderField('Date of Birth', bishop.dob)}
            ${renderField('Place of Birth', bishop.pob)}
            ${renderField('Date of Ordination', bishop.ordination_date)}
            ${renderField('Episcopal Motto', bishop.episcopal_motto)}
          </div>
          
          ${renderProse('Biography', bishop.biography)}
          ${renderProse('Pastoral Contributions', bishop.contributions)}
          
        </div>
      </div>
    </div>
  `;
  
  // Trigger animations
  setTimeout(() => {
    document.getElementById('bmodal-overlay').classList.remove('opacity-0');
    document.getElementById('bmodal-content').classList.remove('translate-y-4');
  }, 10);
}

/* ── Clergy ──────────────────────────────────────────────── */

function renderClergy(d = SiteData.clergy || {}) {
  const published = (d.members || []).filter(c => c && c.status !== 'draft');
  const rows = published.length > 0
    ? published.map(c => clergyRowHTML(c)).join('')
    : `<div class="text-center py-12 text-ink-soft"><p class="text-base">No clergy directory records currently published.</p></div>`;
  const html = `<div class="divide-y divide-parchment-dark border-t border-b border-parchment-dark not-prose">${rows}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Parishes ────────────────────────────────────────────── */

function renderParishes(d = SiteData.parishes || {}) {
  const published = (d.parishes || []).filter(p => p && p.status !== 'draft');
  const cards = published.length > 0
    ? published.map(p => parishCardHTML(p)).join('')
    : `<div class="sm:col-span-2 text-center py-12 text-ink-soft"><p class="text-base">No parishes currently published.</p></div>`;
  const html = `<div class="grid sm:grid-cols-2 gap-6 not-prose">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Parish Detail ───────────────────────────────────────── */

function renderParishDetail() {
  const id = new URLSearchParams(window.location.search).get('id');
  const parishes = ((SiteData.parishes || {}).parishes || []).filter(p => p && p.status !== 'draft');
  const parish = parishes.find(p => String(p.id) === String(id)) || parishes[0];

  if (!parish) {
    const html = `
      <div class="text-center py-12 not-prose">
        <h3 class="heading-2 text-maroon-deep mb-3">Parish Record Not Found</h3>
        <p class="text-ink-soft mb-6">The requested parish record could not be found or has not been published.</p>
        <a href="parishes.html" class="btn py-3 px-6 rounded-sm bg-maroon text-white hover:bg-maroon-deep inline-block">&larr; Return to Parish Directory</a>
      </div>`;
    return renderPageBanner('Parishes', 'Parish Directory') + renderProseSection(html);
  }

  const photo = safe(parish.photo, 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo');
  const html = `
    <div class="not-prose max-w-4xl mx-auto">
      <div class="mb-6">
        <a href="parishes.html" class="inline-flex items-center gap-2 eyebrow text-maroon hover:text-maroon-deep mb-4">&larr; Back to Parish Directory</a>
        <h1 class="heading-1 text-maroon-deep mb-2">${safe(parish.name)}</h1>
        <p class="text-base text-gold font-medium">${safe(parish.town)}${parish.vicariate ? ' &middot; ' + safe(parish.vicariate) : ''}</p>
      </div>

      <div class="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-8">
        <div class="rounded-xl overflow-hidden border border-parchment-dark shadow-sm bg-parchment-dark aspect-[16/10]">
          <img src="${photo}" alt="${safe(parish.name)}" class="w-full h-full object-cover">
        </div>
        <div class="bg-parchment/60 border border-parchment-dark rounded-xl p-6 space-y-4">
          <h4 class="font-serif text-maroon-deep text-xl font-semibold border-b border-parchment-dark pb-3">Parish Information</h4>
          <div>
            <span class="block text-[0.75rem] font-sans font-semibold uppercase tracking-[0.1em] text-gold mb-0.5">Parish Priest</span>
            <span class="text-ink font-medium">${safe(parish.priest, 'To be announced')}</span>
          </div>
          <div>
            <span class="block text-[0.75rem] font-sans font-semibold uppercase tracking-[0.1em] text-gold mb-0.5">Vicariate</span>
            <span class="text-ink font-medium">${safe(parish.vicariate, '—')}</span>
          </div>
          <div>
            <span class="block text-[0.75rem] font-sans font-semibold uppercase tracking-[0.1em] text-gold mb-0.5">Town / Municipality</span>
            <span class="text-ink font-medium">${safe(parish.town, '—')}</span>
          </div>
          <div>
            <span class="block text-[0.75rem] font-sans font-semibold uppercase tracking-[0.1em] text-gold mb-0.5">Address</span>
            <span class="text-ink font-medium">${safe(parish.address, '—')}</span>
          </div>
        </div>
      </div>

      <div class="pt-6 border-t border-parchment-dark">
        <a href="parishes.html" class="eyebrow text-maroon border-b border-gold">&larr; Back to All Parishes</a>
      </div>
    </div>`;

  return renderPageBanner('Parishes of Boac', parish.name) + renderProseSection(html);
}

/* ── Curia ───────────────────────────────────────────────── */

function renderCuria(d = SiteData.curia || {}) {
  let offices = d.offices || [];
  if (typeof offices === 'string') {
    try { offices = JSON.parse(offices); } catch(e) { offices = []; }
  }
  const cards = Array.isArray(offices) ? offices.map(o => {
    const photo = safe(o.photo, 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo');
    return `<div class="border border-parchment-dark overflow-hidden bg-white rounded-md shadow-sm">
      <div class="h-40 bg-parchment-dark"><img src="${photo}" alt="${safe(o.name, 'Curia office')}" class="w-full h-full object-cover"></div>
      <div class="p-4"><h4 class="heading-3 text-maroon-deep mb-1">${safe(o.name)}</h4><p class="text-small max-w-[65ch] text-ink-soft">${safe(o.description)}</p></div>
    </div>`;
  }).join('') : '';
  const html = `<p class="leading-relaxed text-base">${safe(d.intro)}</p><div class="grid sm:grid-cols-2 gap-4 mt-6">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── News ────────────────────────────────────────────────── */

function renderNews(d = SiteData.news || {}) {
  const published = (d.articles || []).filter(n => n && n.status !== 'draft');
  const cards = published.length > 0
    ? published.map(n => newsCardPageHTML(n)).join('')
    : `<div class="sm:col-span-2 text-center py-12 text-ink-soft"><p class="text-base">No announcements currently published.</p></div>`;
  const html = `<div class="grid sm:grid-cols-2 gap-6 not-prose">${cards}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── News Detail ─────────────────────────────────────────── */

function renderNewsDetail() {
  const id = new URLSearchParams(window.location.search).get('id');
  const articles = ((SiteData.news || {}).articles || []).filter(n => n && n.status !== 'draft');
  const article = articles.find(n => String(n.id) === String(id)) || articles[0];

  if (!article) {
    const html = `
      <div class="text-center py-12 not-prose">
        <h3 class="heading-2 text-maroon-deep mb-3">Announcement Not Found</h3>
        <p class="text-ink-soft mb-6">The requested announcement could not be found or has not been published.</p>
        <a href="news.html" class="btn py-3 px-6 rounded-sm bg-maroon text-white hover:bg-maroon-deep inline-block">&larr; Return to Announcements</a>
      </div>`;
    return renderPageBanner('Announcements', 'Announcement Details') + renderProseSection(html);
  }

  const html = `
    <div class="not-prose max-w-3xl mx-auto">
      <div class="mb-6">
        <a href="news.html" class="inline-flex items-center gap-2 eyebrow text-maroon hover:text-maroon-deep mb-4">&larr; Back to All Announcements</a>
        <div class="flex items-center gap-3 text-sm text-ink-soft mb-2">
          <span class="eyebrow text-gold">${fmtDate(article.date)}</span>
        </div>
        <h1 class="heading-1 text-maroon-deep mb-6">${safe(article.title)}</h1>
      </div>
      ${article.image ? `
      <div class="mb-8 rounded-lg overflow-hidden border border-parchment-dark shadow-sm bg-parchment-dark max-h-[480px]">
        <img src="${safe(article.image)}" alt="${safe(article.title)}" class="w-full h-full object-cover">
      </div>` : ''}
      <div class="text-ink text-base sm:text-lg leading-relaxed space-y-4">
        ${article.body ? article.body.split('\n').filter(p => p.trim()).map(p => `<p>${safe(p)}</p>`).join('') : '<p>No details provided.</p>'}
      </div>
      <div class="mt-12 pt-6 border-t border-parchment-dark">
        <a href="news.html" class="eyebrow text-maroon border-b border-gold">&larr; Back to All Announcements</a>
      </div>
    </div>`;

  return renderPageBanner('Diocesan News', article.title) + renderProseSection(html);
}

/* ── Events ──────────────────────────────────────────────── */

function renderEvents(d = SiteData.events || {}) {
  const allEvents = (d.events || []).filter(e => e && e.status !== 'draft');
  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = allEvents.filter(e => !e.date || e.date >= todayStr).sort((a,b) => (a.date||'').localeCompare(b.date||''));
  const past = allEvents.filter(e => e.date && e.date < todayStr).sort((a,b) => (b.date||'').localeCompare(a.date||''));

  let html = '';
  if (upcoming.length === 0 && past.length === 0) {
    html = `<div class="text-center py-12 text-ink-soft"><p class="text-base">No events currently scheduled.</p></div>`;
  } else {
    if (upcoming.length > 0) {
      const upRows = upcoming.map(e => eventRowPageHTML(e, false)).join('');
      html += `
        <div class="mb-10">
          <h3 class="heading-3 text-maroon-deep mb-4 flex items-center gap-2">
            <span>Upcoming Diocesan Events</span>
            <span class="badge bg-gold/20 text-maroon-deep text-xs px-2.5 py-0.5 rounded-full font-sans font-semibold">${upcoming.length}</span>
          </h3>
          <div class="divide-y divide-parchment-dark border-t border-b border-parchment-dark not-prose">${upRows}</div>
        </div>`;
    }
    if (past.length > 0) {
      const pastRows = past.map(e => eventRowPageHTML(e, true)).join('');
      html += `
        <div class="mt-12 pt-8 border-t border-parchment-dark">
          <h3 class="heading-3 text-ink-soft mb-4 flex items-center gap-2">
            <span>Past Events</span>
            <span class="badge bg-parchment-dark text-ink-soft text-xs px-2.5 py-0.5 rounded-full font-sans font-semibold">${past.length}</span>
          </h3>
          <div class="divide-y divide-parchment-dark border-t border-b border-parchment-dark not-prose opacity-80">${pastRows}</div>
        </div>`;
    }
  }

  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Gallery ─────────────────────────────────────────────── */

function renderGallery(d = SiteData.gallery || {}) {
  const featuredImage = safe(d.image, 'https://placehold.co/1200x700/ece2cd/4a1420?text=Gallery+Photo');
  let images = d.images || [];
  if (typeof images === 'string') {
    try { images = JSON.parse(images); } catch(e) { images = []; }
  }
  const publishedImages = Array.isArray(images) ? images.filter(img => img && img.status !== 'draft') : [];
  const imgs = publishedImages.length > 0
    ? publishedImages.map(img => `<img src="${safe(img.src)}" alt="${safe(img.alt, 'Photo')}" class="w-full aspect-square object-cover rounded-md border border-parchment-dark">`).join('')
    : `<div class="col-span-2 sm:col-span-3 text-center py-12 text-ink-soft"><p class="text-base">No photos currently available in the gallery.</p></div>`;

  const html = `
    <div class="mb-6 not-prose">
      <img src="${featuredImage}" alt="${safe(d.bannerTitle, 'Gallery photo')}" class="w-full h-[260px] sm:h-[360px] object-cover rounded-xl border border-parchment-dark shadow-sm">
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose">${imgs}</div>`;
  return renderPageBanner(d.eyebrow, d.bannerTitle) + renderProseSection(html);
}

/* ── Bulletins ───────────────────────────────────────────── */

function renderBulletins(d = SiteData.bulletins || {}) {
  const bulletinImage = safe(d.image, 'https://placehold.co/900x600/ece2cd/4a1420?text=Bulletin+Photo');
  const html = `
    <div class="grid md:grid-cols-[1fr_0.9fr] gap-6 md:gap-8 items-start not-prose">
      <div class="bg-parchment-dark border border-parchment-dark overflow-hidden rounded-lg shadow-sm">
        <img src="${bulletinImage}" alt="${safe(d.bannerTitle, 'Bulletin photo')}" class="w-full h-full object-cover aspect-[16/10]">
      </div>
      <div class="space-y-4">
        <p class="italic text-lg text-ink leading-relaxed">${safe(d.message)}</p>
        <p class="text-small font-serif font-semibold text-maroon-deep max-w-[65ch]">${safe(d.author)}</p>
        <p class="pt-4 max-w-[65ch]"><a href="${safe(d.ctaHref, 'events.html')}" class="eyebrow text-maroon border-b border-gold">${safe(d.ctaLabel, 'View the Diocesan Calendar &rarr;')}</a></p>
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

/* ── Privacy Policy ──────────────────────────────────────── */

function renderPrivacy(d = SiteData.privacy || {}) {
  const html = `
    <h3 class="heading-3 text-maroon-deep">${safe(d.title, 'Privacy Policy')}</h3>
    <p class="whitespace-pre-line leading-relaxed">${safe(d.body)}</p>`;
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
  // Handled cleanly during loadPageSnapshot
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
  parishDetail: renderParishDetail,
  curia: renderCuria,
  news: renderNews,
  newsDetail: renderNewsDetail,
  events: renderEvents,
  gallery: renderGallery,
  bulletins: renderBulletins,
  contact: renderContact,
  privacy: renderPrivacy,
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
    parishDetail: 'Parish Details | Diocese of Boac',
    curia: (SiteData.curia || {}).pageTitle,
    news: (SiteData.news || {}).pageTitle,
    newsDetail: 'Announcement | Diocese of Boac',
    events: (SiteData.events || {}).pageTitle,
    gallery: (SiteData.gallery || {}).pageTitle,
    bulletins: (SiteData.bulletins || {}).pageTitle,
    contact: (SiteData.contact || {}).pageTitle,
    privacy: (SiteData.privacy || {}).pageTitle,
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
