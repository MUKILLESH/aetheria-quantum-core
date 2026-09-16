# React Three Fiber & Three.js Architecture

When building a premium 3D experience with R3F, organize scenes cleanly and use reusable components. Avoid putting the entire 3D experience inside one massive component.

## Architecture Example
```text
src/
  components/
    sections/
    three/
      Scene.tsx
      CameraRig.tsx
      Lighting.tsx
      Environment.tsx
      models/
      effects/
      shaders/
  hooks/
  lib/
  styles/
```

## Camera Choreography
Treat the camera as part of the storytelling. Use techniques like:
- Subtle camera drift
- Scroll-driven dolly
- Orbital movement
- Target tracking
- Depth reveals
- Parallax

The camera movement must remain smooth. Never create aggressive motion that makes the site uncomfortable. Avoid unnecessary camera shaking.

## Lighting
Lighting should create visual hierarchy. Consider:
- Key lights
- Fill lights
- Rim lights
- Environment lighting / HDR environments
- Contact shadows / Soft shadows

Avoid illuminating everything equally. Premium scenes often rely on selective lighting. Use contrast.

## Materials
Prefer physically believable materials when appropriate. Consider metalness, roughness, clearcoat, transmission, and emissive properties.
Avoid excessive transparent materials because they can be expensive.

## Model Optimization
When GLTF/GLB models are used, check:
- Polygon count
- Material count
- Texture dimensions & compression
- Unnecessary meshes / Unused animations
- Draw calls

Use Draco/Meshopt/KTX2 when supported and beneficial, but do not destroy visible model quality simply to reduce file size.
