window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const API_BASE_URL = "";
document.addEventListener("DOMContentLoaded", () => {
  const toggle=document.getElementById("nav-toggle"), nav=document.getElementById("nav-menu");
  toggle?.addEventListener("click",()=>{nav.classList.toggle("open");});
});
