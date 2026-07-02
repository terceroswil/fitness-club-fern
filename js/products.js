/* =========================================
   PRODUCTS.JS - Carga y render de productos
========================================= */

let ALL_PRODUCTS = [];

// -------- Cargar productos desde JSON --------
async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    ALL_PRODUCTS = await res.json();
    return ALL_PRODUCTS;
  } catch (err) {
    console.error('Error cargando productos:', err);
    return [];
  }
}

// -------- Render en grilla --------
function renderProducts(products, container, limit = null) {
  if (!container) return;
  const list = limit ? products.slice(0, limit) : products;

  container.innerHTML = list.map(p => `
    <div class="product-card reveal" data-cat="${p.cat}">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price">Bs ${p.price}</div>
        <button class="btn-add" data-id="${p.id}">
          <i class="fas fa-cart-plus"></i> Agregar
        </button>
      </div>
    </div>
  `).join('');

  // Bind botones agregar
  container.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = ALL_PRODUCTS.find(x => x.id === parseInt(btn.dataset.id));
      if (p && window.FCFCart) window.FCFCart.add(p);
    });
  });

  // Observar nuevos .reveal
  if (window.__revealObserver) {
    container.querySelectorAll('.reveal').forEach(el => window.__revealObserver.observe(el));
  }
}

// -------- Filtros y búsqueda (para tienda.html) --------
function setupShopFilters(container) {
  const searchInput = document.getElementById('shopSearch');
  const catBtns = document.querySelectorAll('[data-cat-filter]');
  let currentCat = 'all';
  let currentSearch = '';

  function applyFilters() {
    let filtered = ALL_PRODUCTS;
    if (currentCat !== 'all') filtered = filtered.filter(p => p.cat === currentCat);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }
    renderProducts(filtered, container);
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearch = e.target.value.trim();
      applyFilters();
    });
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.catFilter;
      applyFilters();
    });
  });
}

// -------- Auto-inicio según la página --------
document.addEventListener('DOMContentLoaded', async () => {
  const homeShop = document.getElementById('shopGrid');
  const fullShop = document.getElementById('fullShopGrid');

  await loadProducts();

  // Página de inicio: mostrar 8 productos
  if (homeShop) renderProducts(ALL_PRODUCTS, homeShop, 8);

  // Página tienda completa: mostrar todos + filtros
  if (fullShop) {
    renderProducts(ALL_PRODUCTS, fullShop);
    setupShopFilters(fullShop);
  }
});

window.FCFProducts = { loadProducts, renderProducts, getAll: () => ALL_PRODUCTS };
