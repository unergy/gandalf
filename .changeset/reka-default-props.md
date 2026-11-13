---
'@unergy-dev/gandalf': patch
---

Fix dialogs closing when you click inside them. `GDialogContent`, `GAlertDialogContent`, `GDialogScrollContent` and `GDetailsPanelContent` turned Reka's `disableOutsidePointerEvents` into `false`, so the content of a modal dialog stopped taking clicks and every click fell on the overlay. The same fix keeps Reka's own defaults in `GDialog` and `GDetailsPanel` (`unmountOnHide`), `GTabs` (`unmountOnHide`), `GTabsList` (`loop`), `GTooltipContent` (`avoidCollisions`, `hideWhenDetached`), `GCombobox` (`open`, `resetSearchTermOnBlur`, `resetSearchTermOnSelect`, `unmountOnHide`, `highlightOnHover`), `GRadioGroup` (`loop`), `GRadioGroupItem` (`checked`) and `GSegmentedButton` (`rovingFocus`, `loop`).
