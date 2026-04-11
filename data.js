const DB = {
  KEYS: {
    projects: 'pf_projects',
    experience: 'pf_experience',
    education: 'pf_education',
    contact: 'pf_contact',
    messages: 'pf_messages',
    cv: 'pf_cv',
    settings: 'pf_settings',
  },

  defaults: {
    settings: {
      name: 'Siful Islam Zehan',
      role: 'UI/UX Designer & Full Stack Developer',
      location: 'Bangladesh',
      tagline: 'I design clean, modern digital products.',
      status: 'open',
      heroTag: 'Available for freelance work',
    },

    contact: {
      email: 'sifulislamzehan@gmail.com',
      phone: '',
      location: 'Bangladesh',
      linkedin: '#',
      github: '#',
      dribbble: '#',
      behance: '#',
    },

    projects: [],
    experience: [],
    education: [],
    messages: [],
    cv: null,
  },

  get(key) {
    try {
      const raw = localStorage.getItem(this.KEYS[key]);
      if (!raw) return this.clone(this.defaults[key]);
      return JSON.parse(raw);
    } catch (e) {
      return this.clone(this.defaults[key]);
    }
  },

  set(key, value) {
    localStorage.setItem(this.KEYS[key], JSON.stringify(value));

    // same tab update
    window.dispatchEvent(new CustomEvent('pf-data-updated', { detail: { key } }));
  },

  init() {
    Object.keys(this.defaults).forEach(key => {
      if (!localStorage.getItem(this.KEYS[key])) {
        this.set(key, this.defaults[key]);
      }
    });
  },

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};
