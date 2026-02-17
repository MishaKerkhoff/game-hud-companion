

# Fix Text Readability -- Dark Text on Light Background

## Problem
The main text color (`--foreground`) is still the light beige `#D8D2C2`, which is nearly invisible on the light `#F5F7FA` background and beige `#D8D2C2` card panels.

## Change

**File: `src/index.css`** -- Update these CSS variables:

| Variable | Current (HSL) | New (HSL) | Reason |
|----------|--------------|-----------|--------|
| `--foreground` | `40 18% 82%` (light beige) | `60 14% 8%` (#181812) | Main body text |
| `--popover-foreground` | `40 18% 82%` | `60 14% 8%` | Popover text |
| `--secondary-foreground` | `40 18% 82%` | `60 14% 8%` | Secondary element text |
| `--destructive-foreground` | `40 18% 82%` | `60 14% 8%` | Destructive button text |
| `--muted-foreground` | `42 8% 50%` | `42 8% 40%` | Slightly darker for better contrast |

**Not changed** (stays yellow/amber):
- `--primary` remains `30 100% 64%` (Phosphor Amber) -- all yellow text using `text-primary` stays as-is
- `--primary-foreground` stays dark (text ON primary-colored backgrounds)

This is a single-file change affecting only CSS variable values. All components referencing `text-foreground`, `text-muted-foreground`, etc. will automatically pick up the dark color, while anything using `text-primary` keeps its amber/yellow appearance.

