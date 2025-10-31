# Simulador de Drones

Aplicación web de simulador de drones desarrollada con React y Vite, utilizando lucide-react para iconos.

## 🚀 Características

- React 19
- Vite para desarrollo rápido
- Lucide React para iconos
- Configuración de Docker para producción y desarrollo
- ESLint para calidad de código

## 📦 Instalación Local

### Prerrequisitos

- Node.js 20 o superior
- npm 10 o superior

### Pasos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🐳 Docker

### Opción 1: Docker Compose (Recomendado)

#### Modo Producción
```bash
# Construir y ejecutar en modo producción
docker-compose up simulador-drones

# Acceder a http://localhost:3000
```

#### Modo Desarrollo
```bash
# Ejecutar en modo desarrollo con hot reload
docker-compose up dev

# Acceder a http://localhost:5173
```

### Opción 2: Docker Manual

#### Construir imagen
```bash
docker build -t simulador-drones .
```

#### Ejecutar contenedor
```bash
docker run -p 3000:80 simulador-drones
```

Luego acceder a `http://localhost:3000`

## 🛠️ Tecnologías

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Build tool y dev server ultra rápido
- **Lucide React**: Librería de iconos moderna y flexible
- **Docker**: Containerización para deployment
- **Nginx**: Servidor web para producción

## 📝 Estructura del Proyecto

```
simulador-drones/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── assets/          # Recursos estáticos
├── public/              # Archivos públicos
├── Dockerfile           # Configuración Docker
├── docker-compose.yml   # Orquestación de contenedores
└── vite.config.js       # Configuración de Vite
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint

## 🌐 Puertos

- **Desarrollo**: 5173
- **Producción (Docker)**: 3000 (mapea al puerto 80 interno)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

