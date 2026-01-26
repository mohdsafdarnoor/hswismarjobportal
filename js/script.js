// AI Career Hub - JavaScript
// Hochschule Wismar - 2026

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');

    if (hamburger && navMobile) {
        hamburger.addEventListener('click', function() {
            navMobile.classList.toggle('active');
        });
    }
});

// Toggle Category (AI Tools page)
function toggleCategory(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        content.style.display = 'none';
        arrow.textContent = '▼';
    }
}

// Toggle Phase (AI Tools page)
function togglePhase(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('.arrow');

    // Close all other phases in same category
    const category = button.closest('.category-content');
    const allPhases = category.querySelectorAll('.phase-content');
    const allButtons = category.querySelectorAll('.phase-button');

    allPhases.forEach((phase, index) => {
        if (phase !== content) {
            phase.classList.remove('active');
            allButtons[index].classList.remove('active');
            allButtons[index].querySelector('.arrow').textContent = '▼';
        }
    });

    // Toggle current phase
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        button.classList.remove('active');
        arrow.textContent = '▼';
    } else {
        content.classList.add('active');
        button.classList.add('active');
        arrow.textContent = '▲';
    }
}

// Toggle Prompt (AI Prompts page)
function togglePrompt(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        content.style.display = 'none';
        arrow.textContent = '▼';
    }
}

// Copy Prompt to Clipboard
function copyPrompt(element) {
    const text = element.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(function() {
        // Visual feedback
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = '#339933';
        element.style.color = 'white';

        // Show "Copied!" message
        const originalText = element.innerHTML;
        element.innerHTML = '✓ Copied to clipboard!';

        setTimeout(function() {
            element.style.backgroundColor = originalBg;
            element.style.color = '';
            element.innerHTML = originalText;
        }, 1500);
    }).catch(function(err) {
        alert('Could not copy text. Please select and copy manually.');
    });
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    alert('✓ Message sent successfully! We will get back to you soon.');
                    form.reset();
                } else {
                    alert('✗ There was an error. Please try again or email us directly.');
                }
            } catch (error) {
                alert('✗ There was an error. Please try again or email us directly.');
            }
        });
    }
});

console.log('✓ AI Career Hub loaded - Hochschule Wismar 2026');
