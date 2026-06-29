# Asset Specifications

Do not generate raster images. This document serves as the exact specification for future image generation or manual design via Figma.

## 1. GitHub Avatar / App Icon

- **Dimensions**: 512x512 pixels
- **Format**: PNG / SVG
- **Safe Area**: Center 60% of the canvas.
- **Background**: Solid `#000000` (Dark Theme) or `#FFFFFF` (Light Theme).
- **Content**: The Interface Prism logo, vertically and horizontally centered.

## 2. Repository Banner

- **Dimensions**: 1280x640 pixels
- **Format**: SVG / PNG
- **Content**:
  - Background: `#000000`.
  - Graphic: The Interface Prism logo, positioned at `X: 50%, Y: 40%`.
  - Typography: "Awesome API Skills" in Inter Display 1, positioned at `X: 50%, Y: 75%`.
  - Grid: Subtle 24px isometric grid lines (opacity 5%) spanning the background to communicate structure.

## 3. Website Hero Background

- **Dimensions**: Scalable Vector Graphic (SVG).
- **Concept**: A stark, ultra-minimalist grid pattern intersecting with sharp diagonal cuts (30/60 degree angles). No gradients, no glows. Just 1px pure geometric lines.

## 4. OpenGraph / Social Preview Image

- **Dimensions**: 1200x630 pixels
- **Format**: PNG
- **Composition**:
  - Left (40%): Solid `#000000` background. Logo (120x120px) positioned top-left. Bold typography: "The Open Ecosystem for AI API Skills."
  - Right (60%): A stylized, high-contrast code snippet rendered in JetBrains Mono against a `#111111` background, showcasing a CLI command or JSON validation schema.

## 5. Favicon

- **Dimensions**: 16x16, 32x32, 64x64 (.ico / .svg)
- **Concept**: The absolute minimal distillation of the Interface Prism. A single locking joint.

## Accessibility Notes

All assets incorporating text must ensure a minimum contrast ratio of 4.5:1 against their backgrounds to satisfy WCAG AA standards.
