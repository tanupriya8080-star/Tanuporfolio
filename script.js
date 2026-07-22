// Mobile navigation and smooth page interactions
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksList = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const toTopButton = document.getElementById('to-top');
const typingText = document.getElementById('typing-text');
const year = document.getElementById('year');
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksList.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const setActiveLink = () => {
  const scrollDistance = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollDistance >= sectionTop && scrollDistance < sectionBottom) {
      navLinksList.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', () => {
  setActiveLink();

  if (window.scrollY > 500) {
    toTopButton?.classList.add('show');
  } else {
    toTopButton?.classList.remove('show');
  }
});

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// Typing effect in the hero section
const typedPhrases = [
  'front-end developer',
  'problem solver',
  'data analytics enthusiast',
  'lifelong learner'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeLoop = () => {
  const currentPhrase = typedPhrases[phraseIndex];

  if (!typingText) {
    return;
  }

  if (!isDeleting && charIndex < currentPhrase.length) {
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex -= 1;
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    }
  }

  const speed = isDeleting ? 70 : 110;
  setTimeout(typeLoop, speed);
};

typeLoop();

// Simple front-end contact form validation
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields before sending your message.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    formMessage.textContent = 'Thank you for reaching out. This form is front-end only for now.';
    form.reset();
  });
}

setActiveLink();
