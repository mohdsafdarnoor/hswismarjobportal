// AI Career Hub - JavaScript
// Hochschule Wismar - Master's in International Management

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMobile.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMobile && navMobile.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMobile && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMobile) {
                hamburger.classList.remove('active');
                navMobile.classList.remove('active');
            }
        });
    });
});

// Accordion Functionality for AI Tools page
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other accordions in the same category
            const category = accordionItem.closest('.tools-category');
            if (category) {
                const allAccordions = category.querySelectorAll('.accordion-item');
                allAccordions.forEach(item => {
                    if (item !== accordionItem) {
                        item.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
                        item.querySelector('.accordion-content').style.maxHeight = '0';
                    }
                });
            }

            // Toggle current accordion
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                accordionContent.style.maxHeight = '0';
            } else {
                this.setAttribute('aria-expanded', 'true');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
        });
    });
});

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#' && targetId !== '') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Copy Prompt Functionality (for future enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const promptBoxes = document.querySelectorAll('.prompt-box');

    promptBoxes.forEach(box => {
        // Add a visual indicator that the prompt is copyable
        box.style.cursor = 'pointer';
        box.title = 'Click to copy prompt';

        box.addEventListener('click', function() {
            const textToCopy = this.textContent;

            // Create temporary textarea to copy text
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');

                // Visual feedback
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = '#339933';
                this.style.color = 'white';

                // Create "Copied!" notification
                const notification = document.createElement('span');
                notification.textContent = '✓ Copied!';
                notification.style.cssText = 'position: absolute; background: #339933; color: white; padding: 5px 10px; border-radius: 4px; font-size: 14px; margin-left: 10px; animation: fadeOut 2s forwards;';
                this.parentElement.style.position = 'relative';
                this.parentElement.appendChild(notification);

                setTimeout(() => {
                    this.style.backgroundColor = originalBg;
                    this.style.color = '';
                    notification.remove();
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text:', err);
            }

            document.body.removeChild(textarea);
        });
    });
});

// Form Submission Handler for Contact Page
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formMessage = document.getElementById('formMessage');
            const submitBtn = document.getElementById('submitBtn');

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(contactForm);

            // Submit to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#d4edda';
                    formMessage.style.color = '#155724';
                    formMessage.style.border = '1px solid #c3e6cb';
                    formMessage.style.padding = '15px';
                    formMessage.style.borderRadius = '5px';
                    formMessage.style.marginBottom = '20px';

                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                formMessage.textContent = '✗ Sorry, there was an error sending your message. Please try again or contact us directly via email.';
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.border = '1px solid #f5c6cb';
                formMessage.style.padding = '15px';
                formMessage.style.borderRadius = '5px';
                formMessage.style.marginBottom = '20px';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
});

// Scroll-to-Top Button (Optional Enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #339933;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#2d7d2d';
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#339933';
        this.style.transform = 'scale(1)';
    });
});

// Add fade-in animation to cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.feature-card, .tool-card, .prompt-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

console.log('✓ AI Career Hub JavaScript loaded - Hochschule Wismar');
