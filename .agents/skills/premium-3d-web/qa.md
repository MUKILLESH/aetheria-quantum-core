# QA and Quality Gate

Do not declare the website finished merely because the code compiles. Visually inspect it.

## Browser QA Workflow
1. Start application
2. Open website in browser
3. Check Console
4. Check Network
5. Test Interactions
6. Test Scrolling
7. Test Responsive Layout
8. Check WebGL rendering
9. Check Performance
10. Fix problems, test again.

## Visual QA Checklist
- [ ] Text clipping or awkward line breaks
- [ ] Overlapping elements
- [ ] Stretched images
- [ ] 3D clipping or camera clipping
- [ ] Poor contrast
- [ ] Excessive blur
- [ ] Animation jumps
- [ ] Scroll jitter
- [ ] Loading flashes
- [ ] Incorrect z-index
- [ ] Broken mobile layouts
- [ ] Hydration errors
- [ ] Layout shifts

## Performance QA Checklist
Check for common Three.js problems:
- [ ] Excessive draw calls
- [ ] Unnecessary lights
- [ ] Huge textures
- [ ] Excessive DPR
- [ ] Unnecessary shadows
- [ ] Multiple render loops
- [ ] Unmounted resources
- [ ] Geometry/materials recreated every frame
- [ ] React state updates every frame
- [ ] Excessive post-processing

## Final Quality Gate
Before calling any project complete, verify:
**Design:** Strong composition, consistent typography, deliberate spacing, clear hierarchy.
**3D:** Correct framing, good lighting, good materials, optimized assets.
**Motion:** Smooth animations, no scroll jitter, purposeful choreography, reduced-motion support.
**Responsive:** Desktop, Laptop, Tablet, Mobile.
**Performance:** No obvious memory leak, reasonable FPS, optimized assets, appropriate DPR, no unnecessary render loops.
**Quality:** No console errors, no broken links, no overflowing text, no obvious layout bugs, no placeholder content unless explicitly requested.
