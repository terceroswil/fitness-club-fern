# 🚀 Guía para publicar la web en GitHub Pages

Sigue estos pasos para tener una URL pública que puedas enviar a tu cliente. Tiempo estimado: **10 minutos**.

---

## Paso 1: Crear cuenta en GitHub (si no tienes)

1. Ve a https://github.com/signup
2. Regístrate con tu email (`terceroswil@gmail.com`)
3. Elige un usuario (ej: `wings-fer` o similar)
4. Confirma tu email

---

## Paso 2: Crear el repositorio

1. Una vez logueado, haz click en el botón **verde "New"** (arriba a la izquierda) o ve a https://github.com/new
2. Rellena así:
   - **Repository name:** `fitness-club-fernandez`
   - **Description:** `Web oficial Fitness Club Fernandez`
   - **Public** ✅ (obligatorio para GitHub Pages gratis)
   - **NO marques** "Add a README file" (ya tienes uno)
3. Click en **"Create repository"**

---

## Paso 3: Subir los archivos (opción fácil - drag & drop)

En la página del repositorio recién creado verás un mensaje.

1. Haz click en el link **"uploading an existing file"**
2. Abre tu carpeta `D:\clau-cowork\gim-real\fitness-club-fernandez\club-fer2\clu-fer1\`
3. **Selecciona TODOS los archivos y carpetas** (Ctrl+A) y arrástralos al área de GitHub

   ⚠️ **Importante:** Asegúrate de arrastrar las CARPETAS (css, js, data, assets, images), no solo los archivos sueltos.

4. Espera a que carguen todos (puede tardar 1-2 min si el póster es pesado)
5. En "Commit changes" abajo escribe: `Web inicial`
6. Click en **"Commit changes"** verde

---

## Paso 4: Activar GitHub Pages

1. En tu repositorio, ve a la pestaña **"Settings"** (arriba a la derecha)
2. En el menú lateral izquierdo, click en **"Pages"**
3. En **"Source"** selecciona:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click en **"Save"**
5. **Espera 1-2 minutos.** GitHub construirá tu sitio.
6. Recarga la página y verás:
   > **Your site is live at https://TU-USUARIO.github.io/fitness-club-fernandez/**

Esa es la URL que le envías a tu cliente. ✨

---

## Paso 5: Compartir con el cliente

Envíale al cliente por WhatsApp / email:

> ¡Hola! Ya tengo lista una primera versión de la web.
> Puedes verla aquí: **https://TU-USUARIO.github.io/fitness-club-fernandez/**
>
> Ábrela desde el celular para ver cómo se ve en móvil también.
> Cualquier cambio que quieras me avisas.

---

## 🔄 Cómo actualizar la web después

Cada vez que hagas cambios en tu computadora:

**Opción A - Fácil (drag & drop):**
1. En tu repositorio, entra a la carpeta del archivo cambiado
2. Click en el archivo → botón de lápiz (editar) → pegas el nuevo contenido → "Commit"

**Opción B - Subir varios archivos:**
1. En la página principal del repo click en **"Add file" → "Upload files"**
2. Arrastra los archivos modificados
3. Commit

Los cambios se ven en la web en 1-2 minutos.

---

## 📝 Notas importantes

- **URL personalizada:** Si quieres `fitnessclubfernandez.com` en vez de `github.io`, tienes que comprar el dominio (~$10/año) y configurarlo en Settings → Pages → Custom domain. Se puede hacer después.
- **Archivos privados:** El repo es PÚBLICO. Cualquiera puede ver el código (pero eso no es problema porque es HTML/CSS/JS del frontend).
- **Póster:** Asegúrate de subir `images/promo-julio.jpg` para que aparezca la imagen.
- **HTTPS:** GitHub Pages te da SSL automático. Tu web será `https://` (seguro).

---

## ¿Problemas?

- **La web se ve sin estilos** → revisa que subiste TODA la carpeta `css/`
- **No aparecen productos ni horario** → revisa que subiste la carpeta `data/` con los JSON
- **Póster no aparece** → verifica que el archivo se llama exactamente `promo-julio.jpg` dentro de `images/`
- **"404 - File not found"** → espera 5 minutos más, el primer deploy tarda

Cualquier otra duda, avísame y te ayudo.
