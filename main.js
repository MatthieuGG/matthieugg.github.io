// Insert navbar and footer once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <div class="navbar-container">
            <button class="hamburger" id="hamburger" aria-label="Toggle menu">&#9776;</button>
            <nav class="navbar" id="navbar">
                <a href="index.html">Accueil</a>
                <a href="resume.html">Résumé</a>
                <a href="productions.html">Productions</a>
                <a href="news.html">Actualités</a>                
                <a href="https://dualtaskcalculator.streamlit.app/" class="highlighted-link">[DualTaskCalculator]</a>
            </nav>
        </div>
    `;

    const footerHTML = `
        <div class="footer-container">
            <div class="footer">
                <a>Tentez la science ouverte !</a>
                <a href="index.html"><b>MGG</b></a>
                <a>Dernière mise à jour: Sept. 2025</a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });
});

// Add target="_blank" to external links
document.querySelectorAll('a[href]').forEach(function(link) {
    const isInternal = link.hostname === window.location.hostname;
    if (!isInternal) {
        link.setAttribute('target', '_blank');
    }
});


// POP UP POUR IMAGES
// Créer l'overlay
const overlay = document.createElement('div');
overlay.className = 'image-popup-overlay';
document.body.appendChild(overlay);

// Ajouter l'image dans l'overlay
const overlayImg = document.createElement('img');
overlay.appendChild(overlayImg);

// Fonction pour ouvrir l'image
function enableImagePopup() {
  document.querySelectorAll('.clickable-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });
}

// Fermer en cliquant sur le fond
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Activer lightbox après que le contenu dynamique est chargé
document.addEventListener('DOMContentLoaded', () => {
  enableImagePopup();
});

// ⚠️ Pour news : rappeler après displayNews
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

  // ⚡ Important : activer lightbox sur ces nouvelles images
  enableImagePopup();
}

