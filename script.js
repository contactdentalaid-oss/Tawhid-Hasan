// script.js - Complete JavaScript for Dr. Tawhid Hasan's Dental Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. GLOBAL VARIABLES
    // ======================
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const appointmentForm = document.getElementById('appointmentForm');
    const formMessage = document.getElementById('form-message');
    const currentYear = document.getElementById('current-year');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    // ======================
    // 2. INITIALIZATION
    // ======================
    function init() {
        // Set current year in footer
        setCurrentYear();
        
        // Set minimum date for appointment (today)
        setMinDate();
        
        // Set default date (tomorrow)
        setDefaultDate();
        
        // Load saved theme preference
        loadThemePreference();
        
        // Set up form validation
        initFormValidation();
        
        // Update active nav link on scroll
        window.addEventListener('scroll', updateActiveNavLink);
        
        // Initialize WhatsApp button with default message
        initWhatsAppButton();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Set up intersection observer for animations
        initAnimations();
    }
    
    // ======================
    // 3. THEME MANAGEMENT
    // ======================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        updateThemeIcons();
        saveThemePreference();
        updateWhatsAppButtonTheme();
    }
    
    function updateThemeIcons() {
        const icon = document.querySelector('#theme-toggle i');
        const iconMobile = document.querySelector('#theme-toggle-mobile i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            if (iconMobile) iconMobile.className = 'fas fa-sun';
            console.log('Dark mode activated');
        } else {
            icon.className = 'fas fa-moon';
            if (iconMobile) iconMobile.className = 'fas fa-moon';
            console.log('Light mode activated');
        }
    }
    
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        
        // Check system preference if no saved theme
        if (!savedTheme) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                document.body.classList.add('dark-mode');
            }
        } else if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        updateThemeIcons();
    }
    
    function saveThemePreference() {
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('portfolio-theme', theme);
    }
    
    function updateWhatsAppButtonTheme() {
        // In dark mode, make WhatsApp button more visible
        if (document.body.classList.contains('dark-mode')) {
            whatsappBtn.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.5)';
        } else {
            whatsappBtn.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
        }
    }
    
    // ======================
    // 4. MOBILE NAVIGATION
    // ======================
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ======================
    // 5. FORM HANDLING
    // ======================
    function initFormValidation() {
        // Add input validation for phone number
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', validatePhoneNumber);
        
        // Add input validation for email
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', validateEmail);
        
        // Add real-time validation for required fields
        const requiredInputs = document.querySelectorAll('input[required], select[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', validateRequiredField);
        });
    }
    
    function validatePhoneNumber(e) {
        const phone = e.target.value;
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        
        if (phone && !phoneRegex.test(phone)) {
            e.target.style.borderColor = '#e74c3c';
            return false;
        } else {
            e.target.style.borderColor = '#2a9d8f';
            return true;
        }
    }
    
    function validateEmail(e) {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#e74c3c';
            return false;
        } else {
            e.target.style.borderColor = '#2a9d8f';
            return true;
        }
    }
    
    function validateRequiredField(e) {
        if (!e.target.value.trim()) {
            e.target.style.borderColor = '#e74c3c';
            return false;
        } else {
            e.target.style.borderColor = '#2a9d8f';
            return true;
        }
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all required fields
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const date = document.getElementById('date');
        const time = document.getElementById('time');
        
        let isValid = true;
        
        // Check required fields
        if (!name.value.trim()) {
            name.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!phone.value.trim()) {
            phone.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!date.value) {
            date.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!time.value) {
            time.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Validate phone format
        if (phone.value && !validatePhoneNumber({ target: phone })) {
            isValid = false;
        }
        
        // Validate email if provided
        const email = document.getElementById('email');
        if (email.value && !validateEmail({ target: email })) {
            isValid = false;
        }
        
        if (!isValid) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual EmailJS/FormSubmit integration)
            await sendAppointmentData();
            
            // Show success message
            showFormMessage('Appointment request sent successfully! We will contact you shortly to confirm.', 'success');
            
            // Reset form
            appointmentForm.reset();
            
            // Set default date again
            setDefaultDate();
            
            // Send confirmation email (simulated)
            sendConfirmationEmail();
            
        } catch (error) {
            console.error('Error sending appointment:', error);
            showFormMessage('Failed to send appointment request. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    function sendAppointmentData() {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // In a real implementation, you would:
                // 1. Use EmailJS: emailjs.sendForm('service_id', 'template_id', appointmentForm)
                // 2. Use FormSubmit: fetch(appointmentForm.action, { method: 'POST', body: new FormData(appointmentForm) })
                // 3. Or use a custom backend endpoint
                
                // For demo purposes, log the data
                const formData = new FormData(appointmentForm);
                const data = Object.fromEntries(formData);
                console.log('Appointment Data:', data);
                
                // Simulate 90% success rate
                Math.random() > 0.1 ? resolve() : reject(new Error('Simulated network error'));
            }, 1500);
        });
    }
    
    function sendConfirmationEmail() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (!email) return;
        
        // This would be handled by your email service
        console.log(`Confirmation email sent to ${name} at ${email}`);
        
        // For EmailJS integration, you would add:
        /*
        emailjs.send('service_id', 'confirmation_template_id', {
            to_name: name,
            to_email: email,
            // ... other template parameters
        });
        */
    }
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // ======================
    // 6. DATE & TIME HANDLING
    // ======================
    function setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    function setDefaultDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        dateInput.value = tomorrowFormatted;
    }
    
    function setCurrentYear() {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // ======================
    // 7. WHATSAPP INTEGRATION
    // ======================
    function initWhatsAppButton() {
        // Update WhatsApp URL with current form data when clicked
        whatsappBtn.addEventListener('click', function(e) {
            const name = document.getElementById('name').value || '';
            const date = document.getElementById('date').value || '';
            const time = document.getElementById('time').value || '';
            const message = document.getElementById('message').value || '';
            
            let timeText = '';
            switch(time) {
                case 'morning': timeText = 'Morning (9 AM - 12 PM)'; break;
                case 'afternoon': timeText = 'Afternoon (2 PM - 5 PM)'; break;
                case 'evening': timeText = 'Evening (6 PM - 8 PM)'; break;
                default: timeText = '';
            }
            
            const prefilledMessage = `Hello Doctor,\nI would like to book an appointment.\nName: ${name}\nPreferred Date: ${date}\nPreferred Time: ${timeText}\nReason for Visit: ${message}`;
            const encodedMessage = encodeURIComponent(prefilledMessage);
            
            // Update the href with the new message
            this.href = `https://wa.me/8801856030508?text=${encodedMessage}`;
            
            // Analytics/logging (optional)
            console.log('WhatsApp appointment button clicked');
            logWhatsAppClick();
        });
    }
    
    function logWhatsAppClick() {
        // In a real implementation, you might want to track this
        const clickData = {
            timestamp: new Date().toISOString(),
            action: 'whatsapp_click',
            url: window.location.href
        };
        console.log('WhatsApp click logged:', clickData);
    }
    
    // ======================
    // 8. SMOOTH SCROLLING & NAVIGATION
    // ======================
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's not an anchor link
                if (!href.startsWith('#')) return;
                
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update navbar style on scroll
        updateNavbarStyle();
    }
    
    function updateNavbarStyle() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 20px var(--shadow)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 2px 10px var(--shadow)';
            navbar.style.backdropFilter = 'none';
        }
    }
    
    // ======================
    // 9. ANIMATIONS & EFFECTS
    // ======================
    function initAnimations() {
        // Add intersection observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .timeline-content, .contact-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .service-card, .timeline-content, .contact-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Stagger animation for service cards */
            .service-card:nth-child(1) { transition-delay: 0.1s; }
            .service-card:nth-child(2) { transition-delay: 0.2s; }
            .service-card:nth-child(3) { transition-delay: 0.3s; }
            .service-card:nth-child(4) { transition-delay: 0.4s; }
            .service-card:nth-child(5) { transition-delay: 0.5s; }
            .service-card:nth-child(6) { transition-delay: 0.6s; }
        `;
        document.head.appendChild(style);
    }
    
    // ======================
    // 10. EVENT LISTENERS
    // ======================
    function setupEventListeners() {
        // Theme toggles
        themeToggle.addEventListener('click', toggleDarkMode);
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', toggleDarkMode);
        }
        
        // Mobile menu
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', closeMobileMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Form submission
        appointmentForm.addEventListener('submit', handleFormSubmit);
        
        // Window resize - close mobile menu on large screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Keyboard navigation for form
        appointmentForm.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const formElements = Array.from(appointmentForm.elements);
                const currentIndex = formElements.indexOf(e.target);
                
                if (currentIndex > -1 && currentIndex < formElements.length - 1) {
                    formElements[currentIndex + 1].focus();
                }
            }
        });
    }
    
    // ======================
    // 11. UTILITY FUNCTIONS
    // ======================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ======================
    // 12. INITIALIZE APP
    // ======================
    init();
    setupEventListeners();
    
    // Add a small delay before triggering initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Console welcome message
    console.log('Dr. Tawhid Hasan Dental Portfolio initialized successfully!');
    console.log('For production:');
    console.log('1. Integrate with EmailJS for form submissions');
    console.log('2. Add Google Analytics tracking');
    console.log('3. Optimize images for production');
});
