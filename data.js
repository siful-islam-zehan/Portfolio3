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

window.db = db;
window.FB = {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
};

window.getFirebaseProjects = async function () {
  const { collection, getDocs, query, orderBy } = window.FB;
  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    firebaseId: d.id,
    ...d.data()
  }));
};
