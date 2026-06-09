/**
 * Chrysalism.org — Trustworthy Foundation Script Core
 * Code Rain Simulation (Hero Canvas), Navigations, and Dashboard Card Filters
 */

(function () {
  'use strict';

  // ================================================================
  // CODE RAIN SIMULATION (Calming slow-falling syntax columns)
  // ================================================================
  class CodeRainSimulation {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.columns = [];
      this.lastTime = 0;
      this.running = true;

      // Professional syntax snippets to fall like code-rain
      this.codeSnippets = [
        'fn main()', 'err != nil', '[]byte', 'match security', 'await integrity',
        'import cryptography', 'const lock = true', 'struct Chrysalis', 'impl Safeguard',
        'type EDR', 'audit()', 'integrityCheck()', 'RegoRule', '0x7F2A', 'std::sync',
        'channels.lock()', 'select {', 'case <-done:', 'goroutine', 'go scan()',
        'TLS_AES_256', 'SHA256', 'policy.enforce()', 'auth.Verify()', 'eBPF.attach()',
        'sandbox.Run()', 'SOC2Ready', 'ISO27001', 'HIPAA = compliant', 'CMMC_Level3',
        'const vCISO', 'trustModel', 'decrypt', 'signPayload', 'aes.NewCipher',
        'publicKey', 'jwt.Sign()', 'hash()', 'BufferOverflow', 'ZeroTrust',
        'x509.Certificate', 'OIDC_Provider', 'RBAC_Policy', 'steerBoard.Vote()'
      ];

      this.config = {
        densityFactor: 0.07, // Column multiplier relative to width
        minSpeed: 0.25,      // Calming slow speed
        maxSpeed: 0.75,
        minFontSize: 10,
        maxFontSize: 15,
        colors: [
          'rgba(143, 174, 155, ',  // Calming Sage Mint
          'rgba(223, 197, 167, ',  // Cozy Champagne Glow
          'rgba(163, 176, 192, ',  // Storm Pewter
          'rgba(240, 243, 246, '   // Cloud White
        ]
      };

      this.resize();
      this.init();
      window.addEventListener('resize', () => {
        this.resize();
        this.init();
      });
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    init() {
      const colCount = Math.max(8, Math.floor(this.width * this.config.densityFactor));
      this.columns = [];

      for (let i = 0; i < colCount; i++) {
        this.columns.push(this.createColumn(true));
      }
    }

    createColumn(randomY = false) {
      const speed = this.config.minSpeed + Math.random() * (this.config.maxSpeed - this.config.minSpeed);
      const fontSize = Math.floor(this.config.minFontSize + Math.random() * (this.config.maxFontSize - this.config.minFontSize));
      const colorTemplate = this.config.colors.at(Math.floor(Math.random() * this.config.colors.length));
      const text = this.codeSnippets.at(Math.floor(Math.random() * this.codeSnippets.length));

      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -50 - Math.random() * 100,
        speed,
        fontSize,
        colorTemplate,
        text,
        opacity: 0.08 + Math.random() * 0.28,
        drift: Math.random() * 0.06 - 0.03
      };
    }

    update(dt) {
      const dtFactor = dt / 16; // normalizes to 60fps

      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns.at(i);
        col.y += col.speed * dtFactor;
        col.x += col.drift * dtFactor;

        // Reset column when falling off screen
        if (col.y > this.height + 40) {
          this.columns.splice(i, 1, this.createColumn(false));
        }
      }
    }

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      // Sky background gradient (Obsidian Night)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
      bgGrad.addColorStop(0, '#080b11');
      bgGrad.addColorStop(1, '#0e131d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, this.width, this.height);

      // Rendering columns
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      for (const col of this.columns) {
        ctx.font = `500 ${col.fontSize}px "${col.text.includes('(') ? 'JetBrains Mono' : 'Inter'}", monospace`;
        ctx.fillStyle = `${col.colorTemplate}${col.opacity})`;
        ctx.fillText(col.text, col.x, col.y);
      }
    }

    animate(timestamp) {
      if (!this.running) return;

      const dt = timestamp - this.lastTime || 16;
      this.lastTime = timestamp;

      this.update(Math.min(dt, 50)); // limit dt spike
      this.draw();

      requestAnimationFrame((t) => this.animate(t));
    }

    start() {
      this.running = true;
      requestAnimationFrame((t) => this.animate(t));
    }

    stop() {
      this.running = false;
    }
  }

  // ================================================================
  // LANDSCAPE DIRECTORY FILTERS (Dashboard Grid Card Filter)
  // ================================================================
  function initDirectoryFilters() {
    const filterGroup = document.getElementById('filter-group');
    if (!filterGroup) return;

    const filterBtns = filterGroup.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects-grid .project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active states on tabs
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const stage = card.getAttribute('data-stage');
          
          if (filterValue === 'all') {
            card.style.display = '';
          } else if (filterValue === 'graduated' && stage === 'graduated') {
            card.style.display = '';
          } else if (filterValue === 'incubating' && (stage === 'incubating' || stage === 'sandbox')) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ================================================================
  // NAVIGATION CORE
  // ================================================================
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Header scroll background box-shadow & movement
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Hamburger
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isActive = links.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
      });
    }

    // Mobile Navigation Accordion Dropdowns
    navItems.forEach(item => {
      const btn = item.querySelector('.nav-link');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;

        e.preventDefault();
        const isOpen = item.classList.contains('open');

        // Close others
        navItems.forEach(i => i.classList.remove('open'));

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });

    // Auto close navigation on link selection
    document.querySelectorAll('.nav-dropdown-item, .nav-cta-btn').forEach(link => {
      link.addEventListener('click', () => {
        if (links) links.classList.remove('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        navItems.forEach(i => i.classList.remove('open'));
      });
    });
  }

  // ================================================================
  // SMOOTH SCROLL ROUTERS
  // ================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const offsetHeight = document.getElementById('main-nav').offsetHeight + 40;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offsetHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      });
    });
  }

  // ================================================================
  // PERFORMANCE: Hardware Scaling check
  // ================================================================
  function isLowEndMachine() {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
    if (navigator.connection && navigator.connection.saveData) return true;
    return false;
  }

  // ================================================================
  // BOOTSTRAP INITIALIZATION
  // ================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // Initializing falling code simulation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
      const codeRain = new CodeRainSimulation(canvas);
      
      if (isLowEndMachine()) {
        codeRain.config.densityFactor = 0.035;
        codeRain.init();
      }

      codeRain.start();

      // Intersection observer to pause simulation when hero is off-screen
      const heroSec = document.getElementById('hero');
      if (heroSec && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              codeRain.start();
            } else {
              codeRain.stop();
            }
          });
        }, { threshold: 0.02 });

        observer.observe(heroSec);
      }
    }

    // Boot other UI routines
    initNavigation();
    initDirectoryFilters();
    initSmoothScroll();
  });

})();
