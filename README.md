# Sabbir Hossen — Personal Portfolio

[![GitHub Pages Status](https://github.com/mksabbirrahman/mksabbirrahman.github.io/actions/workflows/deploy.yml/badge.svg)] [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Live demo: https://mksabbir.me (site is published via GitHub Pages using the repository's `main` branch)

---

Brief portfolio site for Sabbir Hossen — EEE student and front-end developer from Bangladesh. This repository contains a static HTML/CSS/JavaScript site used to showcase projects, experience, and contact information.

---

## **Overview**

This repository hosts a simple, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. The site highlights professional experience, projects, and provides contact links and a downloadable CV.

---

## **Tech Stack**

- **Core:** HTML5, CSS3, JavaScript (ES6)
- **Styling:** Plain CSS with responsive media queries (`style.css`, `mediaqueries.css`)
- **Deployment:** GitHub Pages (custom domain configured via `CNAME`)

---

## **Getting Started (Local)**

These steps let you preview and develop the site locally.

- **Clone the repo:**
  ```powershell
  git clone https://github.com/mksabbirrahman/mksabbirrahman.github.io.git
  cd mksabbirrahman.github.io
  ```
- **Open locally:**
  - Double-click `index.html` or open it with your browser.
  - Or serve with a simple local server (recommended) to avoid CORS issues:
    ```powershell
    # Using Python 3
    py -3 -m http.server 8000; Start-Process "http://localhost:8000"
    ```

No build step or package manager is required for this static site.

---

## **File Structure**

- `index.html` — Main site HTML
- `style.css` — Main styles
- `mediaqueries.css` — Responsive styles
- `script.js` — Small JS helpers (hamburger menu)
- `assets/` — Images, icons, CV (`resume-example.pdf`), and other media
- `CNAME` — Custom domain (`mksabbir.me`)

---

## **Deployment**

The site is deployed to GitHub Pages. Common deployment workflow:

- Push changes to the `main` branch.
- GitHub Actions (if configured) will build/deploy, or you can enable Pages to serve from the `main` branch root.

If you change the custom domain, update the `CNAME` file and GitHub Pages settings.

---

## **Usage & Editing Notes**

- To update content, edit `index.html` and adjust text, links, or images in `assets/`.
- For layout changes, modify `style.css` and `mediaqueries.css`.
- For small interactive behavior (hamburger menu), see `script.js`.

---

## **License**

This repository is available under the MIT License. See the `LICENSE` file (if present) or add one if you wish to publish under a specific license.

---

## **Contact**

- Email: `mksabbirrahman@gmail.com`
- LinkedIn / GitHub: links are embedded in the site navigation and assets.

If you'd like, I can also:
- Add a screenshot(s) to the README
- Add a short CONTRIBUTING section or a `LICENSE` file
- Improve meta tags or accessibility checks

