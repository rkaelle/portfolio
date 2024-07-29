import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import "../styles/ThreeDScene.css";

const Text = () => {
  const meshRef = useRef();

  useEffect(() => {
    const cssVariable = getComputedStyle(document.documentElement).getPropertyValue('--pink-bright').trim();
    
    const color = new THREE.Color(cssVariable);

    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('RK', {
        font: font,
        size: 5,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      textGeometry.computeBoundingBox();
      const boundingBox = textGeometry.boundingBox;
      const centerOffsetX = -0.5 * (boundingBox.max.x - boundingBox.min.x);
      const centerOffsetY = -0.5 * (boundingBox.max.y - boundingBox.min.y);
      textGeometry.translate(centerOffsetX, centerOffsetY, 0);

      const material = new THREE.MeshStandardMaterial({ color: color });
      const mesh = new THREE.Mesh(textGeometry, material);
      mesh.rotation.y = -THREE.MathUtils.degToRad(60);
      if (meshRef.current) {
        meshRef.current.add(mesh);
      }
    });
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Adjust the speed as needed
    }
  });

  return <group ref={meshRef} />;
};

const ThreeDScene = () => (
  <div id="three-d-canvas-container">
    <Canvas id="three-d-canvas">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={1.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Text />
      <OrbitControls />
    </Canvas>
  </div>
);

export default ThreeDScene;