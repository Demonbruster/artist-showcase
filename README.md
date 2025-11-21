# Artist Showcase - Music Explorer

A modern React application for discovering and exploring music powered by the Last.fm API. Browse artist albums, search for tracks, save favourites, and visualize play count statistics.

## Features

### Must-Have Features ✅

- **Album Overview**: Display all albums of an artist with cover, name, and year
- **Sorting**: Sort albums by year or name (ascending/descending)
- **Album Detail View**: View complete album details with full track list
- **Search**: Global search for tracks and albums with tab navigation
- **Last.fm API Integration**: Real-time data from Last.fm

### Nice-to-Have Features ✅

- **Favourites**: Add/remove tracks to favourites from album details and search results
- **Favourites Page**: View all favourited tracks with filtering and navigation
- **Best Played Graph**: Visualize most-played tracks on albums with interactive charts

### UI/UX Enhancements ✨

- **Modern Design**: Gradient backgrounds, rounded corners (2xl), and elevated shadows
- **Smooth Animations**: Cubic-bezier transitions, hover effects, and micro-interactions
- **Interactive Elements**: Album cards with zoom on hover, play button overlays
- **Visual Feedback**: Color-coded stats, pulsing loaders, slide-in indicators
- **Responsive Navigation**: Mobile-optimized with icon-only view for small screens
- **Glassmorphism**: Modern header with blur effects and active state indicators
- **Enhanced Typography**: Gradient text effects, emoji icons, better hierarchy
- **Polished Components**: Clear buttons on search, star animation on favorite toggle
- **Consistent Theme**: Unified color system with brand and accent gradients

## Tech Stack

- **React 18** with **TypeScript** (ES6+)
- **Vite** - Fast build tool and dev server
- **Chakra UI** - Component library with modular styling
- **Zustand** - Lightweight state management
- **React Query** (@tanstack/react-query) - Server state management
- **Axios** - HTTP client
- **React Router** - Route-based navigation
- **Recharts** - Chart visualization library
- **ESLint & Prettier** - Code quality and formatting

## Architecture

```
artist-showcase/
├── src/
│   ├── api/              # API configuration and service functions
│   │   ├── axios.ts      # Axios instance with interceptors
│   │   ├── lastfm.ts     # Last.fm API functions
│   │   └── queryClient.ts # React Query configuration
│   ├── components/       # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── AlbumCard.tsx (memoized)
│   │   ├── TrackList.tsx
│   │   └── ...
│   ├── pages/           # Route-based page components (lazy loaded)
│   │   ├── HomePage.tsx
│   │   ├── ArtistPage.tsx
│   │   ├── AlbumDetailPage.tsx
│   │   ├── FavouritesPage.tsx
│   │   └── BestPlayedPage.tsx
│   ├── hooks/           # Custom React Query hooks
│   │   ├── useDebounce.ts
│   │   ├── useArtistAlbums.ts
│   │   └── ...
│   ├── store/           # Zustand stores
│   │   ├── favouritesStore.ts (persisted)
│   │   └── uiStore.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── lastfm.ts    # API response types
│   │   └── domain.ts    # Domain types
│   ├── utils/           # Utility functions
│   │   ├── formatters.ts
│   │   ├── sorting.ts
│   │   └── errorHandling.ts
│   └── theme/           # Chakra UI theme customization
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or extract the project**

```bash
cd artist-showcase
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:

```env
VITE_LASTFM_API_KEY=d732731be2f5f0ec4b10e5a3607d7090
VITE_LASTFM_API_URL=https://ws.audioscrobbler.com/2.0/
```

> **Note**: You can use the provided API key or create your own at [Last.fm API](https://www.last.fm/api/account/create)

4. **Run the development server**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Search for Music

1. **Home Page**: Enter keywords to search for tracks or albums
2. **Artist Search**: Navigate to an artist's page to see all their albums
3. **Album Details**: Click any album to view its full track list

### Managing Favourites

- Click the ⭐ icon on any track to add it to favourites
- Access your favourites from the navigation menu
- Filter favourites using the search bar
- Click any track to navigate to its album

### View Statistics

- Navigate to "Best Played" from the menu
- Search for an album
- View an interactive bar chart of the top 10 most-played tracks

## Design Philosophy

The application features a **modern, polished UI** with attention to detail:

- **Visual Hierarchy**: Clear distinction between primary and secondary actions
- **Smooth Interactions**: All hover states use smooth cubic-bezier transitions
- **Color Psychology**: Brand blue for trust, accent purple for creativity
- **Micro-interactions**: Subtle animations that delight without distracting
- **Accessibility**: High contrast ratios, clear focus states, semantic HTML
- **Consistency**: Unified spacing system (4, 6, 8, 10, 16px units)
- **Modern Aesthetics**: Gradient text, rounded cards, floating elements

## Key Technical Implementations

### Performance Optimizations

- **Route-based code splitting** with `React.lazy()` and `Suspense`
- **Component memoization** with `React.memo` (AlbumCard, TrackListItem)
- **Expensive computations** memoized with `useMemo` and `useCallback`
- **Debounced search** inputs (300ms delay)
- **React Query caching** (5-10 minute stale times)
- **Image lazy loading** with native `loading="lazy"` attribute
- **Skeleton loaders** for perceived performance

### State Management Strategy

- **Server State**: React Query (API data, caching, loading states)
- **Client State**: Zustand (favourites with localStorage, UI preferences)
- **Local State**: React hooks (form inputs, UI toggles)

### Error Handling

- Global error boundary for React errors
- Axios interceptors for API errors
- Retry logic (2 retries) in React Query
- Toast notifications for user feedback
- Graceful fallbacks and empty states

### Responsive Design

- Mobile-first approach
- Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
- Responsive grid layouts (2-6 columns based on screen size)
- Touch-optimized interactions

### TypeScript

- Strict mode enabled
- Full type coverage (no `any` types)
- Interface definitions for all API responses
- Domain types separate from API types
- Generic types for reusable components

## API Rate Limits

The Last.fm API has rate limits. If you encounter rate limit errors:
- Wait a few minutes before making more requests
- The app automatically retries failed requests
- Consider creating your own API key for higher limits

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### Code Style

The code follows natural, human-like patterns:
- Meaningful variable and function names
- Mix of function declarations and arrow functions
- Practical component sizes (50-150 lines)
- Comments for complex logic
- Consistent but not robotic formatting

### Git Workflow

Commits are organized by feature/phase:
- Initial setup and configuration
- API integration and hooks
- Component development
- Page implementation
- Performance optimization
- Documentation

## License

This project is for assessment purposes.

## Credits

- **API**: [Last.fm API](https://www.last.fm/api)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **Charts**: [Recharts](https://recharts.org/)
