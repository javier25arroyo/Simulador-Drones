# 🚁 Simulador de Formación de Drones

Simulador interactivo de formaciones de drones utilizando conceptos de Álgebra Lineal (Espacios Vectoriales y Combinaciones Lineales).

## 🌐 Demo en Vivo

Visita la aplicación en: **https://[TU-USUARIO].github.io/Simulador-Drones/**

## ✨ Características

- **Modo 2D y 3D**: Visualiza formaciones en el plano o en el espacio
- **Múltiples figuras**: Estrellas, triángulos, cubos, pirámides, hélices y más
- **Control de densidad**: Ajusta el número de drones (1x a 4x)
- **Análisis vectorial**: Cálculo de rango, dimensión y energía total
- **Interfaz responsive**: Optimizada para laptops, tablets y móviles
- **Controles 3D**: Rotación con mouse y zoom con scroll
- **Exportación**: Descarga datos en formato JSON

## 🚀 Despliegue en GitHub Pages

### Configuración Inicial (Una sola vez)

1. **Ir a la configuración del repositorio**:
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   
2. **Habilitar GitHub Pages**:
   - En el menú lateral, busca **Pages**
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

### Desplegar

Simplemente haz push de tus cambios a la rama `main`:

\`\`\`bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
\`\`\`

El workflow se ejecutará automáticamente y tu sitio estará disponible en unos minutos.

### Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Una vez completado (✅), tu sitio estará en línea
4. La URL será: `https://[TU-USUARIO].github.io/Simulador-Drones/`

## 💻 Desarrollo Local

### Requisitos

- Node.js 20.19+ o 22.12+
- npm

### Instalación

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
\`\`\`

### Scripts Disponibles

\`\`\`bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
npm run lint     # Verificar código
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
Simulador-Drones/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── public/                  # Archivos estáticos
├── src/
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── index.html
├── vite.config.js          # Configuración de Vite
└── package.json
\`\`\`

## 🎮 Uso

1. **Selecciona un modo**: 2D o 3D
2. **Elige una figura**: Estrella, cuadrado, corazón, cubo, pirámide, etc.
3. **Ajusta la densidad**: Mueve el slider para agregar más drones
4. **Controla la animación**: Play/Pause, velocidad y reset
5. **Explora en 3D**: Arrastra para rotar, scroll para zoom
6. **Analiza los datos**: Vectores, rango, dimensión y energía
7. **Exporta**: Descarga los datos en JSON

## 🔧 Tecnologías

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **Canvas API** - Renderizado 2D/3D
- **Lucide React** - Iconos
- **GitHub Actions** - CI/CD

## 📊 Conceptos de Álgebra Lineal

- **Espacios Vectoriales**: ℝ² y ℝ³
- **Vectores de Desplazamiento**: Movimiento de cada dron
- **Rango de Matriz**: Número de vectores linealmente independientes
- **Dimensión del Subespacio**: Grados de libertad del movimiento
- **Combinaciones Lineales**: Generación de formaciones

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Creado con ❤️ para aprender Álgebra Lineal de forma interactiva

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
