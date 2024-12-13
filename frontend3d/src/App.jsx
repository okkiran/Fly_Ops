import { Canvas } from "@react-three/fiber";
import './App.css';
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Airplane } from "./components/Airplane";
import Background from "./components/Background";
import { gsap } from "gsap";
import Login from './components/Login'; // Import your Login component

function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuContent, setMenuContent] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const menuItems = ['Flights', 'Users', 'Airlines', 'Stations'];

    const handleLogin = (username, password) => {
        if (username === 'user' && password === 'password') {
            setLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleScroll = (event) => {
        if (loggedIn) {
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

                return prev;
            });
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
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
        }
    }, [scrollProgress, loggedIn]);

    return (
        <div className="App"> {/* This will now take up the full height and width */}
            {!loggedIn ? (
                <Login onLogin={handleLogin} loginError={loginError} />
            ) : (
                <>
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

                    {menuVisible && (
                        <div className={`menu ${menuVisible ? 'visible' : ''}`}>
                            {menuContent}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
