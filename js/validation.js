/* =========================================
   VALIDATION.JS - Validación de formularios
========================================= */

const validators = {
  name:    v => v.trim().length >= 3,
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone:   v => { const d = v.replace(/[\s()+-]/g, ''); return /^[0-9]{7,15}$/.test(d); },
  address: v => v.trim().length >= 5,
  plan:    v => v !== '',
  payment: v => v !== '',
};

function validateField(el) {
  const type = el.dataset.validate || el.id;
  const rule = validators[type];
  if (!rule) return true;

  const ok = rule(el.value);
  const group = el.closest('.form-group');
  const hasValue = el.value.trim() !== '';

  el.classList.toggle('valid', ok);
  el.classList.toggle('invalid', !ok && hasValue);
  if (group) group.classList.toggle('error', !ok && hasValue);
  return ok;
}

function setupFormValidation(formId, onSuccess) {
  const form = document.getElementById(formId);
  if (!form) return;

  const fields = form.querySelectorAll('[data-validate], input[required], select[required]');

  fields.forEach(el => {
    el.addEventListener('input', () => validateField(el));
    el.addEventListener('blur', () => validateField(el));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allOk = true;
    fields.forEach(el => {
      // Forzar validación aunque esté vacío
      const type = el.dataset.validate || el.id;
      const rule = validators[type];
      if (rule && !rule(el.value)) {
        allOk = false;
        el.classList.add('invalid');
        el.closest('.form-group')?.classList.add('error');
      }
    });
    if (allOk && onSuccess) onSuccess(form);
  });
}

// Auto-setup del formulario de contacto principal
document.addEventListener('DOMContentLoaded', () => {
  setupFormValidation('contactForm', form => {
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }
    form.reset();
    form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
  });
});

window.FCFValidation = { validateField, setupFormValidation };
