// Background.jsx
import React from 'react';
import { Sky } from "@react-three/drei";
import Cloud from './Cloud'; // Import the new Cloud component

const Background = () => {
    return (
        <>
            {/* Sky */}
            <Sky distance={450000} sunPosition={[0, 1, 0]} azimuth={0.25} inclination={0.6} />

            {/* Clouds positioned around the curve */}
            <Cloud position={[-30, 10, -50]} scale={2} />

        </>
    );
};

export default Background;
