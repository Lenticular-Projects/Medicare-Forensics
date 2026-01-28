# Project Rules

## Design System & UI
1.  **Iconography**:
    *   **STRICTLY** use `@carbon/icons-react` for all icons.
    *   **FORBIDDEN**: Do NOT use `lucide-react`, `heroicons`, or any other icon library.
    *   If a specific icon is needed, find the closest Carbon equivalent.

2.  **Styling**:
    *   Use Tailwind CSS for styling.
    *   Follow the "Industrial Utility" aesthetic:
        *   Hard edges (no rounded corners unless specified).
        *   High contrast (Black/White/Gray).
        *   Monospace fonts for data.

## Code Quality
1.  **Type Safety**:
    *   Maintain strict TypeScript types.
    *   Shared types should live in `app/types/`.

2.  **API & Backend**:
    *   Use `gemini-2.5-pro` (or latest working model) for AI logic.
    *   Ensure JSON output from AI is strictly parsed and validated.
