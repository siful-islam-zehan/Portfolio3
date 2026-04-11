// ═══════════════════════════════════════════════════════
//  data.js  —  Shared data store for portfolio + admin
//  Both index.html and admin.html import this file
// ═══════════════════════════════════════════════════════

const DB = {
  // ── Keys ──
  KEYS: {
    projects:   'pf_projects',
    experience: 'pf_experience',
    education:  'pf_education',
    contact:    'pf_contact',
    messages:   'pf_messages',
    cv:         'pf_cv',
    settings:   'pf_settings',
  },

  // ── Default Data ──
  defaults: {
    settings: {
      name:      'Siful Islam Zehan',
      role:      'UI/UX Designer & Full Stack Developer',
      location:  'Bangladesh',
      tagline:   'I design clean, modern digital products that are as beautiful as they are functional.',
      status:    'open',
      heroTag:   'Available for freelance work',
    },
    contact: {
      email:    'sifulislamzehan@gmail.com',
      phone:    '',
      location: 'Bangladesh',
      linkedin: '#',
      github:   '#',
      dribbble: '#',
      behance:  '#',
    },
    projects: [
      {
        id: 1, name: 'NaijaRadar', tag: 'UI/UX Design · Flight Tracking',
        category: 'UI/UX Design', year: '2024', role: 'Lead Designer',
        desc: 'A real-time flight tracking platform for Nigerian airspace — clean dashboard, live map, alert system.',
        fulldesc: 'A real-time flight tracking platform for Nigerian airspace. I designed the entire UI/UX from dashboard interface to live map view, alert system, and data visualization components.',
        tools: 'Figma · Adobe XD · Prototyping',
        link: '', banner: null, full: null,
      },
      {
        id: 2, name: 'Childcare SaaS', tag: 'SaaS · Dashboard Design',
        category: 'Dashboard Design', year: '2024', role: 'UI/UX Designer',
        desc: 'Management dashboard for childcare centers — attendance, billing, parent communication.',
        fulldesc: 'A comprehensive SaaS platform for childcare centers covering parent communication, staff scheduling, attendance tracking, and billing.',
        tools: 'Figma · Design System · React',
        link: '', banner: null, full: null,
      },
      {
        id: 3, name: 'Allies App', tag: 'Mobile App · UI/UX Concept',
        category: 'Mobile App Design', year: '2023', role: 'Product Designer',
        desc: 'Community-driven mobile app connecting people with shared causes and missions.',
        fulldesc: 'A community-driven mobile app concept connecting people with shared causes, with strong focus on micro-interactions and accessibility.',
        tools: 'Figma · Prototyping · User Research',
        link: '', banner: null, full: null,
      },
      {
        id: 4, name: 'Sushi Pop', tag: 'Landing Page · Brand Design',
        category: 'Landing Page', year: '2023', role: 'Designer & Developer',
        desc: 'Bold and modern landing page for a premium sushi brand — high converting, scroll animations.',
        fulldesc: 'A bold and modern landing page for a premium sushi brand using strong visual contrasts, editorial typography, and smooth scroll animations.',
        tools: 'Figma · Next.js · Tailwind CSS',
        link: '', banner: null, full: null,
      },
    ],
    experience: [
      {
        id: 1, role: 'UI/UX Designer & Full Stack Developer', company: 'Freelance',
        start: 'Jan 2022', end: 'Present', type: 'Freelance',
        desc: 'Working with international clients on product design and full stack development. Designed 30+ projects across web, mobile, and dashboard.',
      },
    ],
    education: [
      {
        id: 1, degree: 'Bachelor of Science in Computer Science',
        institution: 'University Name', year: '2018 — 2022',
        desc: 'Focused on software engineering, web technologies, and human-computer interaction.',
      },
    ],
    messages: [],
    cv: null,
  },

  // ── CRUD Methods ──
  get(key) {
    try {
      const raw = localStorage.getItem(this.KEYS[key]);
      if (!raw) return this.defaults[key];
      const parsed = JSON.parse(raw);
      // For arrays, fall back to defaults if empty
      if (Array.isArray(parsed) && parsed.length === 0 && this.defaults[key] && this.defaults[key].length > 0) {
        return this.defaults[key];
      }
      return parsed;
    } catch(e) { return this.defaults[key]; }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.KEYS[key], JSON.stringify(value));
      // Dispatch event so other parts of page can react
      window.dispatchEvent(new CustomEvent('pf-data-updated', { detail: { key } }));
      return true;
    } catch(e) { return false; }
  },

  // Initialize defaults if nothing saved yet
  init() {
    Object.keys(this.defaults).forEach(key => {
      if (!localStorage.getItem(this.KEYS[key])) {
        this.set(key, this.defaults[key]);
      }
    });
  },
};
