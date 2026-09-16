import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Preload, Sparkles, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import QuantumCore from './QuantumCore'
import * as THREE from 'three'

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const { camera, viewport, mouse } = useThree()
  const [dpr, setDpr] = useState(2)
  const [isLowPerf, setIsLowPerf] = useState(false)
  const isMobile = viewport.width < 5 

  // Initial load state
  const loadState = useRef({ opacity: 0, scale: 0 })
  
  useFrame((state, delta) => {
    // 1. Initial Load Sequence (Fades in over first 1.5 seconds)
    const time = state.clock.elapsedTime
    if (time < 1.5) {
      loadState.current.scale = gsap.utils.interpolate(0.5, 1, Math.min(time / 1.0, 1))
    }

    if (!groupRef.current) return

    // 2. Scroll Progress (0 to 1)
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

    // Base Rotation
    groupRef.current.rotation.y = progress * Math.PI * 2

    // 3. 6-Section Cinematic Camera Choreography
    
    // Target Variables
    let targetX = 0
    let targetY = 0
    let targetZ = 8

    if (progress < 0.2) {
      // SECTION 01: HERO
      const p = progress / 0.2
      if (isMobile) {
        targetX = 0
        targetY = 1
        targetZ = 9
      } else {
        targetX = 2.5
        targetY = 0
        targetZ = 8
      }
    } 
    else if (progress >= 0.2 && progress < 0.4) {
      // SECTION 02: THE CORE (Macro View)
      const p = (progress - 0.2) / 0.2
      targetX = gsap.utils.interpolate(isMobile ? 0 : 2.5, 0, p)
      targetY = gsap.utils.interpolate(isMobile ? 1 : 0, isMobile ? 2 : 0, p)
      targetZ = gsap.utils.interpolate(isMobile ? 9 : 8, 4.5, p) // Deep push in
    } 
    else if (progress >= 0.4 && progress < 0.6) {
      // SECTION 03: ENGINEERED
      const p = (progress - 0.4) / 0.2
      targetX = gsap.utils.interpolate(0, isMobile ? 0 : -2.5, p)
      targetY = gsap.utils.interpolate(isMobile ? 2 : 0, isMobile ? 1.5 : 0, p)
      targetZ = gsap.utils.interpolate(4.5, 7, p)
    }
    else if (progress >= 0.6 && progress < 0.8) {
      // SECTION 04: HOW IT WORKS
      const p = (progress - 0.6) / 0.2
      targetX = gsap.utils.interpolate(isMobile ? 0 : -2.5, isMobile ? 0 : -1.5, p)
      targetY = gsap.utils.interpolate(isMobile ? 1.5 : 0, isMobile ? 2 : 0.5, p)
      targetZ = gsap.utils.interpolate(7, 6, p)
    }
    else {
      // SECTION 05 & 06: PRECISION & CONCLUSION
      const p = (progress - 0.8) / 0.2
      targetX = gsap.utils.interpolate(isMobile ? 0 : -1.5, 0, p)
      targetY = gsap.utils.interpolate(isMobile ? 2 : 0.5, 0, p)
      targetZ = gsap.utils.interpolate(6, 11, p) // Pull far back
    }

    // Apply scale from load state
    groupRef.current.scale.setScalar(loadState.current.scale)

    // Smooth position interpolation (prevents jerky scrolling)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    // 4. Subtle Mouse Parallax (adds weight and physical realism)
    if (!isMobile) {
      const parallaxX = mouse.x * 0.2
      const parallaxY = mouse.y * 0.2
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.02)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, parallaxY, 0.02)
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerformanceMonitor 
        onDecline={() => setIsLowPerf(true)} 
        onIncline={() => setIsLowPerf(false)} 
      />

      <color attach="background" args={['#030303']} />
      
      {/* Fog for cinematic depth falloff */}
      <fogExp2 attach="fog" color="#030303" density={0.03} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#00f0ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />

      {/* Atmospheric depth */}
      <Sparkles 
        count={isLowPerf ? 50 : 200} 
        scale={25} 
        size={2} 
        speed={0.2} 
        opacity={0.15} 
        color="#00f0ff" 
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          <QuantumCore />
        </group>
      </Float>

      <EffectComposer disableNormalPass multisampling={isLowPerf ? 0 : 4}>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          intensity={1.2} 
          mipmapBlur={!isLowPerf} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
        {!isLowPerf && (
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.0015, 0.0015)} 
          />
        )}
      </EffectComposer>

      <Preload all />
    </>
  )
}
