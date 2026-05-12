const mediaPerPage = 5;
let currentPage = 1;
let currentYear = "all";

// 🔹 slug propre (accents, espaces, etc.)
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 🔹 liste filtrée
function getFilteredMedia() {
  if (currentYear === "all") return mediaEntries;
  return mediaEntries.filter(entry => entry.date.startsWith(currentYear));
}

function displayMedia(page) {
  const container = document.getElementById("media-container");
  container.innerHTML = "";

  const filtered = getFilteredMedia();
  const start = (page - 1) * mediaPerPage;
  const end = start + mediaPerPage;
  const entries = filtered.slice(start, end);

  entries.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "media-entry";

    // 🔹 ID stable basé sur le titre
    const anchorId = `media-${slugify(entry.title)}`;
    div.id = anchorId;

    let mediaContent = "";
    if (entry.type === "pdf") {
      mediaContent = `
        <object data="${entry.pdfUrl}" type="application/pdf" width="100%" height="600px">
          <p>Unable to display PDF file. <a href="${entry.pdfUrl}">Download</a> instead.</p>
        </object>
      `;
    } else if (entry.type === "youtube") {
        mediaContent = `
            <div class="youtube-embed">
            <iframe
                src="https://www.youtube-nocookie.com/embed/${entry.youtubeId}"
                title="${entry.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
            </div>
        `;
    } else if (entry.type === "iframe") {
      mediaContent = `
        <div class="responsive-iframe-container ${entry.iframeClass || ""}">
          ${entry.iframeCode}
        </div>
      `;
    } else if (entry.type === "image") {
      mediaContent = `
        <img src="${entry.imageUrl}" alt="${entry.title}" class="media-image clickable-image" style="max-width: 100%; height: auto;">
      `;
    }

    div.innerHTML = `
      <h3>
        ${entry.title}
        <a href="#${anchorId}" style="text-decoration:none; font-size:0.8em; margin-left:6px;">🔗</a>
      </h3>
      <div class="date">${entry.date}</div>
        <div class="media-highlight">
            ${mediaContent}
            <div class="media-text">
               ${entry.description.replace(/\n/g, "<br>")}
            </div>
        </div>
    `;

    container.appendChild(div);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(getFilteredMedia().length / mediaPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;

    btn.addEventListener("click", () => {
      currentPage = i;
      displayMedia(currentPage);
      setupPagination();
    });

    pagination.appendChild(btn);
  }
}

function setupYearFilter() {
  const select = document.getElementById("year-select");
  const years = [...new Set(mediaEntries.map(e => e.date.slice(0, 4)))].sort((a, b) => b - a);

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
    displayMedia(currentPage);
    setupPagination();
  });
}

// 🔥 navigation vers ancre avec pagination
function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.replace("#", "");

  // retrouver l'index via slug
  const targetIndex = mediaEntries.findIndex(entry => {
    return `media-${slugify(entry.title)}` === id;
  });

  if (targetIndex === -1) return;

  const targetPage = Math.floor(targetIndex / mediaPerPage) + 1;

  currentPage = targetPage;
  displayMedia(currentPage);
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

  if (window.location.hash) {
    handleHashNavigation();
  } else {
    displayMedia(currentPage);
    setupPagination();
  }
});

// Lightbox (if needed for images, but media might not have images)
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = document.getElementById("lightbox-close");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("media-image")) {
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