# Motion System

Premium motion feels deliberate, physical, and restrained. This skill outlines the setup of the motion engine for cinematic 3D web experiences.

## GSAP & ScrollTrigger
GSAP is the primary motion engine. Use ScrollTrigger for scroll-driven timelines.
Always create timelines instead of unrelated animations when elements belong to the same visual sequence.

```javascript
// Example Sequence
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

tl.to('.headline', { opacity: 0, y: -50 })
  .to(camera.position, { z: 5, duration: 2 }, '<')
  .to(product.rotation, { y: Math.PI }, '<');
```

## Smooth Scrolling with Lenis
If smooth scrolling improves the experience, integrate Lenis correctly. Ensure Lenis and GSAP timing remain synchronized.

```javascript
import Lenis from 'lenis'

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

## Motion Principles
- Prefer GPU-friendly properties: `transform`, `opacity`, `clip-path`.
- Avoid layout-triggering animations (`width`, `margin`, `top`, etc.).
- Avoid excessive bouncing; use premium eases like `power3.inOut` or custom cubic-beziers.
- Avoid animating everything. Static elements create contrast for moving elements.

## Scroll Storytelling
Think in chapters:
1. **Introduction**: Large typography + hero 3D object.
2. **Reveal**: Camera approaches object.
3. **Details**: Product rotates, revealing features.
4. **Call to Action**: Clean final composition.
