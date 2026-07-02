/* =========================================
   WHATSAPP.JS - Selector de contacto
   Al pulsar cualquier acción de WhatsApp, el
   usuario elige a quién escribir (por nombre).
========================================= */

(function () {
  const CONTACTS = [
    { name: 'Aydee Fernandez', number: '59168466609' },
    { name: 'Sonia Fernandez', number: '59176480488' }
  ];

  let currentMsg = '';
  let currentCb = null;

  function ready(fn) {
    if (document.body) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ----- Crear el modal selector -----
  const modal = document.createElement('div');
  modal.id = 'waChooser';
  modal.className = 'wa-chooser';
  modal.innerHTML = `
    <div class="wa-chooser-box" role="dialog" aria-modal="true" aria-label="Elegir contacto de WhatsApp">
      <div class="wa-chooser-head">
        <h3><i class="fab fa-whatsapp"></i> Elige con quién chatear</h3>
        <span class="wa-chooser-close" role="button" aria-label="Cerrar">&times;</span>
      </div>
      <div class="wa-chooser-list"></div>
    </div>`;

  function open(message, onChosen) {
    currentMsg = message || '';
    currentCb = typeof onChosen === 'function' ? onChosen : null;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  ready(() => {
    document.body.appendChild(modal);

    const list = modal.querySelector('.wa-chooser-list');
    list.innerHTML = CONTACTS.map(c => `
      <button type="button" class="wa-contact" data-number="${c.number}">
        <span class="wa-contact-icon"><i class="fab fa-whatsapp"></i></span>
        <span class="wa-contact-info">
          <span class="wa-contact-name">${c.name}</span>
          <span class="wa-contact-number">+${c.number}</span>
        </span>
        <i class="fas fa-chevron-right wa-contact-arrow"></i>
      </button>`).join('');

    list.querySelectorAll('.wa-contact').forEach(btn => {
      btn.addEventListener('click', () => {
        const num = btn.dataset.number;
        const url = currentMsg
          ? `https://wa.me/${num}?text=${encodeURIComponent(currentMsg)}`
          : `https://wa.me/${num}`;
        window.open(url, '_blank', 'noopener');
        const cb = currentCb;
        close();
        if (cb) cb(num);
      });
    });

    modal.querySelector('.wa-chooser-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });

    // Interceptar TODOS los enlaces wa.me y enrutarlos por el selector
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        let msg = '';
        try { msg = new URL(a.href).searchParams.get('text') || ''; } catch (_) {}
        open(msg);
      });
    });

    // Disparadores manuales (texto/números clicables)
    document.querySelectorAll('.wa-trigger, [data-wa]').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => open(el.dataset.waMsg || ''));
    });
  });

  window.FCFWhatsApp = { open, close, contacts: CONTACTS };
})();
