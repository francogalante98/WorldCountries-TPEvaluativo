
if (document.body.classList.contains("home")) {
  const container = document.getElementById("countries-container")
  const searchInput = document.getElementById("search-input")
  const resultsCount = document.getElementById("search-results-count")
  let allCountries = []

  async function fetchCountries() {
    try {
      container.innerHTML = "<p class='loading'>Cargando países...</p>"

      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region")

      if (!response.ok) throw new Error("Error al obtener los datos")

      const data = await response.json()

      allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

      displayCountries(allCountries)
    } catch (error) {
      container.innerHTML = `<p class="error">${error.message}</p>`
      console.error(error)
    }
  }

  function displayCountries(countries) {
    const cardsHTML = countries
      .map(
        (country) => `
          <div class="card">
            <img src="${country.flags?.png || ""}" alt="Bandera de ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "—"}</p>
            <p><strong>Región:</strong> ${country.region}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString("es-ES")}</p>
          </div>
        `,
      )
      .join("")

    if (countries.length === 0) {
      container.innerHTML = "<p class='error'>No se encontraron países con ese criterio.</p>"
    } else {
      container.innerHTML = cardsHTML
    }

    resultsCount.textContent = `${countries.length} resultado${countries.length !== 1 ? "s" : ""}`
  }

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim()

    if (searchTerm === "") {
      displayCountries(allCountries)
    } else {
      const filtered = allCountries.filter((country) => country.name.common.toLowerCase().startsWith(searchTerm))
      displayCountries(filtered)
    }
  })
  fetchCountries()
}


if (document.body.classList.contains("contact")) {
  const form = document.querySelector("form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value.trim()
    const email = document.getElementById("email").value.trim()
    const motivo = document.getElementById("motivo").value
    const mensaje = document.getElementById("mensaje").value.trim()
    const acepto = document.getElementById("acepto").checked

    if (!nombre || !email || !motivo || !mensaje) {
      alert("Por favor completá todos los campos obligatorios.")
      return
    }

    if (!acepto) {
      alert("Debés aceptar los términos y condiciones.")
      return
    }

    alert("¡Mensaje enviado con éxito!")
    form.reset()
  })
}
