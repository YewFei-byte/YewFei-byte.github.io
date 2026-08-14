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

// Gallery carousel — swipe, arrow buttons, keyboard arrows, dots
(function initCarousel() {
  const root = document.getElementById('carousel');
  if (!root) return;

  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  let index = 0;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Keyboard arrows — works when the carousel (or a child) has focus,
  // or when it's the nearest section in view.
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Also listen globally, but only act if the gallery section is roughly in view.
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === root || root.contains(document.activeElement)) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const rect = root.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
    if (!inView) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch / pointer swipe
  function onPointerDown(e) {
    isDragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    deltaX = 0;
    track.style.transition = 'none';
  }
  function onPointerMove(e) {
    if (!isDragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    deltaX = x - startX;
    const percent = (deltaX / root.clientWidth) * 100;
    track.style.transform = `translateX(calc(-${index * 100}% + ${percent}%))`;
  }
  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const threshold = root.clientWidth * 0.18;
    if (deltaX > threshold) prev();
    else if (deltaX < -threshold) next();
    else update();
  }

  track.addEventListener('touchstart', onPointerDown, { passive: true });
  track.addEventListener('touchmove', onPointerMove, { passive: true });
  track.addEventListener('touchend', onPointerUp);

  track.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  update();
})();
