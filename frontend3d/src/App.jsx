import { Airplane } from "./components/Airplane";
import { OrbitControls } from "@react-three/drei"; // Optional, for controlling the camera
import { Canvas } from "@react-three/fiber";
import './App.css'
import {Background} from "./components/Background.jsx";

function App() {

  return (
      <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
          <Background />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Mouse Control */}
          <OrbitControls
              enableDamping={true}
              dampingFactor={0.05}
              minDistance={30}
              maxDistance={80}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
          />
          <Airplane position={[0, 0, 0]} scale={[0.02, 0.02, 0.02]} />
      </Canvas>

  )
}

export default App
