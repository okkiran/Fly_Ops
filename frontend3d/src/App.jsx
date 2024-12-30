import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import './App.css';
import { OrbitControls } from "@react-three/drei";
import { Airplane } from "./components/Airplane";
import Background from "./components/Background";
import { gsap } from "gsap";
import Login from './components/Login'; // Import your Login component
import AirlinesMenu from './components/AirlinesMenu';  // Import AirlinesMenu component
import AircraftMenu from './components/AircraftMenu'; // Import AircraftMenu component
import StationMenu from './components/StationMenu';  // Import the StationMenu component

function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuContent, setMenuContent] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false); // Hamburger menu toggle state
    const [floatingMenuVisible, setFloatingMenuVisible] = useState(false); // Floating menu toggle state
    const [airplanePosition, setAirplanePosition] = useState([0, 0, 0]); // Airplane position state

    // New state for storing airline and station data
    const [airlines, setAirlines] = useState([]);
    const [aircrafts, setAircrafts] = useState([]); // New state for aircrafts
    const [stations, setStations] = useState([]);  // New state for stations data

    const menuItems = ['Flights', 'Users', 'Airlines', 'Stations', 'Aircrafts'];

    const menuLocations = {
        Flights: [10, 5, -5],
        Users: [-10, 3, 2],
        Airlines: [0, 8, -10],
        Stations: [5, -5, 5],
        Aircrafts: [0, 0, 10], // Add aircrafts menu location
    };

    const handleLogin = (username, password) => {
        if (username === 'user' && password === 'password') {
            setLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleScroll = (event) => {
        if (!floatingMenuVisible) {
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
    }, [loggedIn, floatingMenuVisible]);

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

    const toggleHamburgerMenu = () => {
        setHamburgerMenuOpen(!hamburgerMenuOpen);
    };

    const openFloatingMenu = (menuOption) => {
        setMenuContent(menuOption); // Set the content dynamically
        setFloatingMenuVisible(true); // Show the floating menu
        setHamburgerMenuOpen(false); // Close the hamburger menu

        // Animate airplane to the related menu location
        const targetPosition = menuLocations[menuOption] || [0, 0, 0];
        gsap.to(airplanePosition, {
            x: targetPosition[0],
            y: targetPosition[1],
            z: targetPosition[2],
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                setAirplanePosition([...airplanePosition]);
            }
        });

        // Fetch airlines when "Airlines" menu is clicked
        if (menuOption === "Airlines") {
            if (airlines.length === 0) {
                fetch('http://localhost:8080/api/airlines')
                    .then(response => response.json())
                    .then(data => setAirlines(data))
                    .catch(error => console.error('Error fetching airlines:', error));
            }
        }

        // Fetch aircrafts when "Aircrafts" menu is clicked
        if (menuOption === "Aircrafts") {
            if (aircrafts.length === 0) {
                fetch('http://localhost:8080/api/aircrafts')
                    .then(response => response.json())
                    .then(data => setAircrafts(data))
                    .catch(error => console.error('Error fetching aircrafts:', error));
            }
        }

        // Fetch stations when "Stations" menu is clicked
        if (menuOption === "Stations") {
            if (stations.length === 0) {
                fetch('http://localhost:8080/api/stations')
                    .then(response => response.json())
                    .then(data => setStations(data))
                    .catch(error => console.error('Error fetching stations:', error));
            }
        }
    };

    const closeFloatingMenu = () => {
        setFloatingMenuVisible(false); // Hide the floating menu
    };

    // Disable scrolling on the body when the floating menu is visible
    useEffect(() => {
        if (floatingMenuVisible) {
            document.body.style.overflow = 'hidden'; // Disable scroll when the menu is open
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scroll when the menu is closed
        }

        // Cleanup the effect
        return () => {
            document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled
        };
    }, [floatingMenuVisible]);

    return (
        <div className="App">
            {!loggedIn ? (
                <Login onLogin={handleLogin} loginError={loginError} />
            ) : (
                <>
                    {/* Hamburger Menu */}
                    <div className="hamburger-menu">
                        <button onClick={toggleHamburgerMenu} className="hamburger-button">
                            ☰ {/* Hamburger icon */}
                        </button>
                        {hamburgerMenuOpen && (
                            <ul className="menu-dropdown">
                                <li onClick={() => openFloatingMenu("Flights")}>Flights</li>
                                <li onClick={() => openFloatingMenu("Users")}>Users</li>
                                <li onClick={() => openFloatingMenu("Airlines")}>Airlines</li>
                                <li onClick={() => openFloatingMenu("Stations")}>Stations</li>
                                <li onClick={() => openFloatingMenu("Aircrafts")}>Aircraft</li>
                            </ul>
                        )}
                    </div>

                    {/* 3D Scene */}
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
                            enableZoom={true}
                        />
                        <Airplane
                            position={airplanePosition} // Bind the airplane position
                            rotation-y={Math.PI / 2}
                            scrollProgress={scrollProgress}
                        />
                    </Canvas>

                    {/* Scroll-Based Menu Visibility */}
                    {menuVisible && (
                        <div className={`menu ${menuVisible ? 'visible' : ''}`}>
                            {menuContent}
                        </div>
                    )}

                    {/* Floating Menu Overlay */}
                    {floatingMenuVisible && menuContent !== "Airlines" && menuContent !== "Aircrafts" && menuContent !== "Stations" && (
                        <div className="floating-menu-overlay">
                            <div className="floating-menu">
                                <button className="close-button" onClick={closeFloatingMenu}>
                                    ✖ {/* Close Icon */}
                                </button>
                                <h2>{menuContent} Menu</h2>
                            </div>
                        </div>
                    )}

                    {/* Render Airlines Menu */}
                    {floatingMenuVisible && menuContent === "Airlines" && (
                        <div className="floating-menu-overlay">
                            <AirlinesMenu airlines={airlines} closeMenu={closeFloatingMenu} />
                        </div>
                    )}

                    {/* Render Aircraft Menu */}
                    {floatingMenuVisible && menuContent === "Aircrafts" && (
                        <div className="floating-menu-overlay">
                            <AircraftMenu closeMenu={closeFloatingMenu} />
                        </div>
                    )}

                    {/* Render Stations Menu */}
                    {floatingMenuVisible && menuContent === "Stations" && (
                        <div className="floating-menu-overlay">
                            <StationMenu stations={stations} closeMenu={closeFloatingMenu} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
