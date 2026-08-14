# Lam Yew Fei — Portfolio

A single-page portfolio site, styled around a "git log" timeline that
merges work experience and projects into one reverse-chronological list.

## Files
- `index.html` — all content
- `style.css` — all styling
- `script.js` — expand/collapse behaviour for the timeline
- `Lam_Yew_Fei_Resume.pdf` — linked from the "résumé ↓" button in the header

## Deploy to GitHub Pages (yewfei-byte.github.io)

1. Create a **new repository** on GitHub named exactly:
   ```
   YewFei-byte.github.io
   ```
   (must match your username exactly, including case)

2. Push these files to the `main` branch of that repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YewFei-byte/YewFei-byte.github.io.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**, and under "Build and deployment"
   set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.

4. Wait a minute or two, then visit:
   ```
   https://yewfei-byte.github.io
   ```

## Things you'll probably want to edit
- **Student Record Management System** — the project card and timeline entry
  are placeholders (marked "edit me"). Fill in the tech stack and a real
  description in `index.html` (search for "Student Record Management System").
- Swap the favicon / add an `og:image` if you want nicer link previews.
- The résumé button expects the file to be named `Lam_Yew_Fei_Resume.pdf`
  in the same folder — replace it whenever your resume updates.
