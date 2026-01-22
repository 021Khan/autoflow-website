// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.getElementById('navActions');

    mobileToggle.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        
        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    function openMobileMenu() {
        navMenu.classList.add('active');
        navActions.classList.add('active');
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        mobileToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navActions.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', 'false');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.nav-actions') &&
            !event.target.closest('.mobile-toggle')) {
            closeMobileMenu();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Prevent default only for internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Calculate scroll position
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('#fullName').value;
            const phone = this.querySelector('#phoneNumber').value;
            const email = this.querySelector('#emailAddress').value;
            const business = this.querySelector('#businessName').value;
            const message = this.querySelector('#message').value;
            
            // Basic validation
            if (!name || !phone || !email) {
                alert('Please fill in all required fields (Name, Phone, and Email).');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // Success message
                alert(`Thank you ${name}! ✅\n\nWe have received your information:\n📞 Phone: ${phone}\n📧 Email: ${email}\n🏢 Business: ${business || 'Not specified'}\n\nWe will contact you within 24 hours at ${phone} or ${email}.\n\nThank you for choosing AutoFLOW! 🚗`);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top of form for confirmation
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        });
    }

    // Feature cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Animate testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if button is not disabled
            if (this.disabled) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form input animations
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format for South African numbers
            if (value.length > 0) {
                if (value.startsWith('0')) {
                    // Format as 0XX XXX XXXX
                    if (value.length <= 3) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.replace(/(\d{3})(\d+)/, '$1 $2');
                    } else {
                        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
                    }
                } else if (value.startsWith('27')) {
                    // Format as +27 XX XXX XXXX
                    value = '+27 ' + value.substring(2);
                    if (value.length > 6) {
                        value = value.replace(/^(\+27 \d{2})(\d+)/, '$1 $2');
                    }
                    if (value.length > 10) {
                        value = value.replace(/^(\+27 \d{2} \d{3})(\d+)/, '$1 $2');
                    }
                }
            }
            
            e.target.value = value;
        });
    }

    // Add CSS for animations if not already present
    if (!document.querySelector('#autoflow-styles')) {
        const style = document.createElement('style');
        style.id = 'autoflow-styles';
        style.textContent = `
            .form-group.focused .form-label {
                color: var(--primary);
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize scroll animations
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Handle page load animations
window.addEventListener('load', function() {
    // Add loaded class to body for fade-in effect
    document.body.classList.add('loaded');
    
    // Animate hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});