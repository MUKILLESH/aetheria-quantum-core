# Accessibility

Premium visuals must remain usable. Do not sacrifice basic usability for aesthetics.

## Reduced Motion
Always support `prefers-reduced-motion`. When enabled:
- Disable unnecessary parallax.
- Disable aggressive camera movement.
- Simplify transitions.
- Avoid large continuous movement.

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Disable GSAP timelines or camera sway
}
```

## SEO and Semantics
- Use semantic headings (`h1`, `h2`, etc.).
- Important textual content should not exist only inside WebGL. Keep it in the DOM.
- Provide keyboard navigation and visible focus states.
- Ensure readable contrast and appropriate ARIA where necessary.
