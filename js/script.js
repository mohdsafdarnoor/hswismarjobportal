/**
 * AI Career Hub - JavaScript
 * Hochschule Wismar
 * 
 * Features:
 * - Mobile hamburger menu toggle
 * - Accordion functionality for AI Tools page
 * - Form submission handling
 * - Smooth scrolling
 */

// ============================
// Mobile Navigation Toggle
// ============================

document.addEventListener('DOMContentLoaded', function() {

    // Get hamburger button and mobile nav
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-mobile');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger for animation
            this.classList.toggle('active');

            // Toggle active class on mobile nav to show/hide
            mobileNav.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================
    // Accordion Functionality
    // ============================

    const accordionButtons = document.querySelectorAll('.accordion-button');

    if (accordionButtons.length > 0) {
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the parent accordion item
                const accordionItem = this.parentElement;
                const accordionContent = accordionItem.querySelector('.accordion-content');

                // Check if this accordion is currently active
                const isActive = this.classList.contains('active');

                // Close all other accordions in the same category
                const category = accordionItem.closest('.tools-category, .prompts-category');
                if (category) {
                    const allButtons = category.querySelectorAll('.accordion-button');
                    const allContents = category.querySelectorAll('.accordion-content');

                    allButtons.forEach(btn => btn.classList.remove('active'));
                    allContents.forEach(content => content.classList.remove('active'));
                }

                // Toggle the clicked accordion
                if (!isActive) {
                    this.classList.add('active');
                    accordionContent.classList.add('active');
                }
            });
        });
    }

    // ============================
    // Contact Form Handling
    // ============================

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Disable submit button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Hide any previous messages
            if (formMessage) {
                formMessage.style.display = 'none';
            }

            // Get form data
            const formData = new FormData(contactForm);

            try {
                // Submit to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Success
                    if (formMessage) {
                        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                    }

                    // Reset form
                    contactForm.reset();

                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                } else {
                    // Error
                    throw new Error(data.message || 'Something went wrong');
                }

            } catch (error) {
                // Display error message
                if (formMessage) {
                    formMessage.textContent = 'Oops! There was a problem sending your message. Please try again or contact us directly.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
                console.error('Form submission error:', error);
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            }
        });
    }

    // ============================
    // Smooth Scrolling for Anchor Links
    // ============================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal anchors (not just #)
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // Get header height for offset
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;

                    // Calculate position with offset
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================
    // Scroll to Top on Page Load (if hash in URL)
    // ============================

    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // ============================
    // Close Mobile Menu on Window Resize
    // ============================

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Close mobile menu on desktop
                if (hamburger) hamburger.classList.remove('active');
                if (mobileNav) mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ============================
    // Form Field Enhancements
    // ============================

    // Add visual feedback for form fields
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');

            // Add filled class if has value
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });

        // Check on load if already filled
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
    });

    // ============================
    // External Links - Open in New Tab
    // ============================

    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach(link => {
        // Only add target="_blank" if not already set
        if (!link.hasAttribute('target')) {
            // Check if link is external (not same domain)
            const linkHost = new URL(link.href).hostname;
            const currentHost = window.location.hostname;

            if (linkHost !== currentHost) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });

    // ============================
    // Lazy Loading for Images (if needed)
    // ============================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
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
    }

    // ============================
    // Accessibility: Keyboard Navigation for Accordions
    // ============================

    accordionButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            // Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ============================
    // Console Welcome Message
    // ============================

    console.log('%cAI Career Hub', 'font-size: 20px; font-weight: bold; color: #339933;');
    console.log('%cHochschule Wismar - University of Applied Sciences', 'font-size: 14px; color: #2f3229;');
    console.log('%cMaster's in International Management Project', 'font-size: 12px; color: #666;');
    console.log('---');
    console.log('Website loaded successfully! ✓');

});

// ============================
// Service Worker Registration (Optional - for PWA)
// ============================

// Uncomment if you want to add PWA functionality later
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// ============================
// Analytics (Optional)
// ============================

// Add your analytics code here if needed
// Example: Google Analytics, Matomo, etc.

// ============================
// Error Handling
// ============================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here if needed
});

// ============================
// Print Functionality Enhancement
// ============================

window.addEventListener('beforeprint', function() {
    // Close all accordions before printing
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach(content => {
        content.classList.add('active');
    });
});

window.addEventListener('afterprint', function() {
    // Restore accordion state after printing
    // (optional - you might want to keep them open)
});
