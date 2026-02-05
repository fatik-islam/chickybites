const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const menuTrigger = document.querySelector('.menu-zoom-trigger');
const menuLightbox = document.querySelector('#menu-lightbox');
const menuClose = document.querySelector('.menu-lightbox-close');

const openMenuLightbox = () => {
  if (!menuLightbox) return;
  menuLightbox.classList.add('is-visible');
  menuLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
};

const closeMenuLightbox = () => {
  if (!menuLightbox) return;
  menuLightbox.classList.remove('is-visible');
  menuLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
};

if (menuTrigger && menuLightbox) {
  menuTrigger.addEventListener('click', openMenuLightbox);
  menuClose?.addEventListener('click', closeMenuLightbox);
  menuLightbox.addEventListener('click', (event) => {
    if (event.target === menuLightbox) {
      closeMenuLightbox();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuLightbox.classList.contains('is-visible')) {
      closeMenuLightbox();
    }
  });
}

const whatsappButton = document.querySelector('#whatsapp-order');
const emailButton = document.querySelector('#email-order');

const orderName = document.querySelector('#order-name');
const orderPhone = document.querySelector('#order-phone');
const orderType = document.querySelector('#order-type');
const orderDetails = document.querySelector('#order-details');
const orderAddress = document.querySelector('#order-address');
const addressField = document.querySelector('#address-field');

const buildOrderMessage = () => {
  const name = orderName?.value.trim() || '—';
  const phone = orderPhone?.value.trim() || '—';
  const type = orderType?.value || 'delivery';
  const address = orderAddress?.value.trim() || '—';
  const details = orderDetails?.value.trim() || 'Please call me for the order details.';

  const lines = [
    'Chicky Bites Order',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Order Type: ${type}`,
  ];

  if (type.toLowerCase() === 'delivery') {
    lines.push(`Address: ${address}`);
  }

  lines.push(`Order: ${details}`);

  return lines.join('\n');
};

const updateAddressField = () => {
  if (!orderType || !addressField) return;
  const isDelivery = orderType.value.toLowerCase() === 'delivery';
  addressField.classList.toggle('is-hidden', !isDelivery);
  addressField.toggleAttribute('hidden', !isDelivery);
  addressField.setAttribute('aria-hidden', String(!isDelivery));
  if (!isDelivery && orderAddress) {
    orderAddress.value = '';
  }
};

if (orderType) {
  orderType.addEventListener('change', updateAddressField);
  updateAddressField();
}

if (whatsappButton) {
  whatsappButton.addEventListener('click', () => {
    const message = buildOrderMessage();
    const phoneNumber = '923338686289';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
}

if (emailButton) {
  emailButton.addEventListener('click', () => {
    const message = buildOrderMessage();
    const email = 'abdullahjutt277@gmail.com';
    const subject = 'Chicky Bites Order';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
  });
}
