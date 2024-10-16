// Background.jsx
import React from 'react';
import { Sky } from "@react-three/drei";
import Cloud from './Cloud'; // Import the Cloud component

const Background = () => {
    return (
        <>
            {/* Sky */}
            <Sky distance={450000} sunPosition={[0, 1, 0]} azimuth={0.25} inclination={0.6} />

            {/* Manually positioned clouds around the curve */}
            <Cloud position={[-30, 10, -150]} scale={1.5} />
            <Cloud position={[30, 12, -200]} scale={1.8} />
            <Cloud position={[-10, 11, -250]} scale={1.6} />
            <Cloud position={[40, 9, -300]} scale={2.0} />
            <Cloud position={[0, 13, -350]} scale={1.7} />
        </>
    );
};

export default Background;
