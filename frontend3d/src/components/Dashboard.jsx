// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Airplane } from './Airplane';
import Background from './Background';
import { gsap } from 'gsap';

function Dashboard() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const menuItems = ['Flights', 'Users', 'Airlines', 'Stations'];
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuContent, setMenuContent] = useState('');

    const handleScroll = (event) => {
        setScrollProgress((prev) => {
            const targetProgress = prev + event.deltaY * 0.0005;
            const clampedProgress = Math.max(0, Math.min(targetProgress, 1));
            gsap.to({ value: prev }, {
                value: clampedProgress,
                duration: 1,
                ease: "power2.out",
                onUpdate: function () {
                    setScrollProgress(this.targets()[0].value);
                },
            });
            return clampedProgress;
        });
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    useEffect(() => {
        const menuPoints = [0.1, 0.3, 0.5, 0.7];
        const newVisibility = Array(menuItems.length).fill(false);
        let newContent = '';

        menuPoints.forEach((point, index) => {
            if (Math.abs(scrollProgress - point) < 0.05) {
                newVisibility[index] = true;
                newContent = menuItems[index];
            }
        });

        const isVisible = newVisibility.some(visible => visible);
        setMenuVisible(isVisible);
        setMenuContent(newContent);
    }, [scrollProgress]);

    return (
        <div className="dashboard">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Background />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <OrbitControls enableDamping={true} dampingFactor={0.05} minDistance={10} maxDistance={50} enablePan={true} />
                <Airplane rotation-y={Math.PI / 2} scrollProgress={scrollProgress} />
            </Canvas>

            {menuVisible && (
                <div className={`menu ${menuVisible ? 'visible' : ''}`}>
                    {menuContent}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
