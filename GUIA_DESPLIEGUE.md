# 🎯 Guía Rápida de Despliegue en GitHub Pages

## ✅ Archivos Creados

Se han creado los siguientes archivos para el despliegue:

- ✅ `.github/workflows/deploy.yml` - Workflow de GitHub Actions
- ✅ `vite.config.js` - Actualizado con base path
- ✅ `DEPLOYMENT.md` - Documentación completa
- ✅ `deploy.ps1` - Script de despliegue para Windows
- ✅ `deploy.sh` - Script de despliegue para Linux/Mac

## 🚀 Pasos para Desplegar (IMPORTANTE)

### 1️⃣ Configurar GitHub Pages (Solo una vez)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú lateral, busca **Pages**
4. En **Build and deployment**:
   - **Source**: Selecciona **GitHub Actions**
5. ¡Listo! No necesitas hacer nada más aquí

### 2️⃣ Hacer Push de los Cambios

Ahora tienes 3 opciones para desplegar:

#### Opción A: Usando el script de PowerShell (Windows) ⭐ RECOMENDADO

```powershell
.\deploy.ps1
```

Este script te guiará paso a paso.

#### Opción B: Usando el script de Bash (Linux/Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Opción C: Manualmente con Git

```bash
git add .
git commit -m "Deploy: Add GitHub Pages support"
git push origin main
```

### 3️⃣ Verificar el Despliegue

1. Ve a: `https://github.com/[TU-USUARIO]/Simulador-Drones/actions`
2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
3. Espera 2-3 minutos hasta que aparezca ✅
4. Tu sitio estará disponible en:
   
   **`https://[TU-USUARIO].github.io/Simulador-Drones/`**

## 📝 Ejemplo Completo

Si tu usuario de GitHub es `juanperez`:

```
URL del repositorio: https://github.com/juanperez/Simulador-Drones
URL de GitHub Pages: https://juanperez.github.io/Simulador-Drones/
```

## 🔧 Cambios Realizados

### 1. Workflow de GitHub Actions
- Instalación automática de dependencias
- Build con Vite
- Despliegue automático a GitHub Pages
- Se ejecuta en cada push a `main`

### 2. Configuración de Vite
- Agregado `base: '/Simulador-Drones/'` para rutas correctas
- Build optimizado para producción

### 3. Scripts de Despliegue
- Verificación de rama actual
- Detección de cambios
- Commit y push automatizado
- Mensajes informativos

## ⚠️ Solución de Problemas

### Error: "Page not found" después del despliegue

1. Verifica que el workflow terminó correctamente (✅)
2. Espera 5 minutos más (a veces GitHub tarda)
3. Intenta en modo incógnito (limpia la caché)

### Error: "Failed to deploy" en GitHub Actions

1. Ve a Settings → Pages
2. Asegúrate de que Source está en **GitHub Actions**
3. Vuelve a hacer push

### Error: Rutas rotas en el sitio

- Verifica que `vite.config.js` tiene: `base: '/Simulador-Drones/'`
- Reconstruye: `npm run build`
- Haz push de nuevo

## 🎉 ¡Y eso es todo!

Ahora cada vez que hagas push a `main`, tu sitio se actualizará automáticamente.

### Despliegues Futuros

Solo necesitas:

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

O simplemente ejecuta `.\deploy.ps1` (Windows) o `./deploy.sh` (Linux/Mac)

## 📚 Recursos Adicionales

- [Documentación de GitHub Pages](https://docs.github.com/pages)
- [Documentación de Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions](https://docs.github.com/actions)

---

**¿Necesitas ayuda?** Revisa el archivo `DEPLOYMENT.md` para más detalles.

¡Feliz despliegue! 🚀
