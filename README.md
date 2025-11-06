# WorldCountries
Trabajo Evaluativo Segundo Cuatrimestre - Diseño Web
Tec. Sup en Desarrollo de Software - ISFT194

Integrantes: Franco Galante, Bautista Rodríguez Viau

**WorldCountries** es una aplicación web informativa que muestra datos actualizados de todos los países del mundo utilizando la API pública **[RestCountries](https://restcountries.com)**.  
El sitio permite buscar países por nombre y visualizar su **bandera, capital, región y población**, con un diseño moderno, responsive y educativo.


## Navegación del sitio
El sitio cuenta con tres secciones principales:

| Página | Archivo | Descripción |
| **Inicio** | `index.html` | Página principal que muestra todas las cards de países, con buscador dinámico conectado a la API. |
| **About** | `about.html` | Sección informativa sobre el proyecto, el equipo de desarrollo y las decisiones de diseño. |
| **Contacto** | `contacto.html` | Formulario de contacto validado con JavaScript, con campos de texto, opciones y checkbox de aceptación de términos. |

## 💻 Tecnologías utilizadas
El proyecto fue desarrollado utilizando únicamente tecnologías **Front-End nativas**:

- **HTML5** → Estructura semántica del sitio.  
- **CSS3** → Diseño, colores, responsive y efectos visuales.  
- **JavaScript (ES6)** → Consumo de la API y validación de formularios.  
- **API pública:** [RestCountries](https://restcountries.com/v3.1/all)

## ⚙️ Estructura del proyecto
WorldCountries-TPEvaluativo/
│
├── index.html
├── about.html
├── contacto.html
│
├── css/
│   └── styles.css
│
└── js/
│   ├── main.js
│   └── form.js
└── img/
    ├── Tierra.png
    ├── avatar.png
    └── conexion.jpg


## 🌐 Funcionamiento general
### Página de inicio (`index.html`)
- Carga los datos de todos los países desde la API `https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region`.
- Muestra los resultados en **cards** con bandera, nombre, capital, región y población.
- Incluye un **buscador dinámico**: filtra países al escribir en tiempo real.
- Si no se encuentran resultados, se muestra un mensaje de error claro y visible.

### Página "About"
- Explica el objetivo educativo del sitio y el uso de la API.
- Presenta el equipo de desarrollo con sus roles y tareas.
- Muestra las decisiones de diseño adoptadas (paleta, estructura, enfoque responsive).

### Página "Contacto"
- Incluye un formulario validado por JavaScript que exige:
  - Nombre completo  
  - Email válido  
  - Motivo de contacto  
  - Mensaje  
  - Aceptación de términos y condiciones  
- Si los campos no están completos o no se aceptan los términos, aparece un **alerta**.
- Al enviar correctamente, muestra un **mensaje de éxito** y resetea el formulario.

## 🎨 Detalles de diseño
- **Paleta principal:** tonos azules inspirados en la Tierra.  
- **Tipografía:** Inter / Poppins, modernas y legibles.  
- **Fondo:** imagen del planeta Tierra con opacidad y fusión.  
- **Cards:** bordes redondeados, sombra suave, efecto hover con elevación.  
- **Responsive:** diseño adaptable a móviles, tablets y escritorio (mobile first).  
- **Header y footer fijos:** navegación accesible y diseño consistente en todo el sitio.

## 🧠 Lógica en JavaScript
El script `main.js` se encarga de:
1. Detectar en qué página se encuentra el usuario mediante la clase del `<body>`.
2. Si es la página **home**, realiza:
   - Fetch a la API.
   - Renderizado dinámico de países en cards.
   - Filtrado en vivo por nombre.
3. Si es la página **contact**, valida el formulario antes de enviarlo.

## 📚 Objetivo educativo
Este proyecto fue desarrollado como trabajo práctico de la materia **Diseño Web**, en la **Tecnicatura Superior en Desarrollo de Software (ISFT N° 194)**.  
Su propósito es demostrar el manejo de:
- APIs REST con JavaScript puro.  
- Maquetación semántica y diseño responsive.  
- Validación de formularios y experiencia de usuario.

## 👥 Equipo de desarrollo

| **Franco Galante** | Diseño general del sitio, elección de paleta, estructura responsive e integración API, implementación de fetch y lógica de búsqueda.
| **Bautista Rodríguez Viau** | Diseño de la sección de contacto, validaciones con JS, redacción y semántica HTML.
