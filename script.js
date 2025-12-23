// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
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

// ===== Detail Showcase Hotspots =====
const hotspots = document.querySelectorAll('.hotspot');
const detailCards = document.querySelectorAll('.detail-card');

hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        const detail = hotspot.dataset.detail;
        
        // Remove active from all cards
        detailCards.forEach(card => card.classList.remove('active'));
        
        // Add active to target card
        const targetCard = document.getElementById(`detail-${detail}`);
        if (targetCard) {
            targetCard.classList.add('active');
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Also allow clicking on detail cards
detailCards.forEach(card => {
    card.addEventListener('click', () => {
        detailCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// ===== Countdown Timer =====
function updateCountdown() {
    // Set target date 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);
    
    // Store in localStorage if not already set
    if (!localStorage.getItem('countdownTarget')) {
        localStorage.setItem('countdownTarget', targetDate.getTime());
    }
    
    const storedTarget = parseInt(localStorage.getItem('countdownTarget'));
    const now = new Date().getTime();
    const distance = storedTarget - now;
    
    if (distance < 0) {
        // Reset countdown if expired
        localStorage.removeItem('countdownTarget');
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== Smooth Scroll for Navigation Links =====
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

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .product-card, .glass-card, .testimonial-card, .custom-step-card, .bts-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ===== Product Quick View (Simple Alert for Demo) =====
document.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        alert(`Quick View: ${productName}\n\nFitur Quick View akan menampilkan detail produk dalam modal popup.`);
    });
});

// ===== Add to Cart (Simple Alert for Demo) =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        
        // Simple animation
        btn.innerHTML = '<span class="material-symbols-outlined">check</span>';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        setTimeout(() => {
            btn.innerHTML = '<span class="material-symbols-outlined">add_shopping_cart</span>';
            btn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        }, 1500);
    });
});

console.log('JerseyKita website loaded successfully! 🏆');
