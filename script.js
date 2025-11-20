function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleSubmenu() {
  const menu = document.querySelector('.menu-links');
  if (!menu) return;
  menu.classList.toggle('submenu-open');
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.Typed) {
    const typed = new Typed('#typed-text', {
      strings: [
        'A Web Developer.',
        'A Web Designer.',
        'An Engineer.'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
  }
});

// --- Content helpers for Posts & Quotes ---
async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load ' + path);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

function createEl(tag, attrs = {}, text) {
  const el = document.createElement(tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (text) el.innerHTML = text;
  return el;
}

async function initPostsPage() {
  const posts = await fetchJSON('posts/data/posts.json');
  const root = document.getElementById('posts-root');
  if (!root) return;
  if (!posts) {
    root.innerHTML = '<p>Unable to load posts.</p>';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  if (slug) {
    renderPostBySlug(root, posts, slug);
  } else {
    renderPostsList(root, posts);
  }
}

function renderPostsList(root, posts) {
  root.innerHTML = '';
  const list = createEl('div', { class: 'post-list' });
  posts.forEach(p => {
    const item = createEl('article', { class: 'post-teaser' });
    const title = createEl('h2', {}, `<a href="?slug=${encodeURIComponent(p.slug)}">${p.title}</a>`);
    const date = createEl('div', { class: 'post-date' }, p.date || '');
    const excerpt = createEl('p', {}, p.excerpt || (p.content || '').slice(0, 180) + '...');
    item.appendChild(title);
    item.appendChild(date);
    item.appendChild(excerpt);
    list.appendChild(item);
  });
  root.appendChild(list);
}

function renderPostBySlug(root, posts, slug) {
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    root.innerHTML = '<p>Post not found.</p>';
    return;
  }
  root.innerHTML = '';
  const article = createEl('article', { class: 'post' });
  const title = createEl('h1', {}, post.title);
  const date = createEl('div', { class: 'post-date' }, post.date || '');
  const content = createEl('div', { class: 'post-content' }, post.content || '');
  const back = createEl('p', {}, `<a href="./">← Back to posts</a>`);
  article.appendChild(title);
  article.appendChild(date);
  article.appendChild(content);
  article.appendChild(back);
  root.appendChild(article);
}

async function initQuotesPage() {
  const quotes = await fetchJSON('data/quotes.json');
  const root = document.getElementById('quotes-root');
  if (!root) return;
  if (!quotes) {
    root.innerHTML = '<p>Unable to load quotes.</p>';
    return;
  }
  renderQuotes(root, quotes);
}

function renderQuotes(root, quotes) {
  root.innerHTML = '';
  const container = createEl('div', { class: 'quotes-container' });
  const rndIndex = Math.floor(Math.random() * quotes.length);
  const randomBox = createEl('div', { class: 'quote-box random-quote' });
  randomBox.innerHTML = `<div class="quote-text">"${quotes[rndIndex].text}"</div><div class="quote-author">— ${quotes[rndIndex].author || 'Unknown'}</div>`;
  container.appendChild(randomBox);

  const list = createEl('div', { class: 'quote-list' });
  quotes.forEach(q => {
    const box = createEl('div', { class: 'quote-box' });
    box.innerHTML = `<div class="quote-text">"${q.text}"</div><div class="quote-author">— ${q.author || 'Unknown'}</div>`;
    list.appendChild(box);
  });
  container.appendChild(list);
  root.appendChild(container);
}

// expose for pages
window.initPostsPage = initPostsPage;
window.initQuotesPage = initQuotesPage;
