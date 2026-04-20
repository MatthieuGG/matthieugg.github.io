const productionsPerPage = 5;
let currentPage = 1;
let currentYear = "all";

const productions = productionsEntries;

// 🔹 slug propre (accents, espaces, etc.)
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 🔹 liste plate (globale)
function getAllProductionsFlat() {
  return productions.flatMap(yearObj =>
    yearObj.entries.map(entry => ({
      year: yearObj.year,
      ...entry
    }))
  );
}

function getFilteredProductions() {
  if (currentYear === "all") {
    return getAllProductionsFlat();
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

    // 🔹 ID stable basé sur date + subtitle
    const base = `${item.date || item.year}-${item.subtitle || item.alt || "item"}`;
    const anchorId = `prod-${slugify(base)}`;
    div.id = anchorId;

    div.innerHTML = `
      <div class="production-image">
        <img src="${item.img}" alt="${item.alt}">
      </div>
      <div class="production-text">
        <strong>
          ${item.date || item.year}
          <a href="#${anchorId}" style="text-decoration:none; font-size:0.8em; margin-left:6px;">🔗</a>
        </strong><br>
        ${item.subtitle ? `<strong style="font-size:1.2em; font-weight:bold; display:block; margin-top:2px;">${item.subtitle}</strong>` : ""}
        ${item.text || `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.alt}</a>`}
        ${item.citation ? `
          <div class="citation-block" style="margin-top:0.8em;">
            <div class="citation" style="font-size:85%; color:#333; margin-bottom:0.5em;">
              ${item.citation}
            </div>
            <button class="cite-btn" onclick="copyCitation(this)">📑 Citer</button>
          </div>
        ` : ""}
      </div>
    `;

    container.appendChild(div);
  });
}

function copyCitation(btn) {
  const citationText = btn.parentElement.querySelector(".citation").innerText;

  navigator.clipboard.writeText(citationText).then(() => {
    btn.textContent = "✅ Copié !";
    setTimeout(() => {
      btn.textContent = "📑 Citer";
    }, 1500);
  }).catch(() => {
    btn.textContent = "❌ Erreur";
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
    displayProductions(currentPage);
    setupPagination();
  });
}

// 🔥 navigation vers ancre avec pagination
function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.replace("#", "");
  const allItems = getAllProductionsFlat();

  const targetIndex = allItems.findIndex(item => {
    const base = `${item.date || item.year}-${item.subtitle || item.alt || "item"}`;
    return `prod-${slugify(base)}` === id;
  });

  if (targetIndex === -1) return;

  const targetPage = Math.floor(targetIndex / productionsPerPage) + 1;

  currentPage = targetPage;
  displayProductions(currentPage);
  setupPagination();

  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.style.backgroundColor = "#fff8cc";
      setTimeout(() => el.style.backgroundColor = "", 2000);
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", function () {
  setupYearFilter();
  handleHashNavigation();
  displayProductions(currentPage);
  setupPagination();
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = document.getElementById("lightbox-close");

document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest(".production-highlight")) {
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