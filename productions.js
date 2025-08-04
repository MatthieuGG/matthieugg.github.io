const productionsPerPage = 5;
let currentPage = 1;
let currentYear = "all";

// Renommer pour correspondre à ta data
const productions = productionsEntries;

function getFilteredProductions() {
  if (currentYear === "all") {
    // Flatten all entries across years
    return productions.flatMap(yearObj =>
      yearObj.entries.map(entry => ({
        year: yearObj.year,
        ...entry
      }))
    );
  } else {
    // Trouver l'année choisie et retourner ses entrées
    const yearObj = productions.find(p => p.year == currentYear);
    if (!yearObj) return [];
    return yearObj.entries.map(entry => ({
      year: yearObj.year,
      ...entry
    }));
  }
}

function displayProductions(page) {
  const container = document.getElementById("productions-container");
  container.innerHTML = "";

  const filtered = getFilteredProductions();
  const start = (page - 1) * productionsPerPage;
  const end = start + productionsPerPage;
  const pageItems = filtered.slice(start, end);

  pageItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "article-highlight"; // pour utiliser ton style image + texte

    div.innerHTML = `
      <div class="article-image">
        <img src="${item.img}" alt="${item.alt}">
      </div>
      <div class="article-text">
        <strong>${item.year}</strong><br>
        ${item.text || `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.alt}</a>`}
      </div>
    `;
    container.appendChild(div);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(getFilteredProductions().length / productionsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;

    btn.addEventListener("click", () => {
      currentPage = i;
      displayProductions(currentPage);
      setupPagination();
    });

    pagination.appendChild(btn);
  }
}

function setupYearFilter() {
  const filter = document.getElementById("year-filter");
  const years = [...new Set(productions.map(p => p.year))].sort((a, b) => b - a);
  filter.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = currentYear === "all" ? "active" : "";
  allBtn.addEventListener("click", () => {
    currentYear = "all";
    currentPage = 1;
    setupYearFilter();
    displayProductions(currentPage);
    setupPagination();
  });
  filter.appendChild(allBtn);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.textContent = year;
    if (year == currentYear) btn.className = "active";
    btn.addEventListener("click", () => {
      currentYear = year;
      currentPage = 1;
      setupYearFilter();
      displayProductions(currentPage);
      setupPagination();
    });
    filter.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupYearFilter();
  displayProductions(currentPage);
  setupPagination();
});
