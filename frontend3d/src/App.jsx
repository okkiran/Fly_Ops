import { Canvas } from "@react-three/fiber";
import './App.css';
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Airplane } from "./components/Airplane";
import Background from "./components/Background";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Set global GSAP defaults
gsap.defaults({ ease: "none" });

function App() {
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = (event) => {
        setScrollProgress((prev) => {
            const targetProgress = prev + event.deltaY * 0.0005;
            const clampedProgress = Math.max(0, Math.min(targetProgress, 1));

            gsap.to({ value: prev }, {
                value: clampedProgress,
                duration: 0.5,
                ease: "power2.out",
                onUpdate: function () {
                    setScrollProgress(this.targets()[0].value);
                },
            });

            return prev;
        });
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    // Create GSAP ScrollTrigger timeline for menu items
    useEffect(() => {
        const menuItems = document.querySelectorAll('.menu-item');

        const tl = gsap.timeline({
            defaults: {
                duration: 0.5, // You can adjust this value
                autoAlpha: 1,
                visibility: "visible",
                ease: "elastic(2.5, 1)" // Applying elastic easing
            },
            scrollTrigger: {
                trigger: "#svg-stage",
                scrub: true,
                start: "top center",
                end: "bottom center",
            },
        });

        menuItems.forEach((item, index) => {
            tl.to(item, { autoAlpha: 1 }, index * 0.2);
        });

        return () => tl.kill();
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Background />

                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.05}
                    minDistance={10}
                    maxDistance={50}
                    enablePan={true}
                />

                <Airplane
                    rotation-y={Math.PI / 2}
                    scrollProgress={scrollProgress}
                />
            </Canvas>

            <div className={`menu`}>
                <div className="menu-item">Flights</div>
                <div className="menu-item">Users</div>
                <div className="menu-item">Airlines</div>
                <div className="menu-item">Stations</div>
            </div>
        </div>
    );
}

export default App;
