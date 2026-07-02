/* =========================================
   SCHEDULE.JS - Horario semanal + filtros
========================================= */

async function loadSchedule() {
  try {
    const res = await fetch('data/schedule.json');
    return await res.json();
  } catch (err) {
    console.error('Error cargando horario:', err);
    return null;
  }
}

function renderSchedule(data, container) {
  if (!container || !data) return;
  container.innerHTML = '';

  // Header: [Hora, días]
  const headerRow = ['Hora', ...data.days];
  headerRow.forEach(text => {
    const el = document.createElement('div');
    el.className = 'schedule-cell header';
    el.textContent = text;
    container.appendChild(el);
  });

  // Filas de horario
  Object.keys(data.schedule).forEach(time => {
    const tEl = document.createElement('div');
    tEl.className = 'schedule-cell time';
    tEl.textContent = time;
    container.appendChild(tEl);

    data.schedule[time].forEach(cls => {
      const el = document.createElement('div');
      if (cls && data.classes[cls]) {
        el.className = `schedule-cell class-cell class-${cls}`;
        el.dataset.type = cls;
        el.textContent = data.classes[cls].name;
      } else {
        el.className = 'schedule-cell empty';
        el.textContent = '—';
      }
      container.appendChild(el);
    });
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.class-cell').forEach(c => {
        c.classList.toggle('hidden', f !== 'all' && c.dataset.type !== f);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('scheduleGrid');
  if (!container) return;

  const data = await loadSchedule();
  renderSchedule(data, container);
  setupFilters();
});
