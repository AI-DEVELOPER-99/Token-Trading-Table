# Axiom Token Trading Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, Redux Toolkit, and React Query. Features real-time price updates, advanced filtering, sorting, and responsive design down to 320px width.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-90%2B-success)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## 🎯 Features

### Core Functionality
- ✅ **All Token Categories**: New Pairs, Final Stretch, and Migrated columns
- ✅ **Interactive UI Components**: Tooltips, Popovers, Modals with Radix UI
- ✅ **Advanced Sorting**: Multi-field sorting with visual indicators
- ✅ **Real-time Updates**: WebSocket mock service with smooth price transitions
- ✅ **Loading States**: Skeleton loaders, shimmer effects, progressive loading
- ✅ **Error Boundaries**: Comprehensive error handling with retry logic
- ✅ **Responsive Design**: Fully responsive from 320px to 4K displays

### Technical Highlights
- 🚀 **Performance Optimized**: React.memo, useMemo, useCallback throughout
- 🎨 **Pixel-Perfect UI**: Matches Axiom Trade design specifications
- ♿ **Accessible**: Radix UI components with ARIA attributes
- 📦 **Atomic Architecture**: Reusable atoms, molecules, organisms pattern
- 🔧 **Type-Safe**: Strict TypeScript with comprehensive interfaces
- 🎭 **Smooth Animations**: Framer Motion for fluid transitions

## 📂 Project Structure

```plaintext
axiom-token-table/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Main page component
│   │   └── globals.css          # Global styles & CSS variables
│   ├── components/
│   │   ├── atoms/               # Base components
│   │   │   ├── Button.tsx       # Reusable button with variants
│   │   │   ├── Badge.tsx        # Status badges
│   │   │   ├── Skeleton.tsx     # Loading skeletons
│   │   │   └── Spinner.tsx      # Loading spinner
│   │   ├── molecules/           # Composite components
│   │   │   ├── Tooltip.tsx      # Tooltip wrapper
│   │   │   ├── Popover.tsx      # Popover wrapper
│   │   │   ├── Modal.tsx        # Dialog/Modal wrapper
│   │   │   └── ErrorBoundary.tsx # Error handling
│   │   └── organisms/           # Complex components
│   │       └── TokenTable.tsx   # Main table component
│   ├── hooks/
│   │   ├── useTokens.ts         # React Query data fetching
│   │   ├── useRedux.ts          # Redux hook
│   │   └── useWebSocket.ts      # WebSocket connection hook
│   ├── store/
│   │   ├── index.ts             # Redux store configuration
│   │   └── tokenSlice.ts        # Token state management
│   ├── services/
│   │   ├── mockData.ts          # Mock token generator
│   │   └── webSocket.ts         # WebSocket service
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── utils/
│       └── helpers.ts           # Utility functions
├── public/                      # Static assets
├── package.json
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: SWC

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd axiom-token-table

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📱 Responsive Breakpoints

The application is fully responsive with the following breakpoints:

| Breakpoint | Width | Optimizations |
|-----------|-------|---------------|
| Mobile S | 320px | Compact layout, stacked filters |
| Mobile M | 375px | Improved spacing |
| Mobile L | 425px | Comfortable touch targets |
| Tablet | 768px | Multi-column layout |
| Desktop | 1024px | Full table view |
| Desktop L | 1440px+ | Optimal spacing |

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions, links
- **Success**: Green (#22C55E) - Positive changes, new pairs
- **Destructive**: Red (#DC2626) - Negative changes, errors
- **Muted**: Gray shades - Secondary content

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: 0.75rem to 2.25rem with consistent line heights

### Animations
- **Shimmer**: Loading skeleton animation (2s)
- **Pulse Price**: Price update indicator (1s)
- **Slide In**: Modal/popover entrance (200ms)

## 🔍 Key Features Deep Dive

### Real-time Price Updates
Mock WebSocket service simulates live price feeds with:
- Random 5-15 token updates every 2-5 seconds
- Realistic price fluctuations (-5% to +5%)
- Smooth color transitions for price changes
- Automatic reconnection on disconnect

### Sorting & Filtering
- **Sortable Fields**: Price, 24h Change, Volume, Market Cap, Holders, Created Date
- **Filters**: Category (New Pairs, Final Stretch, Migrated), Chain (SOL, ETH, BASE)
- **Real-time**: Instant updates as filters/sorts change

### Loading States
- **Initial Load**: Full skeleton table with shimmer effect
- **Progressive**: Smooth transition from loading to data
- **Error States**: User-friendly error messages with retry button

### Accessibility
- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

## 📊 Performance Metrics

Target metrics (Lighthouse scores):
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Techniques
1. **Code Splitting**: Dynamic imports for heavy components
2. **Memoization**: React.memo on all list items
3. **Virtual Scrolling**: Ready for large datasets
4. **Image Optimization**: Next.js Image component
5. **Bundle Size**: Tree-shaking and dead code elimination

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📸 Screenshots

### Desktop View (1920x1080)
![Desktop Screenshot]
(Add screenshot here showing full table with all features)

### Tablet View (768x1024)
![Tablet Screenshot]
(Add screenshot here showing responsive tablet layout)

### Mobile View (375x667)
![Mobile Screenshot]
(Add screenshot here showing mobile-optimized layout)

### Mobile View (320x568)
![Small Mobile Screenshot]
(Add screenshot here showing minimum width support)

## 🎥 Demo Video

📹 [Watch Demo Video](https://youtube.com/your-video-link)

1-2 minute walkthrough demonstrating:
- Responsive design across all breakpoints
- Real-time price updates
- Interactive components (tooltips, modals, popovers)
- Sorting and filtering functionality
- Loading states and error handling
- Performance and smooth animations

## 🔗 Links

- **Live Demo**: [https://axiom-token-table.vercel.app](https://your-deployment-url)
- **GitHub Repository**: [https://github.com/yourusername/axiom-token-table](https://github.com/your-repo)
- **Original Design**: [https://axiom.trade/pulse](https://axiom.trade/pulse)

## 🏗️ Architecture Decisions

### Why Redux Toolkit?
- Centralized state management for complex filtering/sorting
- DevTools integration for debugging
- Built-in immutability and performance optimizations

### Why React Query?
- Automatic caching and background refetching
- Error handling and retry logic out of the box
- Optimistic updates support

### Why Radix UI?
- Unstyled, accessible primitives
- Full keyboard navigation
- ARIA compliance by default
- Small bundle size

### Why Atomic Design?
- Maximum component reusability
- Clear separation of concerns
- Easy to test and maintain
- Scalable architecture

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational/portfolio purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design inspiration from [Axiom Trade](https://axiom.trade)
- Component library patterns from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

**Built with ❤️ using Next.js, TypeScript, and modern React patterns**
