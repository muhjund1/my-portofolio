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

  document.querySelectorAll("[data-profile-gallery]").forEach((gallery)=>{
    const slides=Array.from(gallery.querySelectorAll("[data-profile-slide]"));
    const controls=gallery.querySelector("[data-profile-controls]");
    const dots=gallery.querySelector("[data-profile-dots]");
    const previous=gallery.querySelector("[data-profile-prev]");
    const next=gallery.querySelector("[data-profile-next]");
    const viewport=gallery.querySelector("[data-profile-viewport]");
    if(slides.length<2||!controls||!dots||!previous||!next||!viewport)return;

    let activeIndex=0;
    let startX=null;
    controls.hidden=false;

    const dotButtons=slides.map((_,index)=>{
      const dot=document.createElement("button");
      dot.type="button";
      dot.setAttribute("aria-label",`Tampilkan foto ${index+1}`);
      dot.addEventListener("click",()=>showSlide(index));
      dots.append(dot);
      return dot;
    });

    function showSlide(index){
      activeIndex=(index+slides.length)%slides.length;
      slides.forEach((slide,slideIndex)=>{
        const isActive=slideIndex===activeIndex;
        slide.classList.toggle("is-active",isActive);
        slide.setAttribute("aria-hidden",String(!isActive));
        dotButtons[slideIndex].setAttribute("aria-current",String(isActive));
      });
    }

    previous.addEventListener("click",()=>showSlide(activeIndex-1));
    next.addEventListener("click",()=>showSlide(activeIndex+1));
    viewport.addEventListener("pointerdown",(event)=>{startX=event.clientX;});
    viewport.addEventListener("pointerup",(event)=>{
      if(startX===null)return;
      const distance=event.clientX-startX;
      startX=null;
      if(Math.abs(distance)>40)showSlide(activeIndex+(distance<0?1:-1));
    });
    viewport.addEventListener("pointercancel",()=>{startX=null;});
    showSlide(activeIndex);
  });
});
