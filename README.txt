═══════════════════════════════════════════════════
  SIFUL ISLAM ZEHAN — PORTFOLIO SITE
═══════════════════════════════════════════════════

FOLDER STRUCTURE:
  portfolio-site/
  ├── index.html      → Main portfolio website
  ├── admin.html      → Admin dashboard
  ├── data.js         → Shared data store (REQUIRED)
  └── assets/
      └── photo.png   → Your profile photo (replace this)

HOW IT WORKS:
  → admin.html saves data to browser localStorage
  → data.js is the bridge between both files
  → index.html reads from localStorage via data.js
  → Any change in admin shows instantly on portfolio

ADMIN LOGIN:
  Username: admin
  Password: zehan2025
  (You can change this in admin.html — search CREDS)

TO USE:
  1. Put all 3 files in the SAME folder
  2. Open index.html in browser → your portfolio
  3. Open admin.html in browser → dashboard
  4. Add your photo as assets/photo.png
  5. Update projects, experience, education in admin
  6. Refresh index.html → changes appear!

IMPORTANT:
  ✅ Both files must be in the SAME folder
  ✅ data.js must be in the SAME folder as both
  ✅ Works in any browser, no server needed
  ⚠️  Data is saved in your browser — same browser/device only
  ⚠️  For multi-device sync, you need a backend (Firebase etc.)

═══════════════════════════════════════════════════
