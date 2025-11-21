# Axiom Token Table - Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Check versions:
\`\`\`bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version
\`\`\`

### 2. Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repository-url>
cd axiom-token-table

# Install dependencies (this may take 2-3 minutes)
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the token table!

## Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server (with hot reload)
npm run build        # Create production build
npm run start        # Run production server
npm run lint         # Check code for issues
npm run type-check   # Verify TypeScript types
\`\`\`

### Project Structure Overview

\`\`\`
src/
├── app/              # Next.js pages and layouts
├── components/       # React components (atomic design)
│   ├── atoms/       # Basic building blocks (Button, Badge, etc.)
│   ├── molecules/   # Composite components (Tooltip, Modal, etc.)
│   └── organisms/   # Complex components (TokenTable)
├── hooks/           # Custom React hooks
├── store/           # Redux state management
├── services/        # API and WebSocket services
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
\`\`\`

### Making Changes

1. **Adding a new component**: Create in appropriate `/components` folder
2. **Modifying styles**: Edit Tailwind classes or `globals.css`
3. **State management**: Update Redux slices in `/store`
4. **Adding features**: Follow atomic design pattern

## Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Vercel CLI
\`\`\`bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
\`\`\`

#### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Run build command
- Deploy your site
- Give you a URL

### Deploy to Netlify

\`\`\`bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
\`\`\`

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- AWS Amplify
- Google Cloud Run
- Heroku
- Railway
- Render

See [Next.js deployment docs](https://nextjs.org/docs/deployment) for platform-specific guides.

## Recording Demo Video

### Requirements
- 1-2 minutes duration
- Show responsive design (resize browser)
- Demonstrate all features
- Upload to YouTube as public/unlisted

### Recommended Flow

1. **Introduction** (10s)
   - Show desktop view
   - Highlight token table

2. **Core Features** (40s)
   - Click filters (New Pairs, Final Stretch, Migrated)
   - Sort columns (click headers)
   - Show tooltips (hover over chain badges)
   - Open token details modal (click info icon)

3. **Real-time Updates** (20s)
   - Point out price changes
   - Show "Live Updates" badge
   - Watch numbers update

4. **Responsive Design** (30s)
   - Resize browser from desktop → tablet → mobile
   - Show 320px width working
   - Demonstrate mobile interactions

### Recording Tools
- **macOS**: QuickTime Player (built-in)
- **Windows**: Xbox Game Bar (Win + G)
- **Cross-platform**: OBS Studio (free), Loom (easy)

### Uploading to YouTube
1. Go to [youtube.com/upload](https://youtube.com/upload)
2. Select your video file
3. Add title: "Axiom Token Table - Demo"
4. Add description with GitHub/Vercel links
5. Set visibility to "Public" or "Unlisted"
6. Publish and copy link

## Taking Screenshots

### Responsive Screenshots for README

Use browser DevTools:
1. Open DevTools (F12 or Cmd+Opt+I)
2. Click device toolbar icon (or Cmd+Shift+M)
3. Select device/width:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667
   - Small Mobile: 320x568
4. Take screenshot (DevTools has built-in screenshot feature)

### Chrome Screenshot Command
1. Open DevTools
2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "screenshot"
4. Select "Capture full size screenshot"

## Troubleshooting

### Port 3000 Already in Use
\`\`\`bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
PORT=3001 npm run dev
\`\`\`

### Build Errors
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
\`\`\`

### Type Errors
\`\`\`bash
# Check TypeScript errors
npm run type-check

# Common fix: restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
\`\`\`

## Performance Optimization

### Checking Lighthouse Score

1. Open your deployed site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select "Desktop" or "Mobile"
5. Click "Analyze page load"
6. Wait for results (should be 90+)

### Improving Scores

If scores are low:
- Check Network tab for slow requests
- Use Chrome DevTools Performance tab
- Enable compression in deployment platform
- Verify images are optimized

## Git Workflow

### Initial Setup
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Axiom Token Table"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

### Making Changes
\`\`\`bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, then:
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
\`\`\`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [React Query Docs](https://tanstack.com/query/latest)
- [Radix UI Components](https://www.radix-ui.com/primitives)

## Getting Help

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Review error messages in terminal/browser console
3. Search issue on Stack Overflow
4. Check Next.js GitHub discussions

## Final Checklist

Before submitting:
- [ ] Code runs locally without errors
- [ ] All features working (filters, sorting, modals, etc.)
- [ ] Responsive design tested (320px to desktop)
- [ ] Deployed to Vercel/Netlify
- [ ] README updated with deployment URL
- [ ] Demo video recorded and uploaded to YouTube
- [ ] Screenshots added to README
- [ ] GitHub repo is public with clean commit history

---

**Ready to deploy!** Follow the deployment steps above and you'll have a live site in minutes.
