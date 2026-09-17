# Theme toggle

## Build
- Add a compact sun/moon toggle to the navigation on desktop and mobile.
- Apply the selected theme to the whole site and save the choice for future visits.
- Use the device preference on the first visit and prevent a mismatched theme while the page loads.
- Add a complete light palette while preserving the existing dark graphite-lime design.

## Verification
- Confirm the toggle changes the visible theme, survives a reload, works on mobile, and introduces no page overflow or console errors.

## Technical details
- Manage the `dark` class on the document root with a small reusable React theme control.
- Keep all colors mapped through the existing semantic design tokens.
