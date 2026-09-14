window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const API_BASE_URL = "";
document.addEventListener("DOMContentLoaded", () => {
  const toggle=document.getElementById("menu-toggle"), nav=document.getElementById("nav-menu");
  const links=nav?.querySelectorAll("a");

  toggle?.addEventListener("click",()=>{
    const isOpen=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",String(isOpen));
  });

  links?.forEach((link)=>link.addEventListener("click",()=>{
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded","false");
  }));
});
