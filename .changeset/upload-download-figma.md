---
'@unergy/gandalf': minor
---

Add `GUploadBox` and `GUploadCard` from the Figma **Upload & Download** page.

`GUploadBox` is the dashed drop zone: sizes `md` (112px, icon over title and description) and `sm` (56px, one row), hover and drag-over in `blue/50` with "Drop your file here", and an activated state that shows the chosen file in `action/object` with a clear button. It opens the native file picker, accepts drops and emits `files` with the `File[]`.

`GUploadCard` is the 56px row of an upload list: file icon, name, a meta line with the size and the status (`queue`, `in-progress` as a percentage, `completed` in `success`, `error` in `destructive`), a `GBadge` with the file type and a `GButton` that removes the file or retries it.
