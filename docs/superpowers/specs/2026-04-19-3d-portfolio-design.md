# 3D Scroll-Driven Portfolio — Design Spec
**Date:** 2026-04-19  
**Status:** Approved  
**Author:** Manish Kumar (via brainstorming session)

---

## Overview

Transform the existing React/Tailwind/Vite portfolio into a cinematic, scroll-driven 3D experience using a single persistent WebGL canvas, GSAP ScrollTrigger, Lenis smooth scroll, and Framer Motion. The result should feel like an interactive film — not a webpage.

---

## Decisions Log

| Question | Decision |
|---|---|
| Extra sections (FintechProjects, CodingProfiles, TechnicalArchitecture) | Keep all three, apply 3D treatment |
| About section (new vs existing) | Merged into Timeline → becomes "The Story" |
| Performance target | Max visual impact, no compromise — 60fps desktop target |
| Hero 3D centerpiece | Neural Sphere + Live Data Streams |
| Skills layout | Neural Net backdrop + Skill Chip Grid |
| Projects gallery | 3D CoverFlow Carousel |
| Canvas architecture | Single persistent WebGL canvas (Approach 1) |

---

## Tech Stack Additions

```bash
bun add three @react-three/fiber @react-three/drei framer-motion gsap @gsap/react lenis zustand
bun add -D @types/three
```

---

## Global Systems

### Color Tokens
CSS variables updated in `src/index.css`:
- `--background: #050510` (deep space dark)
- `--primary: #00D4FF` (electric blue)
- `--secondary: #7B2FBE` (neon purple)
- `--accent: #FFD700` (gold highlights)

### Typography
- `Space Grotesk` (Google Fonts) — all headings, variable weight
- `Inter` — body text (already in use)
- Font loaded via `@font-face` with `font-display: swap`
- Variable weight transitions on headings driven by scroll progress via `font-variation-settings`

### Single Persistent Canvas
- Component: `src/components/three/SceneCanvas.tsx`
- `position: fixed; inset: 0; z-index: 0; pointer-events: none`
- All HTML content: `position: relative; z-index: 1`
- Scene graph contains all 3D objects for all sections
- Object visibility/position driven by scroll progress — no mount/unmount cycles
- `dpr={[1, 2]}` for sharp rendering on retina, capped at 2x

### Scroll System
- `src/providers/LenisProvider.tsx` wraps the app
- Lenis `scroll` event piped to `ScrollTrigger.update` on every frame
- `gsap.registerPlugin(ScrollTrigger)` in `main.tsx`
- Each section registers its own ScrollTrigger timeline in a `useEffect`
- Scroll progress exposed via `useLenis` hook and a global `scrollProgress` ref

### Shared Scene State
- `src/stores/sceneStore.ts` — Zustand store
- Keys: `activeSection`, `scrollProgress`, `mouseXY`, `isLiteMode`
- Canvas reads from store; HTML components write to store via hooks
- `mouseXY` updated on `mousemove` throttled to 60fps

### Global UI Components

**ScrollProgressIndicator** (`src/components/ScrollProgressIndicator.tsx`)
- Vertical strip of dots on the right edge
- One dot per section (8 total — Hero, FintechProjects, Projects, Skills, Timeline, CodingProfiles, TechnicalArchitecture, Contact; Footer excluded as it has no 3D scene)
- Active dot fills electric blue with glow
- Clicking a dot smooth-scrolls to that section

**CustomCursor** (`src/components/CustomCursor.tsx`) — Enhanced
- Existing dot + ring preserved
- Magnetic snap: buttons/links exert attraction within 80px radius
- Force: `delta = targetPos - cursorPos; attraction = delta * 0.35`
- Applied via `requestAnimationFrame` loop, not React state (no re-renders)
- Trailing ring lags 6 frames behind dot for depth effect

**LiteModeToggle** (`src/components/LiteModeToggle.tsx`)
- Bottom-left corner, small icon button
- Disables: all Three.js scenes (canvas hidden), GSAP ScrollTrigger animations, Framer Motion `transition` durations set to 0
- Respects `prefers-reduced-motion` media query automatically on mount
- State persisted in `localStorage`

**Navigation** (`src/components/Navigation.tsx`) — Enhanced
- `backdrop-blur-xl bg-white/5 border-b border-white/8` on scroll (currently opaque)
- Transforms from transparent → glassmorphism after 80px scroll
- Mobile: radial menu bursting from bottom-center FAB button
- Active section highlighted via `activeSection` from store

---

## Section Designs

### Section 1: Hero — "The Entrance"

**Canvas Objects**
- Neural sphere: `THREE.SphereGeometry(2.5, 32, 32)` wireframe, ~80 nodes on surface via Fibonacci distribution
- Nodes: `THREE.IcosahedronGeometry(0.06)` with emissive ShaderMaterial
- Connections: `THREE.LineSegments` connecting nodes within distance threshold, opacity pulsed by `sin(uTime)`
- Sphere breathes: scale `1.0 → 1.08` on 4s loop via `uBreath` uniform
- Data stream `<Text>` labels (drei): `$500K+ TX`, `99% uptime`, `sub-200ms` — orbit at radii 3.5–5.0, different speeds
- Particle field: 1500 `THREE.Points`, single `BufferGeometry`
  - Load animation: random positions → sphere cloud (GSAP, 1.8s, ease: power2.out)
  - Scatter on scroll: radial velocity outward over 60vh of scroll progress

**Mouse Parallax**
- `useFrame` reads `mouseXY` from store
- Sphere group: `rotation.x/y` lerped toward `mouseXY * 0.15` at factor 0.05/frame

**HTML Layer**
- Status badge: `opacity: 0→1, y: 10→0`, delay 0ms
- Name letters: staggered `y: 40→0, opacity: 0→1`, 40ms per letter
- Name CSS extrude: layered `text-shadow` in `#00D4FF` and `#7B2FBE`
- Headline, bio, metrics, CTAs: sequential stagger, 80ms apart
- All animations via Framer Motion `variants` + `staggerChildren`

**Scroll Pin Behavior**
- ScrollTrigger pins Hero for 150vh
- 0–50vh: sphere drifts right, particle opacity holds
- 50–120vh: particles scatter forward (Z+), `uScatter` uniform drives displacement
- 120–150vh: `camera.fov` widens 60→75 via uniform, vignette darkens
- 150vh: pin releases, FintechProjects slides up

---

### Section 2: FintechProjects — "The Impact"

**Canvas Objects**
- Neural sphere shrinks (`scale → 0.3`) and drifts top-left over 40vh
- 6–8 `THREE.PlaneGeometry(1, 1.4)` cards: loose 3D cluster, auto-rotate on Y
- Cards fade in on section enter, fade out before Projects section

**HTML Layer**
- Three stat cards: `$500K+/mo`, `99%`, `sub-200ms`
- `backdrop-blur-xl bg-white/5 border border-white/10`
- Numbers count up on viewport entry via `useCountUp` hook
- Marquee strip of impact pills: `"50+ enterprise clients"`, `"10K+ daily eKYC"`, `"30 hrs/week saved"` — CSS `animation: marquee 20s linear infinite`
- Full existing FintechProjects content preserved below stats

---

### Section 3: Projects — "The Work"

**Canvas Objects**
- `THREE.TorusGeometry(3, 0.02, 8, 80)` wireframe ring, electric blue, `opacity: 0.15`
- Ring pulses (scale spike) on each carousel card change
- Fades out 40vh before Skills section

**CoverFlow Carousel (HTML)**
- Container: `perspective: 1200px; transform-style: preserve-3d`
- 6 cards, transforms by distance from active index:
  - `active`: `translateZ(0) rotateY(0) scale(1)` — full opacity, glowing border
  - `±1`: `translateX(±280px) translateZ(-120px) rotateY(∓25deg) scale(0.88) opacity(0.6) blur(2px)`
  - `±2`: `translateX(±480px) translateZ(-240px) rotateY(∓40deg) scale(0.72) opacity(0.3) blur(6px)`
- Framer Motion spring: `stiffness: 300, damping: 30`
- ScrollTrigger pins section for `projects.length × 80vh`; each 80vh unit advances carousel index

**Card Book-Open Animation**
- Active card hover: right half rotates `rotateY: 0 → -180deg` (Framer Motion)
- Front face: project screenshot
- Back face: tech badges + Live/GitHub links
- `backfaceVisibility: hidden` on both faces
- `transformStyle: preserve-3d` on card

**Navigation**
- Left/right arrow buttons
- Keyboard `←` `→`
- Touch swipe (pointer events)
- Dot indicators below, active dot glows

---

### Section 4: Skills — "The Arsenal"

**Canvas Objects**
- `THREE.Points` field: ~400 particles in flat plane behind section
- `THREE.LineSegments` connecting nearby particles, `opacity: 0.08`
- Vertex shader: `sin(uTime * 0.5 + position.x * 0.3) * uWave` — wave distortion
- On HTML skill chip hover: nearest canvas particle cluster `uHighlight` uniform brightens for 0.5s

**Category Filter Strip (HTML)**
- Pills: `[ All ] [ Languages ] [ Frontend ] [ Backend ] [ Databases ] [ DevOps ] [ Tools ]`
- Active pill: electric blue glow + underline
- Filter change: non-matching chips `scale: 0.85, opacity: 0.3` via Framer Motion `layout`

**Skill Grid (HTML)**
- Categories as labeled sections (`cat-label` in electric blue / purple alternating)
- Each chip: `64×64px, backdrop-blur-xl, bg-white/5, border border-white/10, rounded-xl`
- Tech icon (react-icons) + name below
- Hover: `translateY(-6px)`, brand-color glow, tooltip card above with proficiency bar + years
- SVG connecting lines between related chips: `stroke-dashoffset` animated on scroll-in

**Entrance**
- Chips enter row by row: `y: 30→0, opacity: 0→1`, 40ms stagger per chip
- Triggered by `IntersectionObserver` per row
- Total entrance: ~1.2s

---

### Section 5: Timeline/About — "The Story"

**Canvas Objects**
- `THREE.TubeGeometry` along `THREE.CatmullRomCurve3` (5 control points, gentle S-curve)
- Tube: wireframe, electric blue emissive, `opacity: 0.4`
- Traveller sphere: `THREE.SphereGeometry(0.12)` — glowing gold, follows `curve.getPointAt(scrollProgress)`
- Node gems: `THREE.IcosahedronGeometry(0.15)` at each curve waypoint, pulse via `uTime` shader
- On traveller reaching node: `THREE.Points` burst (30 particles, scatter + fade 0.6s)

**Profile Card Flip (HTML)**
- Dimensions: `400×280px`, centered above timeline
- Front: profile photo + name/headline overlay
- Back: stats grid (`3+ years`, `2 companies`, `10+ projects`, `CGPA 8.7`)
- Auto-flips after 3s on mount; toggles on click/hover
- Framer Motion `rotateY: 0→180`, `backfaceVisibility: hidden`

**Timeline Cards (HTML)**
- Alternating left/right layout preserved
- Redesigned: `bg-white/4 backdrop-blur-xl border border-white/8`
- Active card (traveller reached): border → electric blue, neon left-strip, `text-shadow` glow
- Entrance: slides in from side, `x: ±60→0, opacity: 0→1`
- Impact metrics count up: "80% → 99%", character-by-character typewriter for text stats
- SVG timeline line: `stroke-dashoffset` driven by `ScrollTrigger scrub: true`, `drop-shadow(0 0 6px #00D4FF)`
- Hexagon markers at each node position, pulse animation

---

### Section 6: CodingProfiles — "The Proof"

**Canvas Objects**
- One `THREE.OctahedronGeometry(0.2)` gem per platform (LeetCode, GitHub, CodeChef, etc.)
- Each gem: platform brand color emissive material, slow multi-axis rotation
- Drift: sine wave position offset per gem, unique phase per gem
- Fade in on section enter, persist through section

**HTML Layout**
- Two-column grid: Achievement Highlight (left) + Platform Cards (right)

**Achievement Highlight Card**
- LeetCode Knight badge (large, gold glow `box-shadow`)
- Radial SVG progress ring: animated `stroke-dashoffset` on scroll-in
- "Top X% globally" stat — value sourced from existing CodingProfiles data (runtime, not hardcoded)
- `box-shadow` breathing animation in gold

**Platform Stat Cards**
- `backdrop-blur-xl bg-white/5`
- Primary metric large + secondary stats small
- Hover: platform-colored glow, "View Profile →" slides in from below
- All numbers count up on viewport entry

**Entrance**
- Cards cascade in top-left → bottom-right snake pattern
- Each: `y: 40→0, opacity: 0→1, scale: 0.95→1` spring animation
- Radial rings start drawing 0.3s after card appears

---

### Section 7: TechnicalArchitecture — "The Blueprint"

**Canvas Objects**
- 3D node graph: `THREE.SphereGeometry(0.15)` per architecture component
- Components: API Gateway, Redis, PostgreSQL, Auth Service, Rule Engine, eKYC, Video Pipeline
- Positioned in 3D hierarchy (frontend top, databases bottom, services middle)
- `THREE.LineSegments` connections drawn progressively on scroll-in
- Auto-rotate on Y: `0.003 rad/frame`
- On HTML card hover: corresponding node `emissiveIntensity` spikes, connecting lines pulse

**HTML Layer**
- Section header: "System Architecture"
- Horizontal scrollable strip of Architecture Diagram Cards (one per major system)
- Each card `280×320px`, frosted glass
- SVG architecture diagram fills top 70% (boxes, arrows, color-coded layers)
- Tech stack badges fill bottom 30%
- Hover: 3D tilt following cursor (`rotateX: ±5, rotateY: ±8`), corresponding canvas node brightens
- Systems covered: Payment Gateway Stack, eKYC Pipeline, Rule Engine, Video Generation Service

**Entrance**
- Canvas node graph drops from above (`y: -40→0` via uniform)
- HTML strip slides up from below
- Both meet center simultaneously as section enters

---

### Section 8: Contact — "The Call to Action"

**Canvas Objects**
- `THREE.IcosahedronGeometry(2, 2)` (~80 faces) with custom ShaderMaterial
- Vertex shader displaces faces: `position += normal * sin(uTime + position.x) * 0.15`
- Color interpolates blue → purple on 6s loop via `mix(uColorA, uColorB, sin(uTime * 0.5) * 0.5 + 0.5)`
- `opacity: 0.6`, positioned center-right
- `THREE.RingGeometry(3.5, 3.6, 64)` orbiting on Y-axis, 12s period
- Both fade in on section enter

**Headline (HTML)**
- "Let's Build Something." — Space Grotesk, bold, `clamp(48px, 8vw, 96px)`
- "Something." typewriter: characters appear 80ms apart
- Cursor blink after completion (500ms on/off, 3 cycles then stops)
- Glitch effect every 8s: `transform: skewX(2deg)` + `clip-path` flicker, 200ms total

**Contact Form (HTML)**
- Existing EmailJS integration fully preserved (service ID, template ID, public key, field names)
- Visual: `backdrop-blur-3xl bg-white/4 border border-white/8 rounded-3xl`
- 3D tilt on mouse move (same pattern as project cards, `perspective: 1000px`)
- Input fields: `bg-white/5 border-white/10`, focus → electric blue glow
- Submit button ripple: Canvas2D overlay (separate `<canvas>` element, not WebGL), 20 particles on click, 0.4s fade

**Social Icon Cubes (HTML)**
- CSS 3D cube per social link (`transform-style: preserve-3d`)
- Front face: icon, top face: platform name
- Hover: `rotateX(-90deg)` reveals name face (Framer Motion)
- Magnetic cursor attraction within 60px radius

**Left Column**
- Existing email/phone/location cards preserved, upgraded to glass aesthetic
- Resume download button preserved with shimmer animation

---

## Performance & Accessibility

### Performance
- All Three.js imports lazy-loaded via `React.Suspense`
- `THREE.BufferGeometry` used everywhere (no legacy Geometry)
- Instanced meshes for repeated objects (particles, node gems)
- `useFrame` delta-based animations (frame-rate independent)
- Canvas `frameloop="always"` — single persistent canvas has continuous animations (breathing sphere, wave shader) at all times; `demand` is incompatible with this architecture
- GSAP ScrollTrigger `invalidateOnRefresh: true` for resize handling

### Accessibility
- All canvas elements: `aria-hidden="true"` on the `<Canvas>` wrapper
- All content has HTML text equivalents (canvas is purely decorative)
- `prefers-reduced-motion`: LiteModeToggle auto-activates, canvas hidden, all transitions `duration: 0`
- Keyboard navigation: CoverFlow carousel responds to `←` `→`, tab order preserved
- `aria-live="polite"` on carousel for screen reader announcements

---

## File Structure (new files)

```
src/
  components/
    three/
      SceneCanvas.tsx          # Single persistent <Canvas>
      HeroScene.tsx            # Hero neural sphere + particles
      FintechScene.tsx         # Floating plane cards
      ProjectsScene.tsx        # Torus ring
      SkillsScene.tsx          # Particle plane + wave shader
      TimelineScene.tsx        # Tube path + traveller
      CodingScene.tsx          # Octahedron gems
      ArchitectureScene.tsx    # Node graph
      ContactScene.tsx         # Morphing icosahedron + ring
    ScrollProgressIndicator.tsx
    LiteModeToggle.tsx
  providers/
    LenisProvider.tsx
  stores/
    sceneStore.ts              # Zustand: activeSection, scrollProgress, mouseXY, isLiteMode
  hooks/
    useCountUp.ts
    useScrollProgress.ts
    useMagneticCursor.ts
```

---

## Implementation Order

1. Install packages + configure Lenis + ScrollTrigger plumbing
2. Add color tokens + Space Grotesk font
3. `SceneCanvas` + `sceneStore` skeleton
4. Hero scene (neural sphere + particles) — biggest impact
5. Hero HTML animations (letter stagger, counters)
6. Scroll pin + camera fly-through transition out of Hero
7. Projects CoverFlow carousel
8. Skills neural net + chip grid
9. Timeline tube + traveller + card flip
10. FintechProjects stat counters + marquee
11. CodingProfiles radial rings + counters
12. TechnicalArchitecture node graph
13. Contact morphing icosahedron + typewriter
14. CustomCursor magnetic enhancement
15. Navigation glassmorphism + radial mobile menu
16. ScrollProgressIndicator
17. LiteModeToggle + reduced-motion support
18. Performance audit + instanced mesh pass
