# Deployment Guide

## Quick Deployment to Vercel (Recommended)

Vercel provides the easiest deployment for Vite projects with zero configuration.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HappyFox Org Chart"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/happyfox-org-chart.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"

3. **Your app will be live in ~1 minute!**
   - Vercel provides a URL like: `happyfox-org-chart.vercel.app`
   - Update the README with your live URL

---

## Alternative: Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - In Netlify dashboard → Domain settings
   - You can use a custom domain or the free .netlify.app subdomain

---

## Recording Demo Video

### Option 1: Loom (Recommended)
- Free screen recording: [loom.com](https://loom.com)
- Click "New Video" → "Screen Only"
- Record 2-3 minutes showing:
  1. Search functionality
  2. Team filtering
  3. Drag & drop employee
  4. Quick code walkthrough

### Option 2: OBS Studio
- Free software: [obsproject.com](https://obsproject.com)
- More control over recording quality
- Can edit before uploading

### What to Show in Video:
1. **Introduction** (15 seconds)
   - "Hi, this is my HappyFox Org Chart assignment"
   - Show the deployed URL

2. **Feature Demo** (90 seconds)
   - Search for an employee
   - Filter by team
   - Drag employee to new manager
   - Show chart updating

3. **Code Walkthrough** (60 seconds)
   - Show project structure
   - Explain Context + useReducer
   - Show MirageJS configuration
   - Highlight custom CSS

4. **Conclusion** (15 seconds)
   - Technologies used
   - Thank you

### Upload Video:
- YouTube (Unlisted): Easy to share
- Loom: Automatically creates shareable link
- Google Drive: Make sure to set permissions

---

## Pre-Submission Checklist

- [ ] Code pushed to GitHub
- [ ] App deployed to Vercel/Netlify
- [ ] Live URL added to README
- [ ] Demo video recorded (2-3 minutes)
- [ ] Video link added to README or submission
- [ ] All features working on deployed site:
  - [ ] Employee list displays
  - [ ] Search works
  - [ ] Filter works
  - [ ] Org chart renders
  - [ ] Drag & drop works
- [ ] README updated with:
  - [ ] Your name and GitHub username
  - [ ] Live demo URL
  - [ ] Video link
- [ ] Final review of code quality
- [ ] Tests passing (`npm run test`)
- [ ] Build successful (`npm run build`)

---

## Submission Format

Submit the following:

1. **GitHub Repository URL**
   ```
   https://github.com/YOUR_USERNAME/happyfox-org-chart
   ```

2. **Live Demo URL**
   ```
   https://happyfox-org-chart.vercel.app
   ```

3. **Demo Video URL**
   ```
   https://www.loom.com/share/YOUR_VIDEO_ID
   or
   https://youtube.com/watch?v=YOUR_VIDEO_ID
   ```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Drag & Drop Not Working on Deployed Site
- Check browser console for errors
- Ensure MirageJS is running (check Network tab)
- Verify no CORS issues

### Styling Looks Different
- Ensure all CSS Module files are committed
- Check if Vite properly bundles CSS
- Clear browser cache

---

## Tips for Interview

When presenting your assignment:

1. **Start with the live demo** - Show it works immediately
2. **Explain your tech choices** - Context API, dnd-kit, MirageJS
3. **Highlight custom CSS** - 90% custom shows skills
4. **Discuss trade-offs** - Why you chose each library
5. **Mention what you'd improve** - Shows forward thinking

Good luck! 🚀
