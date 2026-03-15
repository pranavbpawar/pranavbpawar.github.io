// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = currentTheme === 'dark' ? 
            'rgba(0, 0, 0, 0.95)' : 
            'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = currentTheme === 'dark' ? 
            'var(--navbar-bg)' : 
            'var(--navbar-bg)';
    }
});

// Add animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', function() {
    const navProfilePic = document.querySelector('.nav-profile-pic');
    const heroProfilePic = document.querySelector('.profile-pic');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition > 100) {
            navProfilePic.classList.add('visible');
            heroProfilePic.classList.add('hide');
        } else {
            navProfilePic.classList.remove('visible');
            heroProfilePic.classList.remove('hide');
        }
    });

    // Scroll down arrow functionality
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const skillsSection = document.getElementById('skills');
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Function to set random background image for projects section
function setRandomProjectBackground() {
    const backgroundImages = [
        'images/navbar/nav-bg-1.jpg',
        'images/navbar/nav-bg-2.jpg',
        'images/navbar/nav-bg-3.jpg',
        'images/navbar/nav-bg-4.jpg',
        'images/navbar/nav-bg-5.jpg',
        'images/navbar/nav-bg-6.jpg',
        'images/navbar/nav-bg-7.jpg'
    ];

    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        projectsSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('${randomImage}')`;
        projectsSection.style.backgroundSize = 'cover';
        projectsSection.style.backgroundPosition = 'center';
        projectsSection.style.backgroundAttachment = 'fixed';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setRandomProjectBackground);

// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Function to apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update navbar background based on current scroll position and theme
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = theme === 'dark' ? 
                'rgba(0, 0, 0, 0.95)' : 
                'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = theme === 'dark' ? 
                'var(--navbar-bg)' : 
                'var(--navbar-bg)';
        }
    }

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply saved theme
    applyTheme(initialTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        applyTheme(newTheme);
        
        // Animate the icon
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

// Mobile Menu Toggle with Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.contains('active');
            
            // Toggle menu state
            navLinks.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', !isActive);
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isActive ? 'hidden' : '';
            
            // Focus management
            if (!isActive) {
                // Focus first menu item when opening
                const firstLink = navLinks.querySelector('a');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.mobile-menu-toggle') && 
                !event.target.closest('.nav-links') && 
                navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Helper function to close mobile menu
        function closeMobileMenu() {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Return focus to toggle button
            mobileMenuToggle.focus();
        }
    }
}); 

// Platform and Difficulty Filtering
document.addEventListener('DOMContentLoaded', function() {
    const platformTabs = document.querySelectorAll('.platform-tab');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventBoxes = document.querySelectorAll('.event-box');

    // Platform filtering
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platform = this.dataset.platform;
            
            // Update active tab
            platformTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Move boxes to appropriate grid
            eventBoxes.forEach(box => {
                const boxPlatform = box.dataset.platform;
                
                if (platform === 'all' || boxPlatform === platform) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });

    // Difficulty filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter boxes
            eventBoxes.forEach(box => {
                const category = box.dataset.category;
                const platform = box.dataset.platform;
                const currentPlatform = document.querySelector('.platform-tab.active').dataset.platform;
                
                if ((filter === 'all' || category === filter) && 
                    (currentPlatform === 'all' || platform === currentPlatform)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });
}); 