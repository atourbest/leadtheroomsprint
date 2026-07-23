# Lead the Room — September Cohort Tracker: setup

The dashboard is a single `index.html`. It shows sample data until you connect the Google Sheet, then live-fetches on every page load. No backend, no build step.

## 1. Create the Google Sheet (~5 min)

1. Go to [sheets.new](https://sheets.new) and name the spreadsheet e.g. **LTR September Tracker**.
2. Create two tabs and import a template CSV into each (File → Import → Upload → *Replace current sheet*):
   - Tab **Weekly** ← `weekly-template.csv`
   - Tab **Webinars** ← `webinars-template.csv`
3. Delete the sample rows once you're ready to enter real numbers (keep the header row).

### What each column means

**Weekly tab** — add a row each time you update (Friday works well). Paid, Free and Income are *running totals*; Posts and Engagement are *that week's* counts.

| Column | Meaning |
|---|---|
| Date | Date of the update (e.g. 2026-07-24) |
| Paid | Total paid sign-ups so far |
| Free | Total free places filled so far |
| Income | Total income so far, £ (number only) |
| Followers | LinkedIn company page follower count that day |
| Posts | LinkedIn posts published that week |
| Engagement | Reactions + comments that week |

**Webinars tab** — one row per webinar. Leave Registrations/Attended/Signups blank for a future webinar and the dashboard shows it as "scheduled" with its 2-week marketing window.

## 2. Publish the two tabs as CSV

For **each** tab:

1. File → Share → **Publish to web**
2. In the dialog: choose the tab (Weekly, then again for Webinars) — not "Entire document"
3. Format: **Comma-separated values (.csv)** → Publish → copy the link

## 3. Paste the links into the dashboard

Open `index.html` in a text editor. Near the top of the `<script>` there is:

```js
const CONFIG = {
  weeklyCsvUrl:   "",   // ← paste published-CSV link for the Weekly tab
  webinarsCsvUrl: "",   // ← paste published-CSV link for the Webinars tab
  ...
```

Paste each URL between the quotes. Targets (20 places, 10/10 split, £2,000, 150 followers) live in the same block if you ever want to change them.

## 4. Deploy on Netlify

Easiest: [app.netlify.com/drop](https://app.netlify.com/drop) — drag the folder containing `index.html` onto the page. Done. Redeploy the same way whenever you edit the file (data updates don't need a redeploy — only CONFIG/target changes do).

Share the Netlify URL with your business partner. The badge in the top-right shows **"Live from Google Sheets"** when it's connected, and the whole thing refetches on every page load.

## Notes

- Published sheets can take a few minutes to reflect new edits — Google caches the CSV.
- The published-CSV link is technically public (anyone with the exact URL can read the numbers, but it isn't listed anywhere). If that ever bothers you, un-publish from the same dialog.
- Every chart has a **Table** button — the same numbers as an accessible table.
- Light/dark theme follows your system; the **Theme** button overrides it.
