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
                <a>Dernière mise à jour: Janv. 2026</a>
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
// UNIVERSAL IMAGE LIGHTBOX
document.addEventListener("DOMContentLoaded", () => {
  // Crée le lightbox si pas déjà présent
  if (!document.getElementById("lightbox")) {
    const lightboxOverlay = document.createElement("div");
    lightboxOverlay.id = "lightbox";
    lightboxOverlay.className = "lightbox-overlay";
    lightboxOverlay.innerHTML = `
      <span class="close-btn" id="lightbox-close">&times;</span>
      <img src="" alt="Agrandie">
    `;
    document.body.appendChild(lightboxOverlay);
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = document.getElementById("lightbox-close");

  // Ouvre lightbox sur toutes les images cliquables
  document.addEventListener("click", (e) => {
    const clickable = e.target.matches(
      ".production-image img, .news-image, .article-image, .rule-image"
    );
    if (clickable) {
      lightboxImg.src = e.target.src;
      lightbox.style.display = "flex";
    }
  });

  // Ferme lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // Curseur "pointer" sur toutes les images cliquables
  document.querySelectorAll(
    ".production-image img, .news-image, .article-image, .rule-image"
  ).forEach(img => {
    img.style.cursor = "pointer";
  });
});

