// ===== MAIN JAVASCRIPT FILE =====
// File ini berisi semua fungsi JavaScript yang dibutuhkan untuk website

(function () {
  "use strict";

  // ===== INITIALIZATION =====
  document.addEventListener("DOMContentLoaded", function () {
    initializeAOS();
    initializeTheme();
    initializeNavbar();
    initializeMobileMenu();
    initializeModals();
    initializeFilters();
    initializeAnimations();
    initializeScrollEffects();
  });

  // ===== AOS INITIALIZATION =====
  function initializeAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 100,
      });
    }
  }

  // ===== THEME MANAGEMENT =====
  function initializeTheme() {
    const themeToggle = document.querySelector(".theme-toggle");
    const htmlElement = document.documentElement;

    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", function () {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector("i");
      if (!icon) return;

      if (theme === "dark") {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    }
  }

  // ===== NAVBAR FUNCTIONALITY =====
  function initializeNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ===== MOBILE MENU =====
  function initializeMobileMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (!mobileMenu || !navLinks) return;

    mobileMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      const icon = mobileMenu.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.className = "fas fa-times";
        } else {
          icon.className = "fas fa-bars";
        }
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileMenu.querySelector("i");
        if (icon) {
          icon.className = "fas fa-bars";
        }
      });
    });
  }

  // ===== MODAL FUNCTIONALITY =====
  function initializeModals() {
    const modalButtons = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const modalCloses = document.querySelectorAll(".modal-close");

    // Open modal
    modalButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close modal
    modalCloses.forEach((close) => {
      close.addEventListener("click", function () {
        const modal = this.closest(".modal");
        if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    });

    // Close modal when clicking outside
    modals.forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        modals.forEach((modal) => {
          modal.classList.remove("active");
        });
        document.body.style.overflow = "auto";
      }
    });
  }

  // ===== FILTER FUNCTIONALITY (for projects page) =====
  function initializeFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length === 0) return;

    // Function to get URL parameters
    function getURLParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    // Filter functionality
    function applyFilter(filterValue) {
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.classList.remove("hidden");
          card.style.display = "block";
        } else {
          if (card.getAttribute("data-category") === filterValue) {
            card.classList.remove("hidden");
            card.style.display = "block";
          } else {
            card.classList.add("hidden");
            card.style.display = "none";
          }
        }
      });

      // Re-trigger AOS animation for visible cards
      if (typeof AOS !== "undefined") {
        setTimeout(() => {
          AOS.refresh();
        }, 300);
      }
    }

    // Check for filter parameter on page load
    const filterParam = getURLParameter("filter");
    if (filterParam) {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Find and activate the correct filter button
      const targetButton = document.querySelector(
        `[data-filter="${filterParam}"]`
      );
      if (targetButton) {
        targetButton.classList.add("active");
        applyFilter(filterParam);
      }
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        applyFilter(filterValue);
      });
    });
  }

  // ===== ANIMATIONS AND EFFECTS =====
  function initializeAnimations() {
    // Project card hover effects
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-15px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Team card hover effects
    document.querySelectorAll(".team-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.animationPlayState = "paused";
        this.style.boxShadow = "0 30px 80px rgba(0, 82, 212, 0.3)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.animationPlayState = "running";
        this.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.1)";
      });
    });

    // Teacher card hover effects
    document.querySelectorAll(".teacher-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-15px) scale(1.03)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Skill tags hover effect
    document.querySelectorAll(".skill-tag").forEach((tag) => {
      tag.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
      });

      tag.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Social links click effect
    initializeSocialLinks();
  }

  // ===== SOCIAL LINKS RIPPLE EFFECT =====
  function initializeSocialLinks() {
    // Add ripple animation keyframes
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
      document.head.appendChild(style);
    }

    document.querySelectorAll(".social-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        // Create ripple effect
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.6)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s linear";
        ripple.style.left = "50%";
        ripple.style.top = "50%";
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        ripple.style.marginLeft = "-10px";
        ripple.style.marginTop = "-10px";
        ripple.style.pointerEvents = "none";

        this.style.position = "relative";
        this.appendChild(ripple);

        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      });
    });
  }

  // ===== SCROLL EFFECTS =====
  function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });

    // Counter animation
    initializeCounters();

    // Fade in animation for elements
    initializeFadeInAnimation();
  }

  // ===== COUNTER ANIMATION =====
  function initializeCounters() {
    const counters = document.querySelectorAll(".stat-number");
    if (counters.length === 0) return;

    function animateCounters() {
      const speed = 200;

      counters.forEach((counter) => {
        const target = parseInt(counter.innerText.replace(/\D/g, ""));
        const hasPlus = counter.innerText.includes("+");
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
          if (count < target) {
            count += inc;
            counter.innerText = Math.ceil(count) + (hasPlus ? "+" : "");
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + (hasPlus ? "+" : "");
          }
        };

        updateCount();
      });
    }

    // Trigger counter animation when stats section is visible
    const statsSection =
      document.querySelector(".stats-section") ||
      document.querySelector(".hero");
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(animateCounters, 500);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(statsSection);
    }
  }

  // ===== FADE IN ANIMATION =====
  function initializeFadeInAnimation() {
    const faders = document.querySelectorAll(".fade-in");
    if (faders.length === 0) return;

    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    const appearOnScroll = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });
  }

  // ===== LOADING ANIMATION =====
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease-in-out";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // ===== ERROR HANDLING =====
  window.addEventListener("error", function (e) {
    console.warn("JavaScript error caught:", e.error);
  });
})();
