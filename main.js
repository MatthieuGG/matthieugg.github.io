document.querySelectorAll('a').forEach(function(link) {
    if (!link.classList.contains('no-target')) {
        link.setAttribute('target', '_blank');
    }
});
