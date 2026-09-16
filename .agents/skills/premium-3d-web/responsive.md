# Responsive 3D

Never treat mobile as a scaled-down desktop website. Create deliberate mobile behavior. 

## Mobile Strategies
- Reduce particle count.
- Reduce DPR (Device Pixel Ratio).
- Simplify shaders.
- Disable expensive post-processing.
- Use simpler lighting.
- Change camera position to fit narrower aspect ratios.
- Reposition models.
- Simplify scroll sequences.
- Replace certain WebGL sequences with static imagery when necessary.

The mobile version should still feel designed and premium.

## Touch Interactions
- Disable custom cursor behavior on touch devices.
- Avoid interactions that rely exclusively on hover. Provide tap equivalents.
- Ensure Lenis or scroll hijacking does not trap users on touch devices.
