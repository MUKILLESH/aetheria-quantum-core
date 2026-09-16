# Performance System

Performance is part of visual quality. 

## Memory Management
Dispose of Three.js resources when necessary. Ensure geometries, materials, textures, and render targets do not leak when scenes/components are destroyed. Be especially careful with dynamically generated resources.

## Adaptive Quality
When useful, create a quality system to adjust settings based on device capabilities:
- **HIGH**: Full effects, higher DPR, advanced post-processing, richer particles.
- **MEDIUM**: Reduced effects, moderate DPR.
- **LOW**: Minimal post-processing, low particle count, reduced DPR, simplified shadows.

## Loading Experience
Heavy 3D scenes need intentional loading behavior. Create loading states that match the visual identity. Do not show a fake loading screen longer than necessary.

## Animation Performance
- Avoid `setInterval`-based animation.
- Avoid DOM state updates every frame.
- Avoid unnecessary React renders.
- Prefer `requestAnimationFrame`, `gsap.ticker`, `useFrame`, or shader time uniforms.
