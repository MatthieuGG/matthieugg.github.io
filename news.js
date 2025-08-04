const postsPerPage = 10;
let currentPage = 1;
let currentYear = "all";

function getFilteredNews() {
  if (currentYear === "all") return newsEntries;
  return newsEntries.filter(entry => entry.date.startsWith(currentYear));
}

function displayNews(page) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  const filtered = getFilteredNews();
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const entries = filtered.slice(start, end);

  entries.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "news-entry";

    div.innerHTML = `
      <h3>${entry.title}</h3>
      <div class="date">${entry.date}</div>
      <div class="news-highlight">
        ${entry.image ? `<img src="${entry.image}" alt="${entry.title}" class="news-image">` : ""}
        <div class="news-text">
          ${entry.content}
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(getFilteredNews().length / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;

    btn.addEventListener("click", () => {
      currentPage = i;
      displayNews(currentPage);
      setupPagination();
    });

    pagination.appendChild(btn);
  }
}

function setupNewsFilter() {
  const filter = document.getElementById("news-filter");
  const years = [...new Set(newsEntries.map(e => e.date.slice(0, 4)))].sort((a, b) => b - a);

  filter.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = currentYear === "all" ? "active" : "";
  allBtn.addEventListener("click", () => {
    currentYear = "all";
    currentPage = 1;
    setupNewsFilter();
    displayNews(currentPage);
    setupPagination();
  });
  filter.appendChild(allBtn);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.textContent = year;
    if (year === currentYear) btn.className = "active";
    btn.addEventListener("click", () => {
      currentYear = year;
      currentPage = 1;
      setupNewsFilter();
      displayNews(currentPage);
      setupPagination();
    });
    filter.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupNewsFilter();
  displayNews(currentPage);
  setupPagination();
});
