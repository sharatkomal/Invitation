/**
 * ROYAL LOTUS (Lotus Courtyard) — Interactive Script
 * Faithful recreation of SaveOurDate live template logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. Audio Controller
  // ---------------------------------------------------------------------------
  const audio = document.getElementById('weddingAudio');
  const musicToggle = document.getElementById('musicToggle');
  let isMusicPlaying = false;
  let hasUserInteracted = false;

  function tryPlayMusic() {
    if (!audio) return;
    audio.play().then(() => {
      isMusicPlaying = true;
      if (musicToggle) {
        musicToggle.classList.add('music-toggle--playing');
        musicToggle.setAttribute('aria-label', 'Pause music');
      }
    }).catch(() => {
      // Autoplay blocked until gesture
    });
  }

  function toggleMusic() {
    if (!audio) return;
    if (isMusicPlaying) {
      audio.pause();
      isMusicPlaying = false;
      musicToggle.classList.remove('music-toggle--playing');
      musicToggle.setAttribute('aria-label', 'Play music');
    } else {
      audio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.add('music-toggle--playing');
        musicToggle.setAttribute('aria-label', 'Pause music');
      }).catch(err => console.log('Audio playback error:', err));
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // ---------------------------------------------------------------------------
  // 2. Interactive Entrance Gate & Rope Pull Physics
  // ---------------------------------------------------------------------------
  const introScene = document.getElementById('introScene');
  const introBgLit = document.getElementById('introBgLit');
  const introFlash = document.getElementById('introFlash');
  const skipBtn = document.getElementById('skipBtn');
  const ropeBtn = document.getElementById('ropeBtn');
  const ropeHalo = document.getElementById('ropeHalo');
  const ropeImg = document.getElementById('ropeImg');
  const pullHint = document.getElementById('pullHint');

  const revealNames = document.getElementById('revealNames');
  const revealDate = document.getElementById('revealDate');
  const revealVenue = document.getElementById('revealVenue');
  const revealLotus = document.getElementById('revealLotus');
  const lotusBtn = document.getElementById('lotusBtn');
  const lotusGlow = document.getElementById('lotusGlow');
  const lotusClosed = document.getElementById('lotusClosed');
  const lotusOpen = document.getElementById('lotusOpen');

  let isDragging = false;
  let startY = 0;
  let isTriggered = false;
  let isOpened = false;

  // Lock scrolling initially while entrance gate is active
  if (introScene) {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  }

  // Calculate dynamic threshold based on viewport height (approx 11% of window height, 84-112px)
  function getThreshold() {
    const raw = Math.round(0.11 * window.innerHeight);
    return Math.max(84, Math.min(112, raw));
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function resetRopeStyles() {
    if (!ropeBtn || !ropeImg || !ropeHalo) return;
    ropeBtn.style.transition = '';
    ropeBtn.style.transform = '';
    ropeImg.style.transition = '';
    ropeImg.style.transform = '';
    ropeHalo.style.transition = '';
    ropeHalo.style.opacity = '';
    ropeHalo.style.transform = '';
  }

  function releaseRope() {
    isDragging = false;
    if (ropeBtn) {
      ropeBtn.classList.remove('intro__rope--dragging');
      ropeBtn.classList.add('intro__rope--idle');
    }

    if (!isTriggered) {
      if (ropeBtn) {
        ropeBtn.style.transition = 'transform 520ms cubic-bezier(.34, 1.56, .64, 1)';
        ropeBtn.style.transform = 'translateX(-50%)';
      }
      if (ropeImg) {
        ropeImg.style.transition = 'transform 520ms cubic-bezier(.34, 1.56, .64, 1)';
        ropeImg.style.transform = 'scaleY(1)';
      }
      if (ropeHalo) {
        ropeHalo.style.transition = 'opacity 400ms ease, transform 500ms ease';
        ropeHalo.style.opacity = '0';
        ropeHalo.style.transform = 'translateX(-50%) scale(1)';
      }
      setTimeout(resetRopeStyles, 560);
    }
  }

  function triggerCelebration() {
    if (isTriggered) return;
    isTriggered = true;
    isDragging = false;

    // Haptic feedback if supported
    if (navigator.vibrate) {
      try { navigator.vibrate([14, 22, 88]); } catch (_) {}
    }

    // Attempt to start music
    tryPlayMusic();

    // Rope snap recoil animation
    if (ropeBtn && ropeImg) {
      ropeBtn.classList.remove('intro__rope--idle');
      ropeBtn.style.transition = 'transform 85ms cubic-bezier(.18, 0, .6, 1)';
      ropeBtn.style.transform = 'translateX(-50%) rotate(5deg)';
      ropeImg.style.transition = 'transform 85ms ease';
      ropeImg.style.transform = 'scaleY(1.66)';

      setTimeout(() => {
        ropeBtn.style.transition = 'transform 680ms cubic-bezier(.2, .92, .22, 1)';
        ropeBtn.style.transform = 'translateX(-50%) rotate(-2.2deg)';
        ropeImg.style.transition = 'transform 680ms cubic-bezier(.2, .92, .22, 1)';
        ropeImg.style.transform = 'scaleY(1.16)';
      }, 85);
    }

    // Hide pull hint
    if (pullHint) pullHint.style.display = 'none';

    // Flash & lighting transition
    setTimeout(() => {
      if (introFlash) introFlash.style.display = 'block';
    }, 140);

    setTimeout(() => {
      if (introFlash) introFlash.style.display = 'none';
    }, 1440);

    setTimeout(() => {
      if (introScene) introScene.classList.add('intro--lit');
      if (introBgLit) {
        introBgLit.classList.add('intro__bg--flicker');
        introBgLit.style.opacity = '1';
      }
    }, 200);

    // Sequential text reveal
    setTimeout(() => {
      if (revealNames) revealNames.classList.add('is-visible');
    }, 1200);

    setTimeout(() => {
      if (revealDate) revealDate.classList.add('is-visible');
    }, 2200);

    setTimeout(() => {
      if (revealVenue) revealVenue.classList.add('is-visible');
    }, 2550);

    setTimeout(() => {
      if (revealLotus) {
        revealLotus.classList.add('is-visible');
        if (lotusBtn) lotusBtn.setAttribute('tabindex', '0');
      }
    }, 3100);

    // Fade away rope after light up
    setTimeout(() => {
      if (ropeBtn) ropeBtn.style.display = 'none';
    }, 2000);
  }

  // Pointer drag events for rope pull
  if (ropeBtn) {
    ropeBtn.addEventListener('pointerdown', (e) => {
      if (isTriggered) return;
      e.preventDefault();
      isDragging = true;
      startY = e.clientY;
      ropeBtn.classList.remove('intro__rope--idle');
      ropeBtn.classList.add('intro__rope--dragging');
      resetRopeStyles();
      ropeBtn.setPointerCapture?.(e.pointerId);
    });

    ropeBtn.addEventListener('pointermove', (e) => {
      if (!isDragging || isTriggered) return;
      const threshold = getThreshold();
      const deltaY = Math.max(0, e.clientY - startY);

      const a = 0.38 * threshold;
      const b = 0.82 * threshold;
      let effectiveY;
      if (deltaY <= a) {
        effectiveY = 0.92 * deltaY;
      } else if (deltaY <= b) {
        effectiveY = 0.92 * a + (deltaY - a) * 0.58;
      } else {
        effectiveY = 0.92 * a + (b - a) * 0.58 + (deltaY - b) * 0.3;
      }

      const progress = Math.min(deltaY / threshold, 1);
      const angle = clamp((effectiveY / threshold) * 12, -13, 13);
      const scaleY = 1 + clamp(effectiveY / (1.45 * threshold), 0, 0.66);

      ropeBtn.style.transform = `translateX(-50%) rotate(${angle.toFixed(2)}deg)`;
      if (ropeImg) ropeImg.style.transform = `scaleY(${scaleY.toFixed(3)})`;

      if (ropeHalo) {
        ropeHalo.style.opacity = String(0.24 + 0.72 * progress);
        ropeHalo.style.transform = `translateX(-50%) translateY(${(0.28 * effectiveY).toFixed(2)}px) scale(${(1 + 0.76 * progress).toFixed(3)})`;
      }

      if (deltaY >= threshold) {
        triggerCelebration();
      }
    });

    ropeBtn.addEventListener('pointerup', releaseRope);
    ropeBtn.addEventListener('pointercancel', releaseRope);
  }

  // Blooming Lotus Click -> Open Website from top
  function openWebsite() {
    if (isOpened) return;
    isOpened = true;

    tryPlayMusic();

    // Reset scroll position to top so hero section is viewed starting from the top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Lotus bloom stages
    if (lotusBtn) {
      lotusBtn.classList.add('intro__lotus--p1');
      setTimeout(() => {
        lotusBtn.classList.remove('intro__lotus--p1');
        lotusBtn.classList.add('intro__lotus--p2');
      }, 180);
      setTimeout(() => {
        lotusBtn.classList.remove('intro__lotus--p2');
        lotusBtn.classList.add('intro__lotus--p3');
      }, 450);
      setTimeout(() => {
        lotusBtn.classList.remove('intro__lotus--p3');
        lotusBtn.classList.add('intro__lotus--popen');
        if (lotusClosed) lotusClosed.style.opacity = '0';
        if (lotusOpen) lotusOpen.style.opacity = '1';
        if (lotusGlow) lotusGlow.style.display = 'block';
      }, 700);
    }

    // Open from top: slide intro scene upwards to reveal hero section starting from top
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (introScene) {
        introScene.classList.add('intro--leaving');
        introScene.setAttribute('aria-hidden', 'true');
      }
      if (musicToggle) {
        musicToggle.style.display = 'flex';
      }
    }, 950);

    setTimeout(() => {
      document.body.style.overflow = '';
      if (introScene) introScene.style.display = 'none';
    }, 2200);
  }

  if (lotusBtn) {
    lotusBtn.addEventListener('click', openWebsite);
  }

  // Skip Intro button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      tryPlayMusic();
      if (!isTriggered) {
        triggerCelebration();
      }
      openWebsite();
    });
  }

  // Global first-gesture audio unlock fallback
  ['click', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, () => {
      if (!hasUserInteracted) {
        hasUserInteracted = true;
        if (isMusicPlaying) tryPlayMusic();
      }
    }, { once: true, capture: true });
  });

  // ---------------------------------------------------------------------------
  // 3. Falling Golden Flower Petal Shower
  // ---------------------------------------------------------------------------
  const petalsContainer = document.getElementById('petalsContainer');
  if (petalsContainer) {
    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('span');
      petal.className = 'invite__petal';
      const left = (i / petalCount) * 92 + (Math.random() * 6);
      const size = 10 + Math.random() * 12;
      const duration = 10 + Math.random() * 8;
      const delay = Math.random() * 9;
      const drift = (Math.random() - 0.5) * 80;
      const rotate = 180 + Math.random() * 260;

      petal.style.left = `${left}%`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.setProperty('--drift', `${drift}px`);
      petal.style.setProperty('--rotate', `${rotate}deg`);

      petal.innerHTML = `
        <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
          <path d="M10 1c4.5 3 6 6.5 6 9 0 3.87-2.69 9-6 9s-6-5.13-6-9c0-2.5 1.5-6 6-9z" fill="currentColor"></path>
        </svg>
      `;
      petalsContainer.appendChild(petal);
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Scroll-Triggered Farman Scrolls & Elements (Intersection Observer)
  // ---------------------------------------------------------------------------
  const eventCards = document.querySelectorAll('.events__stop');
  if ('IntersectionObserver' in window) {
    const eventObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          item.classList.remove('events__stop--idle');
          item.classList.add('events__stop--entering');

          setTimeout(() => {
            item.classList.remove('events__stop--entering');
            item.classList.add('events__stop--unrolling');
          }, 620);

          setTimeout(() => {
            item.classList.remove('events__stop--unrolling');
            item.classList.add('events__stop--open');
          }, 1520);

          eventObserver.unobserve(item);
        }
      });
    }, { threshold: 0.3 });

    eventCards.forEach(card => eventObserver.observe(card));
  } else {
    // Fallback: immediately open
    eventCards.forEach(card => {
      card.classList.remove('events__stop--idle');
      card.classList.add('events__stop--open');
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Photo Gallery Carousel (1 Photo Display, 3s Auto-Slide & Dots Navigation)
  // ---------------------------------------------------------------------------
  const galleryCarousel = document.getElementById('galleryCarousel');
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryDots = document.querySelectorAll('.gallery__dot');
  const gallerySlides = document.querySelectorAll('.gallery__slide');
  const gallerySection = document.getElementById('gallery');

  if (galleryCarousel && galleryTrack && gallerySlides.length > 0) {
    const totalSlides = gallerySlides.length;
    let currentIndex = 0;
    let autoSlideTimer = null;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      galleryTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots indicator
      galleryDots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Auto-slide right-to-left every 3 seconds
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      startAutoSlide();
    }

    // Pagination dots click events
    galleryDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          goToSlide(idx);
          resetAutoSlide();
        }
      });
    });

    // Pause on hover, resume on mouse leave
    galleryCarousel.addEventListener('mouseenter', stopAutoSlide);
    galleryCarousel.addEventListener('mouseleave', startAutoSlide);

    // Touch swipe support for mobile
    let touchStartX = 0;
    galleryCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    galleryCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextSlide(); // Swiped left -> next photo
        } else {
          prevSlide(); // Swiped right -> prev photo
        }
      }
      resetAutoSlide();
    }, { passive: true });

    // Performance: Only run 3s timer when carousel is visible on screen
    if ('IntersectionObserver' in window) {
      const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAutoSlide();
          } else {
            stopAutoSlide();
          }
        });
      }, { threshold: 0.2 });
      carouselObserver.observe(galleryCarousel);
    } else {
      startAutoSlide();
    }

    // Anti-Click: Ensure clicking photos does not open any modal or viewer
    galleryCarousel.addEventListener('click', (e) => {
      if (e.target.closest('.gallery__dot')) {
        return; // Allow pagination dots to work
      }
      e.preventDefault();
      e.stopPropagation();
    });

    // Anti-Download Protection: Block right-click context menu, drag-to-save & text selection
    const preventDownload = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (gallerySection) {
      gallerySection.addEventListener('contextmenu', preventDownload);
      gallerySection.addEventListener('dragstart', preventDownload);
      gallerySection.addEventListener('selectstart', preventDownload);
    }
  }

  // ---------------------------------------------------------------------------
  // 6. Save The Date & Calendar Integrations
  // ---------------------------------------------------------------------------
  const icalBtn = document.getElementById('icalBtn');
  if (icalBtn) {
    icalBtn.addEventListener('click', () => {
      console.log('Wedding calendar invite (.ics) downloaded.');
    });
  }

  // ---------------------------------------------------------------------------
  // 7. Wedding Countdown Timer (26 November 2026, 8:30 PM)
  // ---------------------------------------------------------------------------
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');

  // Target: 26 Nov 2026, 8:30 PM IST (UTC+05:30)
  const targetDate = new Date('2026-11-26T20:30:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMinutes) cdMinutes.textContent = '00';
      if (cdSeconds) cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

