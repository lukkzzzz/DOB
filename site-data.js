/* ============================================================
   Diocese of Boac — Single Source of Truth
   ============================================================
   Every page loads this file first.  Edit the SiteData object
   below to change content across the entire public website.

   The admin panel (admin.html) can also override values via
   persistent storage — those overrides take priority at render
   time (handled by renderer.js).
   ============================================================ */

const SiteData = {

  /* ── Global site meta ─────────────────────────────────── */
  site: {
    name: 'Diocese of Boac',
    subtitle: 'Official Diocesan Website',
    logoUrl: 'https://scontent.fmnl7-1.fna.fbcdn.net/v/t39.30808-6/490021778_4069473220042983_7205200907177214759_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGZ-ubotmnTtGeralBsySXduWcAdAkmU125ZwB0CSZTXeHcXM42VmFEaetIL_d2oZOrGIbDOsKuul1pChEAAYm6&_nc_ohc=xZIoE43t1nUQ7kNvwEGEbmJ&_nc_oc=Ado5kpreyQVB7_2HktJZynzDUeIZFrKyMe85d-fzYYx5dr7RStrCvBq8cHKecNC1WHE&_nc_zt=23&_nc_ht=scontent.fmnl7-1.fna&_nc_gid=5rwExUF7pZD61YXw9KBegg&_nc_ss=7b2a8&oh=00_AQH_ypNEv3DmZNKUGczr2wh_Uv4yERgOM3NjVIbwo0dVsQ&oe=6A714946',
    utilityBarAddress: 'Sacred Heart Pastoral Center &middot; Boac, 4900 Marinduque',
    socialLinks: [
      { label: 'Facebook', url: '#' },
      { label: 'YouTube', url: '#' },
      { label: 'Instagram', url: '#' },
    ],
    contactUrl: 'contact.html',
    adminUrl: 'admin.html',
  },

  /* ── Navigation ────────────────────────────────────────── */
  navbar: {
    items: [
      {
        label: 'Diocesan Info',
        children: [
          { label: 'History', href: 'history.html' },
          { label: 'Vision &amp; Mission', href: 'vision-mission.html' },
          { label: 'Bishop of Boac', href: 'bishop.html' },
          { label: 'Former Bishops', href: 'former-bishops.html' },
          { label: 'Curia', href: 'curia.html' },
        ],
      },
      {
        label: 'Bulletin',
        children: [
          { label: 'Message from the Bishop', href: 'bulletin.html' },
          { label: 'Events', href: 'events.html' },
        ],
      },
      { label: 'News', href: 'news.html' },
      {
        label: 'Directories',
        children: [
          { label: 'Parishes', href: 'parishes.html' },
          { label: 'Clergy Directory', href: 'clergy.html' },
        ],
      },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'Contact', href: 'contact.html' },
    ],
  },

  /* ── Homepage ──────────────────────────────────────────── */
  homepage: {
    hero: {
      eyebrow: 'The Roman Catholic Diocese of Boac &middot; Province of Marinduque',
      headline: 'Walking together in faith, hope, and service',
      subtext: "Here you'll find news from our 14 parishes, the Bishop's messages, our diocesan calendar, and resources to support your spiritual journey &mdash; under the patronage of Mahal na Birhen ng Biglang-Awa. We're glad you're here.",
      backgroundImage: "https://scontent.fmnl7-2.fna.fbcdn.net/v/t39.30808-6/564146656_1209898961169868_8284938886832531500_n.jpg?stp=dst-jpg_tt6&cstp=mx2880x1296&ctp=s2880x1296&_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFq6zZrWI2KKAlZ9gD4FvMjQhvTqmR2EQRCG9OqZHYRBJCIZnG58exeBh07J13UUE7r_DwXaxZctPeFBaG_Kxls&_nc_ohc=u_VKDHjSZbsQ7kNvwGTJgMH&_nc_oc=AdqKdR_6XH8Yj_F94B2ccrBooAfax6Sq9P13WMuDp4KyaX5lizk77xkNtD-LVafuMys&_nc_zt=23&_nc_ht=scontent.fmnl7-2.fna&_nc_gid=Xiv8qJVmjDwDFbi8HEHuLg&_nc_ss=7b2a8&oh=00_AQG95Rp57frbkgvs_RugWSUbqCd7sXh_SyhBv5EUDJ2V7A&oe=6A711A18",
      buttons: [
        { label: 'Find a Parish', href: 'parishes.html', style: 'primary' },
        { label: 'Upcoming Events', href: 'events.html', style: 'outline' },
      ],
    },
    liturgical: {
      date: '',
      season: 'Ordinary Time &mdash; Liturgical color: Green',
    },
    vision: {
      eyebrow: 'Vision',
      title: 'A people rooted in Christ, alive in service',
      text: 'We aspire to be a God-loving, life-giving, and responsible Christian community &mdash; disciples of Christ and a Church of the poor, engaged in building a renewed society, under the patronage of Our Lady.',
    },
    mission: {
      eyebrow: 'Mission',
      title: 'Our shared commitments',
      items: [
        'Forming priests, religious, and lay faithful in continuing discipleship.',
        'Strengthening small Christian communities grounded in the Word and the Church\u2019s teaching.',
        'Establishing programs that serve the diocese, vicariates, and parishes alike.',
        'Responding with Christian compassion to changes facing families and society.',
      ],
    },
    newsSection: {
      eyebrow: 'Diocesan Media',
      title: 'Recent News',
    },
    eventsSection: {
      eyebrow: 'Diocesan Calendar',
      title: 'Upcoming Events',
    },
    directories: {
      eyebrow: 'Explore',
      title: 'What would you like to check?',
      items: [
        { number: '01', href: 'parishes.html', title: 'Parishes', description: 'Find any of our 14 parishes across Marinduque, by town or vicariate.' },
        { number: '02', href: 'clergy.html', title: 'Clergy Directory', description: 'Priests and their current parish assignments.' },
        { number: '03', href: 'curia.html', title: 'Pastoral Plans', description: 'Our diocesan plans for evangelization and formation.' },
        { number: '04', href: 'gallery.html', title: 'Gallery', description: 'Photos from diocesan celebrations and events.' },
      ],
    },
  },

  /* ── History page ──────────────────────────────────────── */
  history: {
    pageTitle: 'History | Diocese of Boac',
    eyebrow: 'Diocesan Info',
    bannerTitle: 'History',
    image: 'https://placehold.co/1200x700/ece2cd/4a1420?text=History+Photo',
    content: '<p>The Diocese of Boac was canonically erected to shepherd the Catholic faithful of the island province of Marinduque, established as a suffragan see of the Archdiocese of Lipa. Since its founding, the diocese has grown from a handful of parishes into the fourteen parish communities that serve the province today.</p><p>Its story is inseparable from the story of Marinduque itself &mdash; an island whose Catholic identity was shaped by centuries of missionary work, local devotion, and the enduring witness of its clergy and laity through wars, calamities, and renewal.</p><p>The diocese\u2019s cathedral, the Immaculate Conception Cathedral in Boac, has stood as the spiritual center of this local Church, hosting ordinations, diocesan celebrations, and the annual devotions to the diocese\u2019s principal patroness, Mahal na Birhen ng Biglang-Awa.</p><p><em>This page is a placeholder. Replace it with the diocese\u2019s official, verified historical account &mdash; including the exact date of canonical erection, founding bishop, and key milestones &mdash; sourced from diocesan archives.</em></p>',
  },

  /* ── Vision & Mission page ─────────────────────────────── */
  visionMission: {
    pageTitle: 'Vision & Mission | Diocese of Boac',
    eyebrow: 'Diocesan Info',
    bannerTitle: 'Vision &amp; Mission',
    visionTitle: 'Vision',
    visionText: 'A God-loving, life-giving, and responsible Christian community &mdash; disciples of Christ and a Church of the poor, engaged in building a renewed society, under the patronage of Our Lady.',
    missionTitle: 'Mission',
    missionItems: [
      'Forming priests, religious, and lay faithful in continuing discipleship.',
      'Strengthening small Christian communities grounded in the Word and the Church\u2019s teaching.',
      'Establishing programs that serve the diocese, vicariates, and parishes alike.',
      'Responding with Christian compassion to changes facing families and society.',
    ],
  },

  /* ── Bishop page ───────────────────────────────────────── */
  bishop: {
    pageTitle: 'Bishop of Boac | Diocese of Boac',
    eyebrow: 'Diocesan Info',
    bannerTitle: 'Bishop of Boac',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/9c1196252919043.6a5b3a5f1336a.jpg',
    content: '<p>The Bishop of Boac serves as the chief shepherd of the diocese, entrusted with the pastoral care of its clergy, religious, and lay faithful across the fourteen parishes of Marinduque.</p><p><strong>Placeholder fields to complete:</strong></p><ul class="list-disc pl-5 space-y-2"><li>Full name and episcopal title</li><li>Date and place of birth</li><li>Date of priestly ordination</li><li>Date of episcopal ordination / installation as Bishop of Boac</li><li>Episcopal motto</li><li>Coat of arms</li><li>Pastoral priorities and formation background</li></ul><p><em>Add an official portrait and biography once confirmed with the diocesan chancery. Do not publish unverified names or dates.</em></p>',
  },

  /* ── Former Bishops page ───────────────────────────────── */
  formerBishops: {
    pageTitle: 'Former Bishops | Diocese of Boac',
    eyebrow: 'Diocesan Info',
    bannerTitle: 'Former Bishops',
    intro: 'A chronological list of the diocese\u2019s past bishops will be presented here, with their years of service and a brief note on their pastoral contributions.',
    note: '<em>Replace with the verified succession of bishops from diocesan records.</em>',
    bishops: [
      { name: '[Name of Bishop]', years: 'Years of Service &mdash; TBD', photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/77e2c226081293.5634f4ef71ded.jpg' },
      { name: '[Name of Bishop]', years: 'Years of Service &mdash; TBD', photo: 'https://placehold.co/600x800/ece2cd/4a1420?text=Former+Bishop' },
      { name: '[Name of Bishop]', years: 'Years of Service &mdash; TBD', photo: 'https://placehold.co/600x800/ece2cd/4a1420?text=Former+Bishop' },
    ],
  },

  /* ── Clergy Directory page ─────────────────────────────── */
  clergy: {
    pageTitle: 'Clergy Directory | Diocese of Boac',
    eyebrow: 'Directories',
    bannerTitle: 'Clergy Directory',
    members: [
      { name: 'Bishop of Boac', role: 'Diocesan Bishop', assignment: '', photo: 'https://placehold.co/600x800/ece2cd/4a1420?text=Clergy+Portrait' },
      { name: '[Vicar General]', role: '', assignment: 'Chancery, Boac', photo: 'https://placehold.co/600x800/ece2cd/4a1420?text=Clergy+Portrait' },
    ],
  },

  /* ── Parishes page ─────────────────────────────────────── */
  parishes: {
    pageTitle: 'Parishes | Diocese of Boac',
    eyebrow: 'Directories',
    bannerTitle: 'Parishes',
    parishes: [
      { name: 'Immaculate Conception Cathedral Parish', town: 'Boac, Marinduque', vicariate: '', priest: '', photo: 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo' },
      { name: 'Sta. Cruz Parish', town: 'Sta. Cruz, Marinduque', vicariate: '', priest: '', photo: 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo' },
      { name: 'Gasan Parish', town: 'Gasan, Marinduque', vicariate: '', priest: '', photo: 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo' },
      { name: '[Add remaining parishes]', town: '14 parishes total across the diocese.', vicariate: '', priest: '', photo: 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo' },
    ],
  },

  /* ── Curia page ────────────────────────────────────────── */
  curia: {
    pageTitle: 'Curia | Diocese of Boac',
    eyebrow: 'Diocesan Info',
    bannerTitle: 'Curia',
    intro: 'The Diocesan Curia is the body of offices that assists the Bishop in the administration and pastoral governance of the diocese.',
    offices: [
      { name: 'Chancery Office', description: 'Records, correspondence, and official diocesan documents.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
      { name: 'Diocesan Tribunal', description: 'Handles canonical and marriage cases.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
      { name: 'Finance Office', description: 'Stewardship of diocesan financial and temporal resources.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
      { name: 'Clergy Office', description: 'Assignment and formation support for diocesan priests.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
      { name: 'Social Action Center', description: 'Coordinates charitable and community outreach programs.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
      { name: 'Communications Office', description: 'Manages diocesan media, website, and public announcements.', photo: 'https://placehold.co/600x420/ece2cd/4a1420?text=Office+Photo' },
    ],
  },

  /* ── News page ─────────────────────────────────────────── */
  news: {
    pageTitle: 'News | Diocese of Boac',
    eyebrow: 'Diocesan Media',
    bannerTitle: 'News',
    articles: [
      { date: '2026-07-28', title: 'Diocese launches parish-wide catechetical renewal program', body: '', image: 'https://placehold.co/600x400/ece2cd/4a1420?text=News+Thumbnail+1' },
      { date: '2026-07-24', title: 'Clergy gather for monthly recollection and fellowship', body: '', image: 'https://placehold.co/600x400/ece2cd/4a1420?text=News+Thumbnail+2' },
      { date: '2026-07-21', title: 'Lay ministry marks its anniversary with a diocesan Mass', body: '', image: 'https://placehold.co/600x400/ece2cd/4a1420?text=News+Thumbnail+3' },
    ],
  },

  /* ── Events page ───────────────────────────────────────── */
  events: {
    pageTitle: 'Events | Diocese of Boac',
    eyebrow: 'Diocesan Calendar',
    bannerTitle: 'Upcoming Events',
    events: [
      { date: '2026-08-04', title: 'Diocesan Lay Formation Retreat', description: 'A day of prayer and formation for parish lay coordinators.', image: 'https://placehold.co/600x420/ece2cd/4a1420?text=Event+Photo' },
      { date: '2026-08-15', title: 'Feast of the Assumption &mdash; Diocesan Mass', description: 'Celebrated at the Cathedral, presided by the Bishop.', image: 'https://placehold.co/600x420/ece2cd/4a1420?text=Event+Photo' },
      { date: '2026-09-02', title: 'Clergy Recollection and Assembly', description: 'Monthly gathering of priests for prayer and fraternity.', image: 'https://placehold.co/600x420/ece2cd/4a1420?text=Event+Photo' },
    ],
  },

  /* ── Gallery page ──────────────────────────────────────── */
  gallery: {
    pageTitle: 'Gallery | Diocese of Boac',
    eyebrow: 'Media',
    bannerTitle: 'Gallery',
    image: 'https://placehold.co/1200x700/ece2cd/4a1420?text=Gallery+Photo',
    images: [
      { src: 'https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-9/53005027_102292880930601_2099163569407918080_n.jpg?stp=dst-jpg_tt6&cstp=mx918x918&ctp=s918x918&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFbtvZiu5GQXjnuJpRkitoCid9Ny8KovCCJ303Lwqi8IAooYOG6WMR0tixhnE1BOyOEUzZu3CqpDVbskWdBPRCH&_nc_ohc=pkMCemZxeDoQ7kNvwGyYFbk&_nc_oc=AdrUBaQZUNeGpcVfP3aV46R7sDcZlcCYUCQYySjVwKxvtLWYTFsSJ-oJyHhRKQ7ZHX0&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=Om603EXNpI6EFwVp244fgA&_nc_ss=7b2a8&oh=00_AQEUMhLLkwPJdFeXZSiBvryfiShW213RhYJxo_UTTcYwvA&oe=6A9584BC', alt: 'Diocesan celebration' },
      { src: 'https://placehold.co/400x300/ece2cd/4a1420?text=Photo', alt: 'Photo' },
      { src: 'https://placehold.co/400x300/ece2cd/4a1420?text=Photo', alt: 'Photo' },
    ],
  },

  /* ── Bulletin page ─────────────────────────────────────── */
  bulletins: {
    pageTitle: 'Bulletin | Diocese of Boac',
    eyebrow: 'Bulletin',
    bannerTitle: 'Message from the Bishop',
    image: 'https://placehold.co/900x600/ece2cd/4a1420?text=Bulletin+Photo',
    message: '"[Placeholder for the Bishop\'s current pastoral letter or weekly message. Replace this text with the actual message once provided by the diocesan communications office.]"',
    author: '&mdash; Bishop of Boac',
    ctaLabel: 'View the Diocesan Calendar &rarr;',
    ctaHref: 'events.html',
  },

  /* ── Contact page ──────────────────────────────────────── */
  contact: {
    pageTitle: 'Contact | Diocese of Boac',
    eyebrow: 'Get in Touch',
    bannerTitle: 'Contact',
    address: 'Sacred Heart Pastoral Center, Boac, 4900 Marinduque',
    email: 'info@dioceseofboac.com',
    phone: '(042) 332-1014',
  },

  /* ── Privacy Policy page ───────────────────────────────── */
  privacy: {
    pageTitle: 'Privacy Policy | Diocese of Boac',
    eyebrow: 'Legal',
    bannerTitle: 'Privacy Policy',
    title: 'Privacy Policy',
    body: 'We respect the privacy of visitors to the Diocese of Boac website and are committed to handling personal information responsibly.\n\nWe collect only the information necessary to respond to inquiries, maintain contact records, and improve the experience of visiting the site.\n\nIf you submit a form, request information, or communicate by email, we may retain your name, email address, and message content for administrative follow-up, diocesan service, or compliance purposes.\n\nWe do not sell or rent personal information to third parties. Information may be shared only with diocesan staff, authorized ministries, or service providers who assist us in operating the website and related communication channels, as needed.\n\nBy using this website, you agree that the Diocese may use cookies or similar tools for analytics, security, and site performance, and may review log data to help maintain the site.\n\nIf you have questions about this policy or would like to request access, correction, or deletion of your personal information, please contact the diocesan office using the details listed on our Contact page.',
  },

  /* ── Footer ────────────────────────────────────────────── */
  footer: {
    logoUrl: 'https://scontent.fmnl7-1.fna.fbcdn.net/v/t39.30808-6/490021778_4069473220042983_7205200907177214759_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGZ-ubotmnTtGeralBsySXduWcAdAkmU125ZwB0CSZTXeHcXM42VmFEaetIL_d2oZOrGIbDOsKuul1pChEAAYm6&_nc_ohc=xZIoE43t1nUQ7kNvwEGEbmJ&_nc_oc=Ado5kpreyQVB7_2HktJZynzDUeIZFrKyMe85d-fzYYx5dr7RStrCvBq8cHKecNC1WHE&_nc_zt=23&_nc_ht=scontent.fmnl7-1.fna&_nc_gid=5rwExUF7pZD61YXw9KBegg&_nc_ss=7b2a8&oh=00_AQH_ypNEv3DmZNKUGczr2wh_Uv4yERgOM3NjVIbwo0dVsQ&oe=6A714946',
    name: 'Diocese of Boac',
    addressLine1: 'Sacred Heart Pastoral Center',
    addressLine2: 'Boac, 4900 Marinduque, Philippines',
    email: 'Email: info@dioceseofboac.com',
    phone: 'Phone: (042) 332-1014',
    infoLinks: [
      { label: 'History', href: 'history.html' },
      { label: 'Bishop', href: 'bishop.html' },
      { label: 'Curia', href: 'curia.html' },
      { label: 'Privacy Policy', href: 'privacy.html' },
    ],
    socialLinks: [
      { label: 'Facebook', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
    ],
    copyright: '&copy; 2026 Diocese of Boac. Template design.',
    version: 'v1.0.0',
  },
};


/* ============================================================
   Admin / Storage helpers  (used by admin.html)
   ============================================================ */

const DKEYS = {
  site: 'content:site',
  navbar: 'content:navbar',
  footer: 'content:footer',
  home: 'content:home',
  history: 'content:history',
  bishop: 'content:bishop',
  visionMission: 'content:vision-mission',
  formerBishops: 'content:former-bishops',
  curia: 'content:curia',
  bulletin: 'content:bulletin',
  seminaries: 'content:seminaries',
  gallery: 'content:gallery',
  contact: 'content:contact',
  privacy: 'content:privacy',
  news: 'list:news',
  events: 'list:events',
  parishes: 'list:parishes',
  clergy: 'list:clergy',
};

const memoryStorage = {};

const fallbackStorage = {
  async get(key){
    try{
      if (typeof localStorage !== 'undefined' && localStorage.getItem) {
        const value = localStorage.getItem(key);
        return value === null ? null : { value };
      }
    }catch(e){}

    if (memoryStorage[key] === undefined) return null;
    return { value: memoryStorage[key] };
  },
  async set(key, value){
    try{
      if (typeof localStorage !== 'undefined' && localStorage.setItem) {
        localStorage.setItem(key, value);
        return true;
      }
    }catch(e){}

    memoryStorage[key] = value;
    return true;
  },
  async delete(key){
    try{
      if (typeof localStorage !== 'undefined' && localStorage.removeItem) {
        localStorage.removeItem(key);
        return true;
      }
    }catch(e){}

    delete memoryStorage[key];
    return true;
  }
};

const appStorage = (window.storage && typeof window.storage.get === 'function') ? window.storage : fallbackStorage;

async function dGet(key){
  try{
    const r = await appStorage.get(key, true);
    return r && r.value ? JSON.parse(r.value) : null;
  }catch(e){ return null; }
}
async function dSet(key, value){
  return await appStorage.set(key, JSON.stringify(value), true);
}
async function dDelete(key){
  try{ return await appStorage.delete(key, true); }catch(e){ return null; }
}

function textToParagraphs(text){
  return text.split('\n').filter(l => l.trim().length).map(l => `<p>${l}</p>`).join('');
}

/* Card / row templates (used by both renderer.js and admin.html) */

const fmtDate = d => {
  try{ return new Date(d+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}); }
  catch(e){ return d; }
};

function newsCardHTML(n){
  return `<article class="bg-white border border-parchment-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col">
    <div class="h-44 sm:h-48 relative overflow-hidden bg-parchment-dark">
      <img src="${n.image || 'https://placehold.co/600x400/ece2cd/4a1420?text=News'}" alt="${n.title || 'News'}" class="w-full h-full object-cover">
    </div>
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <span class="font-mono text-[0.7rem] tracking-[0.06em] text-gold uppercase">${fmtDate(n.date)}</span>
        <h4 class="font-fraunces font-semibold text-maroon-deep leading-tight text-base sm:text-[1.08rem] my-2">${n.title || ''}</h4>
      </div>
      <a href="news.html" class="font-mono text-[0.72rem] tracking-[0.06em] uppercase text-maroon border-b border-gold self-start mt-3">Read More</a>
    </div>
  </article>`;
}

function newsCardPageHTML(n){
  return `<article class="border border-parchment-dark">
    <div class="h-40 bg-parchment-dark"><img src="${n.image || 'https://placehold.co/600x400/ece2cd/4a1420?text=News'}" alt="${n.title || 'News'}" class="w-full h-full object-cover"></div>
    <div class="p-4"><span class="font-mono text-xs text-gold uppercase">${fmtDate(n.date)}</span><h4 class="font-fraunces font-semibold text-maroon-deep my-2">${n.title || ''}</h4></div>
  </article>`;
}

function eventRowHTML(e){
  const d = new Date(e.date+'T00:00:00');
  return `<div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 sm:py-5">
    <div class="font-mono text-left sm:text-center shrink-0 sm:w-[70px] flex sm:block items-baseline gap-2 sm:gap-0">
      <span class="text-2xl sm:text-[1.6rem] font-semibold text-gold-light block leading-none">${isNaN(d)?'--':String(d.getDate()).padStart(2,'0')}</span>
      <span class="text-[0.7rem] tracking-[0.1em] uppercase text-parchment-dark">${isNaN(d)?'':d.toLocaleDateString('en-US',{month:'short'})}</span>
    </div>
    <div>
      <h4 class="font-fraunces font-semibold leading-tight text-white text-base sm:text-[1.08rem] mb-1">${e.title || ''}</h4>
      <p class="text-parchment-dark text-sm sm:text-[0.92rem]">${e.description || e.desc || ''}</p>
    </div>
  </div>`;
}

function eventRowPageHTML(e){
  const d = new Date(e.date+'T00:00:00');
  const image = safe(e.image, 'https://placehold.co/600x420/ece2cd/4a1420?text=Event+Photo');
  return `<div class="flex flex-col sm:flex-row gap-4 py-5 items-start">
    <div class="w-full sm:w-[140px] shrink-0 bg-parchment-dark overflow-hidden">
      <img src="${image}" alt="${safe(e.title, 'Event photo')}" class="w-full aspect-[16/10] object-cover">
    </div>
    <div class="flex-1 flex items-center gap-6">
      <div class="font-mono text-center shrink-0 w-[70px]"><span class="text-2xl font-semibold text-maroon block">${isNaN(d)?'--':String(d.getDate()).padStart(2,'0')}</span><span class="text-[0.7rem] uppercase text-ink-soft">${isNaN(d)?'':d.toLocaleDateString('en-US',{month:'short'})}</span></div>
      <div><h4 class="font-fraunces font-semibold text-maroon-deep">${e.title || ''}</h4><p class="text-sm">${e.description || e.desc || ''}</p></div>
    </div>
  </div>`;
}

function parishCardHTML(p){
  const photo = safe(p.photo, 'https://placehold.co/800x600/ece2cd/4a1420?text=Parish+Photo');
  return `<div class="border border-parchment-dark overflow-hidden bg-white">
    <div class="h-40 bg-parchment-dark"><img src="${photo}" alt="${safe(p.name, 'Parish photo')}" class="w-full h-full object-cover"></div>
    <div class="p-4">
      <h4 class="font-fraunces font-semibold text-maroon-deep">${p.name || ''}</h4>
      <p class="text-sm">${p.town || ''}${p.vicariate ? ' &middot; ' + p.vicariate : ''}</p>
      ${p.priest ? `<p class="text-sm text-ink-soft">Parish Priest: ${p.priest}</p>` : ''}
    </div>
  </div>`;
}

function clergyRowHTML(c){
  const photo = safe(c.photo, 'https://placehold.co/600x800/ece2cd/4a1420?text=Clergy+Portrait');
  return `<div class="py-4 flex flex-col sm:flex-row gap-4 items-start">
    <div class="w-full sm:w-[120px] shrink-0 bg-parchment-dark overflow-hidden">
      <img src="${photo}" alt="${safe(c.name, 'Clergy portrait')}" class="w-full aspect-[4/5] object-cover">
    </div>
    <div class="flex-1">
      <span class="font-fraunces font-semibold text-maroon-deep block">${c.name || ''}</span>
      <span class="text-sm">${c.role || ''}${c.assignment ? ' — ' + c.assignment : ''}</span>
    </div>
  </div>`;
}

/* Legacy hydrate helpers (kept for admin.html backward compat) */
async function hydrateProse(key, titleId, bodyId){
  const stored = await dGet(key);
  const scopeKey = key.replace(/^content:/, '').replace(/^list:/, '');
  const fallback = SiteData[scopeKey] || null;
  const data = stored || fallback;

  if(!data) return;

  const t = document.getElementById(titleId);
  const b = document.getElementById(bodyId);

  if (data.pageTitle) {
    document.title = data.pageTitle;
  }

  if(t && data.title) t.textContent = data.title;
  else if(t && data.bannerTitle) t.textContent = data.bannerTitle;

  if(b && data.body) b.innerHTML = textToParagraphs(data.body);
}
async function hydrateHome(){
  const data = await dGet(DKEYS.home);
  if(!data) return;
  const h = document.getElementById('hero-headline');
  const s = document.getElementById('hero-subtext');
  if(h && data.headline) h.textContent = data.headline;
  if(s && data.subtext) s.textContent = data.subtext;
}
async function hydrateList(key, containerId, renderFn){
  const items = await dGet(key);
  if(!items || !items.length) return;
  const el = document.getElementById(containerId);
  if(el) el.innerHTML = items.map(renderFn).join('');
}
async function hydrateHomeNews(){
  const items = await dGet(DKEYS.news);
  if(!items || !items.length) return;
  const sorted = [...items].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const el = document.getElementById('home-news-list');
  if(el) el.innerHTML = sorted.slice(0,3).map(newsCardHTML).join('');
}