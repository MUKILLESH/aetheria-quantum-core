# Design System

A premium 3D web experience requires a robust and consistent design foundation. This skill outlines the setup for a design system using Vanilla CSS with CSS custom properties.

## Typography
Typography is one of the most important parts of premium web design.
- Use strong display typography.
- Use clean body typography.
- Rely on deliberate weight contrast.
- Ensure responsive font sizing using `clamp()`.

```css
/* Example Typography Variables */
:root {
  --font-display: 'Inter', sans-serif;
  --font-body: 'Roboto', sans-serif;
  
  --text-hero: clamp(3rem, 8vw, 9rem);
  --text-h1: clamp(2.5rem, 5vw, 5rem);
  --text-h2: clamp(2rem, 4vw, 3rem);
  --text-body: 1rem;
}
```

## CSS Variables Architecture
Define all tokens in a central place (e.g., `index.css`).
Avoid random hardcoded colors or spacing.

```css
:root {
  /* Colors */
  --background: #050505;
  --surface: #111111;
  --foreground: #f4f4f5;
  --muted: #a1a1aa;
  --accent: #3b82f6;
  --border: rgba(255, 255, 255, 0.1);

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  --spacing-xxl: 8rem;

  /* Animation */
  --duration-fast: 200ms;
  --duration-medium: 500ms;
  --duration-slow: 1000ms;
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Visual Hierarchy
- Avoid generic SaaS layouts.
- Do not overuse glowing borders or meaningless gradient blobs.
- Create contrast through whitespace, lighting, and layout, rather than decoration.
