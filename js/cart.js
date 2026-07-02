/* =========================================
   CART.JS - Carrito de compras con localStorage
========================================= */

const CART_KEY = 'fcf_cart';

// Estado global del carrito
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

// Elementos DOM
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartIcon');
const cartClose = document.getElementById('cartClose');
const checkoutBtn = document.getElementById('checkoutBtn');

// -------- Funciones core --------
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  if (cartBadge) cartBadge.textContent = getCartCount();

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (cartTotal) cartTotal.textContent = 'Bs 0';
    return;
  }

  cartBody.innerHTML = cart.map(i => `
    <div class="cart-item" data-id="${i.id}">
      <div class="cart-item-img"><img src="${i.img}" alt="${i.name}"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">Bs ${i.price} c/u</div>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${i.id}">−</button>
          <span>${i.qty}</span>
          <button data-action="inc" data-id="${i.id}">+</button>
        </div>
      </div>
      <span class="cart-item-remove" data-id="${i.id}"><i class="fas fa-trash"></i></span>
    </div>
  `).join('');

  if (cartTotal) cartTotal.textContent = `Bs ${getCartTotal()}`;

  // Bind eventos
  cartBody.querySelectorAll('.cart-item-remove').forEach(b => {
    b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.id)));
  });
  cartBody.querySelectorAll('[data-action]').forEach(b => {
    b.addEventListener('click', () => {
      const id = parseInt(b.dataset.id);
      if (b.dataset.action === 'inc') changeQty(id, 1);
      else changeQty(id, -1);
    });
  });
}

function addToCart(product) {
  const existing = cart.find(x => x.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
  saveCart();
  renderCart();
  bumpBadge();
  showToast(`✔ "${product.name}" agregado al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); }
}

function bumpBadge() {
  if (!cartBadge) return;
  cartBadge.style.animation = 'none';
  setTimeout(() => (cartBadge.style.animation = 'pulse .6s ease'), 10);
}

function openCart() {
  if (!cartModal) return;
  cartModal.classList.add('open');
  cartOverlay.classList.add('open');
}
function closeCart() {
  if (!cartModal) return;
  cartModal.classList.remove('open');
  cartOverlay.classList.remove('open');
}

// -------- Toast notificaciones --------
function showToast(msg) {
  let t = document.getElementById('toastEl');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toastEl';
    t.style.cssText = `
      position:fixed;bottom:100px;right:25px;
      background:#0a0a0a;color:#00ff88;
      border:1px solid #00ff88;border-radius:10px;
      padding:12px 20px;font-size:.9rem;
      z-index:2000;box-shadow:0 0 20px rgba(0,255,136,.4);
      opacity:0;transition:.3s;pointer-events:none;
      max-width:280px;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => (t.style.opacity = '0'), 2500);
}

// -------- Event listeners --------
if (cartIcon) cartIcon.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }
    window.location.href = 'checkout.html';
  });
}

// Exponer API global
window.FCFCart = {
  add: addToCart,
  remove: removeFromCart,
  clear: () => { cart = []; saveCart(); renderCart(); },
  getAll: () => cart,
  getTotal: getCartTotal,
  getCount: getCartCount,
  render: renderCart,
  open: openCart,
  close: closeCart,
};

// Render inicial
renderCart();
