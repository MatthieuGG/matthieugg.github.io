const productionsPerPage = 5;
let currentPage = 1;
let currentYear = "all";

const productions = productionsEntries; // depuis productions_data.js

function getFilteredProductions() {
  if (currentYear === "all") {
    return productions.flatMap(yearObj =>
      yearObj.entries.map(entry => ({
        year: yearObj.year,
        ...entry
      }))
    );
  } else {
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
    div.className = "production-highlight";

    div.innerHTML = `
      <div class="production-image">
        <img src="${item.img}" alt="${item.alt}">
      </div>
      <div class="production-text">
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
  const select = document.getElementById("year-select");
  const years = [...new Set(productions.map(p => p.year))].sort((a, b) => b - a);

  select.innerHTML = `<option value="all">All</option>`;

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
    displayProductions(currentPage);
    setupPagination();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupYearFilter();
  displayProductions(currentPage);
  setupPagination();
});
