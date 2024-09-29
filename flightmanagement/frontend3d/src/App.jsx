import { useState } from 'react'
import { Airplane } from "./components/Airplane";
import { OrbitControls } from "@react-three/drei"; // Optional, for controlling the camera
import { Canvas } from "@react-three/fiber";
import './App.css'

function App() {

  return (
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls /> {/* Optional, for camera movement */}
        <Airplane position={[0, 0, 0]} />
      </Canvas>
  )
}

export default App
