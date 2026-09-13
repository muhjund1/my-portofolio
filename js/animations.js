document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  setTimeout(() => loader?.classList.add("loaded"), 350);

  const typingText = document.getElementById("typing-text");
  const roles = ["Fullstack Web Developer", "Backend Web Developer", "Frontend Web Developer"];
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeRole() {
    const role = roles[roleIndex];
    typingText.textContent = role.slice(0, characterIndex);
    if (!deleting && characterIndex < role.length) {
      characterIndex += 1;
      setTimeout(typeRole, 85);
      return;
    }
    if (!deleting) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
    if (characterIndex > 0) {
      characterIndex -= 1;
      setTimeout(typeRole, 45);
      return;
    }
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }

  if (typingText) typeRole();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
