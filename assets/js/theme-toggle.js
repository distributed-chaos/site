// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark');
    const lightSheet = document.getElementById('theme_source');
    const darkSheet = document.getElementById('theme_source_2');

    if (isDark) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        lightSheet.disabled = false;
        darkSheet.disabled = true;
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        lightSheet.disabled = true;
        darkSheet.disabled = false;
    }
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const lightSheet = document.getElementById('theme_source');
    const darkSheet = document.getElementById('theme_source_2');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        lightSheet.disabled = true;
        darkSheet.disabled = false;
    } else {
        document.body.classList.remove('dark');
        lightSheet.disabled = false;
        darkSheet.disabled = true;
    }
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