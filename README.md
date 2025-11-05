# Simulador de Drones - Espacios Vectoriales

![Version](https://img.shields.io/badge/version-2.0-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)
![License](https://img.shields.io/badge/license-MIT-green)

Aplicación web interactiva de simulador de drones desarrollada con React y Vite para visualizar y analizar conceptos de **Álgebra Lineal** como espacios vectoriales, combinaciones lineales y subespacios.

## ✨ Características Principales

### 🎮 Modos de Visualización
- **Modo 2D (ℝ²)**: Visualización clásica en el plano cartesiano
- **Modo 3D (ℝ³)**: Vista tridimensional interactiva con rotación y zoom

### 🎨 UI/UX Mejorada
- Header con gradientes animados y efectos shimmer
- Selector de modo intuitivo entre 2D y 3D
- Controles de velocidad de animación
- Toggles para activar/desactivar cuadrícula y vectores
- Barra de progreso con porcentaje visible
- Botón de exportación a JSON
- Tema oscuro premium con gradientes
- Diseño totalmente responsive

### 📐 Figuras 2D
- ⭐ Estrella (5 drones)
- 🔺 Triángulo (3 drones)
- ⬜ Cuadrado (4 drones)
- ❤️ Corazón (5 drones)
- ⬠ Pentágono (5 drones)

### 🎲 Figuras 3D
- 🧊 Cubo (8 drones)
- 🔺 Pirámide (5 drones)
- 🌀 Hélice espiral (8 drones)
- ⚪ Esfera (10 drones)
- 💎 Diamante (6 drones)

### 🔬 Análisis Matemático Automático
- Cálculo de vectores de desplazamiento
- Determinación del rango de la matriz
- Identificación de la dimensión del subespacio
- Cálculo de energía total del sistema
- Visualización de todos los vectores con sus magnitudes
- Exportación de datos en formato JSON

### 🎯 Interactividad 3D
- **Rotación**: Arrastra con el mouse para rotar la vista
- **Zoom**: Usa la rueda del mouse para acercar/alejar
- **Auto-rotación**: El espacio rota automáticamente
- **Ejes visuales**: X (rojo), Y (verde), Z (azul)
- **Ordenamiento por profundidad**: Renderizado correcto en 3D

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20 o superior
- npm 10 o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/Simulador-Drones.git

# Entrar al directorio
cd Simulador-Drones

# Instalar dependencias (incluyendo devDependencies)
npm install --include=dev

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
http://localhost:5173/
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev         # Inicia servidor con hot reload

# Producción
npm run build       # Construye para producción
npm run preview     # Previsualiza build de producción

# Calidad de código
npm run lint        # Ejecuta ESLint
```

## 🐳 Docker

### Docker Compose (Recomendado)

```bash
# Modo producción
docker-compose up simulador-drones

# Modo desarrollo
docker-compose up dev
```

### Docker Manual

```bash
# Construir imagen
docker build -t simulador-drones .

# Ejecutar contenedor
docker run -p 3000:80 simulador-drones
```

## 🎓 Uso Académico

Este simulador está diseñado para la enseñanza de **Álgebra Lineal**, específicamente:

- Espacios vectoriales (ℝ² y ℝ³)
- Subespacios vectoriales
- Combinaciones lineales
- Dependencia e independencia lineal
- Base y dimensión
- Rango de matrices
- Transformaciones lineales (proyección 3D→2D)

Ver `PRACTICA.md` para la guía completa de la práctica académica.

## 🛠️ Tecnologías

- **React 19**: Biblioteca UI
- **Vite 7**: Build tool ultra rápido
- **Lucide React**: Iconos modernos
- **Canvas API**: Renderizado 2D/3D
- **Docker**: Containerización
- **Nginx**: Servidor web en producción

## 📊 Estructura del Proyecto

```
simulador-drones/
├── src/
│   ├── App.jsx          # Componente principal con toda la lógica
│   ├── App.css          # Estilos mejorados con gradientes
│   ├── main.jsx         # Punto de entrada
│   └── assets/          # Recursos estáticos
├── public/
│   └── Práctica_Espacios vectoriales.pdf
├── Dockerfile           # Configuración Docker
├── docker-compose.yml   # Orquestación
├── vite.config.js       # Config Vite
├── PRACTICA.md          # Guía de práctica detallada
└── README.md            # Este archivo
```

## 🎮 Controles

### Modo 2D
- **Click Iniciar**: Comienza la animación
- **Click Pausar**: Pausa la animación
- **Click Resetear**: Reinicia desde el inicio
- **Slider Velocidad**: Ajusta velocidad de animación
- **Toggle Cuadrícula**: Muestra/oculta cuadrícula
- **Toggle Vectores**: Muestra/oculta vectores de desplazamiento

### Modo 3D
- **Arrastrar Mouse**: Rota la vista en cualquier dirección
- **Rueda Mouse**: Zoom in/out
- **Auto-rotación**: Se activa automáticamente (se pausa al arrastrar)

## 📈 Características Técnicas

### Algoritmos Implementados
- **Eliminación Gaussiana**: Para cálculo de rango de matrices
- **Proyección Isométrica**: Transformación 3D→2D con rotaciones
- **Ordenamiento Z-Buffer**: Para renderizado correcto de profundidad
- **Interpolación Lineal**: Para animaciones suaves

### Optimizaciones
- Renderizado eficiente con Canvas API
- Cálculos matemáticos optimizados
- Animaciones con requestAnimationFrame
- Lazy loading de componentes

## 🌐 Navegadores Soportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Ejemplos de Uso

### Exportar Datos

El botón "Exportar" genera un JSON con:

```json
{
  "mode": "3D",
  "figure": "cube",
  "numDrones": 8,
  "initialPositions": [[0, 0, 0], ...],
  "finalPositions": [[1, 1, 1], ...],
  "displacements": [
    {
      "index": 1,
      "vector": [1, 1, 1],
      "magnitude": "1.7321"
    }
  ],
  "analysis": {
    "rank": 3,
    "dimension": 3,
    "totalEnergy": "13.8564",
    "spaceType": "ℝ³"
  }
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo `LICENSE` para detalles.

## 👥 Autores

- Desarrollador Principal - [Tu Nombre]
- Práctica Académica - [Universidad/Institución]

## 🙏 Agradecimientos

- Práctica basada en el documento "Práctica_Espacios vectoriales.pdf"
- Iconos por [Lucide](https://lucide.dev/)
- Inspiración en simuladores educativos de matemáticas

## 📞 Soporte

- 📧 Email: tu-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/Simulador-Drones/issues)
- 📖 Documentación: `PRACTICA.md`

## 🔮 Roadmap Futuro

- [ ] Modo VR/AR
- [ ] Figuras personalizadas por el usuario
- [ ] Detección de colisiones
- [ ] Sincronización con música
- [ ] Múltiples formaciones en secuencia
- [ ] Optimización de trayectorias
- [ ] Exportación a otros formatos (CSV, XML)
- [ ] Modo colaborativo multi-usuario
- [ ] Integración con Jupyter Notebooks

---

**⭐ Si este proyecto te fue útil, dale una estrella en GitHub!**

**🚁 ¡Explora el espacio vectorial en 2D y 3D! ✨**

