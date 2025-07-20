document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        document.querySelectorAll('.burger div').forEach(line => {
            line.classList.toggle('transform');
        });
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            document.querySelectorAll('.burger div').forEach(line => {
                line.classList.remove('transform');
            });
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== TOGGLE SECTIONS =====
    // Certifications Toggle
    const toggleCertifications = document.querySelector('.toggle-certifications');
    const certificationsContainer = document.querySelector('.certifications-container');
    
    if (toggleCertifications && certificationsContainer) {
        toggleCertifications.addEventListener('click', () => {
            const isShowing = certificationsContainer.classList.toggle('show');
            toggleCertifications.innerHTML = isShowing 
                ? 'Hide Certifications <i class="fas fa-chevron-up"></i>' 
                : 'Explore Certifications <i class="fas fa-chevron-down"></i>';
            
            document.querySelectorAll('.certification-card').forEach((card, i) => {
                setTimeout(() => card.classList.toggle('show', isShowing), i * 150);
            });
        });
    }

    // Resume Toggle
    const toggleResume = document.querySelector('.toggle-resume');
    const resumeContainer = document.querySelector('.resume-container');
    
    if (toggleResume && resumeContainer) {
        toggleResume.addEventListener('click', () => {
            const isShowing = resumeContainer.classList.toggle('show');
            toggleResume.innerHTML = isShowing 
                ? 'Hide Resume <i class="fas fa-chevron-up"></i>' 
                : 'Explore Resume <i class="fas fa-chevron-down"></i>';
        });
    }

    // ===== ANIMATIONS ON SCROLL =====
    const animateOnScroll = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => observer.observe(element));
    };

    animateOnScroll(document.querySelectorAll('.project-card'), 'animate');
    animateOnScroll(document.querySelectorAll('.skill-item'), 'animate');

    // ===== IMPROVED FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('formSubmitBtn');
            const submitText = document.getElementById('submitText');
            const submitSpinner = document.querySelector('.submit-spinner');
            const formMessage = document.getElementById('formMessage');
            
            // Form validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.remove('hidden');
                formMessage.style.color = 'red';
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.classList.remove('hidden');
                formMessage.style.color = 'red';
                return;
            }
            
            // Show loading state
            submitText.textContent = 'Sending...';
            submitSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            formMessage.classList.add('hidden');
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                    formMessage.classList.remove('hidden');
                    formMessage.style.color = 'green';
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'Failed to send message. Please try again later or email me directly at abhiramsalva@gmail.com';
                formMessage.classList.remove('hidden');
                formMessage.style.color = 'red';
            } finally {
                submitText.textContent = 'Send Message';
                submitSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // ===== CURRENT YEAR IN FOOTER =====
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== CERTIFICATION IMAGE MODAL =====
document.addEventListener('DOMContentLoaded', function() {
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certClose = document.getElementById('cert-close');

    if (certModal && certModalImg && certClose) {
        document.querySelectorAll('.cert-img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                certModalImg.src = img.src;
                certModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        certClose.addEventListener('click', function() {
            certModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
        
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                certModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
