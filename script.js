document.addEventListener('DOMContentLoaded', () => {

  // Measure path lengths dynamically for cursive hello SVG animation
  const helloPaths = document.querySelectorAll('.hello-path');
  helloPaths.forEach(path => {
    const length = path.getTotalLength();
    path.style.setProperty('--path-length', length + 'px');
  });

  // Preloader / Splash Screen flow
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    const hidePreloader = () => {
      setTimeout(() => {
        splashScreen.classList.add('fade-out');
      }, 2500);
    };

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }
    
    // Safety fallback in case loading events hang
    setTimeout(() => {
      if (!splashScreen.classList.contains('fade-out')) {
        splashScreen.classList.add('fade-out');
      }
    }, 4000);
  }

  // Mobile Menu navigation toggle
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      document.body.classList.add('disable-scroll');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.classList.remove('disable-scroll');
    });
  }

  // Auto-close menu when choosing navigation items
  const navLinks = document.querySelectorAll('.nav__link');
  function linkAction() {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('disable-scroll');
  }
  navLinks.forEach(link => link.addEventListener('click', linkAction));

  // Add scroll-header styling when scrolling down
  const header = document.getElementById('header');
  function scrollHeader() {
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }
  window.addEventListener('scroll', scrollHeader);
  scrollHeader(); // Check on initial load

  // ScrollSpy - active link highlighting based on current section
  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    });
  }
  window.addEventListener('scroll', scrollActive);
  scrollActive();

  // Scroll Up utility button visibility
  const scrollUpButton = document.getElementById('scroll-up');
  function showScrollUp() {
    if (window.scrollY >= 350) {
      scrollUpButton.classList.add('show-scroll');
    } else {
      scrollUpButton.classList.remove('show-scroll');
    }
  }
  window.addEventListener('scroll', showScrollUp);
  showScrollUp();

  // Typewriter effect in Hero header
  const typingText = document.getElementById('typing-text');
  const occupations = ['GMI student', 'ArchLinux user', 'UI/UX Designer', 'CRM Student' ,'Roblox UI Programmer', 'He', 'Hee hee - Michael Jackson'];
  let occupationsIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentText = occupations[occupationsIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = 100;
    if (isDeleting) speed = 50;

    // Handle typing pauses and transitions
    if (!isDeleting && charIndex === currentText.length) {
      speed = 2000; // Pause at completed text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      occupationsIndex = (occupationsIndex + 1) % occupations.length;
      speed = 500; // Brief pause before typing next word
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // Contact form client-side processing & API simulation
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('contact-status-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const submitBtn = contactForm.querySelector('.contact__form-btn');

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.style.pointerEvents = 'none';

      // Simulate network request latency
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.pointerEvents = 'auto';

        showStatus('Message sent successfully! Thanks for reaching out.', 'success');
        contactForm.reset();

        setTimeout(() => {
          if (statusMsg) statusMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.textContent = text;
    statusMsg.className = `contact__status-message ${type}`;
    statusMsg.style.display = 'block';
  }

});
