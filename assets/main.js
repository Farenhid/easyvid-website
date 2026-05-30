(function () {
  const CTA_MAIL = 'mailto:fred.sommerfeld@easyvid.online';

  // Scroll reveal
  function reveal() {
    document.querySelectorAll('.reveal').forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 150) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('load', reveal);

  // Transformation sliders (Collage + Google Maps)
  document.querySelectorAll('[data-transform-slider]').forEach((container) => {
    const leftPane = container.querySelector('[data-transform-left]');
    const handle = container.querySelector('[data-transform-handle]');
    const hint = container.querySelector('[data-transform-hint]');
    if (!leftPane) return;

    let dragging = false;
    let pct = 50;
    let rafId = null;

    const render = () => {
      leftPane.style.width = `${pct}%`;
      if (handle) handle.style.left = `${pct}%`;
      container.setAttribute('aria-valuenow', String(Math.round(pct)));
      rafId = null;
    };

    const setPct = (value) => {
      pct = Math.min(Math.max(value, 2), 98);
      if (rafId === null) rafId = requestAnimationFrame(render);
    };

    const setFromX = (clientX) => {
      const rect = container.getBoundingClientRect();
      setPct(((clientX - rect.left) / rect.width) * 100);
    };

    const hideHint = () => {
      if (hint) hint.style.opacity = '0';
    };

    const getX = (e) => (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);

    const start = (e) => {
      dragging = true;
      hideHint();
      setFromX(getX(e));
    };
    const move = (e) => {
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();
      setFromX(getX(e));
    };
    const stop = () => {
      dragging = false;
    };

    container.addEventListener('mousedown', start);
    container.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);

    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        hideHint();
        setPct(pct - 4);
      } else if (e.key === 'ArrowRight') {
        hideHint();
        setPct(pct + 4);
      }
    });

    leftPane.style.width = '50%';
    if (handle) handle.style.left = '50%';
  });

  // Portfolio video cards: hover to play (desktop), tap to play (touch)
  document.querySelectorAll('[data-video-card]').forEach((card) => {
    const video = card.querySelector('video');
    const playBadge = card.querySelector('[data-video-play]');
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
      if (playBadge) playBadge.style.opacity = '0';
    };
    const stop = () => {
      video.pause();
    };

    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('click', () => {
      if (video.paused) play();
      else stop();
    });
  });

  // Pause/resume transformation videos based on viewport visibility
  if ('IntersectionObserver' in window) {
    const vidObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll('[data-transform-slider] video').forEach((v) => vidObserver.observe(v));
  }

  // FAQ accordion
  document.querySelectorAll('[data-faq-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector('.material-symbols-outlined');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.classList.toggle('hidden');
      icon?.classList.toggle('rotate-180');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    });
  });

  // Mobile nav
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('mobile-menu-icon');

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.textContent = 'menu';
  }

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('hidden');
    menuBtn?.setAttribute('aria-expanded', 'true');
    if (menuIcon) menuIcon.textContent = 'close';
  }

  menuBtn?.addEventListener('click', () => {
    if (mobileNav?.classList.contains('hidden')) openMobileNav();
    else closeMobileNav();
  });

  // Wire CTA links
  document.querySelectorAll('[data-cta]').forEach((el) => {
    if (el.tagName === 'A') {
      el.href = CTA_MAIL;
    } else {
      el.addEventListener('click', () => {
        window.location.href = CTA_MAIL;
      });
    }
  });

  document.querySelectorAll('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = document.querySelector(el.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
