let manhwaDatabase = [];

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

async function loadData() {
  try {
    const response = await fetch("./data/manhwas.json");

    if (!response.ok) {
      throw new Error(`No se pudo cargar la base de datos: ${response.status}`);
    }

    const data = await response.json();
    manhwaDatabase = data;
    renderHome();
  } catch (error) {
    console.error("Error al cargar los datos de manhwas:", error);
  }
}

function guardarProgreso(manhwaId, chapterNumber) {
  const historialLectura = JSON.parse(localStorage.getItem("historialLectura")) || {};

  historialLectura[manhwaId] = chapterNumber;
  localStorage.setItem("historialLectura", JSON.stringify(historialLectura));
}

function renderHome(data = manhwaDatabase) {
  const gridManhwas = document.getElementById("grid-manhwas");
  const historialLectura = JSON.parse(localStorage.getItem("historialLectura")) || {};

  const cards = data.map((manhwa) => `
    <article class="manhwa-card" data-id="${manhwa.id}">
      <div class="cover-container">
        ${historialLectura[manhwa.id] !== undefined
          ? `<div class="history-badge">Leído: Cap. ${historialLectura[manhwa.id]}</div>`
          : ""}
        <img class="manhwa-cover" src="${manhwa.cover}" alt="Portada de ${manhwa.title}">
      </div>
      <div class="card-info">
        <span>${manhwa.type}</span>
        <h3>${manhwa.title}</h3>
        <p>Capítulo ${manhwa.latestChapter}</p>
      </div>
    </article>
  `);

  gridManhwas.innerHTML = cards.join("");
}

function showDetail(id) {
  const manhwa = manhwaDatabase.find((item) => item.id === id);

  if (!manhwa) {
    return;
  }

  const homeView = document.getElementById("home-view");
  const detailView = document.getElementById("detail-view");
  const detailContent = document.getElementById("detail-content");
  const chapters = manhwa.chapters || [];

  homeView.classList.add("hidden");
  detailView.classList.remove("hidden");
  detailContent.innerHTML = `
    <img class="manhwa-cover" src="${manhwa.cover}" alt="Portada de ${manhwa.title}">
    <div class="detail-info">
      <h2>${manhwa.title}</h2>
      <p><strong>Estado:</strong> ${manhwa.status}</p>
      <p>${manhwa.synopsis || "Sin sinopsis disponible."}</p>
      <h3>Capítulos disponibles</h3>
      <ul>
        ${chapters.map((chapter, index) => `
          <li
            class="chapter-item"
            data-manhwa-id="${manhwa.id}"
            data-chapter-index="${index}"
          >
            <a href="#">
              Capítulo ${chapter.number || chapter}
            </a>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function showHome() {
  document.getElementById("detail-view").classList.add("hidden");
  document.getElementById("home-view").classList.remove("hidden");
}

function showReader(manhwaId, chapterIndex) {
  const manhwa = manhwaDatabase.find((item) => item.id === manhwaId);
  const chapter = manhwa?.chapters?.[chapterIndex];

  if (!manhwa || !chapter) {
    return;
  }

  guardarProgreso(manhwa.id, chapter.number || chapterIndex + 1);

  const detailView = document.getElementById("detail-view");
  const readerView = document.getElementById("reader-view");
  const readerTitle = document.querySelector("#reader-nav span");
  const readerContent = document.getElementById("reader-content");
  const pages = chapter.pages || [];

  detailView.classList.add("hidden");
  readerView.classList.remove("hidden");
  readerTitle.textContent = `${manhwa.title} - Capítulo ${chapter.number || chapterIndex + 1}`;
  readerContent.innerHTML = pages
    .map((url) => `<img src="${url}" loading="lazy" alt="Página">`)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document.getElementById("search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredManhwas = manhwaDatabase.filter((manhwa) =>
      manhwa.title.toLowerCase().includes(searchTerm),
    );

    renderHome(filteredManhwas);
  });

  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";

    localStorage.setItem("theme", theme);
  });

  document.getElementById("grid-manhwas").addEventListener("click", (event) => {
    const card = event.target.closest(".manhwa-card");

    if (card) {
      showDetail(card.dataset.id);
    }
  });

  document.getElementById("btn-back").addEventListener("click", showHome);

  document.getElementById("detail-content").addEventListener("click", (event) => {
    const chapterItem = event.target.closest(".chapter-item");

    if (chapterItem) {
      event.preventDefault();
      showReader(
        chapterItem.dataset.manhwaId,
        Number(chapterItem.dataset.chapterIndex),
      );
    }
  });

  document.getElementById("btn-back-detail").addEventListener("click", () => {
    document.getElementById("reader-view").classList.add("hidden");
    document.getElementById("detail-view").classList.remove("hidden");
  });
});