const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('open', open);
});
nav?.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); menu?.focus(); }
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
const cfg = window.BTW_CONFIG || {};
const form = document.querySelector('#contact-form');
if (form && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.contactEmail || '')) {
  const btn = form.querySelector('button');
  const status = document.querySelector('#form-status');
  btn.disabled = false;
  btn.textContent = 'Prepare email ↗';
  status.textContent = 'Your message opens in your email app for you to review and send.';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Name: ${data.get('name')}\nReply email: ${data.get('email')}\n\n${data.get('message')}`;
    status.textContent = 'Email requested. Your message has not been sent by this website. Review and send it in your email app, or use the direct email address below.';
    window.location.href = `mailto:${cfg.contactEmail}?subject=${encodeURIComponent('Beyond Walls New Paths: ' + data.get('topic'))}&body=${encodeURIComponent(body)}`;
  });
} else {
  form?.addEventListener('submit', event => event.preventDefault());
}
// Enabling payments also requires approved legal/tax wording and receiving arrangements.
if (cfg.donationsApproved === true && cfg.donationUrl) {
  try {
    const url = new URL(cfg.donationUrl);
    const link = document.querySelector('#donate-link');
    if (url.protocol === 'https:' && link) {
      link.href = url.href;
      link.textContent = 'Support the mission ↗';
      link.rel = 'noopener noreferrer';
      link.target = '_blank';
      document.querySelector('#donation-status').textContent = 'Continue to the secure donation provider. Review the current tax-status disclosure before giving.';
    }
  } catch { /* Keep the inquiry link when the configured URL is invalid. */ }
}
