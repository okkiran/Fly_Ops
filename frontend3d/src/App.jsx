import { Canvas } from "@react-three/fiber";
import './App.css';
import { Float, OrbitControls } from "@react-three/drei";
import {Airplane} from "./components/Airplane";
import Background from "./components/Background";

function App() {

    return (
        <div>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>

                {/* Background*/}
                <Background />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                {/* Controls */}
                <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.05}
                    minDistance={10}
                    maxDistance={50}
                    enablePan={true}
                />

                {/* Airplane floating */}
                <Float floatIntensity={1.5} speed={1.5}>
                    <Airplane
                        rotation-y={Math.PI / 2}
                        scale={[0.5, 0.5, 0.5]}
                        position={[0, 0, 0]}  // Centered the airplane
                    />
                </Float>
            </Canvas>
        </div>
    );
}

export default App;
