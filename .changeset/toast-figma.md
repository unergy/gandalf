---
'@unergy-dev/gandalf': minor
---

Toast matches the Figma page: 404px card on `base/base`, 16px radius, elevation SM, padding 12/12/12/20 and 16px gaps. Title in Body/mdEm (16px semibold) truncated, description 14px with a 1.3 line height in `base/foreground-quiet`, 18px icons (`check`, `loader-circle`, `component`, `triangle-alert`, `siren`) and a 16px close icon pinned to the top. The toast card is now exported as `GToast` (prop `type`, as in Figma), and `GToaster` sets sonner's `--width` to 404px. `GandalfToastColor` is deprecated in favor of `GandalfToastType`, and the toast CVAs (`gandalfToastVariants`, `gandalfToastIconVariants`, `gandalfToastTitleVariants`) take `type` instead of `color`.
