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
    if (window.matchMedia("(min-width: 821px)").matches) {
      closeDrawer();
    }
  });
}
