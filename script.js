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

const callButton = document.querySelector('#call-to-order');
const callLightbox = document.querySelector('#call-lightbox');
const callClose = document.querySelector('.call-lightbox-close');

const setLightboxState = () => {
  const isMenuOpen = menuLightbox?.classList.contains('is-visible');
  const isCallOpen = callLightbox?.classList.contains('is-visible');
  document.body.classList.toggle('lightbox-open', Boolean(isMenuOpen || isCallOpen));
};

const openMenuLightbox = () => {
  if (!menuLightbox) return;
  menuLightbox.classList.add('is-visible');
  menuLightbox.setAttribute('aria-hidden', 'false');
  setLightboxState();
};

const closeMenuLightbox = () => {
  if (!menuLightbox) return;
  menuLightbox.classList.remove('is-visible');
  menuLightbox.setAttribute('aria-hidden', 'true');
  setLightboxState();
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

const openCallLightbox = () => {
  if (!callLightbox) return;
  callLightbox.classList.add('is-visible');
  callLightbox.setAttribute('aria-hidden', 'false');
  setLightboxState();
};

const closeCallLightbox = () => {
  if (!callLightbox) return;
  callLightbox.classList.remove('is-visible');
  callLightbox.setAttribute('aria-hidden', 'true');
  setLightboxState();
};

if (callButton && callLightbox) {
  callButton.addEventListener('click', openCallLightbox);
  callClose?.addEventListener('click', closeCallLightbox);
  callLightbox.addEventListener('click', (event) => {
    if (event.target === callLightbox) {
      closeCallLightbox();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && callLightbox.classList.contains('is-visible')) {
      closeCallLightbox();
    }
  });
}

const whatsappButton = document.querySelector('#whatsapp-order');

const orderName = document.querySelector('#order-name');
const orderPhone = document.querySelector('#order-phone');
const orderBranch = document.querySelector('#order-branch');
const orderType = document.querySelector('#order-type');
const orderDetails = document.querySelector('#order-details');
const orderAddress = document.querySelector('#order-address');
const addressField = document.querySelector('#address-field');

const branchMap = {
  jalalpur: {
    label: 'Jalalpur Jattan (Main Branch)',
    phone: '923338686289',
  },
  karianwala: {
    label: 'Karianwala Branch',
    phone: '923072967000',
  },
};

const getSelectedBranch = () => {
  const key = orderBranch?.value || 'jalalpur';
  return branchMap[key] || branchMap.jalalpur;
};

const buildOrderMessage = () => {
  const branch = getSelectedBranch();
  const name = orderName?.value.trim() || '—';
  const phone = orderPhone?.value.trim() || '—';
  const type = orderType?.value || 'delivery';
  const address = orderAddress?.value.trim() || '—';
  const details = orderDetails?.value.trim() || 'Please call me for the order details.';

  const lines = [
    'Chicky Bites Order',
    `Branch: ${branch.label}`,
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
    const { phone: phoneNumber } = getSelectedBranch();
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
}
