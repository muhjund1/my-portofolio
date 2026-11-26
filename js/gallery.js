const galleryItems = [
  {
    type: "activity",
    title: "Juara 1 — Kalibrasi UNS 2026",
    description: "Foto pribadi Muhammad Jundi Al-Aqsha setelah meraih juara 1 pada Kalibrasi UNS 2026.",
    date: "7 November 2026",
    image: "./assets/gallery/foto-personal-sebagai-juara-1-uns-kalibrasi.JPG",
    link: "./assets/gallery/foto-personal-sebagai-juara-1-uns-kalibrasi.JPG"
  },
  {
    type: "activity",
    title: "Juara 2 — Lomba IQT FAIR UMS",
    description: "Foto kegiatan dan penerimaan penghargaan sebagai juara 2 pada lomba IQT FAIR UMS.",
    date: "26 September 2026",
    image: "./assets/gallery/foto-juara-2-lomba-iqt.JPG",
    link: "./assets/gallery/foto-juara-2-lomba-iqt.JPG"
  },
  {
    type: "certificate",
    title: "Semifinalis MHQ 10 Juz — HQF UNHAS",
    description: "Sertifikat penghargaan atas partisipasi sebagai semifinalis cabang lomba Musabaqah Hifzhil Qur'an 10 Juz pada HQF 2026 Universitas Hasanuddin.",
    date: "2026",
    image: "./assets/gallery/Muhammad Jundi Al-Aqsha-unhas.png",
    link: "./assets/gallery/Muhammad Jundi Al-Aqsha-unhas.png"
  },
  {
    type: "certificate",
    title: "Peserta Lomba MHQ 5 Juz — Universitas Negeri Surabaya",
    description: "Sertifikat lomba MHQ 5 Juz dalam kegiatan Gebyar Musabaqah Tilawatil Qur'an Tingkat SMA/Sederajat dan Mahasiswa.",
    date: "13 November 2026",
    image: "./assets/gallery/lomba-mhq-unesa.png",
    link: "./assets/gallery/lomba-mhq-unesa.png"
  },
  {
    type: "activity",
    title: "Kegiatan Kalibrasi 2026 — UNS",
    description: "Dokumentasi kegiatan Kalibrasi 2026 bertema \"Aksara Karsa Cahaya\" di Universitas Sebelas Maret.",
    date: "7 November 2026",
    image: "./assets/gallery/lomba-kalibrasi-uns-mhq.JPG",
    link: "./assets/gallery/lomba-kalibrasi-uns-mhq.JPG"
  },
  {
    type: "certificate",
    title: "Juara 1 Cabang Lomba Musabaqah Hifzhil Qur'an — Kalibrasi UNS 2026",
    description: "Sertifikat juara 1 cabang lomba Musabaqah Hifzhil Qur'an dalam acara Kalibrasi UNS 2026.",
    date: "7 November 2026",
    image: "./assets/gallery/sertifikat-lomba-kalibrasi-uns-juara-1.jpeg",
    link: "./assets/gallery/sertifikat-lomba-kalibrasi-uns-juara-1.jpeg"
  },
  {
    type: "certificate",
    title: "Juara 2 MHQ 10 Juz — IQT FAIR XII",
    description: "Juara 2 MHQ Nasional 10 Juz yang diselenggarakan HMP IQT UMS.",
    date: "26 September 2026",
    image: "./assets/gallery/sertifikat-mhq-10-juz.png",
    link: "./assets/gallery/sertifikat-mhq-10-juz.png"
  },
  {
    type: "certificate",
    title: "Sertifikat Karantina Bahasa Arab yang diadakan oleh PPQITA Al Mahir",
    description: "Karantina bahasa arab yang menunjang pembelajaran bahasa Arab Kita dipondok.",
    image: "./assets/gallery/sertif-karantina-b-arab.jpg",
    link: "./assets/gallery/sertif-karantina-b-arab.jpg"
  },
  {
    type: "certificate",
    title: "Sertifikat Lomba Nahwu dan Sharaf yang diselenggarakan oleh santri pedia",
    description: "Lomba Nahwu dan Sharaf yang diselenggarakan oleh santri pedia.",
    date: "26 September 2026",
    image: "./assets/gallery/sertif-lomba-nahwu=sharaf.jpg",
    link: "./assets/gallery/sertif-lomba-nahwu=sharaf.jpg"
  },
  {
    type: "activity",
    title: "Lomba IQT FAIR UMS",
    description: "Dokumentasi kegiatan lomba IQT FAIR UMS.",
    date: "26 September 2026",
    image: "./assets/gallery/kegiatan-lomba-iqt-fair-ums.JPG",
    link: "./assets/gallery/kegiatan-lomba-iqt-fair-ums.JPG"
  }

];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("gallery-grid");
  const emptyState = document.getElementById("gallery-empty");
  const emptyTitle = document.getElementById("gallery-empty-title");
  const emptyDescription = document.getElementById("gallery-empty-description");
  const filterButtons = Array.from(document.querySelectorAll("[data-gallery-filter]"));
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (document.querySelector("main.gallery-page") && menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter;
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      renderGallery(filter, grid, emptyState, emptyTitle, emptyDescription);
    });
  });

  renderGallery("all", grid, emptyState, emptyTitle, emptyDescription);
});

function renderGallery(filter, grid, emptyState, emptyTitle, emptyDescription) {
  if (!grid || !emptyState || !emptyTitle || !emptyDescription) return;

  const items = filter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.type === filter);

  if (!items.length) {
    grid.replaceChildren();
    emptyState.hidden = false;
    emptyTitle.textContent = filter === "all"
      ? "Galeri sedang disiapkan"
      : filter === "activity"
        ? "Belum ada dokumentasi kegiatan"
        : "Belum ada sertifikat";
    emptyDescription.textContent = "Dokumentasi akan ditambahkan di sini. Silakan kembali lagi nanti.";
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = items.map((item) => {
    const image = safeGalleryUrl(item.image);
    const link = safeGalleryUrl(item.link);
    const title = escapeHtml(item.title);
    const description = escapeHtml(item.description || "");
    const date = escapeHtml(item.date || "");
    const typeLabel = item.type === "certificate" ? "Sertifikat" : "Kegiatan";
    const imageMarkup = image
      ? `<img class="gallery-image" src="${image}" alt="${title}" loading="lazy">`
      : '<div class="gallery-image gallery-image-empty" aria-hidden="true">✦</div>';
    const actionMarkup = link
      ? `<a class="gallery-card-link" href="${link}" target="_blank" rel="noopener noreferrer">${item.type === "certificate" ? "Lihat sertifikat ↗" : "Lihat dokumentasi ↗"}</a>`
      : "";

    return `<article class="gallery-card">
      ${imageMarkup}
      <div class="gallery-card-body">
        <span class="project-category">${typeLabel}</span>
        <h2>${title}</h2>
        ${date ? `<p class="gallery-date">${date}</p>` : ""}
        ${description ? `<p class="gallery-description">${description}</p>` : ""}
        ${actionMarkup}
      </div>
    </article>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function safeGalleryUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
