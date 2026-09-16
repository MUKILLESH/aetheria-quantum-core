# Spline Workflow

Spline is an excellent choice when a `.splinecode` scene exists, designers need easy scene editing, interactions are primarily authored visually, or the scene does not require deeply custom rendering logic.

## Spline Integration
When a `.splinecode` scene is provided, do not recreate the scene unnecessarily. Integrate it correctly using `@splinetool/react-spline` or `@splinetool/runtime`.

Determine:
- Loading behavior
- Responsive scaling
- Camera framing
- Pointer events
- Interaction requirements
- Event hooks
- Scene performance

Do not modify the Spline scene URL without reason. Do not replace a working Spline scene with a fake CSS object.

## MCP Usage
If the `Spline` MCP server is available, use its tools to load and inspect scenes:
- Detect the scene configuration.
- Check objects, cameras, and variables exported by the `.splinecode`.
- Apply modifications via the MCP server if design changes are requested.
