# Awesome API Skills: Visual Design System

This document defines the strict geometric, typographic, and color constraints for all visual assets (SVG, README, websites, docs) across the Awesome API Skills ecosystem.

The aesthetic is inspired by Vercel, Linear, and shadcn/ui. It must evoke trust, precision, and modern developer tooling.

## 1. Grid & Spacing System

All visuals strictly adhere to an 8px base grid system.

- **Base Unit (`--spacing-1`)**: `8px`
- **Micro (`--spacing-0.5`)**: `4px`
- **Small (`--spacing-2`)**: `16px`
- **Medium (`--spacing-4`)**: `32px`
- **Large (`--spacing-8`)**: `64px`
- **Hero/Macro (`--spacing-16`)**: `128px`

### Invisible Grid (Backgrounds)

- Grid pattern lines must be exactly `1px` wide.
- Grid stroke color: `rgba(255, 255, 255, 0.04)` on dark backgrounds.
- Grid spacing: `32px` intervals.

## 2. Typography Scale

We use standard sans-serif system fonts (Inter, SF Pro Display, Segoe UI) to look native and hyper-fast.

- **Font Family**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Tracking (Letter Spacing)**: Tighter on large text (`-0.03em`), looser on uppercase micro-copy (`0.05em`).
- **Scale**:
  - `Hero`: `64px`, Weight: `800` (ExtraBold), Line Height: `1.1`
  - `H1`: `48px`, Weight: `700` (Bold), Line Height: `1.2`
  - `H2`: `32px`, Weight: `600` (SemiBold), Line Height: `1.3`
  - `H3`: `24px`, Weight: `500` (Medium), Line Height: `1.4`
  - `Body`: `16px`, Weight: `400` (Regular), Line Height: `1.6`
  - `Micro / Code`: `13px`, Weight: `500`, Line Height: `1.5`, Font: `JetBrains Mono, Menlo, monospace`

## 3. Color Palette (Dark-First)

The brand is almost entirely monochrome. Color is used exclusively to draw attention to primary actions or success states.

- **Background (Canvas)**: `#0A0A0A` (Near Black)
- **Background (Surface/Card)**: `#111111`
- **Border/Stroke (Subtle)**: `#222222`
- **Border/Stroke (Strong)**: `#333333`
- **Text (Primary)**: `#FAFAFA`
- **Text (Secondary/Muted)**: `#888888`
- **Accent (Primary)**: `#E2E8F0` (Vercel-like sharp white/silver) or `#3B82F6` (Electric Blue for active/success highlights). We will stick to monochromatic + very subtle cyan/blue accents `#0070F3`.

## 4. UI Elements & Geometry

### Corner Radius

- Sharp and technical. Avoid overly rounded "pill" shapes.
- **Inner elements (buttons, badges)**: `4px` or `6px`
- **Outer elements (cards, windows, terminals)**: `8px` or `12px`

### Stroke Width

- **Delicate / Structural**: `1px` (for grids, subtle borders, inactive connections)
- **Standard**: `2px` (for icons, active connections)
- **Bold**: `4px` (for primary pipeline arrows)

### Logo Spacing

- The logo is a simple geometric glyph.
- **Clearance**: The logo must always have a clearance area equal to 50% of its own width.

## 5. Terminal & Code Aesthetics

Whenever displaying a terminal or code block (in SVGs or screenshots):

- **Window Frame**: `1px` solid border (`#2A2A2A`), Background (`#050505`), Radius (`8px`).
- **Header Bar**: Height `32px`, Top Border Bottom `1px solid #1A1A1A`. Three mac-OS style dots on the left (Radius `50%`, Size `10px`, spacing `6px`).
- **Dots Colors**: `#333` (subtle gray to avoid distraction).
- **Prompt**: Standard `$` or `>` in subtle color (`#666`), followed by crisp white text.
- **Success Markers**: `[✓]` or ✅ in `#10B981` (Emerald).
- **Error Markers**: `[x]` or ❌ in `#EF4444` (Red).

## 6. Layout & Composition

- **Max Whitespace**: The canvas must breathe. Never crowd elements.
- **Centering**: Hero elements are strictly center-aligned.
- **Alignment**: Left-align text inside cards or terminal windows.
- **Visual Rhythm**: Alternate text and visual blocks. Never two long walls of text.

## Execution Checklist for Images

1. Does it use `#0A0A0A` background?
2. Are strokes `1px` `#222222`?
3. Is typography Inter/system-ui with tight tracking?
4. Is it minimal, avoiding blobs, glows, or unnecessary gradients?
5. Does it immediately convey technical excellence?
