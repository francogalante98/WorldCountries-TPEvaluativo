# 🌍 WorldCountries
Trabajo Evaluativo – Presentación Final - Diseño Web - 2° año
Tecnicatura Superior en Desarrollo de Software – ISFT N°194

**Integrantes:** Franco Galante, Bautista Rodríguez Viau

---

## 📌 Descripción general

**WorldCountries** es una aplicación web informativa que muestra datos actualizados de los países del mundo utilizando la API pública **[RestCountries](https://restcountries.com)**.  
Además, el proyecto incorpora la posibilidad de **crear y persistir países personalizados utilizando `localStorage`**, simulando una base de datos en el frontend, que también permite mostrar cuál es el último país seleccionado por el usuario en una tarjeta en la página principal.

El sitio permite:
- Explorar países del mundo.
- Buscar países por nombre.
- Visualizar bandera, capital, región y población.
- Visualizar último país seleccionado debajo de la barra de búsqueda
- Agregar nuevos países desde la interfaz de usuario y mantenerlos persistidos.

---

## 🧭 Navegación del sitio

El sitio cuenta con cuatro secciones principales:

| Página | Archivo | Descripción |
|------|--------|-------------|
| Inicio | `index.html` | Página principal que muestra las cards de países obtenidos desde la API y los creados localmente y una card con el último país seleccionado. Incluye buscador dinámico. |
| About | `about.html` | Información sobre el proyecto, el equipo, roles y decisiones de diseño. |
| Contacto | `contacto.html` | Formulario de contacto validado con JavaScript. |
| Cargar País | `cargar-pais.html` | Formulario para crear un nuevo país y guardarlo en `localStorage`. |

---

## 💻 Tecnologías utilizadas

El proyecto fue desarrollado utilizando tecnologías **Front-End nativas**:

- **HTML5** → Estructura semántica del sitio.
- **CSS3** → Diseño visual, variables CSS, responsive y efectos.
- **JavaScript (ES6)** → Consumo de API, manipulación del DOM, validaciones y persistencia, LocalStorage.
- **API pública:** [RestCountries](https://restcountries.com/v3.1/all)
- **Visual Studio Code** → Desarrollo y organización del proyecto.

---

## ⚙️ Estructura del proyecto

```
WorldCountries-TPEvaluativo/
│
├── index.html
├── about.html
├── contacto.html
├── cargar-pais.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── main.js
│
└── img/
    ├── Tierra.png
    ├── avatar.png
    └── conexion.jpg
```

---

## 🌐 Funcionamiento general

### Página de inicio (`index.html`)

- Consume datos desde el endpoint:
  ```
  https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region
  ```
- Muestra los países en un sistema de **cards** responsive.
- Incluye un **buscador dinámico** que filtra los países en tiempo real.
- Integra países obtenidos desde la API y países creados localmente.
- Maneja estados de carga (loading) y errores.

### Página “Cargar País” (`cargar-pais.html`)

- Contiene un formulario para crear un nuevo país.
- Los datos se validan con JavaScript.
- Al enviarse correctamente:
  - El país se guarda en `localStorage`.
  - Se redirige al Home.
  - El país aparece como una nueva card junto a los de la API.
- Los datos persisten incluso al recargar el sitio.

### Página “Contacto” (`contacto.html`)

- Formulario con campos obligatorios:
  - Nombre completo
  - Email
  - Motivo (select)
  - Mensaje
  - Aceptación de términos
- Validación con JavaScript.
- Mensajes de error y éxito mediante alertas.
- Reset automático del formulario tras el envío exitoso.

### Página “About” (`about.html`)

- Presentación del proyecto y su objetivo educativo.
- Integrantes del equipo con roles y responsabilidades.
- Decisiones de diseño y elección de la API.
- Documentación técnica básica.

---

## 💾 Uso de localStorage

El proyecto utiliza `localStorage` para simular una base de datos en frontend:

- **Clave:** `localCountries`
- **Contenido:** array de países creados por el usuario.
- Los países locales se combinan con los países obtenidos desde la API para mostrarse en el Home.
- También se utiliza `localStorage` para guardar el último país seleccionado por el usuario.

---

## 🎨 Detalles de diseño

- **Paleta de colores:** tonos azules inspirados en el planeta Tierra.
- **Tipografías:** Inter y Poppins.
- **Diseño:** mobile-first con media queries para 768px y 1024px.
- **Cards:** bordes redondeados, sombras suaves y efecto hover.
- **Header y footer fijos** para una navegación consistente.

---

## 📚 Objetivo educativo

Este proyecto fue desarrollado como Trabajo Práctico Evaluativo de la materia **Diseño Web**, perteneciente a la **Tecnicatura Superior en Desarrollo de Software (ISFT N°194)**.

Su finalidad es demostrar el manejo de:
- Consumo de APIs REST.
- Persistencia de datos en frontend con `localStorage`.
- Manipulación del DOM.
- Diseño responsive y buenas prácticas de desarrollo web.

---

## 👥 Equipo de desarrollo

- **Franco Galante**  
  Diseño general del sitio, paleta de colores, estructura responsive, integración con la API y lógica JavaScript principal.

- **Bautista Rodríguez Viau**  
  Diseño de la sección de contacto, validaciones de formularios, semántica HTML y redacción del contenido.