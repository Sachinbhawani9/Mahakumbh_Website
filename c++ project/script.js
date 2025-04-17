// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Image Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    });
});

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
});

// Form Submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Add animation to event cards on scroll
const eventCards = document.querySelectorAll('.event-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

eventCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Countdown Timer
function updateCountdown() {
    const nextBathingDate = new Date('2025-01-14T00:00:00');
    const now = new Date();
    const diff = nextBathingDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Weather Widget
async function updateWeather() {
    try {
        console.log('Fetching weather data...');
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Prayagraj&aqi=no');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data received:', data);
        
        if (data.current) {
            document.querySelector('.temperature').textContent = `${Math.round(data.current.temp_c)}°C`;
            document.querySelector('.condition').textContent = data.current.condition.text;
            
            // Update weather icon based on condition
            const weatherIcon = document.querySelector('.weather-info i');
            const condition = data.current.condition.text.toLowerCase();
            
            if (condition.includes('rain')) {
                weatherIcon.className = 'fas fa-cloud-rain';
            } else if (condition.includes('cloud')) {
                weatherIcon.className = 'fas fa-cloud';
            } else if (condition.includes('sun') || condition.includes('clear')) {
                weatherIcon.className = 'fas fa-sun';
            } else if (condition.includes('snow')) {
                weatherIcon.className = 'fas fa-snowflake';
            } else if (condition.includes('thunder')) {
                weatherIcon.className = 'fas fa-bolt';
            } else {
                weatherIcon.className = 'fas fa-cloud-sun';
            }
        } else {
            throw new Error('Invalid weather data received');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        // Show fallback message
        document.querySelector('.temperature').textContent = '--°C';
        document.querySelector('.condition').textContent = 'Weather data unavailable';
        document.querySelector('.weather-info i').className = 'fas fa-exclamation-circle';
    }
}

// Call updateWeather immediately when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
    // Update every 30 minutes
    setInterval(updateWeather, 1800000);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
}); 