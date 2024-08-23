document.addEventListener('DOMContentLoaded', function() {
    // Check if the navbar is already present
    if (!document.querySelector('.navbar-container')) {
        const navbarHTML = `
            <div class="navbar-container">
                <div class="navbar">
                    <a href="index.html">Home</a>
                    <a href="resume_MGG.pdf">Resume</a>
                    <a href="publications.html">Publications</a>
                    <a href="income.html">INCOME</a>
                    <!-- <a href="slowlife.html">Slow Life</a> -->
                </div>
            </div>
        `;

        // Insert the navigation bar at the top of the body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }
});

// Add target="_blank" to external links
document.querySelectorAll('a[href]').forEach(function(link) {
    if (link.href.startsWith('https://matthieugg.github.io/')) {
        // do nothing = same window for internal
    } else {
        // add target="_blank" to external
        link.setAttribute('target', '_blank');
    }
});
