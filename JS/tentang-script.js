// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Setup FAQ accordion
    setupFAQ();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup form validation
    setupFormValidation();
});

// Fungsi untuk mengatur FAQ accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('h3');
        
        header.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Fungsi untuk smooth scrolling
function setupSmoothScrolling() {
    // Smooth scroll untuk anchor link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fungsi untuk validasi form
function setupFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi sederhana
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            // Reset error states
            this.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Nama lengkap wajib diisi');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email wajib diisi');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Email tidak valid');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Pesan wajib diisi');
                isValid = false;
            }
            
            // Jika valid, kirim form
            if (isValid) {
                // Di sini bisa ditambahkan AJAX request
                alert('Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.');
                this.reset();
            }
        });
    }
}

// Fungsi untuk menampilkan error
function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.style.color = '#ff416c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.3rem';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = '#ff416c';
    
    // Reset error state saat input diubah
    input.addEventListener('input', function() {
        errorElement.remove();
        input.style.borderColor = '';
    });
}

// Fungsi untuk validasi email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}