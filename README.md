# Clínica Prof. Albrecht Meerhoff — Sitio Web

Sitio web estático construido con React, TypeScript, Tailwind CSS y Vite, preparado para publicarse directamente en **GitHub Pages**.

## Publicación en GitHub Pages (automática con GitHub Actions)

1. Crea un repositorio en GitHub y sube el código a la rama `main` (o `master`):
   ```bash
   git init
   git add .
   git commit -m "Publicar sitio Clínica Prof. Albrecht Meerhoff"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```
2. En tu repositorio de GitHub, ve a **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente al hacer push (o manualmente desde la pestaña **Actions → Deploy to GitHub Pages → Run workflow**) y publicará el sitio en:
   - `https://<tu-usuario>.github.io/<tu-repositorio>/` (o en tu dominio personalizado si lo configuras en **Settings → Pages → Custom domain**).

## Desarrollo y compilación local

```bash
npm install
npm run dev
npm run build
```

- Las rutas internas usan hash (`#/especialidades/...`), por lo que la navegación directa y las recargas funcionan sin errores 404 en GitHub Pages.
- El build genera automáticamente `.nojekyll` y `404.html`, y resuelve todas las imágenes y logotipos relativos al `base` configurado (funciona tanto en subrutas `/<repo>/` como en dominios raíz).
