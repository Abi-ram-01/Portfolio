document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        // Animate burger lines
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
            
            // Animate cards sequentially
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

    // Animate project cards
    animateOnScroll(document.querySelectorAll('.project-card'), 'animate');
    
    // Animate skill items
    animateOnScroll(document.querySelectorAll('.skill-item'), 'animate');

    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
            const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            this.reset();
        });
    }

    // ===== CURRENT YEAR IN FOOTER =====
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // ===== THREE.JS SETUP (OPTIONAL) =====
    // Initialize only if Three.js is loaded and element exists
    if (typeof THREE !== 'undefined' && document.getElementById('threejs-container')) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs-container').appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});

// ===== WINDOW LOAD EVENT FOR ADDITIONAL FUNCTIONALITY =====
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
    // Modal elements
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certClose = document.getElementById('cert-close');

    // Open modal on certification image click
    document.querySelectorAll('.cert-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            certModalImg.src = img.src;
            certModal.classList.add('show');
        });
    });

    // Close modal on close button or outside click
    if (certClose) {
        certClose.addEventListener('click', function() {
            certModal.classList.remove('show');
        });
    }
    if (certModal) {
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) certModal.classList.remove('show');
        });
    }
});