# FITNESS CLUB FERNANDEZ

Sitio web profesional para gimnasio con estética neón urbano. HTML/CSS/JS puro, sin frameworks ni build tools.

## Estructura

```
clu-fer1/
├── index.html          Landing principal (hero, clases, planes, contacto)
├── tienda.html         Catálogo completo con filtros y búsqueda
├── checkout.html       Finalizar compra → envío por WhatsApp
├── README.md
│
├── css/
│   ├── style.css       Variables, reset, tipografía, utilidades
│   ├── components.css  Navbar, hero, cards, modal, footer, etc.
│   └── responsive.css  Media queries mobile-first
│
├── js/
│   ├── main.js         Navbar, hero, partículas, animaciones scroll
│   ├── cart.js         Carrito + localStorage
│   ├── products.js     Carga y render de productos (JSON)
│   ├── schedule.js     Horario semanal + filtros
│   └── validation.js   Validación de formularios
│
├── data/
│   ├── products.json   12 productos Herbalife / snacks
│   └── schedule.json   Horario y clases
│
└── assets/
    └── favicon.svg     Ícono neón del sitio
```

## Uso

1. Abrir `index.html` directamente en cualquier navegador moderno, **o**
2. Usar la extensión **Live Server** en VS Code (recomendado para que funcione `fetch()` de JSON).

### Con Live Server (VS Code)

1. Instalar extensión "Live Server" de Ritwick Dey.
2. Click derecho en `index.html` → **Open with Live Server**.
3. Se abre en `http://127.0.0.1:5500` con auto-reload.

## Actualizar contenido

- **Productos**: edita `data/products.json` (agregar/quitar items del array).
- **Horario**: edita `data/schedule.json`.
- **Textos, precios, planes**: directamente en `index.html`.
- **Colores neón**: variables CSS en `css/style.css` (`--neon-green`, `--neon-blue`).

## Funcionalidades

- Navbar fija con hover neón + menú móvil
- Hero con typewriter + partículas canvas conectadas
- Efecto parallax en scroll
- 3 tarjetas de clases con flip 3D
- Horario semanal filtrable por tipo de clase
- Tienda con búsqueda + filtros por categoría
- Carrito persistente (localStorage) con controles +/-
- Página de checkout con formulario y envío por WhatsApp
- Contador animado de estadísticas
- Carrusel de galería con autoplay
- Carrusel de testimonios
- Formularios con validación en tiempo real
- Botón flotante de WhatsApp con pulso
- 100% responsive (mobile, tablet, desktop)
- SEO completo (meta tags, Open Graph, favicon)

## Personalización rápida

**Cambiar número de WhatsApp**: buscar `59170012345` en todos los archivos y reemplazar.

**Cambiar logo**: editar la clase `.logo` en los HTML y regenerar `assets/favicon.svg`.

**Cambiar colores neón**: editar variables `--neon-green` y `--neon-blue` en `css/style.css`.

## Stack técnico

- HTML5 semántico
- CSS3 (variables, grid, flexbox, glassmorphism, animaciones)
- JavaScript vanilla (ES6+)
- Fetch API para JSON
- LocalStorage para carrito
- IntersectionObserver para animaciones scroll
- Canvas API para partículas

Sin dependencias externas salvo Google Fonts (Bebas Neue + Poppins) y Font Awesome (íconos).
