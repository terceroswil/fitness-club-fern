/* =========================================
   SHARE.JS - Botón flotante para compartir
   en redes sociales (sin dependencias).
========================================= */

(function () {
  const TEXT = '💪 FITNESS CLUB FERNANDEZ — Transforma tu cuerpo, transforma tu vida. Aeróbicos, Zumba y Funcional. ¡Tu 1.ª sesión es GRATIS!';

  function pageUrl() { return window.location.href.split('#')[0]; }
  function ready(fn) { document.body ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  // ----- Botón flotante -----
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'share-float';
  btn.setAttribute('aria-label', 'Compartir');
  btn.innerHTML = '<i class="fas fa-share-nodes"></i><span class="share-tooltip">Compartir</span>';

  // ----- Panel con opciones -----
  const panel = document.createElement('div');
  panel.className = 'share-panel';
  panel.innerHTML = `
    <div class="share-panel-title"><i class="fas fa-share-nodes"></i> Compartir esta página</div>
    <div class="share-opts">
      <a class="share-opt wa" data-net="wa" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i><span>WhatsApp</span></a>
      <a class="share-opt fb" data-net="fb" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
      <a class="share-opt tg" data-net="tg" target="_blank" rel="noopener"><i class="fab fa-telegram-plane"></i><span>Telegram</span></a>
      <a class="share-opt x" data-net="x" target="_blank" rel="noopener"><i class="fab fa-x-twitter"></i><span>X</span></a>
      <button class="share-opt copy" data-net="copy" type="button"><i class="fas fa-link"></i><span>Copiar enlace</span></button>
    </div>`;

  function buildLinks() {
    const u = encodeURIComponent(pageUrl());
    const t = encodeURIComponent(TEXT);
    panel.querySelector('[data-net="wa"]').href = `https://wa.me/?text=${t}%20${u}`;
    panel.querySelector('[data-net="fb"]').href = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    panel.querySelector('[data-net="tg"]').href = `https://t.me/share/url?url=${u}&text=${t}`;
    panel.querySelector('[data-net="x"]').href  = `https://twitter.com/intent/tweet?text=${t}&url=${u}`;
  }

  function openPanel() { buildLinks(); panel.classList.add('open'); btn.classList.add('active'); }
  function closePanel() { panel.classList.remove('open'); btn.classList.remove('active'); }

  function toast(msg) {
    let t = document.getElementById('shareToast');
    if (!t) { t = document.createElement('div'); t.id = 'shareToast'; t.className = 'share-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._to);
    t._to = setTimeout(() => t.classList.remove('show'), 2200);
  }

  ready(() => {
    document.body.appendChild(panel);
    document.body.appendChild(btn);

    // Opción nativa (móvil): incluye Instagram, Messenger, etc.
    if (navigator.share) {
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'share-opt more';
      more.innerHTML = '<i class="fas fa-ellipsis"></i><span>Más apps…</span>';
      more.addEventListener('click', () => {
        navigator.share({ title: 'FITNESS CLUB FERNANDEZ', text: TEXT, url: pageUrl() }).catch(() => {});
        closePanel();
      });
      panel.querySelector('.share-opts').appendChild(more);
    }

    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.contains('open') ? closePanel() : openPanel();
    });

    // Copiar enlace
    panel.querySelector('[data-net="copy"]').addEventListener('click', async () => {
      const link = pageUrl();
      try {
        await navigator.clipboard.writeText(link);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = link; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        ta.remove();
      }
      toast('✔ Enlace copiado');
      closePanel();
    });

    // Cerrar el panel al elegir una red
    panel.querySelectorAll('a.share-opt').forEach(a => a.addEventListener('click', closePanel));

    // Cerrar al hacer clic fuera o con Escape
    document.addEventListener('click', e => {
      if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) closePanel();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  });
})();
