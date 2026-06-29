# Typography System

## 1. Typefaces

- **Display & Headings**: Inter
- **Body & UI**: Inter
- **Monospace/Code**: JetBrains Mono

## 2. Scale & Line Heights

Based on a base size of 16px, ratio of 1.250.

| Level      | Size (px) | Line Height | Weight         | Tracking | Usage           |
| ---------- | --------- | ----------- | -------------- | -------- | --------------- |
| Display 1  | 48px      | 1.1         | 700 (Bold)     | -0.02em  | Hero headers    |
| Display 2  | 39px      | 1.15        | 700 (Bold)     | -0.01em  | Section headers |
| Heading 1  | 31px      | 1.2         | 600 (Semibold) | 0em      | Page titles     |
| Heading 2  | 25px      | 1.25        | 600 (Semibold) | 0em      | Content titles  |
| Heading 3  | 20px      | 1.3         | 600 (Semibold) | 0em      | Subtitles       |
| Body Large | 18px      | 1.5         | 400 (Regular)  | 0em      | Intro text      |
| Body Base  | 16px      | 1.5         | 400 (Regular)  | 0em      | Paragraphs      |
| Caption    | 12px      | 1.4         | 500 (Medium)   | +0.02em  | Badges, tags    |
| Code Base  | 14px      | 1.6         | 400 (Regular)  | 0em      | Code blocks     |
| Code Small | 12px      | 1.5         | 400 (Regular)  | 0em      | Inline code     |

## 3. Responsive Scaling

- Below 768px (Mobile), Display 1 scales down to 36px, and Display 2 to 30px. Body remains at 16px to preserve readability.
- Fluid typography clamp functions are used for Display classes.
