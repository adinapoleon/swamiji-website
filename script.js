const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".mobile-drawer");
const closeControls = document.querySelectorAll("[data-drawer-close]");
const drawerLinks = document.querySelectorAll(".drawer-links a");
const backgroundRegions = document.querySelectorAll(".nav-inner, main, .footer, .skip-link");

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
  drawer.inert = false;
  backgroundRegions.forEach((region) => { region.inert = true; });

  drawer.querySelector(".drawer-close").focus();
}

function closeDrawer() {
  if (!menuToggle || !drawer) return;

  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  drawer.setAttribute("aria-hidden", "true");
  drawer.inert = true;
  backgroundRegions.forEach((region) => { region.inert = false; });
  if (menuToggle.getClientRects().length) {
    menuToggle.focus();
  }
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
    if (window.matchMedia("(min-width: 1101px)").matches && document.body.classList.contains("nav-open")) {
      closeDrawer();
      document.querySelector('.nav-links [aria-current="page"]').focus();
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
  let current = 0;

  function showTestimony(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== current;
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    // Reflections change only on request, so long passages never move while being read.
    position.setAttribute("aria-live", announce ? "polite" : "off");
    position.textContent = `${current + 1} of ${slides.length}`;
    slideContainer.setAttribute("aria-live", announce ? "polite" : "off");
  }

  testimonyCarousel.classList.add("is-enhanced");
  controls.hidden = false;
  showTestimony(0);

  testimonyCarousel.querySelector("[data-testimony-prev]").addEventListener("click", () => showTestimony(current - 1, true));
  testimonyCarousel.querySelector("[data-testimony-next]").addEventListener("click", () => showTestimony(current + 1, true));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => showTestimony(Number(dot.dataset.testimonyIndex), true));
  });
}
