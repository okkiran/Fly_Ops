import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber"; // Import useThree
import { CatmullRomCurve3, Vector3 } from "three";
import { useGLTF, Float } from "@react-three/drei";

export function Airplane({ scrollProgress, onPositionChange, ...props }) {
    const { nodes, materials } = useGLTF("./models/Airplane.glb");
    const airplaneRef = useRef();
    const CURVE_DISTANCE = 100;

    const path = new CatmullRomCurve3([
        new Vector3(0, 0, -CURVE_DISTANCE),
        new Vector3(0, 0, -CURVE_DISTANCE),
        new Vector3(150, 0, -2 * CURVE_DISTANCE),
        new Vector3(-150, 0, -3 * CURVE_DISTANCE),
        new Vector3(150, 0, -4 * CURVE_DISTANCE),
        new Vector3(0, 0, -5 * CURVE_DISTANCE),
        new Vector3(0, 0, -6 * CURVE_DISTANCE),
        new Vector3(0, 0, -7 * CURVE_DISTANCE),
    ]);

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
            pointOnPath.y + 10,      // Y position (higher up)
            pointOnPath.z + 70       // Z position (farther back)
        );

        //camera looks at the airplane
        camera.lookAt(pointOnPath);
    });


    return (
        <group ref={airplaneRef} {...props} scale={[0.1, 0.1, 0.1]}>
            <Float floatIntensity={1.5} speed={1.5} rotationIntensity={1}>
                <mesh geometry={nodes.Boeing_787_8obj2.children[0].geometry} material={materials["Mat"]} />
                <mesh geometry={nodes.Boeing_787_8obj2.children[1].geometry} material={materials["Mat.1"]} />
            </Float>
        </group>
    );
}

useGLTF.preload("./models/Airplane.glb");
