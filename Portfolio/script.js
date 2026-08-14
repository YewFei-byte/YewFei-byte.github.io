// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Expandable git-log entries
document.querySelectorAll('.log-node').forEach((btn) => {
  btn.addEventListener('click', () => {
    const entry = btn.closest('.log-entry');
    const isOpen = entry.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

// Open the most recent entry by default
const firstEntry = document.querySelector('.log-entry');
if (firstEntry) {
  firstEntry.classList.add('is-open');
  firstEntry.querySelector('.log-node').setAttribute('aria-expanded', 'true');
}
