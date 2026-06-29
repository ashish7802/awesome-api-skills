const fs = require('fs');

const colorTokens = {
  colors: {
    primary: {
      hex: '#00F0FF',
      rgb: 'rgb(0, 240, 255)',
      hsl: 'hsl(183, 100%, 50%)',
    },
    secondary: {
      hex: '#FF3366',
      rgb: 'rgb(255, 51, 102)',
      hsl: 'hsl(345, 100%, 60%)',
    },
    neutral: {
      100: '#FFFFFF',
      200: '#EAEAEA',
      300: '#A0A0A0',
      400: '#666666',
      500: '#333333',
      600: '#1A1A1A',
      700: '#111111',
      800: '#0A0A0A',
      900: '#000000',
    },
    semantic: {
      success: '#00E59B',
      warning: '#FFB800',
      danger: '#FF3B30',
      info: '#0088FF',
    },
    theme: {
      dark: {
        background: '{colors.neutral.900}',
        surface: '{colors.neutral.800}',
        border: '{colors.neutral.600}',
        text_primary: '{colors.neutral.100}',
        text_secondary: '{colors.neutral.300}',
      },
      light: {
        background: '{colors.neutral.100}',
        surface: '{colors.neutral.200}',
        border: '{colors.neutral.300}',
        text_primary: '{colors.neutral.900}',
        text_secondary: '{colors.neutral.500}',
      },
    },
  },
};
fs.writeFileSync('.design/COLOR_TOKENS.json', JSON.stringify(colorTokens, null, 2));

const designTokens = {
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
    9: '96px',
  },
  radii: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  grid: {
    columns: 12,
    gutter: '24px',
    margin: '32px',
    maxWidth: '1280px',
  },
};
fs.writeFileSync('.design/DESIGN_TOKENS.json', JSON.stringify(designTokens, null, 2));

const typography = `# Typography System

## 1. Typefaces
- **Display & Headings**: Inter
- **Body & UI**: Inter
- **Monospace/Code**: JetBrains Mono

## 2. Scale & Line Heights
Based on a base size of 16px, ratio of 1.250.

| Level | Size (px) | Line Height | Weight | Tracking | Usage |
| ----- | --------- | ----------- | ------ | -------- | ----- |
| Display 1 | 48px | 1.1 | 700 (Bold) | -0.02em | Hero headers |
| Display 2 | 39px | 1.15 | 700 (Bold) | -0.01em | Section headers |
| Heading 1 | 31px | 1.2 | 600 (Semibold)| 0em | Page titles |
| Heading 2 | 25px | 1.25 | 600 (Semibold)| 0em | Content titles |
| Heading 3 | 20px | 1.3 | 600 (Semibold)| 0em | Subtitles |
| Body Large | 18px | 1.5 | 400 (Regular) | 0em | Intro text |
| Body Base | 16px | 1.5 | 400 (Regular) | 0em | Paragraphs |
| Caption | 12px | 1.4 | 500 (Medium) | +0.02em | Badges, tags |
| Code Base | 14px | 1.6 | 400 (Regular) | 0em | Code blocks |
| Code Small | 12px | 1.5 | 400 (Regular) | 0em | Inline code |

## 3. Responsive Scaling
- Below 768px (Mobile), Display 1 scales down to 36px, and Display 2 to 30px. Body remains at 16px to preserve readability.
- Fluid typography clamp functions are used for Display classes.
`;
fs.writeFileSync('.design/TYPOGRAPHY.md', typography);

const componentGuidelines = `# Component Guidelines

## Buttons
- **Primary**: Solid background (Primary Color), Text Neutral 900. No border radius (0px) or tight (4px). Hover: Brighten by 10%.
- **Secondary**: Transparent background, 1px solid Border (Neutral 600), Text Primary. Hover: Background Neutral 800.
- **Padding**: Horizontal 16px, Vertical 8px.

## Cards
- **Background**: Surface (Neutral 800).
- **Border**: 1px solid Border (Neutral 600).
- **Radius**: md (4px).
- **Padding**: 24px.
- **Hover State**: Border shifts to Primary Color. Subtle Y-axis translation (-2px).

## Navigation
- **Height**: 64px.
- **Background**: Solid Background (Neutral 900).
- **Border**: 1px solid Border (Neutral 600) strictly on the bottom edge.

## Search
- **Icon**: Minimal magnifying glass, 1.5px stroke weight.
- **Input**: Background Surface, Border Neutral 600. Focus: Border Primary, Box Shadow 0 0 0 2px rgba(0, 240, 255, 0.2).

## Code Blocks
- **Background**: Neutral 800 (Surface).
- **Text**: Code Base, JetBrains Mono.
- **Syntax Highlighting**: Custom minimal theme using only Primary, Secondary, Neutral 300, and Success colors.
- **Radius**: md (4px).
- **Header**: Contains language label (Caption) and Copy button on hover.

## Badges
- **Shape**: Pill (Radius full).
- **Padding**: Horizontal 8px, Vertical 2px.
- **Text**: Caption, uppercase.

## Alerts
- **Borders**: Left-accented thick border (4px) in semantic color (Success/Warning/Danger/Info).
- **Background**: 10% opacity of the semantic color.
- **Icon**: Placed on the left.
`;
fs.writeFileSync('.design/COMPONENT_GUIDELINES.md', componentGuidelines);

const motionGuidelines = `# Motion Guidelines

## 1. Principles
- **Functional**: Motion should only exist to provide feedback, direct attention, or clarify state changes. No superfluous bouncing or decorative animations.
- **Fast**: Developer tools feel sluggish if animations exceed 200ms.
- **Snappy Easing**: Prefer deceleration (ease-out) for incoming elements and acceleration (ease-in) for outgoing elements.

## 2. Timings & Durations
- \`duration-instant\`: 50ms (Hover states, button active states)
- \`duration-fast\`: 150ms (Dropdowns, modals appearing)
- \`duration-normal\`: 250ms (Page transitions, structural layout changes)
- \`duration-slow\`: 400ms (Toasts fading out)

## 3. Easing Functions
- \`ease-default\`: \`cubic-bezier(0.25, 1, 0.5, 1)\`
- \`ease-in\`: \`cubic-bezier(0.4, 0, 1, 1)\`
- \`ease-out\`: \`cubic-bezier(0, 0, 0.2, 1)\`
- \`ease-in-out\`: \`cubic-bezier(0.4, 0, 0.2, 1)\`

## 4. Specific Interactions
- **Hover States**: Color transitions use \`duration-instant\` + \`ease-default\`.
- **Command Execution Feedback**: When copying code or triggering a CLI command, use a \`duration-fast\` scale up (1.05x) and immediate return.
- **Page Transitions**: Simple 10px upward slide combined with a 0% to 100% opacity fade over \`duration-normal\`.

## 5. Reduced Motion
- All animations must respect \`@media (prefers-reduced-motion: reduce)\`.
- When reduced motion is active, \`transition-duration\` forces to \`0ms\` globally.
`;
fs.writeFileSync('.design/MOTION_GUIDELINES.md', motionGuidelines);

const assetSpecifications = `# Asset Specifications

Do not generate raster images. This document serves as the exact specification for future image generation or manual design via Figma.

## 1. GitHub Avatar / App Icon
- **Dimensions**: 512x512 pixels
- **Format**: PNG / SVG
- **Safe Area**: Center 60% of the canvas.
- **Background**: Solid \`#000000\` (Dark Theme) or \`#FFFFFF\` (Light Theme).
- **Content**: The Interface Prism logo, vertically and horizontally centered.

## 2. Repository Banner
- **Dimensions**: 1280x640 pixels
- **Format**: SVG / PNG
- **Content**:
  - Background: \`#000000\`.
  - Graphic: The Interface Prism logo, positioned at \`X: 50%, Y: 40%\`.
  - Typography: "Awesome API Skills" in Inter Display 1, positioned at \`X: 50%, Y: 75%\`.
  - Grid: Subtle 24px isometric grid lines (opacity 5%) spanning the background to communicate structure.

## 3. Website Hero Background
- **Dimensions**: Scalable Vector Graphic (SVG).
- **Concept**: A stark, ultra-minimalist grid pattern intersecting with sharp diagonal cuts (30/60 degree angles). No gradients, no glows. Just 1px pure geometric lines.

## 4. OpenGraph / Social Preview Image
- **Dimensions**: 1200x630 pixels
- **Format**: PNG
- **Composition**:
  - Left (40%): Solid \`#000000\` background. Logo (120x120px) positioned top-left. Bold typography: "The Open Ecosystem for AI API Skills."
  - Right (60%): A stylized, high-contrast code snippet rendered in JetBrains Mono against a \`#111111\` background, showcasing a CLI command or JSON validation schema.

## 5. Favicon
- **Dimensions**: 16x16, 32x32, 64x64 (.ico / .svg)
- **Concept**: The absolute minimal distillation of the Interface Prism. A single locking joint.

## Accessibility Notes
All assets incorporating text must ensure a minimum contrast ratio of 4.5:1 against their backgrounds to satisfy WCAG AA standards.
`;
fs.writeFileSync('.design/ASSET_SPECIFICATIONS.md', assetSpecifications);
