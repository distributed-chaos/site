// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('theme-dark');

    if (isDark) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`theme-${savedTheme}`);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}

// Search modal functionality
function toggleSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
        document.getElementById('search-input').focus();
    } else {
        modal.style.display = 'none';
    }
}

// Close modal on Escape key
window.addEventListener('keydown', function(e) {
    const modal = document.getElementById('search-modal');
    if (modal && modal.style.display === 'block' && e.key === 'Escape') {
        toggleSearchModal();
    }
});
