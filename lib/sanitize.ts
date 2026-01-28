/**
 * Sanitizes raw input text from Sunfire or other sources.
 * - Replaces tabs with pipes for clear column separation
 * - Collapses excessive newlines
 * - Trims trailing whitespace
 */
export function sanitizeInput(raw: string): string {
    return raw
        .replace(/\t/g, ' | ')         // Convert tabs to delimiters
        .replace(/\n{3,}/g, '\n\n')    // Collapse excessive newlines
        .replace(/[ \t]+\n/g, '\n');   // Trim trailing whitespace
}
