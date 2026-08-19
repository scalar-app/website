/**
 * The site's motion, in one file.
 *
 * Three behaviours, all progressive: without this script every element is visible,
 * every card is still a card, and the header still has a border. Nothing here is
 * load bearing for reading the page.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Tells the inline head script that motion took over, so it cancels its failsafe. */
document.documentElement.setAttribute('data-motion-ready', '');

const reveal = (el) => el.setAttribute('data-revealed', '');

/**
 * Releases [data-reveal] elements as they come into view, once each.
 *
 * Anything already on screen is released straight away rather than waiting for the
 * observer. An IntersectionObserver only reports once the page has been laid out and
 * painted, which never happens in a tab that opened in the background or in a crawler
 * that does not paint, and the whole page would sit at opacity zero until it did.
 */
function revealOnScroll() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    targets.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    // Fires slightly before the element reaches the fold, so the movement finishes
    // as it arrives rather than starting after it is already being read.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );

  for (const el of targets) {
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      reveal(el);
      continue;
    }
    observer.observe(el);
  }
}

/** Points the .spotlight highlight at the cursor. */
function spotlights() {
  if (reduced.matches || !window.matchMedia('(hover: hover)').matches) return;

  for (const card of document.querySelectorAll('.spotlight')) {
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${String(event.clientX - box.left)}px`);
      card.style.setProperty('--my', `${String(event.clientY - box.top)}px`);
    });
  }
}

/** Marks the header once the page is scrolled, so it can gain a border and a stronger blur. */
function headerState() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 8);
    ticking = false;
  };

  update();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

revealOnScroll();
spotlights();
headerState();
