# Food Stall Website

A free, static website (HTML + CSS + JavaScript) for a food stall: menu, games, venue, team and gallery.
No database, no server, no paid hosting. All content lives in **one file: `js/data.js`**.

## What each file does

| File / folder | Purpose |
|---|---|
| `index.html` | The page structure. You rarely need to touch it. |
| `css/style.css` | Colours, fonts, layout. Change colours at the top (`:root`). |
| `js/data.js` | **All your content**: name, menu, prices, games, team, venue, contacts. Edit this one. |
| `js/script.js` | Builds the page from `data.js` and powers filters, menu button, gallery. |
| `images/` | Your photos: `menu/`, `team/`, `gallery/`, `games/`, `about/`, `eco/` (plus optional `hero.jpg` and `hero-plate.jpg`). |

Photos are optional. Until you add real ones, the site shows a clean festive placeholder (team members show their initials).
Mentor photos go in `images/team/` as `Mentor1.jpg` … `Mentor6.jpg`; change the mentor names in `js/data.js`.
To use a real photo, save it in the matching `images/` folder using the **exact file name** written in `js/data.js`
(for example `images/menu/vada-pav.jpg`). It replaces the placeholder automatically.

---

## 1. Install the tools (one time, Windows)

1. **VS Code**: download from https://code.visualstudio.com and install with default options.
2. **Git**: download from https://git-scm.com/download/win and install with default options.
3. **GitHub account**: sign up free at https://github.com.

## 2. Open the project in VS Code

1. Put the `food-stall-website` folder on your Desktop (with all files inside, as in the table above).
2. Open VS Code → **File → Open Folder…** → choose `food-stall-website` → **Select Folder**.
3. If VS Code asks "Do you trust the authors?", click **Yes, I trust the authors**.
4. The left panel (Explorer) now shows all your files.

## 3. Preview on your laptop

1. Click the **Extensions** icon (four squares) on the left bar.
2. Search **Live Server** (by Ritwick Dey) → **Install**.
3. Open `index.html`, right-click inside it → **Open with Live Server**.
4. Your browser opens at something like `http://127.0.0.1:5500`. It updates every time you save.

(That address only works on your laptop. Follow step 5 to get a public link.)

## 4. Put in your real details

Open `js/data.js` and replace the sample text. Read the comments at the top of that file.
Add photos by copying them into the `images/` sub-folders and writing the file name in `data.js`.
Save with **Ctrl + S**.

## 5. Make it public with GitHub Pages

### A. Create the repository
1. Go to https://github.com and sign in → click **+** (top right) → **New repository**.
2. Repository name: `food-stall-website`. Choose **Public**. Do **not** tick "Add a README".
3. Click **Create repository**. Keep the page open.

### B. Upload with Git (from VS Code)
1. In VS Code open the terminal: **Terminal → New Terminal**.
2. Run these commands one by one (replace `YOUR-USERNAME`):

```bash
git init
git add .
git commit -m "Initial food stall website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/food-stall-website.git
git push -u origin main
```

3. If asked, sign in to GitHub in the window that opens.
4. If Git says "Please tell me who you are", run these once, then repeat the commit and push:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**No-Git alternative:** on your GitHub repository page click **uploading an existing file**, drag in everything
(keep the `css`, `js`, `images` folders), then click **Commit changes**.

### C. Turn on GitHub Pages
1. In your repository click **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**: **Deploy from a branch**.
3. Branch: **main**, folder: **/(root)** → **Save**.
4. Wait 1–10 minutes and refresh. A box appears: "Your site is live at…".

Your public link will look like:

```
https://YOUR-USERNAME.github.io/food-stall-website/
```

Share this link with anyone, on WhatsApp, Instagram or as a QR code.

## 6. Update the website later

1. Edit `js/data.js` (or add photos), then **Ctrl + S**.
2. Preview with Live Server.
3. Publish. In the VS Code terminal:

```bash
git add .
git commit -m "Update menu and prices"
git push
```

   (Or use the **Source Control** icon → type a message → **Commit** → **Sync Changes**.)
4. Wait 1–2 minutes. The same link now shows the new version (hard-refresh with **Ctrl + F5** if you still see the old one).

## Tips and troubleshooting

* **Page is blank or shows an error message**: you probably deleted a comma, quote or bracket in `data.js`.
  Press **Ctrl + Z** to undo, or compare with a fresh copy.
* **Photo not showing**: file names are case-sensitive on GitHub (`Chai.JPG` is not `chai.jpg`). Avoid spaces.
  Keep photos small (under about 500 KB each) so the site loads fast.
* **Site shows 404**: check Settings → Pages is set to `main` and `/(root)`, and that `index.html` is in the top level, not inside another folder.
* The repository is public, so never put passwords or private information in any file.
* This site has no online admin panel and no ordering or payments. Changes are made by editing files and pushing.