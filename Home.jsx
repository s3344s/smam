@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  scroll-padding-top: 96px;
}

body {
  @apply bg-ink text-cream font-body antialiased;
  overflow-x: hidden;
}

::selection {
  background: rgba(216, 197, 160, 0.35);
  color: #fff;
}

/* ---------- scrollbar ---------- */
::-webkit-scrollbar {
  width: 9px;
}
::-webkit-scrollbar-track {
  background: #07070b;
}
::-webkit-scrollbar-thumb {
  background: #232330;
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: #38384a;
}

@layer components {
  /* ---------- surfaces ---------- */
  .glass {
    @apply bg-white/[0.04] border border-white/10 backdrop-blur-md;
  }
  .glass-strong {
    @apply bg-white/[0.06] border border-white/[0.14] backdrop-blur-xl;
  }

  .section-pad {
    @apply py-24 md:py-32;
  }

  .container-x {
    @apply mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10;
  }

  /* ---------- eyebrow with pixel cluster (brand signature) ---------- */
  .eyebrow {
    @apply inline-flex items-center gap-3 text-[11px] md:text-xs font-display font-medium uppercase tracking-[0.35em] text-champagne;
  }

  /* ---------- buttons ---------- */
  .btn {
    @apply relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-all duration-300;
  }
  .btn-primary {
    @apply btn bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark text-ink shadow-glow hover:shadow-[0_0_55px_-8px_rgba(216,197,160,0.55)] hover:-translate-y-0.5;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.55) 50%, transparent 70%);
    transform: translateX(-120%);
    transition: transform 0.7s ease;
  }
  .btn-primary:hover::after {
    transform: translateX(120%);
  }
  .btn-ghost {
    @apply btn border border-white/15 bg-white/[0.03] text-cream hover:border-champagne/50 hover:bg-white/[0.07] hover:-translate-y-0.5;
  }
  .btn-whatsapp {
    @apply btn bg-[#1f3d2c] border border-[#37dd7a]/30 text-[#9af2c0] hover:border-[#37dd7a]/70 hover:shadow-[0_0_40px_-10px_rgba(55,221,122,0.5)] hover:-translate-y-0.5;
  }

  /* ---------- tilt card with mouse spotlight ---------- */
  .tilt-card {
    transform-style: preserve-3d;
    transition: transform 0.18s ease-out, border-color 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
    position: relative;
  }
  .tilt-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      260px circle at var(--mx, 50%) var(--my, 50%),
      rgba(216, 197, 160, 0.14),
      transparent 65%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .tilt-card:hover::before {
    opacity: 1;
  }
  .tilt-card:hover {
    border-color: rgba(216, 197, 160, 0.35);
    box-shadow: 0 24px 70px -28px rgba(0, 0, 0, 0.85), 0 0 50px -22px rgba(216, 197, 160, 0.35);
  }

  /* ---------- inputs ---------- */
  .input-dark {
    @apply w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-champagne/60 focus:bg-white/[0.06];
  }
  .label-dark {
    @apply mb-1.5 block text-[11px] font-display font-medium uppercase tracking-[0.2em] text-muted;
  }
}

/* ---------- background grid ---------- */
.grid-bg {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
}

/* ---------- film grain ---------- */
.noise::after {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 5;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---------- marquee ---------- */
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}
.marquee-track.reverse {
  animation-direction: reverse;
}
.marquee-track:hover {
  animation-play-state: paused;
}

/* ---------- hide scrollbar for carousels ---------- */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ---------- hero fallback orb while 3D loads ---------- */
.hero-orb-fallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 45%, rgba(139, 124, 246, 0.22), transparent 45%),
    radial-gradient(circle at 55% 50%, rgba(216, 197, 160, 0.14), transparent 40%);
  filter: blur(10px);
}

/* ---------- mobile hero orb: pure CSS, compositor-only animation ---------- */
.hero-orb-static {
  position: absolute;
  top: 5%;
  right: -22%;
  width: min(78vw, 340px);
  height: min(78vw, 340px);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.85;
  background:
    radial-gradient(circle at 36% 30%, rgba(235, 223, 196, 0.28), transparent 44%),
    radial-gradient(circle at 64% 70%, rgba(139, 124, 246, 0.34), transparent 55%),
    radial-gradient(circle at 50% 50%, #17151f 0%, #0c0b13 58%, rgba(12, 11, 19, 0) 70%);
}
.hero-orb-static::before,
.hero-orb-static::after {
  content: '';
  position: absolute;
  inset: -12%;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0% 72%, rgba(216, 197, 160, 0.6) 84%, transparent 96%);
  -webkit-mask: radial-gradient(closest-side, transparent 77%, #000 78% 83%, transparent 84%);
  mask: radial-gradient(closest-side, transparent 77%, #000 78% 83%, transparent 84%);
  animation: orb-spin 16s linear infinite;
}
.hero-orb-static::after {
  inset: -26%;
  background: conic-gradient(from 180deg, transparent 0% 78%, rgba(139, 124, 246, 0.5) 88%, transparent 98%);
  animation: orb-spin 26s linear infinite reverse;
}
@keyframes orb-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---------- mobile performance overrides ----------
   backdrop-filter and huge filter:blur() layers are the main
   GPU killers on phones — swap them for cheap equivalents. */
@media (max-width: 768px) {
  /* glass → opaque panels, no backdrop sampling */
  .glass {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: rgba(19, 19, 27, 0.88);
  }
  .glass-strong {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: rgba(22, 22, 31, 0.96);
  }

  /* giant glow layers: drop the blur filter, fake softness with a radial mask */
  [class*='blur-['] {
    filter: none !important;
    -webkit-mask-image: radial-gradient(closest-side, rgba(0, 0, 0, 0.8), transparent);
    mask-image: radial-gradient(closest-side, rgba(0, 0, 0, 0.8), transparent);
  }

  /* film grain: huge fixed layer — not worth it on phones */
  .noise::after {
    display: none;
  }

  /* slightly calmer marquee */
  .marquee-track {
    animation-duration: 48s;
  }
}

.marquee-track {
  will-change: transform;
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .marquee-track {
    animation: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
  }
}
