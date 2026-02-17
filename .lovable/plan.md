

# Update Slot/Stat/Skill Background Color to #F2FBFF

## What Changes

A single CSS variable update in `src/index.css`:

| Variable | Current Value | New Value | Effect |
|----------|--------------|-----------|--------|
| `--slot-bg` | `52 12% 12%` (dark brown) | `204 100% 97%` (#F2FBFF, light ice blue) | Changes background of item slots, stat blocks, skill nodes, raider avatars, XP bars, and scrap result items |

This one variable controls the background for all the elements you mentioned:
- Item inventory slots (`.slot-base`)
- Raider stat blocks (`.stat-block`)
- Skill tree nodes (`.skill-node`)
- Item detail stat blocks
- Scrap result items
- Raider avatars and XP bars

## Technical Detail

**File: `src/index.css`, line 53** -- change `--slot-bg: 52 12% 12%` to `--slot-bg: 204 100% 97%`

The `--slot-border` may also need adjusting since the current dark border (`48 10% 21%`) might look too harsh against the light background. I will update it to a softer complementary border color like `204 30% 85%` to keep things cohesive.

