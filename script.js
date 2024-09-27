// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate impact numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.impact-number');
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS

        const timer = setInterval(() => {
            count += increment;
            number.textContent = Math.floor(count);
            if (count >= target) {
                number.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

// Intersection Observer for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'impact') {
                animateNumbers();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// type writer effect
function typeWriter(element, text, speed = 50) {
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

// Usage
const paragraph = document.querySelector('.typewriter');
typeWriter(paragraph, paragraph.textContent);