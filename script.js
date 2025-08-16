// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Download CV button functionality
document.querySelector('.btn-primary').addEventListener('click', function() {
    // Use the PDF file in your project directory
    const pdfUrl = './resume.pdf'; // Simple filename without spaces
    
    try {
        // Create a temporary download link
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'Meet_Khatri_Resume.pdf';
        downloadLink.style.display = 'none';
        
        // Append to body, click, and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Show success message
        alert('Download started! Please check your downloads folder.');
    } catch (error) {
        // Fallback: Open in new tab if download fails
        console.log('Download failed, opening in new tab:', error);
        window.open(pdfUrl, '_blank');
        alert('Download failed. Opening PDF in new tab instead.');
    }
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.service-card, .resume-item, .portfolio-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .service-card, .resume-item, .portfolio-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate, .resume-item.animate, .portfolio-item.animate, .contact-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-title {
        animation: fadeInUp 1s ease;
    }
    
    .hero-subtitle {
        animation: fadeInUp 1s ease 0.2s both;
    }
    
    .hero-description {
        animation: fadeInUp 1s ease 0.4s both;
    }
    
    .hero-buttons {
        animation: fadeInUp 1s ease 0.6s both;
    }
    
    .hero-image {
        animation: fadeInRight 1s ease 0.8s both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.innerHTML;
    const highlightText = subtitle.querySelector('.highlight').textContent;
    
    // Reset the subtitle
    subtitle.innerHTML = `I'm a <span class="highlight"></span>`;
    const highlightSpan = subtitle.querySelector('.highlight');
    
    // Start typing effect
    setTimeout(() => {
        typeWriter(highlightSpan, highlightText, 150);
    }, 1000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add hover effects for social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        if (!this.classList.contains('discord-icon') && !this.classList.contains('instagram-icon')) {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        }
    });
    
    icon.addEventListener('mouseleave', function() {
        if (!this.classList.contains('discord-icon') && !this.classList.contains('instagram-icon')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Discord icon click to copy functionality
document.querySelector('.discord-icon').addEventListener('click', function(e) {
    e.preventDefault();
    const discordId = this.getAttribute('data-discord');
    
    // Create a temporary tooltip to show "Copied!" message
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Discord ID copied!';
    tooltip.style.cssText = `
        position: absolute;
        bottom: 140%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000000;
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 0.85rem;
        font-weight: 600;
        white-space: nowrap;
        z-index: 1001;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    this.appendChild(tooltip);
    
    // Copy to clipboard
    navigator.clipboard.writeText(discordId).then(() => {
        console.log('Discord ID copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy Discord ID: ', err);
    });
    
    // Remove tooltip after animation
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (for responsive design)
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navList = nav.querySelector('ul');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav ul {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: rgba(10, 10, 10, 0.95);
                flex-direction: column;
                padding: 1rem 0;
                backdrop-filter: blur(10px);
            }
            
            .nav ul.active {
                display: flex;
            }
            
            .nav ul li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // Insert mobile menu button
    nav.insertBefore(mobileMenuBtn, navList);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Initialize mobile menu
createMobileMenu(); 