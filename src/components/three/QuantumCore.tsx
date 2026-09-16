import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, Torus, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function QuantumCore() {
  const outerRingRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Generate some particle positions
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const radius = 2.5 + Math.random() * 1.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos((Math.random() * 2) - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  useFrame((state, delta) => {
    // Constant slow rotation of the components
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2
      outerRingRef.current.rotation.y += delta * 0.3
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.4
      innerRingRef.current.rotation.z -= delta * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5
      // Pulsating scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      coreRef.current.scale.set(scale, scale, scale)
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.1
    }
  })

  // Premium Material settings
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#00f0ff',
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.5,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  const coreMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#00f0ff',
    emissiveIntensity: 2, // Relies on Postprocessing Bloom
    wireframe: true,
  })

  return (
    <group>
      {/* Outer Containment Ring */}
      <Torus ref={outerRingRef} args={[2.2, 0.05, 16, 100]} material={glassMaterial} />

      {/* Inner Stabilization Ring */}
      <Torus ref={innerRingRef} args={[1.8, 0.08, 16, 100]} rotation={[Math.PI / 2, 0, 0]} material={glassMaterial} />

      {/* The Quantum Core */}
      <Icosahedron ref={coreRef} args={[1, 2]} material={coreMaterial} />

      {/* Energy core (solid emissive center) */}
      <Sphere args={[0.7, 32, 32]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>

      {/* Orbiting Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00f0ff"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
