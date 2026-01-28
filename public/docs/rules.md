# Vibe Base - AI Coding Rules

You are an advanced AI Engineer working in the "Vibe Base" architecture. This document defines the strict coding standards, aesthetic preferences, and architectural patterns you must follow.

## 1. Core Tech Stack (Immutable)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React (Primary), Carbon Icons (Data/Industrial)
- **Fonts**: Geist Sans (UI), Geist Mono (Code/Data)
- **AI**: Google Generative AI (Gemini)

## 2. Aesthetic & Design Philosophy ("The Vibe")
- **Premium Utility**: The UI should feel like a high-end tool. Dense but breathable, functional but beautiful.
- **Micro-Interactions**: Use `framer-motion` for subtle hover states, page transitions, and list entry animations. Static UIs are forbidden.
- **Glassmorphism**: Use `backdrop-blur-sm` and `bg-background/80` for overlays and sticky headers.
- **Typography**:
  - Use `font-sans` for general UI.
  - Use `font-mono` and `tracking-tight` for data points, IDs, timestamps, and metrics.
  - HEADERS: Use `font-bold tracking-tight text-foreground`.
  - SUBTEXT: Use `text-muted-foreground text-sm`.

## 3. Coding Standards

### Components
- **Functional**: Use React Functional Components with named exports.
- **Typing**: Define explicit interfaces for all props. Avoid `any`.
- **Composition**: Break complex UIs into smaller, single-responsibility components in `components/ui` or feature folders.
- **Client vs Server**: Default to Server Components. Use `"use client"` only when interactivity (hooks, event listeners) is strictly required.

### Tailwind Usage
- **Utility First**: Use standard Tailwind classes.
- **CN Helper**: Always use the `cn()` utility for conditional class merging.
  ```tsx
  <div className={cn("p-4 rounded-lg", isActive && "bg-primary text-primary-foreground")}>
  ```
- **Colors**: Use semantic colors (`bg-background`, `text-foreground`, `border-border`) to ensure automatic Light/Dark mode compatibility. Do NOT use hardcoded colors like `bg-white` or `text-black` unless absolutely necessary.

### AI Integration
- **Lib Pattern**: Keep AI logic in `lib/gemini.ts` or specific `lib/intelligence/` modules.
- **Streaming**: Prefer streaming responses for long-running AI tasks to improve perceived latency.
- **Robustness**: Always wrap AI calls in try/catch blocks and handle parsing errors gracefully (LLMs output malformed JSON).

## 4. Theme & Layout
- **Default**: Light Mode is the default for development.
- **Toggle**: Use the custom 3-state toggle (System/Light/Dark) in the navbar.
- **Responsiveness**: Mobile-first is good, but Desktop-first is acceptable for heavy dashboard apps. Ensure no horizontal scrolling.

## 5. File Structure
- `app/`: Routes and Pages (App Router).
- `components/ui/`: Reusable, generic UI primitives (Buttons, Cards).
- `components/`: Feature-specific components.
- `lib/`: Utilities, helpers, and business/AI logic.
- `public/`: Static assets.

## 6. Implementation Workflow
1.  **Analyze**: Understand the requirement.
2.  **Plan**: Draft a mental or written list of changes.
3.  **Scaffold**: Create files and types.
4.  **Implement**: Write logic and UI.
5.  **Refine**: Add animations, fix padding, ensure "The Vibe" is present.
6.  **Verify**: Check build and strictly verify Light/Dark mode appearance.
