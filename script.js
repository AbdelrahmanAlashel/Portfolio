const root = document.documentElement;
const revealItems = document.querySelectorAll(".reveal");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const trackedSections = Array.from(document.querySelectorAll("main section[id]"));
const currentPage = document.body.dataset.page || "home";

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const clearActiveLinks = () => {
  navLinks.forEach((link) => link.classList.remove("active"));
};

const activateCurrentPageLink = () => {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const pageLink = link.dataset.pageLink;
    const isSamePageLink = pageLink === currentPage && !href.startsWith("#");
    if (isSamePageLink) {
      link.classList.add("active");
    }
  });
};

const setActiveSectionLink = (id) => {
  let matched = false;

  clearActiveLinks();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href === `#${id}`) {
      matched = true;
      link.classList.add("active");
    }
  });

  if (!matched) {
    activateCurrentPageLink();
  }
};

if (trackedSections.length > 0 && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        setActiveSectionLink(visibleSections[0].target.id);
      }
    },
    {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
} else {
  activateCurrentPageLink();
}

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--pointer-x", `${event.clientX}px`);
  root.style.setProperty("--pointer-y", `${event.clientY}px`);
});
