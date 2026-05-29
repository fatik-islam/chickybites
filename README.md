# Chicky Bites Website

Static marketing website for Chicky Bites Pakistan. The site highlights the menu, deals, branch locations, contact details, and ordering flows for the Jalalpur Jattan and Karianwala branches.

## Stack

- HTML
- CSS
- Vanilla JavaScript

There is no framework, build step, or backend in this repository.

## Features

- Responsive landing page for desktop and mobile
- Sticky header with mobile navigation
- Mobile header `Order Now` shortcut
- `Call to Order` branch picker with both phone numbers
- Full menu image with lightbox zoom
- Long-form typed menu content for easier reading
- WhatsApp order form that builds a prefilled message by branch
- Branch details, social links, testimonials, and delivery info

## Project Structure

```text
.
├── assets/
│   ├── logo.png
│   └── menu.jpg
├── index.html
├── styles.css
├── script.js
├── package.json
└── package-lock.json
```

## Run Locally

Because this is a static site, the simplest options are:

1. Open `index.html` directly in a browser.
2. Use a static server such as VS Code Live Server.

This workspace already includes a Live Server setting in `.vscode/settings.json` using port `5501`.

## Main Files

- `index.html`
  Contains all page sections, content, branch info, contact links, order form, and modal markup.
- `styles.css`
  Controls layout, colors, typography, responsive behavior, mobile navigation, and modal styling.
- `script.js`
  Handles the mobile nav toggle, reveal-on-scroll animation, menu lightbox, call modal, and WhatsApp order message generation.

## Ordering Flow

The site currently supports two order entry points:

- `Call to Order`
  Opens a modal with both branch names and clickable phone numbers.
- `Order Now`
  Scrolls directly to the order form.

The order form lets the visitor:

- enter name and phone number
- choose a branch
- choose delivery or pickup
- add an address for delivery
- enter order details
- open WhatsApp with a prefilled message

## Branch Information

Current branches included on the site:

- Jalalpur Jattan (Main Branch)
  Phone: `+92-333-8686289`
  Hours: `11 AM - 2 AM`
- Karianwala Branch
  Phone: `+92-307-2967000`
  Hours: `11 AM - 1 AM`

## Content Updates

Common updates can be made here:

- Menu items and prices: `index.html`
- Branch phone numbers, addresses, hours, Instagram, TikTok: `index.html`
- WhatsApp branch routing and message format: `script.js`
- Colors, spacing, buttons, responsive layout: `styles.css`
- Logo and menu image: `assets/`

## Notes

- `package.json` is minimal and does not define a real dev or build workflow.
- The `test` script is only a placeholder.
- If you want a production workflow later, a small static hosting setup on Netlify, Vercel, or Cloudflare Pages would fit this project well.
