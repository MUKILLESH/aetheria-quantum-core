# Shader System

Custom shaders should be used only when they improve the experience. Avoid shader effects merely to demonstrate technical complexity.

## Common Shader Effects
- Distortion
- Fresnel
- Holographic surfaces
- Noise & Displacement
- Dissolve
- Gradients & Procedural patterns
- Vertex deformation
- Atmospheric effects

## Optimization
Shaders must be optimized. 
- Avoid expensive fragment calculations when simpler techniques achieve the same visual result.
- Avoid using complex math functions (`sin`, `cos`, `pow`) in the fragment shader excessively.
- Move calculations to the vertex shader whenever possible.
- Use shader time uniforms with `useFrame` intelligently to prevent unnecessary renders.
