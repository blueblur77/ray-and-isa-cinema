# Ray & Isa's Cinema — Plex Movie & TV Catalog

A dark cinema watchlist web app synced with your **Ray and Isa Movie Catalog** Google Sheet (`18dMxzqimum6c4KfF7TgD0wZfmqXbjCYTAxxGHoTxvCg`), designed to work seamlessly alongside your existing n8n Seerr Discord workflows.

## Features
- **Unwatched & Watched Pages**: Dedicated tabs with live counts. Mark any movie or TV show as Watched or Unwatched with one click, syncing back to the `Watched` and `Watched Date` columns in your Google Sheet.
- **Zero-Key Automatic Poster Art & Metadata**: Automatically fetches movie/TV posters and release metadata out of the box (using IMDb Public Suggestions & TVMaze), with optional TMDB or OMDb API key support in Settings. Resolved metadata is automatically cached into your Google Sheet so future loads are instant.
- **Requester Badges & Filters**: Maps Discord usernames `blueblur77` → **Ray** and `isabellapark66` → **Isa**, with filter pills for requester, media type (`Movies` / `TV Shows`), search, and sorting.
- **Non-Breaking with n8n**: Your existing `seerr_discord_to_google_sheet.json` and `seerr_discord_backfill_sheets.json` workflows match on `Title` and update only their 7 columns (`Date Requested`, `Title`, `Media Type`, `Season(s) / Quality`, `Request Status`, `Added to Plex Date`, `Requested By`), leaving the website's `Watched`, `Watched Date`, `Poster URL`, `Year`, `Genre`, and `Runtime` columns intact.

---

## Quick Setup (60 Seconds)

### 1. Connect the Google Sheet (`google_apps_script.gs`)
1. Open your Google Sheet:  
   `https://docs.google.com/spreadsheets/d/18dMxzqimum6c4KfF7TgD0wZfmqXbjCYTAxxGHoTxvCg/edit`
2. In the menu bar, click **Extensions → Apps Script**.
3. Delete any starter code in `Code.gs`, copy/paste the entire contents of [`google_apps_script.gs`](./google_apps_script.gs), and click **Save**.
4. Click **Deploy → New deployment**.
5. Click the gear icon next to *Select type* and choose **Web app**.
6. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
7. Click **Deploy** (approve the Google permissions prompt if asked) and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

> **Note:** On its first run, the script automatically adds `Watched`, `Watched Date`, `Poster URL`, `Year`, `Genre`, and `Runtime` to Row 1 of your sheet if they don't exist yet.

### 2. Open the Website
Serve this folder with any static server (or host it on GitHub Pages / Netlify / Cloudflare Pages / local Plex server):

```bash
python -m http.server 8765
```

Then open `http://localhost:8765`, click **Sheet Snapshot / Settings** in the top-right corner (or **Connect Google Sheet** in the banner), paste your Web App URL, and click **Save & Sync**.

---

## Hosting on GitHub Pages

1. Create an empty public repository named `ray-and-isa-cinema` at `https://github.com/new` (leave **Add a README file** unchecked).
2. From inside this folder (`e:\AntiGravity\Projects\Seer Movie Catalog`), push your committed `main` branch:
   ```bash
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings → Pages**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
   - Click **Save**.
4. Open your live site at `https://blueblur77.github.io/ray-and-isa-cinema/`.
5. Paste your Google Apps Script `/exec` URL in **Settings** and click **Save & Sync**, then click **Copy Shareable Link for Isa** to copy a 1-tap auto-connecting URL (`?gas=...`) for Isa's phone or browser.
