# Motion Guidelines

## 1. Principles

- **Functional**: Motion should only exist to provide feedback, direct attention, or clarify state changes. No superfluous bouncing or decorative animations.
- **Fast**: Developer tools feel sluggish if animations exceed 200ms.
- **Snappy Easing**: Prefer deceleration (ease-out) for incoming elements and acceleration (ease-in) for outgoing elements.

## 2. Timings & Durations

- `duration-instant`: 50ms (Hover states, button active states)
- `duration-fast`: 150ms (Dropdowns, modals appearing)
- `duration-normal`: 250ms (Page transitions, structural layout changes)
- `duration-slow`: 400ms (Toasts fading out)

## 3. Easing Functions

- `ease-default`: `cubic-bezier(0.25, 1, 0.5, 1)`
- `ease-in`: `cubic-bezier(0.4, 0, 1, 1)`
- `ease-out`: `cubic-bezier(0, 0, 0.2, 1)`
- `ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`

## 4. Specific Interactions

- **Hover States**: Color transitions use `duration-instant` + `ease-default`.
- **Command Execution Feedback**: When copying code or triggering a CLI command, use a `duration-fast` scale up (1.05x) and immediate return.
- **Page Transitions**: Simple 10px upward slide combined with a 0% to 100% opacity fade over `duration-normal`.

## 5. Reduced Motion

- All animations must respect `@media (prefers-reduced-motion: reduce)`.
- When reduced motion is active, `transition-duration` forces to `0ms` globally.
