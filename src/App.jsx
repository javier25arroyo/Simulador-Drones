import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Info, Box, Layers, Download, Sparkles, Grid3x3, Maximize2, Activity, Target, Gauge, Lightbulb } from 'lucide-react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import './App.css'

// Figuras predefinidas 2D
const FIGURES_2D = {
  star: {
    name: 'Estrella',
    icon: '⭐',
    points: [[3, 7], [5.5, 2.5], [8, 7], [2.5, 4.5], [7.5, 4.5]]
  },
  triangle: {
    name: 'Triángulo',
    icon: '🔺',
    points: [[4, 7], [1.5, 2], [6.5, 2]]
  },
  square: {
    name: 'Cuadrado',
    icon: '⬜',
    points: [[2, 2], [7, 2], [7, 7], [2, 7]]
  },
  heart: {
    name: 'Corazón',
    icon: '❤️',
    points: [[4, 2], [2.5, 5], [4, 7], [5.5, 5], [6.5, 3.5]]
  },
  pentagon: {
    name: 'Pentágono',
    icon: '⬠',
    points: [[4, 7], [1.5, 4.5], [2.5, 1.5], [5.5, 1.5], [6.5, 4.5]]
  }
}

// Figuras predefinidas 3D
const FIGURES_3D = {
  cube: {
    name: 'Cubo',
    icon: '🧊',
    points: [
      [2, 2, 2], [7, 2, 2], [7, 7, 2], [2, 7, 2],
      [2, 2, 7], [7, 2, 7], [7, 7, 7], [2, 7, 7]
    ]
  },
  pyramid: {
    name: 'Pirámide',
    icon: '🔺',
    points: [
      [2, 2, 0], [7, 2, 0], [7, 7, 0], [2, 7, 0],
      [4.5, 4.5, 7]
    ]
  },
  helix: {
    name: 'Hélice',
    icon: '🌀',
    points: Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2
      return [4.5 + 2.5 * Math.cos(angle), 4.5 + 2.5 * Math.sin(angle), i * 1.0]
    })
  },
  sphere: {
    name: 'Esfera',
    icon: '⚪',
    points: [
      [4.5, 4.5, 7], [4.5, 7, 4.5], [4.5, 2, 4.5],
      [7, 4.5, 4.5], [2, 4.5, 4.5], [4.5, 4.5, 2],
      [6, 6, 5.5], [3, 3, 5.5], [6, 3, 4], [3, 6, 4]
    ]
  },
  diamond: {
    name: 'Diamante',
    icon: '💎',
    points: [
      [4.5, 4.5, 8], [3, 4.5, 5.5], [6, 4.5, 5.5],
      [4.5, 3, 5.5], [4.5, 6, 5.5], [4.5, 4.5, 3]
    ]
  }
}

// Calcular vectores de desplazamiento
function calculateDisplacements(initial, final) {
  return final.map((f, i) => [f[0] - initial[i][0], f[1] - initial[i][1]])
}

// Calcular rango de matriz
function calculateRank(displacements) {
  if (displacements.length === 0) return 0
  const matrix = displacements.map(d => [...d])
  const rows = matrix.length
  const cols = matrix[0].length
  let rank = 0
  const epsilon = 1e-10

  for (let col = 0; col < cols && rank < rows; col++) {
    let maxRow = rank
    for (let row = rank + 1; row < rows; row++) {
      if (Math.abs(matrix[row][col]) > Math.abs(matrix[maxRow][col])) {
        maxRow = row
      }
    }
    
    if (Math.abs(matrix[maxRow][col]) < epsilon) continue
    
    [matrix[rank], matrix[maxRow]] = [matrix[maxRow], matrix[rank]]
    
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

// Proyección 3D a 2D (perspectiva isométrica mejorada)
function project3D(point, rotation, zoom = 1) {
  const [x, y, z] = point
  const { angleX, angleY, angleZ } = rotation
  
  // Rotación X
  let y1 = y * Math.cos(angleX) - z * Math.sin(angleX)
  let z1 = y * Math.sin(angleX) + z * Math.cos(angleX)
  
  // Rotación Y
  let x1 = x * Math.cos(angleY) + z1 * Math.sin(angleY)
  let z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY)
  
  // Rotación Z
  let x2 = x1 * Math.cos(angleZ) - y1 * Math.sin(angleZ)
  let y2 = x1 * Math.sin(angleZ) + y1 * Math.cos(angleZ)
  
  // Perspectiva
  const perspective = 15
  const scale = perspective / (perspective + z2)
  
  return [x2 * scale * zoom, y2 * scale * zoom, z2]
}

// Exportar datos a JSON
function exportToJSON(data) {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'drone-simulation-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

// Calcular magnitud de vector
function magnitude(vector) {
  return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0))
}

function App() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 800 })
  const [mode, setMode] = useState('2D') // '2D' or '3D'
  const [selectedFigure, setSelectedFigure] = useState('star')
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [rotation, setRotation] = useState({ angleX: 0.5, angleY: 0.5, angleZ: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(0.01)
  const [showTrails, setShowTrails] = useState(true)
  const [densityMultiplier, setDensityMultiplier] = useState(1) // NUEVO: 1x, 2x, 3x, 4x
  
  const FIGURES = mode === '2D' ? FIGURES_2D : FIGURES_3D
  const figure = FIGURES[selectedFigure]
  
  // Generar más drones duplicando y desplazando ligeramente los puntos
  const generateDenseDrones = (basePoints, multiplier) => {
    if (multiplier === 1) return basePoints
    
    const denseDrones = []
    const offset = 0.15 // Pequeño desplazamiento para que se vean distintos
    
    basePoints.forEach(point => {
      // Agregar el punto original
      denseDrones.push([...point])
      
      // Agregar puntos adicionales alrededor
      if (multiplier >= 2) {
        if (mode === '2D') {
          denseDrones.push([point[0] + offset, point[1]])
          denseDrones.push([point[0], point[1] + offset])
        } else {
          denseDrones.push([point[0] + offset, point[1], point[2]])
          denseDrones.push([point[0], point[1] + offset, point[2]])
        }
      }
      
      if (multiplier >= 3) {
        if (mode === '2D') {
          denseDrones.push([point[0] - offset, point[1]])
          denseDrones.push([point[0], point[1] - offset])
        } else {
          denseDrones.push([point[0] - offset, point[1], point[2]])
          denseDrones.push([point[0], point[1], point[2] + offset])
        }
      }
      
      if (multiplier >= 4) {
        if (mode === '2D') {
          denseDrones.push([point[0] + offset, point[1] + offset])
          denseDrones.push([point[0] - offset, point[1] - offset])
        } else {
          denseDrones.push([point[0], point[1], point[2] - offset])
          denseDrones.push([point[0] + offset, point[1] + offset, point[2]])
        }
      }
    })
    
    return denseDrones
  }
  
  const finalPositions = generateDenseDrones(figure.points, densityMultiplier)
  const numDrones = finalPositions.length
  
  // Posiciones iniciales en cuadrícula expandida
  const initialPositions = mode === '2D' 
    ? Array.from({ length: numDrones }, (_, i) => {
        const cols = Math.ceil(Math.sqrt(numDrones))
        return [
          (i % cols) * 1.5,
          Math.floor(i / cols) * 1.5
        ]
      })
    : Array.from({ length: numDrones }, (_, i) => {
        const cols = Math.ceil(Math.sqrt(numDrones))
        return [
          (i % cols) * 1.5,
          Math.floor(i / cols) * 1.5,
          0
        ]
      })
  
  const displacements = calculateDisplacements(initialPositions, finalPositions)
  const rank = calculateRank(displacements)
  const totalEnergy = displacements.reduce((sum, d) => sum + magnitude(d), 0)
  const simulationStatus = isAnimating ? 'En ejecución' : progress >= 1 ? 'Completada' : 'Detenida'
  const statusType = isAnimating ? 'running' : progress >= 1 ? 'completed' : 'paused'
  const progressPercent = (progress * 100).toFixed(0)
  const densityLabels = ['Básico', 'Medio', 'Denso', 'Ultra']
  const densityLabel = densityLabels[densityMultiplier - 1] || 'Personalizado'
  const ModeIcon = mode === '2D' ? Layers : Box
  const modeLabel = mode === '2D' ? 'Modo 2D' : 'Modo 3D'

  const formatVectorLatex = (vector, index) => {
    const components = vector.map(value => value.toFixed(2)).join(' \\ ')
    return `\\vec{d}_{${index + 1}} = \\begin{bmatrix} ${components} \\end{bmatrix}`
  }

  const formatMagnitudeLatex = (vector, index) => `\\left\\lVert \\vec{d}_{${index + 1}} \\right\\rVert = ${magnitude(vector).toFixed(2)}`

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setCanvasDimensions(prev => {
          const next = {
            width: Math.max(Math.round(width), 200),
            height: Math.max(Math.round(height), 200)
          }
          if (prev.width === next.width && prev.height === next.height) return prev
          return next
        })
      }
    })

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { width, height } = canvasDimensions
    if (width <= 0 || height <= 0) return

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const gridRange = 10
    const minDimension = Math.min(canvas.width, canvas.height)
    const padding = minDimension * 0.08
    const usableWidth = Math.max(canvas.width - padding * 2, 120)
    const usableHeight = Math.max(canvas.height - padding * 2, 120)
    const scale2D = Math.max(Math.min(usableWidth, usableHeight) / gridRange, 18)
    const offsetX = (canvas.width - gridRange * scale2D) / 2
    const offsetY = (canvas.height - gridRange * scale2D) / 2
    const scale3D = Math.max(minDimension / 12, 28)
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (mode === '2D') {
        draw2D(ctx, {
          scale: scale2D,
          offsetX,
          offsetY,
          gridRange
        })
      } else {
        draw3D(ctx, centerX, centerY, scale3D)
      }
    }
    
    function draw2D(ctx, { scale, offsetX, offsetY, gridRange }) {
      // Dibujar cuadrícula
      if (showGrid) {
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 0.5
        for (let i = 0; i <= gridRange; i++) {
          ctx.beginPath()
          ctx.moveTo(offsetX, offsetY + i * scale)
          ctx.lineTo(offsetX + gridRange * scale, offsetY + i * scale)
          ctx.stroke()
          
          ctx.beginPath()
          ctx.moveTo(offsetX + i * scale, offsetY)
          ctx.lineTo(offsetX + i * scale, offsetY + gridRange * scale)
          ctx.stroke()
        }
      }
      
      const toCanvasPoint = (x, y) => ([
        offsetX + x * scale,
        offsetY + (gridRange - y) * scale
      ])

      const initialRadius = Math.max(scale * 0.05, 4)
      const finalRadius = Math.max(scale * 0.07, 6)
      const droneRadius = Math.max(scale * 0.1, 8)
      const haloRadius = droneRadius + Math.max(scale * 0.06, 4)
      const arrowLength = Math.max(scale * 0.25, 12)

      // Calcular posiciones actuales según progreso
      const currentPositions = initialPositions.map((init, i) => {
        const final = finalPositions[i]
        return [
          init[0] + (final[0] - init[0]) * progress,
          init[1] + (final[1] - init[1]) * progress
        ]
      })
      
      // Dibujar vectores de desplazamiento
      if (showTrails) {
        initialPositions.forEach((init, i) => {
          const final = finalPositions[i]
          const [startX, startY] = toCanvasPoint(init[0], init[1])
          const [endX, endY] = toCanvasPoint(final[0], final[1])
          ctx.strokeStyle = 'rgba(100, 108, 255, 0.3)'
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.stroke()
          ctx.setLineDash([])
          
          // Flecha del vector
          const dx = final[0] - init[0]
          const dy = final[1] - init[1]
          const angle = Math.atan2(dy, dx)
          
          ctx.strokeStyle = 'rgba(100, 108, 255, 0.6)'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.stroke()
          
          // Punta de flecha
          ctx.beginPath()
          ctx.moveTo(endX, endY)
          ctx.lineTo(
            endX - arrowLength * Math.cos(angle - Math.PI / 6),
            endY + arrowLength * Math.sin(angle - Math.PI / 6)
          )
          ctx.moveTo(endX, endY)
          ctx.lineTo(
            endX - arrowLength * Math.cos(angle + Math.PI / 6),
            endY + arrowLength * Math.sin(angle + Math.PI / 6)
          )
          ctx.stroke()
        })
      }
      
      // Dibujar posiciones iniciales
      initialPositions.forEach(([x, y]) => {
        const [cx, cy] = toCanvasPoint(x, y)
        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
        ctx.beginPath()
        ctx.arc(cx, cy, initialRadius, 0, 2 * Math.PI)
        ctx.fill()
      })
      
      // Dibujar posiciones finales
      finalPositions.forEach(([x, y]) => {
        const [cx, cy] = toCanvasPoint(x, y)
        ctx.fillStyle = 'rgba(255, 100, 100, 0.3)'
        ctx.beginPath()
        ctx.arc(cx, cy, finalRadius, 0, 2 * Math.PI)
        ctx.fill()
      })
      
      // Dibujar drones en posición actual
      currentPositions.forEach(([x, y]) => {
        const [cx, cy] = toCanvasPoint(x, y)
        ctx.fillStyle = '#646cff'
        ctx.beginPath()
        ctx.arc(cx, cy, droneRadius, 0, 2 * Math.PI)
        ctx.fill()
        
        // Efecto de dron
        ctx.strokeStyle = '#646cff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, cy, haloRadius, 0, 2 * Math.PI)
        ctx.stroke()
      })
    }
    
    function draw3D(ctx, centerX, centerY, scale) {
      // Dibujar ejes 3D
      if (showGrid) {
        const axisLength = 10
        const axes = [
          { points: [[0, 0, 0], [axisLength, 0, 0]], color: '#ff6b6b' }, // X - Rojo
          { points: [[0, 0, 0], [0, axisLength, 0]], color: '#51cf66' }, // Y - Verde
          { points: [[0, 0, 0], [0, 0, axisLength]], color: '#339af0' }  // Z - Azul
        ]
        
        axes.forEach(axis => {
          const [p1, p2] = axis.points.map(p => project3D(p, rotation, zoom))
          ctx.strokeStyle = axis.color
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(centerX + p1[0] * scale, centerY - p1[1] * scale)
          ctx.lineTo(centerX + p2[0] * scale, centerY - p2[1] * scale)
          ctx.stroke()
        })
        
        // Dibujar cuadrícula del suelo
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)'
        ctx.lineWidth = 1
        for (let i = -2; i <= 12; i++) {
          const p1 = project3D([-2, i, 0], rotation, zoom)
          const p2 = project3D([12, i, 0], rotation, zoom)
          ctx.beginPath()
          ctx.moveTo(centerX + p1[0] * scale, centerY - p1[1] * scale)
          ctx.lineTo(centerX + p2[0] * scale, centerY - p2[1] * scale)
          ctx.stroke()
          
          const p3 = project3D([i, -2, 0], rotation, zoom)
          const p4 = project3D([i, 12, 0], rotation, zoom)
          ctx.beginPath()
          ctx.moveTo(centerX + p3[0] * scale, centerY - p3[1] * scale)
          ctx.lineTo(centerX + p4[0] * scale, centerY - p4[1] * scale)
          ctx.stroke()
        }
      }
      
      // Calcular posiciones actuales según progreso
      const currentPositions = initialPositions.map((init, i) => {
        const final = finalPositions[i]
        return init.map((coord, j) => coord + (final[j] - coord) * progress)
      })
      
      // Proyectar y ordenar por profundidad (z)
      const projectedData = currentPositions.map((pos, i) => {
        const projected = project3D(pos, rotation, zoom)
        return {
          pos,
          projected,
          index: i,
          depth: projected[2]
        }
      }).sort((a, b) => a.depth - b.depth)
      
      // Dibujar líneas de trayectoria
      if (showTrails) {
        initialPositions.forEach((init, i) => {
          const final = finalPositions[i]
          const projInit = project3D(init, rotation, zoom)
          const projFinal = project3D(final, rotation, zoom)
          
          ctx.strokeStyle = 'rgba(100, 108, 255, 0.3)'
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(centerX + projInit[0] * scale, centerY - projInit[1] * scale)
          ctx.lineTo(centerX + projFinal[0] * scale, centerY - projFinal[1] * scale)
          ctx.stroke()
          ctx.setLineDash([])
        })
      }
      
      // Dibujar posiciones iniciales
      initialPositions.forEach((pos) => {
        const proj = project3D(pos, rotation, zoom)
        const size = 4 * (1 + proj[2] / 10)
        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)'
        ctx.beginPath()
        ctx.arc(centerX + proj[0] * scale, centerY - proj[1] * scale, size, 0, 2 * Math.PI)
        ctx.fill()
      })
      
      // Dibujar posiciones finales
      finalPositions.forEach((pos) => {
        const proj = project3D(pos, rotation, zoom)
        const size = 6 * (1 + proj[2] / 10)
        ctx.fillStyle = 'rgba(255, 100, 100, 0.3)'
        ctx.beginPath()
        ctx.arc(centerX + proj[0] * scale, centerY - proj[1] * scale, size, 0, 2 * Math.PI)
        ctx.fill()
      })
      
      // Dibujar drones (ordenados por profundidad para efecto 3D correcto)
      projectedData.forEach(({ pos, projected, depth }) => {
        const size = 8 * (1 + depth / 10)
        const outerSize = size + 4
        
        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.beginPath()
        ctx.arc(centerX + projected[0] * scale + 2, centerY - projected[1] * scale + 2, size, 0, 2 * Math.PI)
        ctx.fill()
        
        // Dron
        ctx.fillStyle = '#646cff'
        ctx.beginPath()
        ctx.arc(centerX + projected[0] * scale, centerY - projected[1] * scale, size, 0, 2 * Math.PI)
        ctx.fill()
        
        // Efecto de hélices
        ctx.strokeStyle = 'rgba(100, 108, 255, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX + projected[0] * scale, centerY - projected[1] * scale, outerSize, 0, 2 * Math.PI)
        ctx.stroke()
      })
    }
    
    draw()
  }, [progress, selectedFigure, mode, rotation, zoom, showGrid, showTrails, initialPositions, finalPositions, canvasDimensions])

  useEffect(() => {
    if (!isAnimating) return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          setIsAnimating(false)
          return 1
        }
        return prev + animationSpeed
      })
    }, 30)
    
    return () => clearInterval(interval)
  }, [isAnimating, animationSpeed])
  
  // Auto-rotación en modo 3D
  useEffect(() => {
    if (mode !== '3D' || isDragging) return
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        angleY: prev.angleY + 0.01
      }))
    }, 50)
    
    return () => clearInterval(interval)
  }, [mode, isDragging])

  const handlePlayPause = () => {
    if (progress >= 1) {
      setProgress(0)
    }
    setIsAnimating(!isAnimating)
  }

  const handleReset = () => {
    setProgress(0)
    setIsAnimating(false)
  }
  
  const handleModeChange = (newMode) => {
    setMode(newMode)
    setProgress(0)
    setIsAnimating(false)
    setSelectedFigure(newMode === '2D' ? 'star' : 'cube')
  }
  
  const handleMouseDown = (e) => {
    if (mode === '3D') {
      setIsDragging(true)
      setLastMouse({ x: e.clientX, y: e.clientY })
    }
  }
  
  const handleMouseMove = (e) => {
    if (isDragging && mode === '3D') {
      const dx = e.clientX - lastMouse.x
      const dy = e.clientY - lastMouse.y
      
      setRotation(prev => ({
        angleX: prev.angleX + dy * 0.01,
        angleY: prev.angleY + dx * 0.01,
        angleZ: prev.angleZ
      }))
      
      setLastMouse({ x: e.clientX, y: e.clientY })
    }
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const handleWheel = (e) => {
    if (mode === '3D') {
      e.preventDefault()
      setZoom(prev => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)))
    }
  }
  
  const handleExport = () => {
    const data = {
      mode,
      figure: selectedFigure,
      numDrones,
      initialPositions,
      finalPositions,
      displacements: displacements.map((d, i) => ({
        index: i + 1,
        vector: d,
        magnitude: magnitude(d).toFixed(4)
      })),
      analysis: {
        rank,
        dimension: rank,
        totalEnergy: totalEnergy.toFixed(4),
        spaceType: mode === '2D' ? 'ℝ²' : 'ℝ³'
      }
    }
    exportToJSON(data)
  }

  return (
    <div className="app">
      <header className="header-gradient">
        <div className="header-content">
          <h1>
            <Sparkles className="header-icon" size={40} />
            Simulador de Formación de Drones
          </h1>
          <p>Espacios Vectoriales y Combinaciones Lineales</p>
        </div>
        
        {/* Mode Switcher */}
        <div className="mode-switcher">
          <button
            className={`mode-btn ${mode === '2D' ? 'active' : ''}`}
            onClick={() => handleModeChange('2D')}
          >
            <Layers size={20} />
            Modo 2D
          </button>
          <button
            className={`mode-btn ${mode === '3D' ? 'active' : ''}`}
            onClick={() => handleModeChange('3D')}
          >
            <Box size={20} />
            Modo 3D
          </button>
        </div>
      </header>

      <div className="status-bar">
        <div className={`status-pill ${statusType}`}>
          <div className="pill-icon">
            <Activity size={18} />
          </div>
          <div className="pill-content">
            <span className="pill-label">Simulación</span>
            <span className="pill-value">{simulationStatus}</span>
          </div>
        </div>

        <div className="status-pill neutral">
          <div className="pill-icon">
            <Gauge size={18} />
          </div>
          <div className="pill-content">
            <span className="pill-label">Progreso</span>
            <span className="pill-value">{progressPercent}%</span>
            <span className="pill-sub">Energía: {totalEnergy.toFixed(1)}</span>
          </div>
        </div>

        <div className="status-pill neutral">
          <div className="pill-icon">
            <ModeIcon size={18} />
          </div>
          <div className="pill-content">
            <span className="pill-label">Espacio Activo</span>
            <span className="pill-value">{modeLabel}</span>
            <span className="pill-sub">Rango: {rank}</span>
          </div>
        </div>

        <div className="status-pill neutral">
          <div className="pill-icon">
            <Target size={18} />
          </div>
          <div className="pill-content">
            <span className="pill-label">Figura</span>
            <span className="pill-value">{figure.name}</span>
            <span className="pill-sub">{numDrones} drones • {densityLabel}</span>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="canvas-container">
          <div className="canvas-wrapper" ref={wrapperRef}>
            <canvas 
              ref={canvasRef} 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ 
                cursor: mode === '3D' ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
            />
            {mode === '3D' && (
              <div className="canvas-hint">
                <p>🖱️ Arrastra para rotar | 🎡 Scroll para zoom</p>
              </div>
            )}
          </div>
          
          <div className="controls-row">
            <div className="controls">
              <button onClick={handlePlayPause} className="btn-primary">
                {isAnimating ? <Pause size={20} /> : <Play size={20} />}
                {isAnimating ? 'Pausar' : progress >= 1 ? 'Reiniciar' : 'Iniciar'}
              </button>
              <button onClick={handleReset} className="btn-secondary">
                <RotateCcw size={20} />
                Resetear
              </button>
              <button onClick={handleExport} className="btn-secondary">
                <Download size={20} />
                Exportar
              </button>
            </div>
            
            <div className="toggle-controls">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                <span><Grid3x3 size={16} /> Cuadrícula</span>
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showTrails}
                  onChange={(e) => setShowTrails(e.target.checked)}
                />
                <span><Maximize2 size={16} /> Vectores</span>
              </label>
            </div>
          </div>

          <div className="speed-control">
            <label>
              <span>Velocidad: {(animationSpeed * 100).toFixed(0)}%</span>
              <input
                type="range"
                min="0.005"
                max="0.03"
                step="0.001"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="density-control">
            <label>
              <span>💫 Densidad de Drones: {numDrones} drones ({densityMultiplier}x)</span>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={densityMultiplier}
                onChange={(e) => {
                  setDensityMultiplier(parseInt(e.target.value))
                  setProgress(0)
                  setIsAnimating(false)
                }}
              />
              <div className="density-labels">
                <span className={densityMultiplier === 1 ? 'active' : ''}>Básico</span>
                <span className={densityMultiplier === 2 ? 'active' : ''}>Medio</span>
                <span className={densityMultiplier === 3 ? 'active' : ''}>Denso</span>
                <span className={densityMultiplier === 4 ? 'active' : ''}>Ultra</span>
              </div>
            </label>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
            <span className="progress-text">{(progress * 100).toFixed(0)}%</span>
          </div>

          <div className="tips-card">
            <div className="tips-header">
              <Lightbulb size={18} />
              <span>Consejos rápidos</span>
            </div>
            <ul>
              <li>En modo 3D, arrastra el lienzo para rotar la formación y usa el scroll para acercar o alejar.</li>
              <li>Activa o desactiva la cuadrícula y los vectores para centrarte en la geometría deseada.</li>
              <li>Ajusta la densidad para explorar cómo cambia el rango y la energía de la formación.</li>
            </ul>
          </div>
        </div>

        <div className="info-panel">
          <div className="section space-info">
            <h2>
              {mode === '2D' ? <Layers size={20} /> : <Box size={20} />}
              Espacio: {mode === '2D' ? 'ℝ²' : 'ℝ³'}
            </h2>
            <p className="space-desc">
              {mode === '2D' 
                ? 'Espacio vectorial bidimensional - Plano cartesiano' 
                : 'Espacio vectorial tridimensional - Espacio euclidiano'}
            </p>
          </div>

          <div className="section">
            <h2>Seleccionar Figura</h2>
            <div className="figure-buttons">
              {Object.entries(FIGURES).map(([key, fig]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedFigure(key)
                    setProgress(0)
                    setIsAnimating(false)
                  }}
                  className={selectedFigure === key ? 'selected' : ''}
                >
                  <span className="figure-icon">{fig.icon}</span>
                  {fig.name}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>
              <Info size={18} />
              Análisis Vectorial
            </h2>
            <div className="analysis">
              <div className="stat">
                <span className="label">Número de drones:</span>
                <span className="value">{numDrones}</span>
              </div>
              <div className="stat">
                <span className="label">Rango de desplazamientos:</span>
                <span className="value highlight">{rank}</span>
              </div>
              <div className="stat">
                <span className="label">Dimensión del subespacio:</span>
                <span className="value highlight">{rank}</span>
              </div>
              <div className="stat">
                <span className="label">Espacio vectorial:</span>
                <span className="value">{mode === '2D' ? 'ℝ²' : 'ℝ³'}</span>
              </div>
              <div className="stat">
                <span className="label">Energía total:</span>
                <span className="value energy">{totalEnergy.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            className="btn-info"
            onClick={() => setShowAnalysis(!showAnalysis)}
          >
            {showAnalysis ? 'Ocultar' : 'Mostrar'} Vectores de Desplazamiento
          </button>

          {showAnalysis && (
            <div className="section vectors">
              <h3>Vectores de Desplazamiento (d⃗)</h3>
              <div className="vector-list">
                {displacements.map((d, i) => (
                  <div key={i} className="vector-item">
                    <BlockMath math={formatVectorLatex(d, i)} />
                    <InlineMath math={formatMagnitudeLatex(d, i)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section interpretation">
            <h3>💡 Interpretación</h3>
            <p>
              {rank === 1 && "Los drones se mueven en una única dirección (subespacio de dimensión 1)."}
              {rank === 2 && mode === '2D' && "Los drones se mueven libremente en el plano completo (subespacio de dimensión 2)."}
              {rank === 2 && mode === '3D' && "Los drones se mueven en un plano dentro del espacio 3D (subespacio de dimensión 2)."}
              {rank === 3 && "Los drones se mueven libremente en las tres dimensiones (subespacio de dimensión 3)."}
            </p>
            <p>
              <strong>Base del subespacio:</strong> Se necesitan {rank} vector{rank > 1 ? 'es' : ''} 
              {rank > 1 ? ' linealmente independientes' : ' independiente'} para generar todos los desplazamientos.
            </p>
            {mode === '3D' && (
              <p>
                <strong>Nota 3D:</strong> La proyección isométrica permite visualizar el espacio tridimensional 
                en la pantalla 2D preservando las relaciones espaciales.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
