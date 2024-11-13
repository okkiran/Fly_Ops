import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, TubeGeometry, MeshStandardMaterial} from "three";
import { useGLTF, Float } from "@react-three/drei";

export function Airplane({ scrollProgress, onPositionChange, ...props }) {
    const { nodes, materials } = useGLTF("./models/Airplane.glb");
    const airplaneRef = useRef();
    const curveRef = useRef(); // Ref for the 3D tube line
    const CURVE_DISTANCE = 100;

    const path = new CatmullRomCurve3(
        [
            new Vector3(0, 0, 4 * CURVE_DISTANCE),
            new Vector3(-200, 0, CURVE_DISTANCE),
            new Vector3(100, 0, -2 * CURVE_DISTANCE),
            new Vector3(0, 0, -3 * CURVE_DISTANCE),
            new Vector3(0, 0, -4 * CURVE_DISTANCE),
            new Vector3(0, 0, -5 * CURVE_DISTANCE),
            new Vector3(0, 0, -6 * CURVE_DISTANCE),
            new Vector3(0, 0, -7 * CURVE_DISTANCE),
        ],
        false,
        "centripetal",
        0.5
    );

    // Create TubeGeometry for a 3D look
    const tubeGeometry = new TubeGeometry(path, 200, 3, 16, false);

    //Curve line
    const tubeMaterial = new MeshStandardMaterial({
        color: '#7493b3',
        transparent: true,
        opacity: 0.2,       // Adjust transparency for cloud-like appearance
        roughness: 0.4,     // Slight roughness for a more diffuse look
        metalness: 0.2      // Lower metalness for a soft, non-metallic feel
    });

    // Get the camera from the context
    const { camera } = useThree();

    useFrame(() => {
        const pointOnPath = path.getPointAt(scrollProgress);
        airplaneRef.current.position.copy(pointOnPath);

        if (onPositionChange) {
            onPositionChange(pointOnPath);
        }

        const tangent = path.getTangentAt(scrollProgress).normalize();
        airplaneRef.current.lookAt(pointOnPath.clone().add(tangent));

        // Position the camera behind the airplane
        camera.position.set(
            pointOnPath.x,          // X position (same as airplane)
            pointOnPath.y+10,      // Y position (higher up)
            pointOnPath.z + 80       // Z position (farther back)
        );

        // Camera looks at the airplane
        camera.lookAt(pointOnPath);
    });

    return (
        <>
            {/* Airplane group */}
            <group ref={airplaneRef} {...props} scale={[0.1, 0.1, 0.1]}>
                <Float floatIntensity={1.5} speed={1.5} rotationIntensity={1}>
                    <mesh geometry={nodes.Boeing_787_8obj2.children[0].geometry} material={materials["Mat"]} />
                    <mesh geometry={nodes.Boeing_787_8obj2.children[1].geometry} material={materials["Mat.1"]} />
                </Float>
            </group>

            {/* 3D cloudy curve representation */}
            <mesh ref={curveRef} geometry={tubeGeometry} material={tubeMaterial} />
        </>
    );
}

useGLTF.preload("./models/Airplane.glb");
