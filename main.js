document.querySelectorAll('a[href]').forEach(function(link) {
    if (link.href.startsWith('https://matthieugg.github.io/')) {
        // do nothing = same window for internal
    } else {
        // add target="_blank" to external
        link.setAttribute('target', '_blank');
    }
});
