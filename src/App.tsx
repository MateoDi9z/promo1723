import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Semaforo from "./semaforo"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Semaforo />
    </div>
  )
}

export default App
