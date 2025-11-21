# Quick Reference - Axiom Token Table

## 🚀 Fast Start Commands

\`\`\`bash
# Setup
cd /tmp/axiom-token-table
npm install

# Development
npm run dev              # → http://localhost:3000

# Production
npm run build
npm start

# Deploy
vercel --prod
\`\`\`

## 📂 Where to Find Things

| What | Where |
|------|-------|
| Main page | `src/app/page.tsx` |
| Table component | `src/components/organisms/TokenTable.tsx` |
| State management | `src/store/tokenSlice.ts` |
| Mock data | `src/services/mockData.ts` |
| WebSocket | `src/services/webSocket.ts` |
| Types | `src/types/index.ts` |
| Styles | `src/app/globals.css` |
| Utilities | `src/utils/helpers.ts` |

## 🎨 Key Components

### Atoms (Basic)
- `Button.tsx` - Buttons with variants
- `Badge.tsx` - Status badges
- `Skeleton.tsx` - Loading placeholders
- `Spinner.tsx` - Loading spinner

### Molecules (Composite)
- `Tooltip.tsx` - Hover tooltips
- `Popover.tsx` - Click popovers
- `Modal.tsx` - Full modals
- `ErrorBoundary.tsx` - Error handling

### Organisms (Complex)
- `TokenTable.tsx` - Main table with all features

## 🔧 Common Modifications

### Change Colors
Edit `src/app/globals.css` → `:root` section

### Add New Filter
1. Update `FilterState` in `src/types/index.ts`
2. Add filter logic in `src/store/tokenSlice.ts`
3. Add UI in `src/app/page.tsx`

### Customize Table Columns
Edit `TokenTable.tsx`:
- Modify `<thead>` for headers
- Update `TokenRow` for cell content

### Adjust Update Frequency
Edit `src/services/webSocket.ts`:
- Line ~53: Change `2000 + Math.random() * 3000`

## 📱 Responsive Breakpoints

| Device | Width | Test in DevTools |
|--------|-------|------------------|
| Small Mobile | 320px | iPhone SE |
| Mobile | 375px | iPhone 12 |
| Large Mobile | 425px | Generic |
| Tablet | 768px | iPad |
| Desktop | 1024px | Laptop |
| Large Desktop | 1440px+ | Desktop |

## 🎯 Feature Checklist

- [x] Token categories (New/Final/Migrated)
- [x] Real-time price updates
- [x] Sorting (all columns)
- [x] Filtering (category + chain)
- [x] Tooltips (hover chain)
- [x] Modals (click info icon)
- [x] Loading skeletons
- [x] Error boundaries
- [x] Responsive design
- [x] Performance optimized

## 📊 Testing Checklist

### Local Testing
- [ ] Run `npm run dev`
- [ ] Test filters (all 4 categories)
- [ ] Test sorting (click column headers)
- [ ] Hover chain badges (tooltips)
- [ ] Click info icons (modals)
- [ ] Watch price updates
- [ ] Resize browser (320px-1920px)

### Build Testing
- [ ] Run `npm run build` (no errors)
- [ ] Run `npm start`
- [ ] Test production build locally

### Deployment Testing
- [ ] Deploy to Vercel
- [ ] Visit deployment URL
- [ ] Test all features on live site
- [ ] Check mobile on real device
- [ ] Run Lighthouse audit

## 🎥 Demo Video Shots

1. **Desktop Overview** (15s)
   - Show full table
   - Point out live updates badge

2. **Filters** (15s)
   - Click each category
   - Show chain filters

3. **Sorting** (15s)
   - Click price column
   - Click volume column

4. **Interactions** (20s)
   - Hover tooltips
   - Open modal
   - Show details

5. **Responsive** (35s)
   - Resize to tablet
   - Resize to mobile
   - Show 320px width

## 📸 Screenshot Sizes

Take screenshots at:
- **Desktop**: 1920 x 1080
- **Tablet**: 768 x 1024  
- **Mobile**: 375 x 667
- **Small**: 320 x 568

Use Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)

## 🔗 URLs to Update

After deployment, update these in `README.md`:
- `<repository-url>` → Your GitHub URL
- `<your-deployment-url>` → Your Vercel URL
- YouTube video link
- Your name and contact info

## ⚡ Pro Tips

1. **Performance**: Check with React DevTools Profiler
2. **Bundle Size**: Run `npm run build` and check output
3. **Accessibility**: Test with VoiceOver (Mac) or NVDA (Windows)
4. **Mobile**: Test on real device, not just DevTools
5. **Lighthouse**: Test in Incognito mode for accurate scores

## 🐛 Quick Fixes

### Port 3000 in use
\`\`\`bash
lsof -ti:3000 | xargs kill -9
# or use different port:
PORT=3001 npm run dev
\`\`\`

### Build fails
\`\`\`bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
\`\`\`

### Types errors
Restart TypeScript in VS Code:
- Cmd+Shift+P → "TypeScript: Restart TS Server"

## 📚 Documentation

- **README.md** - Full project documentation
- **SETUP.md** - Step-by-step setup guide
- **PROJECT_SUMMARY.md** - Implementation details
- **This file** - Quick reference

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Query](https://tanstack.com/query)

---

**Everything you need at a glance!** 🚀
