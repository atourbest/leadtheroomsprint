# Lead the Room 5-Day Email Course: site

A free 5-day email mini course (lead magnet) for Lead the Room. It has a sign-up page, a thank-you page and five day pages, each with a 2-minute video and one experiment. Every day page ends with the Sprint waitlist panel.

**Status: live sign-ups.** The form posts to `/.netlify/functions/subscribe`, which adds contacts to SendFox list **687988** (the new SendFox account), using the `SENDFOX_API_KEY` environment variable in Netlify. To pause sign-ups, set `PROTOTYPE = true` in `index.html`.

⚠️ The Day 1–5 SendFox automation for list 687988 isn't set up yet. Until it is, people who sign up won't get any emails.

## Pages

| Page | URL |
| --- | --- |
| Sign-up | https://leadtheroomsprint.com/minicourse/ |
| Thank-you | https://leadtheroomsprint.com/minicourse/joined/ |
| Days 1–5 | https://leadtheroomsprint.com/minicourse/d1/ … /d5/ |

The thank-you and day pages are `noindex`, so search engines won't list them.

## Files

```
minicourse/
  index.html          sign-up page (styles inline)
  joined/index.html   thank-you page
  d1/ … d5/           day pages
  assets/lesson.css   shared styles for the thank-you and day pages
  images/             hero.webp, jason.webp, sprint-offer.webp
netlify/functions/subscribe.js   SendFox sign-up function (repo root; Netlify's default functions folder)
```

There's no `netlify.toml` change. Netlify finds functions in `netlify/functions` by default, so the existing site settings are untouched.

## Brand colours

The variables are at the top of `assets/lesson.css`, and again in the `<style>` block of `index.html`: `--brand`, `--brand-dark`, `--accent`, `--grad`, `--bg`, `--ink`, `--body`, `--muted`, `--line`, `--tint`. They match leadtheroomsprint.com: a navy `#0e1029` page with the magenta → coral → orange gradient.

## Going live with SendFox

1. In SendFox, create the list for this course and note its **list ID** (a number).
2. In `netlify/functions/subscribe.js`, set `const LIST_ID = <that number>;`.
3. In Netlify, open this site, go to **Site configuration → Environment variables → Add**, and enter Key `SENDFOX_API_KEY` and Value = your SendFox API token. Tick "Contains secret values". (Don't paste the token into the Key box.)
4. Redeploy.
5. In `minicourse/index.html`, set `var PROTOTYPE = false;`, then commit and push.
6. Set up and switch on the SendFox automation for the list, so the "Day 1 is on its way" promise on the thank-you page comes true.

**Never** put the SendFox API key in any file in the repo.

## Adding a video

On each day page, find the `VIDEO` comment. Replace the `<div class="placeholder">…</div>` block with the `<iframe>` shown in that comment, using your embed URL.

The day pages are generated from one template. If you'd rather edit the files by hand, that's fine too. They're plain HTML.

## Test checklist

1. Open the live sign-up page in a private window, on desktop and on a phone.
2. Submit with a blank name, a bad email and no tick, and check that each one shows its error.
3. Sign up with a real address. Check that you land on `/minicourse/joined/`.
4. (Once live) Check that the contact appears in the SendFox list with their first name.
5. (Once live) Sign up again with the same address. It should still succeed.
6. Open `/d1/` to `/d5/`: progress bars correct, placeholders showing, Day 5 "Copy link" works, all links work.
7. (Once live) Check that the SendFox automation for this list is switched on.
