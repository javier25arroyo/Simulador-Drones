import { useState } from 'react'
import { Plane, Navigation, Battery, Wifi } from 'lucide-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Simulador de Drones</h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
          <Plane size={32} color="#646cff" />
          <Navigation size={32} color="#646cff" />
          <Battery size={32} color="#646cff" />
          <Wifi size={32} color="#646cff" />
        </div>
        <button onClick={() => setCount((count) => count + 1)}>
          Vuelos realizados: {count}
        </button>
        <p>
          Simulador de Drones con React y Lucide Icons
        </p>
      </div>
      <p className="read-the-docs">
        Click en el botón para simular vuelos
      </p>
    </>
  )
}

export default App
