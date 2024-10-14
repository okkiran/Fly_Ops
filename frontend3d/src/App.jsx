import { Canvas } from "@react-three/fiber";
import './App.css';
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Airplane } from "./components/Airplane";
import Background from "./components/Background";
import { gsap } from "gsap";

function App() {
    const [scrollProgress, setScrollProgress] = useState(0); // Track the user's scroll position
    const [menuVisible, setMenuVisible] = useState(false); // State to control menu visibility
    const [menuContent, setMenuContent] = useState(''); // Content for the menu

    // Event handler to update scroll progress based on the mouse wheel

    const handleScroll = (event) => {
        setScrollProgress((prev) => {
            const targetProgress = prev + event.deltaY * 0.0005; // Adjust scroll speed
            const clampedProgress = Math.max(0, Math.min(targetProgress, 1)); // Clamp progress between 0 and 1

            // Use gsap to animate the scroll progress smoothly
            gsap.to({ value: prev }, {
                value: clampedProgress,
                duration: 0.5, // Adjust duration for smoothness
                ease: "power2.out", // Smooth easing
                onUpdate: function () {
                    setScrollProgress(this.targets()[0].value); // Update state smoothly
                },
            });

            return prev; // We don't update immediately, as gsap will handle the progress animation
        });
    };

    // Listen for scroll events
    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll); // Cleanup
    }, []);

    // Update menu content and visibility based on scroll progress
    useEffect(() => {
        if (scrollProgress < 0.2) {
            setMenuContent('Flights');
            setMenuVisible(true);
        } else if (scrollProgress < 0.4) {
            setMenuContent('Users');
            setMenuVisible(true);
        } else if (scrollProgress < 0.6) {
            setMenuContent('Airlines');
            setMenuVisible(true);
        } else if (scrollProgress < 0.8) {
            setMenuContent('Stations');
            setMenuVisible(true);
        } else {
            setMenuVisible(false); // Hide menu after the last section
        }
    }, [scrollProgress]);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
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

            {/* Menu Display */}
            {menuVisible && (
                <div className={`menu ${menuVisible ? 'visible' : ''}`}>
                    {menuContent}
                </div>
            )}
        </div>
    );
}

export default App;
