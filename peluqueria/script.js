// Simple fade-in animation on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Hero Color
    const hero = document.querySelector('.hero-section');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('reveal-color');
        }, 800);
    }

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply to elements if we add more dynamic classes later
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'todos' && btn.innerText.toLowerCase() === 'todos')) {
            btn.classList.add('active');
        }
    });

    items.forEach(item => {
        if (category === 'todos') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

