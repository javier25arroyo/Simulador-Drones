# 🚀 Guía de Uso Avanzado - Simulador de Drones 3D

## 📚 Índice
1. [Modo 3D Avanzado](#modo-3d-avanzado)
2. [Análisis Matemático Detallado](#análisis-matemático-detallado)
3. [Exportación y Análisis de Datos](#exportación-y-análisis-de-datos)
4. [Tips y Trucos](#tips-y-trucos)
5. [Casos de Uso Académicos](#casos-de-uso-académicos)

---

## 🎲 Modo 3D Avanzado

### Controles de Cámara

**Rotación Manual:**
- Click y arrastra horizontalmente → Rota alrededor del eje Y (izquierda/derecha)
- Click y arrastra verticalmente → Rota alrededor del eje X (arriba/abajo)
- Combina movimientos para rotar libremente en el espacio

**Zoom:**
- Scroll hacia arriba → Acerca la vista (zoom in)
- Scroll hacia abajo → Aleja la vista (zoom out)
- Rango: 0.5x a 2x

**Auto-rotación:**
- Se activa automáticamente cuando sueltas el mouse
- Velocidad: 0.01 radianes por frame
- Se pausa mientras arrastras

### Interpretación de Ejes 3D

```
Eje X (Rojo)    → Horizontal izquierda-derecha
Eje Y (Verde)   → Horizontal adelante-atrás
Eje Z (Azul)    → Vertical arriba-abajo
```

**Ejemplo de Coordenadas:**
```
Punto en el origen:      [0, 0, 0]
Punto en esquina del cubo: [4, 4, 4]
Punto en el techo:       [2.5, 2.5, 4]
```

### Figuras 3D Detalladas

#### 🧊 Cubo
```javascript
Vértices: 8 drones
Coordenadas:
  [1,1,1], [4,1,1], [4,4,1], [1,4,1],  // Base
  [1,1,4], [4,1,4], [4,4,4], [1,4,4]   // Techo
  
Rango esperado: 3 (movimiento en todas las direcciones)
Dimensión: 3 (espacio completo ℝ³)
```

#### 🔺 Pirámide
```javascript
Vértices: 5 drones
Coordenadas:
  [1,1,0], [4,1,0], [4,4,0], [1,4,0],  // Base cuadrada
  [2.5,2.5,4]                           // Ápice
  
Rango esperado: 3
Interpretación: Movimiento tridimensional completo
```

#### 🌀 Hélice
```javascript
Vértices: 8 drones en espiral
Patrón: Circunferencia con incremento en Z
Radio: 1.5 unidades
Centro: [2.5, 2.5]
Incremento Z: 0.6 por punto

Rango esperado: 3
Característica: Forma helicoidal ascendente
```

#### ⚪ Esfera
```javascript
Vértices: 10 drones
Distribución: Aproximación esférica
Centro: [2.5, 2.5, 2.5]
Radio variable

Rango esperado: 3
Simetría: Radial en todas direcciones
```

#### 💎 Diamante
```javascript
Vértices: 6 drones
Forma: Bipirámide (dos pirámides unidas)
Coordenadas:
  [2.5,2.5,4.5],  // Ápice superior
  [1.5,2.5,3], [3.5,2.5,3], [2.5,1.5,3], [2.5,3.5,3],  // Cinturón
  [2.5,2.5,1.5]   // Ápice inferior
  
Rango esperado: 3
Forma: Diamante elongado vertical
```

---

## 🔬 Análisis Matemático Detallado

### Cálculo del Rango (Eliminación Gaussiana)

**Algoritmo Implementado:**

```javascript
function calculateRank(displacements) {
  // 1. Convertir vectores a matriz
  const matrix = displacements.map(d => [...d])
  
  // 2. Variables iniciales
  const rows = matrix.length
  const cols = matrix[0].length
  let rank = 0
  const epsilon = 1e-10  // Tolerancia numérica
  
  // 3. Para cada columna
  for (let col = 0; col < cols && rank < rows; col++) {
    // 3.1 Buscar pivote máximo
    let maxRow = rank
    for (let row = rank + 1; row < rows; row++) {
      if (Math.abs(matrix[row][col]) > Math.abs(matrix[maxRow][col])) {
        maxRow = row
      }
    }
    
    // 3.2 Si el pivote es muy pequeño, skip
    if (Math.abs(matrix[maxRow][col]) < epsilon) continue
    
    // 3.3 Intercambiar filas
    [matrix[rank], matrix[maxRow]] = [matrix[maxRow], matrix[rank]]
    
    // 3.4 Eliminación hacia abajo
    for (let row = rank + 1; row < rows; row++) {
      const factor = matrix[row][col] / matrix[rank][col]
      for (let c = col; c < cols; c++) {
        matrix[row][c] -= factor * matrix[rank][c]
      }
    }
    rank++
  }
  
  return rank
}
```

### Interpretación del Rango

**En ℝ² (2D):**
- **Rango = 1**: Todos los vectores son paralelos (mismo múltiplo)
  - Ejemplo: `[2,1], [4,2], [6,3]` → Todos múltiplos de `[2,1]`
  - Subespacio: Una línea
  - Base: 1 vector

- **Rango = 2**: Vectores linealmente independientes
  - Ejemplo: `[1,0], [0,1]`
  - Subespacio: El plano completo ℝ²
  - Base: 2 vectores

**En ℝ³ (3D):**
- **Rango = 1**: Movimiento unidimensional
  - Todos los drones se mueven en la misma línea
  - Base: 1 vector

- **Rango = 2**: Movimiento planar
  - Los drones se mueven en un plano dentro del espacio
  - Base: 2 vectores

- **Rango = 3**: Movimiento tridimensional completo
  - Los drones pueden moverse en cualquier dirección
  - Base: 3 vectores (ej: `[1,0,0], [0,1,0], [0,0,1]`)

### Cálculo de Energía

**Fórmula:**
```
E_total = Σ ||dᵢ||
        = Σ √(xᵢ² + yᵢ² + zᵢ²)
```

**Interpretación Física:**
- **Alta energía**: La figura final está muy dispersa respecto al inicio
- **Baja energía**: La figura final está cerca del inicio
- **Aplicación**: Optimización de trayectorias de drones reales

**Ejemplo:**
```javascript
// Cubo 3×3×3 desde origen
Posición inicial: [0,0,0]
Posición final: [3,3,3]
Desplazamiento: [3,3,3]
Magnitud: √(9+9+9) = √27 = 5.196

// Si tienes 8 drones con desplazamientos similares:
E_total ≈ 8 × 5.196 = 41.57
```

---

## 📊 Exportación y Análisis de Datos

### Estructura del JSON Exportado

```json
{
  "mode": "3D",
  "figure": "cube",
  "numDrones": 8,
  "initialPositions": [
    [0, 0, 0],
    [1.5, 0, 0],
    [3, 0, 0],
    [0, 1.5, 0],
    [1.5, 1.5, 0],
    [3, 1.5, 0],
    [0, 3, 0],
    [1.5, 3, 0]
  ],
  "finalPositions": [
    [1, 1, 1],
    [4, 1, 1],
    [4, 4, 1],
    [1, 4, 1],
    [1, 1, 4],
    [4, 1, 4],
    [4, 4, 4],
    [1, 4, 4]
  ],
  "displacements": [
    {
      "index": 1,
      "vector": [1, 1, 1],
      "magnitude": "1.7321"
    },
    // ... más vectores
  ],
  "analysis": {
    "rank": 3,
    "dimension": 3,
    "totalEnergy": "35.1234",
    "spaceType": "ℝ³"
  }
}
```

### Análisis con Python

```python
import json
import numpy as np

# Cargar datos
with open('drone-simulation-data.json', 'r') as f:
    data = json.load(f)

# Extraer vectores
vectors = np.array([d['vector'] for d in data['displacements']])

# Calcular matriz de covarianza
cov_matrix = np.cov(vectors.T)
print("Matriz de covarianza:")
print(cov_matrix)

# Valores y vectores propios
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
print("\nValores propios:", eigenvalues)
print("Vectores propios:\n", eigenvectors)

# Verificar rango
rank = np.linalg.matrix_rank(vectors)
print(f"\nRango verificado: {rank}")
print(f"Rango del simulador: {data['analysis']['rank']}")
```

### Análisis con MATLAB

```matlab
% Cargar datos
data = jsondecode(fileread('drone-simulation-data.json'));

% Extraer vectores
vectors = cell2mat({data.displacements.vector}');

% Calcular rango
rank_matlab = rank(vectors)
rank_simulador = data.analysis.rank

% Descomposición SVD
[U, S, V] = svd(vectors);
disp('Valores singulares:');
disp(diag(S));

% Visualizar en 3D
if strcmp(data.mode, '3D')
    figure;
    quiver3(zeros(size(vectors,1),1), ...
            zeros(size(vectors,1),1), ...
            zeros(size(vectors,1),1), ...
            vectors(:,1), vectors(:,2), vectors(:,3));
    xlabel('X'); ylabel('Y'); zlabel('Z');
    title('Vectores de Desplazamiento');
    grid on;
end
```

---

## 💡 Tips y Trucos

### Para Estudiantes

1. **Compara figuras similares:**
   - Triángulo 2D vs Pirámide 3D
   - Cuadrado 2D vs Cubo 3D
   - Observa cómo cambia el rango

2. **Experimenta con velocidades:**
   - Lento (5%): Analiza cada momento
   - Medio (10%): Observa el patrón general
   - Rápido (30%): Visualiza la transformación completa

3. **Usa la exportación:**
   - Descarga datos de varias figuras
   - Compara las magnitudes de vectores
   - Busca patrones en los desplazamientos

4. **Modo 3D interactivo:**
   - Rota para encontrar el mejor ángulo de observación
   - Busca simetrías que no son evidentes desde un solo ángulo
   - Usa el zoom para ver detalles

### Para Profesores

1. **Demostraciones en clase:**
   - Proyecta en pantalla grande
   - Usa figuras simples primero (triángulo, cubo)
   - Luego figuras complejas (hélice, esfera)

2. **Actividades grupales:**
   - Asigna diferentes figuras a cada grupo
   - Pide que calculen el rango manualmente
   - Verifican con el simulador

3. **Tareas:**
   - Exportar datos y analizarlos en Excel/Python
   - Crear gráficos de magnitudes
   - Escribir interpretación matemática

4. **Evaluaciones:**
   - Pregunta: "¿Qué figura tiene el rango más alto y por qué?"
   - Pregunta: "Si el rango es 2 en 3D, ¿qué significa?"
   - Ejercicio: "Diseña una figura con rango 1 en 3D"

---

## 🎓 Casos de Uso Académicos

### Caso 1: Introducción a Espacios Vectoriales

**Objetivo:** Entender qué es un espacio vectorial

**Actividad:**
1. Inicia en modo 2D con el triángulo
2. Observa las posiciones iniciales y finales
3. Identifica que cada posición es un vector en ℝ²
4. Cambia a modo 3D con la pirámide
5. Nota que ahora tienes vectores en ℝ³

**Preguntas:**
- ¿En qué se diferencian ℝ² y ℝ³?
- ¿Cuántas componentes tiene cada vector?

### Caso 2: Independencia Lineal

**Objetivo:** Visualizar vectores linealmente independientes

**Actividad:**
1. Usa el cuadrado 2D
2. Exporta los datos
3. Analiza: ¿Puedes expresar un vector como combinación de otros?
4. Compara con el cubo 3D

**Ejercicio:**
Dado los vectores: `[1,0], [0,1], [2,3]`
¿Son linealmente independientes en ℝ²?

### Caso 3: Base y Dimensión

**Objetivo:** Entender el concepto de base

**Actividad:**
1. Usa la estrella (rango 2 en 2D)
2. Observa que necesitas 2 vectores para describir todos los desplazamientos
3. Usa el cubo (rango 3 en 3D)
4. Observa que necesitas 3 vectores base

**Discusión:**
- ¿Por qué la dimensión es igual al rango?
- ¿Qué vectores formarían una base?

### Caso 4: Proyecciones (Avanzado)

**Objetivo:** Entender cómo se proyecta 3D a 2D

**Actividad:**
1. Usa cualquier figura 3D
2. Rota el espacio mientras está pausado
3. Observa cómo la proyección cambia
4. Nota que la información 3D se "aplana" a 2D

**Matemática:**
La proyección isométrica usa:
```
x_screen = x·cos(θ) - z·sin(θ)
y_screen = y·cos(φ) - z'·sin(φ)
```

---

## 🚀 Experimentos Avanzados

### Experimento 1: Mínima Energía

**Pregunta:** ¿Qué figura requiere menos energía?

**Método:**
1. Prueba todas las figuras 2D
2. Anota la energía total de cada una
3. Repite con figuras 3D
4. Compara y analiza

**Hipótesis:** Figuras más compactas tienen menor energía

### Experimento 2: Rango y Complejidad

**Pregunta:** ¿Figuras más complejas tienen mayor rango?

**Método:**
1. Define "complejidad" (número de drones, forma)
2. Prueba cada figura
3. Anota: nombre, # drones, rango
4. Busca correlación

### Experimento 3: Simetría y Vectores

**Pregunta:** ¿La simetría afecta el rango?

**Método:**
1. Identifica figuras simétricas (cubo, esfera)
2. Identifica figuras asimétricas (pirámide, hélice)
3. Compara sus rangos
4. Discute los resultados

---

## 📝 Plantilla de Reporte

```markdown
# Reporte de Análisis - Simulador de Drones

## Datos del Experimento
- **Fecha:** 
- **Modo:** 2D / 3D
- **Figura:** 
- **Número de drones:** 

## Observaciones Visuales
[Describe lo que viste durante la animación]

## Datos Exportados
- **Rango:** 
- **Dimensión:** 
- **Energía Total:** 
- **Espacio:** ℝ² / ℝ³

## Análisis de Vectores
[Lista los vectores y sus magnitudes]

## Cálculos Manuales
[Verifica el rango manualmente]

## Interpretación
[Explica el significado matemático]

## Conclusiones
[Qué aprendiste de este experimento]
```

---

**🎯 ¡Ahora estás listo para explorar el simulador a fondo!**

Para más información, consulta:
- `PRACTICA.md` - Guía general
- `README.md` - Documentación técnica
- Código fuente en `src/App.jsx`
