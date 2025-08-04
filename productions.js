const productionsPerPage = 10;
let currentPage = 1;

function displayProductions(page) {
  const container = document.getElementById("productions-container");
  container.innerHTML = "";

  const start = (page - 1) * productionsPerPage;
  const end = start + productionsPerPage;
  const pageItems = productions.slice(start, end);

  pageItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "article-highlight";
    div.innerHTML = `
      <div class="article-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="article-text">
        <strong>${item.year} – ${item.title}</strong><br>
        ${item.description}
      </div>
    `;
    container.appendChild(div);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(productions.length / productionsPerPage);
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

document.addEventListener("DOMContentLoaded", function () {
  displayProductions(currentPage);
  setupPagination();
});
