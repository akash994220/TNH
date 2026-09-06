# Continue here

## Done
1. ✅ **Task Manager card redesign** — `task-manager.html`
   - New markup: `#cardsPanel` (category cards + "Add category") and `#detailPanel`
     (back button, rename/delete icons, add-task input, task list), toggled by a
     local `currentView` variable ('cards' | 'detail'). Firestore data model unchanged.
   - Old pill-tab CSS (`.tabs`, `.tab`, `.tab-add`, `.tab-manage`) left in the stylesheet
     unused — harmless, can be deleted later if you want a cleanup pass.
   - Verified JS parses (`new Function()` check passed).

2. ✅ **Requirements Excel** — `requirements.html`
   - `autoCounts()` now also builds `byStation: { stationName: qty }` per item,
     using a station id → title lookup from `checklistState.stations`.
   - `combinedList()` passes that through as `entry.byStation`.
   - Excel export is now 4 columns: Item · Qty Needed · Station · Remarks.
     Station cell is multi-line (`wrapText:true`), one line per station + qty,
     plus a `Manually added: N` line if there's a manual quantity. Row height
     grows with the number of lines. Borders kept (`borderRow(row, 4)`).
   - On-screen list view (the "X from checklist + Y added manually" line) is
     untouched — only the Excel file changed, as asked.
   - Verified JS parses.

## Still to do
3. ✅ **Nav trim** — `nav.js`: `NAV_ITEMS` now only has Home · Calculator · Tasks ·
   Stations. Notes/Products/Requirements stay reachable from the Home page list
   (unchanged). Those three pages still load `nav.js`, so the capsule still shows
   on them for getting back — it just no longer has their own icon in it.

## All three items in this round are done.
Remaining pages (products.html, requirements.html, notes.html) still include
`nav.js`/`shared.js` as before — nothing else needed there.

## Notes / assumptions (see plan.md for full detail)
- Manual (non-station) requirement items will show `Manually added: N` in the
  Station column.
- Rename/Delete category now live in the Task Manager detail-screen header, not
  on the card itself.
