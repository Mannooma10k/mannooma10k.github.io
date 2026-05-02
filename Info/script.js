/* ═══════════════════════════════════════
   Mannooma Linktree – script.js
   Animations, particles & interactions
═══════════════════════════════════════ */

/* ── 1. STAGGERED CARD REVEAL ───────── */
(function revealCards() {
  const cards = document.querySelectorAll('.link-card');

  // Reveal each card with a staggered delay
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('revealed');
      card.style.transition =
        `opacity 0.45s ease, transform 0.45s ease,
         box-shadow 0.14s ease, border-color 0.14s ease`;
    }, 400 + i * 130);
  });
})();

/* ── 2. CLICK RIPPLE ON CARDS ────────── */
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('click', function (e) {
    const ripple = this.querySelector('.link-ripple');
    if (!ripple) return;

    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 5) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - 5) + 'px';

    ripple.classList.remove('pop');
    // Force reflow so animation restarts
    void ripple.offsetWidth;
    ripple.classList.add('pop');
  });
});

/* ── 3. FLOATING PIXEL PARTICLES ─────── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Minecraft-ish pixel colours
  const colors = [
    '#55FF55', // mc-green
    '#03adfc', // mc-blue
    '#ffaa00', // mc-orange
    '#ffffff',
    '#aaffaa',
  ];

  const count = 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    // Random position & timing
    const dur   = (6 + Math.random() * 10).toFixed(1);
    const delay = (Math.random() * 12).toFixed(1);
    const left  = (Math.random() * 100).toFixed(1);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = Math.random() > 0.6 ? '8px' : '5px';

    p.style.cssText = `
      left: ${left}%;
      --dur: ${dur}s;
      --delay: ${delay}s;
      background: ${color};
      width: ${size};
      height: ${size};
      box-shadow: 0 0 6px ${color};
    `;

    container.appendChild(p);
  }
})();

/* ── 4. NAME GLOW CLICK EASTER EGG ──── */
(function nameEasterEgg() {
  const name = document.querySelector('.profile-name');
  if (!name) return;

  const msgs = [
    '⚡ Addon Dev!',
    '🎮 Minecraft!',
    '🌿 Mannooma!',
    '🧱 Build it!',
    '💚 5K Subs!',
  ];
  let idx = 0;
  const original = name.textContent;

  name.style.cursor = 'pointer';
  name.title = 'Click me!';

  name.addEventListener('click', () => {
    name.textContent = msgs[idx % msgs.length];
    idx++;
    clearTimeout(name._timer);
    name._timer = setTimeout(() => {
      name.textContent = original;
    }, 1400);
  });
})();

/* ── 5. AVATAR PIXEL BURST ─────────── */
(function avatarBurst() {
  const avatar = document.querySelector('.avatar');
  if (!avatar) return;

  avatar.addEventListener('click', () => {
    const rect   = avatar.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const colors = ['#55FF55', '#03adfc', '#ffaa00', '#ffffff'];

    for (let i = 0; i < 14; i++) {
      const dot = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 14;
      const dist  = 50 + Math.random() * 60;
      const color = colors[i % colors.length];
      const size  = (4 + Math.random() * 5).toFixed(0);

      dot.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 0;
        pointer-events: none;
        z-index: 9999;
        image-rendering: pixelated;
        transform: translate(-50%, -50%);
        transition: left 0.55s ease-out,
                    top  0.55s ease-out,
                    opacity 0.55s ease-out;
        opacity: 1;
      `;

      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.left    = (cx + Math.cos(angle) * dist) + 'px';
          dot.style.top     = (cy + Math.sin(angle) * dist) + 'px';
          dot.style.opacity = '0';
        });
      });

      setTimeout(() => dot.remove(), 700);
    }
  });
})();

/* ── 6. CARD HOVER SOUND (visual only) ─ */
// Subtle border flicker on hover for extra MC feel
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.backgroundImage =
      'linear-gradient(rgba(255,255,255,0.015), rgba(255,255,255,0.015))';
  });
  card.addEventListener('mouseleave', function () {
    this.style.backgroundImage = 'none';
  });
});

/* ── 7. CONSOLE BRANDING ─────────────── */
console.log(
  '%c⛏ Mannooma Links ⛏\n%cMinecraft Addon Dev & Content Creator',
  'color:#55FF55;font-family:monospace;font-size:20px;font-weight:bold;',
  'color:#aaa;font-family:monospace;font-size:12px;'
);
