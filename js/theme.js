const THEME_STORAGE_KEY = "portfolio-theme";
const rootElement = document.documentElement;
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme === "light" ? "light" : "dark";

function setTheme(theme) {
  const isLight = theme === "light";
  rootElement.dataset.theme = isLight ? "light" : "dark";
  rootElement.style.colorScheme = isLight ? "light" : "dark";

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const nextTheme = isLight ? "gelap" : "terang";
    button.setAttribute("aria-label", `Ganti ke tema ${nextTheme}`);
    button.setAttribute("aria-pressed", String(isLight));
    button.title = `Ganti ke tema ${nextTheme}`;
  });
}

setTheme(initialTheme);

document.addEventListener("DOMContentLoaded", () => {
  setTheme(rootElement.dataset.theme);
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = rootElement.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setTheme(nextTheme);
    });
  });
});
