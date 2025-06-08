// ===== FILTER CONTROLS =====
document.querySelectorAll('.filter-controls button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    const productGallery = document.querySelector('.product-gallery');
    const items = Array.from(document.querySelectorAll('.product-item'));

    // Update active button style
    document.querySelectorAll('.filter-controls button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (filter === 'all') {
      items.forEach(item => item.classList.remove('hide'));
      items.forEach(item => productGallery.appendChild(item));
    } else {
      const filteredItems = items.filter(item => item.classList.contains(filter));
      const otherItems = items.filter(item => !item.classList.contains(filter));

      filteredItems.forEach(item => item.classList.remove('hide'));
      otherItems.forEach(item => item.classList.add('hide'));

      filteredItems.forEach(item => productGallery.appendChild(item));
      otherItems.forEach(item => productGallery.appendChild(item));
    }

    // Scroll to gallery with offset
    const yOffset = -100;
    const y = productGallery.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});


// ===== BURGER MENU TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navList = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  nav.classList.toggle('open');
  navList.classList.toggle('active');
});

// Close nav when clicking a link (mobile only)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navToggle.classList.remove('active');
      nav.classList.remove('open');
      navList.classList.remove('active');
    }
  });
});


// ===== CAROUSEL FUNCTIONALITY =====
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentIndex = 0;

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = 'translateX(-' + slideWidth * position + 'px)';
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
});

// Optional: Auto slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
}, 5000);
