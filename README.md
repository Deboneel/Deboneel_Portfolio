# Deboneel Kundu Partho · Portfolio

Plain HTML + CSS + JavaScript. No build step, no frameworks, no npm.

## Put it online with GitHub Pages

1. Create a new public repository on GitHub (for your main site, name it `deboneel.github.io`; any other name also works).
2. Click **Add file → Upload files** and drag in **everything inside this folder** (so `index.html` sits at the top level of the repo, not inside another folder). Commit.
3. Open **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://deboneel.github.io/` (or `https://deboneel.github.io/<repo-name>/`).

## Editing content

All text, links, photos and publications are in **`js/data.js`**. Edit that file only; the page updates itself.

## Adding photos later

1. Put the photo in `images/` (JPG or PNG, ideally under 1600 px on the long side).
2. Optional, for faster loading: put a smaller copy (about 760 px) with the **same name** in `images/thumbs/`. If there is no thumbnail, the full image is used automatically.
3. Add `{ src: "your-file.jpg", caption: "Short caption" }` to the right `photos` list in `js/data.js`.

Notes:
- iPhone/Samsung `.HEIC` photos do not display in browsers. Convert them to `.jpg` first.
- Photo frames take the shape of each photo automatically. `js/photo-sizes.js` just stores the shapes so frames do not jump while loading; new photos work without editing it.
- The two BAURES photos are now `BAURES.jpg` and `BAURES_workshop.jpg`. The old names `BAURES.jpg` and `baures.jpg` collide on Windows and Mac, which only see one of them.

## Files

```
index.html            page structure
css/style.css         all styling (light/dark colours at the top)
js/data.js            ALL content
js/main.js            renders content, lightbox, theme toggle, menu
js/terrain.js         3D terrain background in the hero (no library)
images/               photos (optimised) + thumbs/ + projects/
video/  resume/  certificates/
```
