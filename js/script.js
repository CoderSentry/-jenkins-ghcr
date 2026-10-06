document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Dark/Light Mode Toggle Functionality (Unchanged)
    // ----------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark-mode';

    if (currentTheme === 'light-mode') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '☀️';
    } else {
        body.classList.remove('light-mode');
        themeToggle.innerHTML = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'light-mode');
        } else {
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // ----------------------------------------------------------------------
    // 2. Interactive Scroll Reveal Animation (Unchanged)
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ----------------------------------------------------------------------
    // 3. Scroll-to-Top Button Functionality (Unchanged)
    // ----------------------------------------------------------------------
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------------------------------------------------------
    // 4. Certification Carousel (Slider) Functionality
    // ----------------------------------------------------------------------
    const carouselTrack = document.querySelector('.cert-carousel-track');
    const prevBtn = document.getElementById('cert-prev-btn');
    const nextBtn = document.getElementById('cert-next-btn');
    const certCards = document.querySelectorAll('.cert-card-link');
    const viewDetailsBtn = document.getElementById('view-cert-details-btn');
    
    let currentSelectedCert = null;
    let cardWidth = 380; 

    // Function to scroll the carousel
    const scrollCarousel = (direction) => {
        const scrollAmount = direction * cardWidth * 3; 
        carouselTrack.scrollLeft += scrollAmount;
    };

    prevBtn.addEventListener('click', () => scrollCarousel(-1));
    nextBtn.addEventListener('click', () => scrollCarousel(1));

    // Handle single-click (selection) and double-click (open modal)
    certCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            // Single Click: Selection Logic
            certCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            currentSelectedCert = card;
            viewDetailsBtn.style.display = 'block';

            // Ensure smooth scroll centers the selected card 
            setTimeout(() => {
                const cardRect = card.getBoundingClientRect();
                const trackRect = carouselTrack.getBoundingClientRect();
                // Calculate necessary scroll adjustment to center the card
                const scrollX = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
                carouselTrack.scrollLeft += scrollX;
            }, 50);

        });

        card.addEventListener('dblclick', (event) => {
            event.preventDefault();
            // Double Click: Open Modal
            showCertModal(card);
        });
    });

    // Handle button click for opening selected certificate modal
    viewDetailsBtn.addEventListener('click', () => {
        if (currentSelectedCert) {
            showCertModal(currentSelectedCert);
        }
    });

    // ----------------------------------------------------------------------
    // 5. Certificate Modal/Lightbox Functionality
    // ----------------------------------------------------------------------
    const certModal = document.getElementById("certModal");
    const certModalImage = document.getElementById("modalCertImage");
    const certModalTitle = document.getElementById("modalCertTitle");
    const certCloseBtn = certModal.querySelector(".close-btn");

    window.showCertModal = function(element) {
        certModal.style.display = "block";
        certModalImage.src = element.href;
        certModalTitle.textContent = element.getAttribute('data-cert-name');
    }

    certCloseBtn.onclick = function() {
        certModal.style.display = "none";
    }

    // ----------------------------------------------------------------------
    // 6. Badge Modal Functionality
    // ----------------------------------------------------------------------
    const badgeModal = document.getElementById("badgeModal");
    const badgeModalImage = document.getElementById("modalBadgeImage");
    const badgeModalTitle = document.getElementById("modalBadgeTitle");
    const badgeCloseBtn = badgeModal.querySelector(".close-btn");
    const badgeItems = document.querySelectorAll('.badge-item');

    badgeItems.forEach(badge => {
        badge.addEventListener('click', () => {
            badgeModal.style.display = "block";
            // Use the data attributes from the badge-item
            badgeModalImage.src = badge.getAttribute('data-badge-url'); 
            badgeModalTitle.textContent = badge.getAttribute('data-badge-name');
        });
    });

    badgeCloseBtn.onclick = function() {
        badgeModal.style.display = "none";
    }

    // Close Modals on outside click
    window.onclick = function(event) {
        if (event.target == certModal) {
            certModal.style.display = "none";
        }
        if (event.target == badgeModal) {
            badgeModal.style.display = "none";
        }
    }
});

