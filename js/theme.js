function initializeTheme() {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    let themeIcon;
    
    if (themeToggle) {
        if (themeToggle.querySelector('.theme-icon')) {
            themeIcon = themeToggle.querySelector('.theme-icon');
        } else if (themeToggle.querySelector('i')) {
            themeIcon = themeToggle.querySelector('i');
        }
    }

    if (savedTheme === 'dark') {
        body.classList.add('dark');
        if (themeIcon) {
            if (themeIcon.classList.contains('bi')) {
                themeIcon.className = 'bi bi-sun';
            } else {
                themeIcon.textContent = '☀️';
            }
        }
    } else {
        body.classList.remove('dark');
        if (themeIcon) {
            if (themeIcon.classList.contains('bi')) {
                themeIcon.className = 'bi bi-moon';
            } else {
                themeIcon.textContent = '🌙';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark');
            
            if (isDark) {
                body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    if (themeIcon.classList.contains('bi')) {
                        themeIcon.className = 'bi bi-moon';
                    } else {
                        themeIcon.textContent = '🌙';
                    }
                }
            } else {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    if (themeIcon.classList.contains('bi')) {
                        themeIcon.className = 'bi bi-sun';
                    } else {
                        themeIcon.textContent = '☀️';
                    }
                }
            }

            if (document.querySelector('.bootstrap')) {
                applyBootstrapDarkTheme(!isDark);
            }
        });
    }
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!savedTheme && prefersDarkScheme.matches) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
            if (themeIcon.classList.contains('bi')) {
                themeIcon.className = 'bi bi-sun';
            } else {
                themeIcon.textContent = '☀️';
            }
        }
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            if (e.newValue === 'dark') {
                body.classList.add('dark');
                if (themeIcon) {
                    if (themeIcon.classList.contains('bi')) {
                        themeIcon.className = 'bi bi-sun';
                    } else {
                        themeIcon.textContent = '☀️';
                    }
                }
            } else {
                body.classList.remove('dark');
                if (themeIcon) {
                    if (themeIcon.classList.contains('bi')) {
                        themeIcon.className = 'bi bi-moon';
                    } else {
                        themeIcon.textContent = '🌙';
                    }
                }
            }
        }
    });
}

function applyBootstrapDarkTheme(isDark) {
    if (isDark) {
        const style = document.createElement('style');
        style.id = 'bootstrap-dark-theme';
        style.textContent = `
            body.dark {
                background-color: #121212 !important;
                color: #f1f1f1 !important;
            }
            
            body.dark .bg-light {
                background-color: #1e1e1e !important;
            }
            
            body.dark .card {
                background-color: #242424 !important;
                border-color: #444 !important;
                color: #f1f1f1 !important;
            }
            
            body.dark .text-primary {
                color: #6ea8fe !important;
            }
            
            body.dark .text-muted {
                color: #a0aec0 !important;
            }
        `;
        
        const existingStyle = document.getElementById('bootstrap-dark-theme');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.head.appendChild(style);
    } else {
        const style = document.getElementById('bootstrap-dark-theme');
        if (style) {
            style.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeTheme);