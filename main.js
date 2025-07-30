// Automatically add the navigation bar to the body of each page
document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <div class="navbar-container">
            <div class="navbar">
                <a href="index.html">Home</a>
                <a href="resume.html">Resume</a>
                <a href="productions.html">Productions</a>
                <a href="news.html">News</a>                
                <a href="https://dualtaskcalculator.streamlit.app/" class="highlighted-link">[DualTaskCalculator]</a>
            </div>
        </div>
    `;

    const footerHTML = `
        <div class="footer-container">
            <div class="footer">
                <a>Go open science !</a>
                <a href="index.html"><b>MGG</b></a>
                <a>Last update - Jully 2025</a>
            </div>
        </div>
    `;

    // Insert the navigation bar at the top of the body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Insert the footer at the bottom of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
});

// Add target="_blank" to external links
document.querySelectorAll('a[href]').forEach(function(link) {
    const isInternal = link.hostname === window.location.hostname;
    if (!isInternal) {
        link.setAttribute('target', '_blank');
    }
});

