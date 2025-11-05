# 🚁 Práctica: Espacios Vectoriales y Formación de Drones

## 🎉 NUEVA VERSIÓN - Con Modo 3D y UI/UX Mejorada

## 📋 Objetivo de la Práctica

Representar el desplazamiento coordinado de drones como **combinaciones lineales** de vectores base, y analizar qué **subespacios** y relaciones vectoriales surgen en la transformación de una formación inicial a una figura final, tanto en **2D (ℝ²)** como en **3D (ℝ³)**.

---

## 🚀 Nuevas Características Implementadas

### ✨ Modo 3D Completo
- **Rotación Interactiva**: Arrastra con el mouse para rotar la vista
- **Zoom Dinámico**: Usa la rueda del mouse para hacer zoom
- **Proyección Isométrica**: Visualización realista del espacio 3D
- **Auto-rotación**: El espacio rota automáticamente cuando no interactúas
- **Ejes 3D**: Visualización de los ejes X (rojo), Y (verde) y Z (azul)
- **Cuadrícula del Suelo**: Referencia espacial en el plano XY
- **Ordenamiento por Profundidad**: Los drones se dibujan correctamente según su posición en Z

### 🎨 UI/UX Mejorada
- **Header con Gradiente Animado**: Efecto shimmer y iconos flotantes
- **Selector de Modo**: Cambia fácilmente entre 2D y 3D
- **Controles de Velocidad**: Ajusta la velocidad de la animación con un slider
- **Toggle de Visualización**: Activa/desactiva cuadrícula y vectores
- **Barra de Progreso Mejorada**: Con porcentaje visible
- **Iconos para Figuras**: Cada figura tiene su emoji representativo
- **Botón de Exportación**: Descarga los datos en formato JSON
- **Estadísticas Destacadas**: Rango y dimensión con efectos visuales
- **Tema Oscuro Premium**: Gradientes y efectos de luz mejorados
- **Animaciones Suaves**: Transiciones y hover effects en todos los elementos
- **Responsive Design**: Se adapta a tablets y móviles

### 📐 Figuras 2D (ℝ²)
- ⭐ **Estrella** (5 drones)
- 🔺 **Triángulo** (3 drones)
- ⬜ **Cuadrado** (4 drones)
- ❤️ **Corazón** (5 drones)
- ⬠ **Pentágono** (5 drones)

### 🎲 Figuras 3D (ℝ³) - ¡NUEVO!
- 🧊 **Cubo** (8 drones)
- 🔺 **Pirámide** (5 drones)
- 🌀 **Hélice** (8 drones en espiral)
- ⚪ **Esfera** (10 drones distribuidos esféricamente)
- 💎 **Diamante** (6 drones formando un diamante 3D)

---

## 🎮 Cómo Usar las Nuevas Características

### Modo 2D
1. Click en "Modo 2D" en el header
2. Selecciona una figura 2D
3. Click en "Iniciar" para ver la animación
4. Ajusta la velocidad con el slider
5. Activa/desactiva cuadrícula y vectores con los toggles

### Modo 3D (¡NUEVO!)
1. Click en "Modo 3D" en el header
2. Selecciona una figura 3D
3. **Arrastra con el mouse** para rotar la vista en cualquier dirección
4. **Usa la rueda del mouse** para hacer zoom in/out
5. Observa cómo los drones se mueven en el espacio tridimensional
6. Los ejes de colores te ayudan a orientarte:
   - **Rojo**: Eje X
   - **Verde**: Eje Y
   - **Azul**: Eje Z

### Exportar Datos
1. Click en el botón "Exportar" 
2. Se descargará un archivo JSON con:
   - Modo actual (2D o 3D)
   - Figura seleccionada
   - Posiciones iniciales y finales
   - Todos los vectores de desplazamiento
   - Análisis completo (rango, dimensión, energía)

---

## 📊 Análisis Matemático Extendido

### En Modo 2D (ℝ²)
- **Espacio vectorial**: ℝ² (plano cartesiano)
- **Vectores**: Forma [x, y]
- **Rango posible**: 1 o 2
- **Interpretación**:
  - Rango 1: Movimiento en una línea
  - Rango 2: Movimiento libre en el plano

### En Modo 3D (ℝ³) - ¡NUEVO!
- **Espacio vectorial**: ℝ³ (espacio euclidiano)
- **Vectores**: Forma [x, y, z]
- **Rango posible**: 1, 2 o 3
- **Interpretación**:
  - Rango 1: Movimiento en una línea
  - Rango 2: Movimiento en un plano dentro del espacio
  - Rango 3: Movimiento libre en las tres dimensiones

### Fórmulas Implementadas

**Vector de desplazamiento (2D):**
```
D⃗ᵢ = Fᵢ - Pᵢ = (xf - xi, yf - yi)
```

**Vector de desplazamiento (3D):**
```
D⃗ᵢ = Fᵢ - Pᵢ = (xf - xi, yf - yi, zf - zi)
```

**Proyección 3D a 2D (Isométrica):**
```
Rotación en X: y' = y·cos(θx) - z·sin(θx)
              z' = y·sin(θx) + z·cos(θx)

Rotación en Y: x' = x·cos(θy) + z'·sin(θy)
              z'' = -x·sin(θy) + z'·cos(θy)

Perspectiva: scale = perspective / (perspective + z'')
```

---

## 🎓 Conceptos de Álgebra Lineal Aplicados

| Concepto | Aplicación 2D | Aplicación 3D |
|----------|---------------|---------------|
| **Espacio Vectorial** | ℝ² (plano) | ℝ³ (espacio) |
| **Dimensión Máxima** | 2 | 3 |
| **Base Estándar** | {(1,0), (0,1)} | {(1,0,0), (0,1,0), (0,0,1)} |
| **Combinación Lineal** | v = αe₁ + βe₂ | v = αe₁ + βe₂ + γe₃ |
| **Subespacio** | Recta o plano completo | Recta, plano o espacio completo |
| **Rango** | 1 a 2 | 1 a 3 |

---

## 🎯 Ejercicios Propuestos

### Nivel Básico
1. ✅ Compara el rango de la estrella 2D vs el cubo 3D
2. ✅ Observa cómo cambia la energía entre figuras 2D y 3D
3. ✅ Identifica qué figuras tienen vectores paralelos

### Nivel Intermedio
4. ✅ Exporta los datos de una figura 3D y analiza los vectores
5. ✅ Compara la hélice con la esfera: ¿cuál tiene mayor energía?
6. ✅ Encuentra una figura con rango 2 en modo 3D

### Nivel Avanzado
7. ⭐ Calcula manualmente la base del subespacio de una figura
8. ⭐ Predice el rango antes de ver la animación
9. ⭐ Propón una nueva figura 3D y sus coordenadas

---

## 💡 Tips de Uso

### Para el Modo 3D
- **Rota lentamente**: Observa cómo los vectores mantienen sus relaciones espaciales
- **Usa el zoom**: Acércate para ver detalles, aléjate para ver la estructura completa
- **Pausa durante la rotación**: Analiza la figura desde diferentes ángulos
- **Observa los ejes**: Te ayudan a entender la orientación espacial

### Para el Análisis
- **Compara energías**: Figuras más dispersas requieren más energía
- **Busca patrones**: ¿Qué figuras tienen rango máximo?
- **Usa la exportación**: Analiza los datos en detalle fuera del simulador
- **Experimenta con velocidades**: Velocidades lentas para análisis, rápidas para demostraciones

---

## 🔬 Elementos Visuales

### Modo 2D
- **Puntos grises**: Posiciones iniciales
- **Puntos rojos translúcidos**: Posiciones finales (objetivo)
- **Círculos azules**: Drones en movimiento
- **Flechas azules**: Vectores de desplazamiento
- **Líneas punteadas**: Trayectorias completas
- **Cuadrícula**: Sistema de coordenadas

### Modo 3D (¡NUEVO!)
- **Ejes de colores**: Sistema de referencia 3D
- **Cuadrícula del suelo**: Plano XY de referencia
- **Drones con sombras**: Efecto de profundidad
- **Tamaño variable**: Los drones más cercanos se ven más grandes
- **Ordenamiento Z**: Objetos más lejanos se dibujan primero

---

## 🚀 Mejoras Técnicas Implementadas

### Rendimiento
- ✅ Renderizado optimizado con ordenamiento por profundidad
- ✅ Animaciones con requestAnimationFrame
- ✅ Cálculo eficiente de matrices con eliminación gaussiana

### Interactividad
- ✅ Detección de arrastre del mouse
- ✅ Zoom con rueda del mouse
- ✅ Auto-rotación pausable
- ✅ Controles responsive

### Visualización
- ✅ Proyección isométrica matemáticamente correcta
- ✅ Efectos de profundidad y perspectiva
- ✅ Gradientes y sombras CSS
- ✅ Animaciones CSS suaves

---

## 📚 Preguntas de Reflexión Actualizadas

### 1. ¿Cuál es la diferencia entre ℝ² y ℝ³?
**Respuesta**: ℝ² es el plano (2 dimensiones), ℝ³ es el espacio (3 dimensiones). En ℝ³ tenemos una dimensión adicional (z) que permite movimientos "hacia arriba/abajo".

### 2. ¿Puede una figura 3D tener rango 2?
**Respuesta**: Sí, si todos los drones se mueven dentro de un plano (como una hoja de papel flotando en el aire), el rango será 2 aunque estemos en ℝ³.

### 3. ¿Qué representa la proyección isométrica?
**Respuesta**: Es una forma de representar objetos 3D en una pantalla 2D manteniendo las proporciones, permitiéndonos visualizar el espacio tridimensional.

### 4. ¿Por qué algunos drones se ven más grandes en 3D?
**Respuesta**: Por la perspectiva: los objetos más cercanos al observador se ven más grandes, simulando la visión humana real.

---

## 🎓 Conexión con el Curso - Extendido

Esta práctica ahora ilustra:
- **Tema 1**: Espacios vectoriales ℝⁿ (n=2 y n=3)
- **Tema 2**: Subespacios vectoriales en diferentes dimensiones
- **Tema 3**: Dependencia e independencia lineal
- **Tema 4**: Base y dimensión (incluyendo base de ℝ³)
- **Tema 5**: Rango de matrices en 2D y 3D
- **Tema 6**: Transformaciones lineales (proyección 3D→2D)
- **Tema 7**: Sistemas de coordenadas y cambio de base

---

## ⌨️ Atajos de Teclado (Sugeridos para implementación futura)

- `Espacio`: Play/Pausa
- `R`: Reset
- `2`: Cambiar a modo 2D
- `3`: Cambiar a modo 3D
- `G`: Toggle cuadrícula
- `V`: Toggle vectores
- `E`: Exportar datos
- `+/-`: Ajustar velocidad

---

## 🌟 Características Premium Implementadas

✅ **Gradientes Animados**: Efectos shimmer en el header  
✅ **Hover Effects**: Todos los botones y cards responden al mouse  
✅ **Sombras Dinámicas**: Drones en 3D con sombras realistas  
✅ **Color Coding**: Valores destacados con colores significativos  
✅ **Smooth Transitions**: Animaciones de 0.3s en todos los elementos  
✅ **Glass Morphism**: Efecto de vidrio esmerilado en hints  
✅ **Responsive Grid**: Se adapta desde móvil hasta 4K  
✅ **Loading States**: Feedback visual durante cálculos  

---

## 🎯 Resultados Esperados

Al completar esta práctica con las nuevas características, deberás poder:

✅ Trabajar con espacios vectoriales ℝ² y ℝ³  
✅ Visualizar y manipular objetos en 3D  
✅ Calcular vectores de desplazamiento en 3 dimensiones  
✅ Entender proyecciones de 3D a 2D  
✅ Interpretar el rango en contextos bidimensionales y tridimensionales  
✅ Exportar y analizar datos matemáticos  
✅ Usar herramientas interactivas para exploración matemática  

---

**¡Explora el espacio vectorial en 2D y 3D! 🚁✨🎲**

**Servidor corriendo en: http://localhost:5173/**

### ✅ Funcionalidades
1. **Selección de Figura**: Elige la figura que quieres formar
2. **Animación**: Observa el movimiento de los drones en tiempo real
3. **Análisis Vectorial en Tiempo Real**:
   - Número de drones
   - Rango de la matriz de desplazamientos
   - Dimensión del subespacio generado
   - Energía total del sistema
4. **Visualización de Vectores**: Muestra todos los vectores de desplazamiento
5. **Interpretación Algebraica**: Explicación del significado matemático

---

## 📊 Análisis Matemático Implementado

### 1. Posición Inicial (P)
Los drones inician en una cuadrícula ordenada:
```
P₁ = (0, 0)
P₂ = (1.5, 0)
P₃ = (3, 0)
...
```

### 2. Posición Final (F)
Cada dron se mueve a una posición que forma parte de la figura:
```
F₁ = (x₁', y₁')
F₂ = (x₂', y₂')
...
```

### 3. Vectores de Desplazamiento (D)
```
D⃗ᵢ = Fᵢ - Pᵢ
```

### 4. Cálculo del Rango
El simulador calcula el rango de la matriz formada por los vectores de desplazamiento usando **eliminación gaussiana**.

**Interpretación:**
- **Rango = 1**: Todos los drones se mueven en una única dirección (subespacio de dimensión 1)
- **Rango = 2**: Los drones se mueven en el plano completo (subespacio de dimensión 2)

### 5. Energía Total
```
E_total = Σ ||D⃗ᵢ||
```
Suma de las magnitudes de todos los vectores de desplazamiento.

---

## 🎓 Conceptos de Álgebra Lineal Aplicados

| Concepto | Aplicación en el Simulador |
|----------|---------------------------|
| **Espacio Vectorial** | Las posiciones y desplazamientos están en ℝ² |
| **Subespacio Vectorial** | Los movimientos pueden restringirse a una dirección o al plano completo |
| **Combinación Lineal** | Cada desplazamiento puede expresarse como combinación de vectores base |
| **Independencia Lineal** | Determina si los desplazamientos son redundantes o no |
| **Base** | Conjunto mínimo de vectores para describir todos los desplazamientos |
| **Dimensión** | Número de vectores base necesarios (= rango) |
| **Rango** | Número de direcciones independientes de movimiento |

---

## 📝 Preguntas de Reflexión (con respuestas del simulador)

### 1. ¿El conjunto de desplazamientos genera todo el plano ℝ²?
**Respuesta**: Depende del rango:
- Si **rango = 2** → Sí, genera todo ℝ²
- Si **rango = 1** → No, solo genera una recta

### 2. Si el rango es 1, ¿qué significa?
**Respuesta**: Todos los drones se mueven en la misma dirección (vectores paralelos), formando un subespacio de dimensión 1.

### 3. ¿Podríamos obtener la misma figura usando menos vectores base?
**Respuesta**: No. El número de vectores base necesarios es exactamente el **rango** del conjunto de desplazamientos.

### 4. ¿Cómo influye la independencia lineal en la flexibilidad?
**Respuesta**: Mayor independencia lineal = Mayor flexibilidad. Con rango 2, los drones pueden moverse en cualquier dirección del plano.

---

## 🎮 Cómo Usar el Simulador

1. **Abrir en el navegador**: `http://localhost:5173/`

2. **Seleccionar una figura**: Click en los botones (Estrella, Triángulo, etc.)

3. **Iniciar animación**: Click en "Iniciar" para ver el movimiento

4. **Analizar resultados**: Observa:
   - El panel de "Análisis Vectorial"
   - El rango y dimensión del subespacio
   - La energía total del sistema

5. **Ver vectores**: Click en "Mostrar Vectores de Desplazamiento" para ver cada vector con su magnitud

6. **Leer interpretación**: La sección de "Interpretación" explica el significado matemático

---

## 🔬 Elementos Visuales

- **Puntos grises**: Posiciones iniciales
- **Puntos rojos translúcidos**: Posiciones finales (objetivo)
- **Círculos azules**: Drones en movimiento
- **Flechas azules**: Vectores de desplazamiento
- **Líneas punteadas**: Trayectorias completas

---

## 🎯 Resultados Esperados

Al completar esta práctica, deberás poder:

✅ Identificar posiciones iniciales y finales de los drones  
✅ Calcular vectores de desplazamiento  
✅ Determinar si los vectores son linealmente independientes  
✅ Calcular el rango de la matriz de desplazamientos  
✅ Interpretar la dimensión del subespacio generado  
✅ Expresar desplazamientos como combinaciones lineales  
✅ Analizar la energía total del sistema  

---

## 🚀 Ampliaciones Posibles

### Nivel 1: Básico
- [x] Implementar 5 figuras diferentes
- [x] Calcular rango y dimensión automáticamente
- [x] Visualizar vectores de desplazamiento
- [x] Animación suave del movimiento

### Nivel 2: Intermedio
- [ ] Modo 3D (drones en espacio tridimensional)
- [ ] Optimización de trayectorias (minimizar energía)
- [ ] Exportar datos a formato CSV/JSON
- [ ] Permitir figuras personalizadas

### Nivel 3: Avanzado
- [ ] Detección de colisiones entre drones
- [ ] Sincronización con música
- [ ] Múltiples formaciones en secuencia
- [ ] Simulación física realista (inercia, viento)

---

## 📚 Referencias de Álgebra Lineal

### Fórmulas Clave

**Vector de desplazamiento:**
```
D⃗ᵢ = Fᵢ - Pᵢ = (xf - xi, yf - yi)
```

**Magnitud de vector:**
```
||D⃗|| = √(x² + y²)
```

**Combinación lineal:**
```
D⃗ = α₁·v⃗₁ + α₂·v⃗₂ + ... + αₙ·v⃗ₙ
```

**Rango de matriz:**
```
rank(A) = número de filas/columnas linealmente independientes
```

---

## 💡 Tips para el Análisis

1. **Compara diferentes figuras**: Observa cómo cambia el rango según la figura
2. **Analiza la energía**: Figuras más dispersas requieren más energía
3. **Observa los vectores**: Busca patrones de paralelismo o independencia
4. **Experimenta**: Pausa y observa posiciones intermedias

---

## 🎓 Conexión con el Curso

Esta práctica ilustra:
- **Tema 1**: Espacios vectoriales ℝⁿ
- **Tema 2**: Subespacios vectoriales
- **Tema 3**: Dependencia e independencia lineal
- **Tema 4**: Base y dimensión
- **Tema 5**: Rango de matrices

---

## 📞 Soporte

Si tienes preguntas sobre la implementación o los conceptos matemáticos, consulta:
- El archivo PDF original: `public/Práctica_Espacios vectoriales.pdf`
- La documentación del código en `src/App.jsx`
- Tu profesor o asistente del curso

---

**¡Disfruta explorando los espacios vectoriales con drones! 🚁✨**
