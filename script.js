const root = document.documentElement;
const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const trackedSections = document.querySelectorAll("main section[id]");

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

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.slice(1);
    link.classList.toggle("active", target === id);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections.length > 0) {
      setActiveLink(visibleSections[0].target.id);
    }
  },
  {
    threshold: [0.2, 0.45, 0.7],
    rootMargin: "-20% 0px -45% 0px",
  }
);

trackedSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--pointer-x", `${event.clientX}px`);
  root.style.setProperty("--pointer-y", `${event.clientY}px`);
});
