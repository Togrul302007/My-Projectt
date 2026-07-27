import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Custom GLSL Shader Material Definition
const CustomShaderMaterial = {
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  // Vertex Shader
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Interactive mouse influence shift (Effekti daha aydın etmək üçün gücləndirildi)
      vec2 mouseShift = (u_mouse - 0.5) * 0.8;
      
      // Dynamic color wave calculation
      float wave1 = sin(uv.x * 6.0 + u_time * 0.8 + mouseShift.x * 5.0);
      float wave2 = cos(uv.y * 6.0 - u_time * 0.6 + mouseShift.y * 5.0);
      float combined = (wave1 + wave2) * 0.5;

      // Deep dark blue / purple gradient palette
      vec3 colorA = vec3(0.06, 0.09, 0.16); // Dark background
      vec3 colorB = vec3(0.23, 0.51, 0.96); // Vibrant blue
      vec3 colorC = vec3(0.55, 0.27, 0.90); // Glowing purple

      vec3 finalColor = mix(colorA, colorB, combined + 0.5);
      finalColor = mix(finalColor, colorC, uv.y + mouseShift.y);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

// 2. Shader Background Canvas Plane
function ShaderPlane() {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      // Update time uniform
      meshRef.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
      
      // Smoothly interpolate mouse uniform position
      meshRef.current.material.uniforms.u_mouse.value.lerp(
        new THREE.Vector2(
          state.pointer.x * 0.5 + 0.5,
          state.pointer.y * 0.5 + 0.5
        ),
        0.1 // Reaksiyanı daha sürətli etmək üçün 0.05 -> 0.1 edildi
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={CustomShaderMaterial.vertexShader}
        fragmentShader={CustomShaderMaterial.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// 3. Main Hero Section Component
export default function App() {
  return (
    <>

    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
      {/* Dynamic Fullscreen Shader Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance" }}>
          <ShaderPlane />
        </Canvas>
      </div>

      {/* Readable Content Overlay on Top */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none', // 🔥 Əsas düzəliş: Kursor hadisələrinin Canvas-a keçməsinə icazə verir
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#ffffff',
        textAlign: 'center',
        padding: '0 20px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Frontend Developer & Creative Coder
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#e2e8f0', maxWidth: '600px', lineHeight: '1.6' }}>
          Building performant, interactive web applications with React, Tailwind CSS, and WebGL/GLSL shaders.
        </p>
      </div>
    </main>
    {/* <!-- Footer Graduate Badge Component --> */}
    <footer class="portfolio-footer">
      {/* <!-- Existing footer elements --> */}
      <div class="flyrank-badge-container">
        <a 
          href="https://aifluency.flyrank.ai/verify/YOUR_VERIFICATION_ID" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="/assets/flyrank-graduate-badge.svg" 
            alt="FlyRank Verified Graduate" 
            width="140" 
            height="40"
          />
        </a>
      </div>
    </footer>
    </>
    
  );
}