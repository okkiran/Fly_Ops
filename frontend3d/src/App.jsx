import { Canvas } from "@react-three/fiber";
import './App.css';
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Airplane } from "./components/Airplane";
import Background from "./components/Background";

function App() {
    const [scrollProgress, setScrollProgress] = useState(0); // Track the user's scroll position

    // Event handler to update scroll progress based on the mouse wheel
    const handleScroll = (event) => {
        setScrollProgress((prev) => {
            const newProgress = prev + event.deltaY * 0.0005; // Adjust scroll speed by scaling the deltaY
            return Math.max(0, Math.min(newProgress, 1)); // Clamp the progress between 0 and 1
        });
    };

    // Listen for scroll events
    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll); // Cleanup
    }, []);

    return (
        <div>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                {/* Background component containing Sky and Clouds */}
                <Background />

                {/* Basic Lighting */}
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

                {/* Airplane with scroll controlling */}
                <Airplane
                    rotation-y={Math.PI / 2}
                    scrollProgress={scrollProgress} // Pass scroll progress to the Airplane component
                />
            </Canvas>
        </div>
    );
}

export default App;
