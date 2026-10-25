document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.textContent = open ? "×" : "☰";
  });
  navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open navigation"); }
  }));

  const articles = window.journalArticles || [];
  const articleList = document.getElementById("articleList");
  const articleCount = document.getElementById("articleCount");
  const filters = document.querySelectorAll("[data-filter]");
  function renderArticles(category = "all") {
    const visible = articles.filter(article => category === "all" || article.category === category);
    articleCount.textContent = String(visible.length).padStart(2, "0");
    articleList.innerHTML = visible.map(article => `
      <article class="article-row">
        <span class="article-number">${article.number}</span>
        <div><div class="article-title">${article.title}</div><div class="article-desc">${article.description}</div></div>
        <span class="article-category">${article.label} · ${article.read}</span>
        <span class="article-arrow" aria-hidden="true">↗</span>
      </article>`).join("");
  }
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(filter => filter.classList.remove("active"));
    button.classList.add("active");
    renderArticles(button.dataset.filter);
  }));
  renderArticles();
  document.getElementById("year").textContent = new Date().getFullYear();

  const progress = document.getElementById("readingProgress");
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
  }, { passive: true });
});
