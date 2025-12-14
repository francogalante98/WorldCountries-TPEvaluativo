if (document.body.classList.contains("home")) {
  // -----------------------
  // SELECTORES (de tu HTML original)
  // -----------------------
  const container = document.getElementById("countries-container");
  const searchInput = document.getElementById("search-input");
  const resultsCount = document.getElementById("search-results-count");
  const searchContainer = document.querySelector(".search-container"); // donde está el input

  if (!container || !searchInput) {
    console.error("main.js: no encuentro #countries-container o #search-input en el DOM. Revisa tus IDs.");
  } else {

    let allCountries = [];

    // =======================
    // LOCALSTORAGE: READ
    // =======================
    function loadLastCountry() {
      try {
        const raw = localStorage.getItem("lastCountry");
        return raw ? JSON.parse(raw) : null;
      } catch (err) {
        console.error("Error parseando lastCountry:", err);
        return null;
      }
    }

    // =======================
    // LOCALSTORAGE: CREATE / UPDATE
    // (ambos son la misma acción: setItem reemplaza si ya existe)
    // =======================
    function saveLastCountry(country) {
      try {
        localStorage.setItem("lastCountry", JSON.stringify(country));
      } catch (err) {
        console.error("Error guardando lastCountry en localStorage:", err);
      }
    }

    // =======================
    // CAJA DE "ULTIMO VISTO" (insertada por JS, no hay que tocar HTML)
    // =======================
    const lastViewedBox = document.createElement("div");
    lastViewedBox.id = "last-viewed-box";
    // estilos mínimos (puedes mover a CSS si querés)
    Object.assign(lastViewedBox.style, {
      display: "none",              // oculto hasta que haya algo
      marginTop: "10px",
      marginBottom: "15px",
      padding: "10px",
      borderRadius: "8px",
      background: "#ffffffdd",
      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
      maxWidth: "420px",           // evita que quede muy ancho
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "left",
      color: "#0f172a",
    });

    // lo insertamos: si existe searchContainer lo pegamos después; si no, antes del container
    if (searchContainer && searchContainer.parentNode) {
      searchContainer.insertAdjacentElement("afterend", lastViewedBox);
    } else {
      container.parentNode.insertBefore(lastViewedBox, container);
    }

    // =======================
    // Mostrar el último visto (READ visual)
    // =======================
    function renderLastViewed() {
      const last = loadLastCountry();
      if (!last) {
        lastViewedBox.style.display = "none";
        return;
      }

      // Si el objeto guardado contiene solo { name } (por versiones antiguas),
      // intentamos buscar la info completa en allCountries para mostrar bandera y demás.
      let full = last;
      if (last.name && (!last.flags || !last.population)) {
        const found = allCountries.find(c => c.name.common === last.name);
        if (found) full = found;
      }

      const flagSrc = (full.flags && (full.flags.png || full.flags.svg)) || "";
      const name = full.name ? (full.name.common || full.name) : "—";
      const capital = full.capital ? full.capital[0] : "—";
      const region = full.region || "—";
      const population = typeof full.population === "number" ? full.population.toLocaleString("es-ES") : "—";

      lastViewedBox.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center;">
          <img src="${flagSrc}" alt="Bandera de ${escapeHtml(name)}" style="width:56px; height:36px; object-fit:cover; border-radius:6px; flex-shrink:0; border:1px solid rgba(0,0,0,0.06);">
          <div style="line-height:1;">
            <div style="font-size:0.85rem; color:#374151;">Último país seleccionado</div>
            <div style="font-weight:700; font-size:1rem; color:#0f172a;">${escapeHtml(name)}</div>
            <div style="font-size:0.85rem; color:#475569;">${escapeHtml(capital)} · ${escapeHtml(region)} · Población: ${escapeHtml(population)}</div>
          </div>
        </div>
      `;

      lastViewedBox.style.display = "block";
    }

    // =======================
    // fetchCountries (trae todos los países)
    // =======================
    async function fetchCountries() {
      try {
        container.innerHTML = "<p class='loading'>Cargando países...</p>";

        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region");

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();

        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // mostrar caja último visto y la lista
        renderLastViewed();
        displayCountries(allCountries);
      } catch (error) {
        container.innerHTML = `<p class="error">${error.message}</p>`;
        console.error(error);
      }
    }

    // =======================
    // displayCountries: renderiza las cards (grid)
    // =======================
    function displayCountries(countries) {
      const cardsHTML = countries.map(country => `
        <div class="card" data-country="${escapeHtml(country.name.common)}">
          <img src="${(country.flags && (country.flags.png || country.flags.svg)) || ''}" alt="Bandera de ${escapeHtml(country.name.common)}">
          <h3>${escapeHtml(country.name.common)}</h3>
          <p><strong>Capital:</strong> ${escapeHtml(country.capital?.[0] || "—")}</p>
          <p><strong>Región:</strong> ${escapeHtml(country.region || "—")}</p>
          <p><strong>Población:</strong> ${escapeHtml(typeof country.population === "number" ? country.population.toLocaleString("es-ES") : "—")}</p>
        </div>
      `).join("");

      container.innerHTML = cardsHTML;

      // =======================
      // CREATE / UPDATE: al click en una card guardar como lastCountry
      // =======================
      document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", () => {
          const countryName = card.getAttribute("data-country");
          // buscamos el objeto completo en allCountries
          const full = allCountries.find(c => c.name.common === countryName) || { name: countryName };
          saveLastCountry(full); // CREATE / UPDATE en localStorage
          renderLastViewed();    // refrescar la caja
        });
      });

      // actualizar contador de resultados (si existe)
      if (resultsCount) {
        resultsCount.textContent = `${countries.length} resultado${countries.length !== 1 ? "s" : ""}`;
      }
    }

    // =======================
    // BUSCADOR (filtrado local para velocidad)
    // =======================
    let debounceTimer = null;
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (q === "") {
          displayCountries(allCountries);
        } else {
          const filtered = allCountries.filter(c => c.name.common.toLowerCase().startsWith(q));
          displayCountries(filtered);
        }
      }, 180);
    });

    // =======================
    // helper: escape básico para seguridad
    // =======================
    function escapeHtml(str) {
      if (typeof str !== "string") return str;
      return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    }

    // =======================
    // inicialización
    // =======================
    fetchCountries();
  }
} // end if home

// ==================================================================
// CONTACT PAGE (sin cambios)
// ==================================================================
if (document.body.classList.contains("contact")) {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivo = document.getElementById("motivo").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    const acepto = document.getElementById("acepto").checked;

    if (!nombre || !email || !motivo || !mensaje) {
      alert("Por favor completá todos los campos obligatorios.");
      return;
    }

    if (!acepto) {
      alert("Debés aceptar los términos y condiciones.");
      return;
    }

    alert("¡Mensaje enviado con éxito!");
    form.reset();
  });
}

