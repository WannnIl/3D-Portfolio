# Constraints

Last reviewed: 2026-09-24

## Floor (always enforced, no setup required)

- No new suppression comments: `@ts-ignore`, `eslint-disable`
- No skipped or deleted tests without a reason in the commit message
- No secrets in source
- This file does not get weakened to make a change pass

## Enforced with numbers

| Dimension | Rule | Checked by | Runs at |
|-----------|------|-----------|---------|
| Performance (FPS) | 60 FPS Desktop, ≥ 30 FPS Mobile | Manual / Chrome DevTools Performance | preview deploy |
| Performance (Web Vitals) | LCP ≤ 2500ms, CLS ≤ 0.1 | `lighthouse $PREVIEW_URL --output=json` | preview deploy |
| Asset Size | 3D assets (.glb/.gltf) ≤ 3MB | File size check (must use Draco/meshopt) | build / PR |
| Design Consistency | Wajib menggunakan palet warna shadcn/ui | UI Review | review |
| Types | Zero type errors | `npm run typecheck` (`tsc --noEmit`) | every edit |
| Lint | Zero errors from config | `npm run lint` | every edit |

## Measured, not yet enforced

| Metric | Today | Direction |
|--------|-------|-----------|
| Bundle size (main) | TBD | must not grow excessively |

## Exceptions

None yet.
