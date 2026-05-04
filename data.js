// data.js — Firebase + Local settings store
// Use this file on GitHub Pages. No npm needed.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzgHvTzASRtCI7IEpvxOzAjXA9x4vz2QM",
  authDomain: "portfolio-b9537.firebaseapp.com",
  projectId: "portfolio-b9537",
  storageBucket: "portfolio-b9537.firebasestorage.app",
  messagingSenderId: "506117095076",
  appId: "1:506117095076:web:ac372464c48d7ff54a3031",
  measurementId: "G-416CMYZSXN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

window.db = db;
window.storage = storage;
window.FB = {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL
};

window.getFirebaseProjects = async function () {
  const snap = await getDocs(collection(db, "projects"));
  const projects = snap.docs.map(d => ({ firebaseId: d.id, ...d.data() }));

  projects.sort((a, b) => {
    const at = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const bt = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return bt - at;
  });

  return projects;
};

// Local store kept for contact, experience, education, messages, CV, settings.
// Projects now come from Firebase Firestore.
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
    try {
      localStorage.setItem(this.KEYS[key], JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('pf-data-updated', { detail: { key } }));
      return true;
    } catch (e) {
      console.error('Local save failed:', e);
      return false;
    }
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

window.DB = DB;
