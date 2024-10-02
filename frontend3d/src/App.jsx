import { Airplane } from "./components/Airplane";
import { Canvas } from "@react-three/fiber";
import './App.css'
import {Background} from "./components/Background.jsx";
import {Float, OrbitControls} from "@react-three/drei";


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

          <Float floatIntensity={2} speed={2} >
          {/* Airplane */}
          <Airplane rotation-y={Math.PI / 2}
                    scale={[0.2, 0.2, 0.2]}
                    position-y={0.1}/>
           </Float>

      </Canvas>

  )
}

export default App
