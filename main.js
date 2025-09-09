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
