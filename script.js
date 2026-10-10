const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".mobile-drawer");
const closeControls = document.querySelectorAll("[data-drawer-close]");
const drawerLinks = document.querySelectorAll(".drawer-links a");

function getDrawerFocusables() {
  return drawer
    ? drawer.querySelectorAll("a[href], button:not([disabled])")
    : [];
}

function openDrawer() {
  if (!menuToggle || !drawer) return;

  document.body.classList.add("nav-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
  drawer.setAttribute("aria-hidden", "false");

  const focusables = getDrawerFocusables();
  if (focusables.length) {
    focusables[0].focus();
  }
}

function closeDrawer() {
  if (!menuToggle || !drawer) return;

  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  drawer.setAttribute("aria-hidden", "true");
}

if (menuToggle && drawer) {
  menuToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeControls.forEach((control) => {
    control.addEventListener("click", closeDrawer);
  });

  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("nav-open")) return;

    if (event.key === "Escape") {
      closeDrawer();
      menuToggle.focus();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = Array.from(getDrawerFocusables());
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1081px)").matches) {
      closeDrawer();
    }
  });
}

const testimonyCarousel = document.querySelector("[data-testimony-carousel]");

if (testimonyCarousel) {
  const slides = Array.from(testimonyCarousel.querySelectorAll(".testimony-slide"));
  const controls = testimonyCarousel.querySelector(".testimony-controls");
  const dots = Array.from(testimonyCarousel.querySelectorAll("[data-testimony-index]"));
  const position = testimonyCarousel.querySelector(".testimony-position");
  const slideContainer = testimonyCarousel.querySelector(".testimony-slides");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let interacted = false;
  let hovered = false;
  let focused = false;
  let timer;

  function showTestimony(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== current;
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (announce) interacted = true;
    // Automatic changes stay quiet for screen readers; manual changes are announced.
    position.setAttribute("aria-live", announce ? "polite" : "off");
    position.textContent = `${current + 1} of ${slides.length}`;
    scheduleRotation();
  }

  function scheduleRotation() {
    window.clearTimeout(timer);
    const rotating = !reducedMotion.matches && !interacted && !hovered && !focused && !document.hidden;
    slideContainer.setAttribute("aria-live", rotating ? "off" : "polite");
    if (!rotating) return;
    // Give each full reflection time to be read, including the longer letters.
    const words = slides[current].querySelector("blockquote").textContent.trim().split(/\s+/).length;
    timer = window.setTimeout(() => showTestimony(current + 1), Math.max(15000, words * 350));
  }

  testimonyCarousel.classList.add("is-enhanced");
  controls.hidden = false;
  showTestimony(0);

  testimonyCarousel.querySelector("[data-testimony-prev]").addEventListener("click", () => showTestimony(current - 1, true));
  testimonyCarousel.querySelector("[data-testimony-next]").addEventListener("click", () => showTestimony(current + 1, true));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => showTestimony(Number(dot.dataset.testimonyIndex), true));
  });
  testimonyCarousel.addEventListener("mouseenter", () => { hovered = true; scheduleRotation(); });
  testimonyCarousel.addEventListener("mouseleave", () => { hovered = false; scheduleRotation(); });
  testimonyCarousel.addEventListener("focusin", () => { focused = true; scheduleRotation(); });
  testimonyCarousel.addEventListener("focusout", (event) => {
    focused = testimonyCarousel.contains(event.relatedTarget);
    scheduleRotation();
  });
  document.addEventListener("visibilitychange", scheduleRotation);
  reducedMotion.addEventListener("change", scheduleRotation);
}
