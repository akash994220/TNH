# Plan — Task Manager cards, Requirements Excel, Nav trim

## 1. Task Manager → card-based categories
**Current:** horizontal pill tabs + add-task input + task list all visible at once.

**New:**
- Opening Task Manager shows a list of **category cards** (styled like the Home page rows —
  icon, category name, open-task count, chevron), plus an "Add category" card at the end.
- Tapping a card drills into a detail screen: back button + category name at top,
  rename/delete icons, the "Add a task…" input, and that category's task list.
- Data model (Firestore `tabs`/`tasks`/`active`) is unchanged — only the UI/navigation
  changes. `active` still tracks which category was last opened; which screen (cards vs.
  detail) is shown is local-only and always starts at the card list on page load.

**Assumption:** rename/delete move from the always-visible "tab-manage" row into the
detail screen header (next to the back button), since they only make sense once a
category is open. Tell me if you wanted them on the card itself instead (e.g. long-press).

## 2. Requirements Excel export
**Current columns:** Item · Qty Needed · Source · Purchased? · Remarks
("Source" = text like "4 from checklist + 2 added manually", no per-station detail.)

**New columns:** Item · Qty Needed · **Station** · Remarks
- "Station" is one cell per item, multi-line, listing every station that flagged that
  item as out of stock and how many times, e.g.:
  ```
  Station 1: 3
  Front Desk: 2
  ```
- Borders were already applied to every cell — kept as-is, now on 4 columns instead of 5.
- **Assumption:** items added manually (not from a station checklist) have no station,
  so their line will read `Manually added: N`. If some manual quantity is mixed with
  station quantity for the same item, both kinds of lines appear in the same box.

## 3. Bottom capsule nav
Remove Notes, Products, Requirements from the bottom capsule (`nav.js`) — leaving
Home · Calculator · Tasks · Stations. Notes/Products/Requirements stay reachable only
from the Home page list (already there, untouched).

## Delivery order (one zip + continue-here.md after each)
1. Task Manager card redesign
2. Requirements Excel column change
3. Nav trim (quick, done last)
