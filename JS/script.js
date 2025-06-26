// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Animation for stats counter
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;
                            const increment = target / speed;
                            
                            if (count < target) {
                                counter.innerText = Math.ceil(count + increment);
                                setTimeout(updateCount, 10);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        
                        updateCount();
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.stats'));
    }
    
    // Set data-target attributes for stats
    document.querySelectorAll('.stat-number').forEach(counter => {
        counter.setAttribute('data-target', counter.innerText);
        counter.innerText = '0';
    });
    
    // Feature card hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Current year for footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});