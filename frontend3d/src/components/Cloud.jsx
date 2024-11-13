// Cloud.jsx
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// CloudModel component to load cloud models
const CloudModel = ({ position, scale }) => {
    const { scene } = useGLTF("https://raw.githubusercontent.com/okkiran/Fly_Ops/main/frontend3d/public/models/Cloud.glb");

    // Reference for the cloud to apply floating effect
    const cloudRef = useRef();

    // Use useFrame to create a floating effect
    useFrame(() => {
        if (cloudRef.current) {
            // Simple vertical oscillation for floating effect
            cloudRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5 + position[1]; // Adjust float height as needed
        }
    });

    return <primitive ref={cloudRef} object={scene} position={position} scale={scale} />;
};

export default CloudModel;
