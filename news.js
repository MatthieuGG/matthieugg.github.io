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
        ${entry.image ? `<img src="${entry.image}" alt="${entry.title}" class="news-image clickable-image">` : ""}
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

function setupYearFilter() {
  const select = document.getElementById("year-select");
  const years = [...new Set(newsEntries.map(e => e.date.slice(0, 4)))].sort((a, b) => b - a);

  select.innerHTML = `<option value="all">Toutes</option>`;

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year == currentYear) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    currentYear = select.value;
    currentPage = 1;
    displayNews(currentPage);
    setupPagination();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupYearFilter();
  displayNews(currentPage);
  setupPagination();
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = document.getElementById("lightbox-close");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("news-image")) {
    lightboxImg.src = e.target.src;
    lightbox.style.display = "flex";
  }
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
