//HOME PAGE

if (document.body.classList.contains("home")) {
  // elementos del DOM para manipular el HTML
  const container = document.getElementById("countries-container");
  const searchInput = document.getElementById("search-input");
  const resultsCount = document.getElementById("search-results-count");
  const searchContainer = document.querySelector(".search-container");

  // lista de países (API + Locales)
  let allCountries = [];

  // HELPERS

  // Seguridad: Evita inyección de código malicioso convirtiendo caracteres especiales
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  // LocalStorage Ultimo seleccionado: Read
  function loadLastCountry() {
    try {
      const raw = localStorage.getItem("lastCountry");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  // Create/update (si no hay uno, lo crea, si hay, modifica)
  function saveLastCountry(country) {
    try {
      localStorage.setItem("lastCountry", JSON.stringify(country));
    } catch (err) {}
  }

  // Box ultimo seleccionado
  const lastViewedBox = document.createElement("div");
  lastViewedBox.id = "last-viewed-box";
  
  Object.assign(lastViewedBox.style, {
    display: "none",            // Oculto si se ingresa por primera vez
    margin: "10px auto 20px",
    padding: "12px",
    borderRadius: "12px",
    background: "#ffffffdd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "450px",
    color: "#1e293b",
    border: "1px solid #e2e8f0",
    textAlign: "left"
  });

  if (searchContainer) {
    searchContainer.insertAdjacentElement("afterend", lastViewedBox);
  }

  // render "Último visto"
  function renderLastViewed() {
    const last = loadLastCountry();
    if (!last) return;

    // Busqueda datos actualizados en la lista completa por si el storage es viejo
    const full = allCountries.find(c => c.name.common === (last.name.common || last.name)) || last;

    const flagSrc = full.flags?.png || full.flags?.svg || '';
    const name = full.name?.common || full.name || "—";
    const capital = full.capital?.[0] || "—";
    const region = full.region || "—";
    const population = typeof full.population === "number" ? full.population.toLocaleString("es-ES") : "—";

    lastViewedBox.innerHTML = `
      <div style="display:flex; gap:15px; align-items:center;">
        <img src="${flagSrc}" alt="Bandera" style="width:60px; height:40px; object-fit:cover; border-radius:6px; border:1px solid #ddd; flex-shrink:0;">
        <div style="line-height:1.3;">
          <div style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:#64748b;">Último país seleccionado</div>
          <div style="font-weight:700; font-size:1.1rem; color:#0f172a;">${escapeHtml(name)}</div>
          <div style="font-size:0.85rem; color:#475569;">
            ${escapeHtml(capital)} · ${escapeHtml(region)} · <span style="white-space:nowrap;">Pob: ${population}</span>
          </div>
        </div>
      </div>
    `;
    lastViewedBox.style.display = "block";
  }

  //CARGA DE DATOS (FETCH)

  async function fetchCountries() {
    try {
      container.innerHTML = "<p class='loading'>Cargando países...</p>";

      // Pedido datos API
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region");
      if (!response.ok) throw new Error("Error al obtener datos");
      const apiCountries = await response.json();

      // Carga paises locales
      const localCountries = JSON.parse(localStorage.getItem("localCountries")) || [];

      // Combinación listas
      allCountries = [...localCountries, ...apiCountries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      renderLastViewed();
      displayCountries(allCountries);
    } catch (error) {
      container.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }

  // GRILLA
  function displayCountries(countries) {
    // HTML de todas las tarjetas usando .map()
    container.innerHTML = countries
      .map(
        (country) => `
        <div class="card" data-country="${escapeHtml(country.name.common)}">
          <img src="${country.flags?.png || ''}" alt="Bandera">
          <h3>${escapeHtml(country.name.common)}</h3>
          <p><strong>Capital:</strong> ${escapeHtml(country.capital?.[0] || "—")}</p>
          <p><strong>Población:</strong> ${typeof country.population === "number" ? country.population.toLocaleString("es-ES") : "—"}</p>
          <p><strong>Región:</strong> ${escapeHtml(country.region || "—")}</p>
        </div>
      `
      )
      .join("");

    // click y guardado ultimo seleccionado
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.dataset.country;
        const selected = allCountries.find((c) => c.name.common === name);
        saveLastCountry(selected); 
        renderLastViewed();
      });
    });

    //contador resultados busqueda
    if (resultsCount) {
      resultsCount.textContent = `${countries.length} resultados`;
    }
  }

  // BUSCADOR
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      displayCountries(allCountries);
    } else {
      const filtered = allCountries.filter((c) =>
        c.name.common.toLowerCase().startsWith(q)
      );
      displayCountries(filtered);
    }
  });

  fetchCountries();
}

// Validación de Formulario contacto
if (document.body.classList.contains("contact")) {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Detiene el envío real para validar primero
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivo = document.getElementById("motivo").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    const acepto = document.getElementById("acepto").checked;

    // Validación: que ningún campo obligatorio esté vacío
    if (!nombre || !email || !motivo || !mensaje) {
      alert("Por favor completá todos los campos.");
      return;
    }
    // Validación: aceptación de términos
    if (!acepto) {
      alert("Debés aceptar los términos.");
      return;
    }

    alert("Mensaje enviado con éxito");
    form.reset();
  });
}

// Validación cargar pais
if (document.body.classList.contains("cargar")) {
  const form = document.getElementById("form-cargar-pais");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const capital = document.getElementById("capital").value.trim();
    const region = document.getElementById("region").value;
    const population = document.getElementById("population").value;
    const image = document.getElementById("image").value.trim();

    // Verificamos que todos los campos del nuevo país existan
    if (!nombre || !capital || !region || !population || !image) {
      alert("Completá todos los campos");
      return;
    }

    // Crecion objeto con la misma estructura que entrega la API
    const nuevoPais = {
      name: { common: nombre },
      capital: [capital],
      region,
      population: Number(population),
      flags: { png: image },
      isLocal: true, // Etiqueta para identificar que es un dato local
    };

    // Datos en LocalStorage, agrega nuevo y guarda
    const guardados = JSON.parse(localStorage.getItem("localCountries")) || [];
    guardados.push(nuevoPais);
    localStorage.setItem("localCountries", JSON.stringify(guardados));

    alert("País cargado correctamente");
    form.reset();
    window.location.href = "index.html"; // Vuelve a inicio
  });
}