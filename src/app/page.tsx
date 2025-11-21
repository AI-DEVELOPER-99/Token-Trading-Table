'use client';

import * as React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import type { SortableField, TokenCategory } from '@/types';
import { useTokens } from '@/hooks/useTokens';
import { useWebSocket } from '@/hooks/useWebSocket';
import { setTokens, setSort, setFilter, setLoading, setError } from '@/store/tokenSlice';
import { TokenTable } from '@/components/organisms/TokenTable';
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Search, TrendingUp, Activity, Zap, Menu } from 'lucide-react';
import { cn } from '@/utils/helpers';

const queryClient = new QueryClient();

/**
 * Navigation bar component
 */
function NavBar() {
  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const filter = useSelector((state: RootState) => state.tokens.filter);
  const dispatch = useDispatch<AppDispatch>();

  const chains = [
    { value: 'SOL', label: 'Solana', color: 'from-purple-500 to-pink-500' },
    { value: 'ETH', label: 'Ethereum', color: 'from-blue-500 to-cyan-500' },
    { value: 'BASE', label: 'Base', color: 'from-blue-600 to-indigo-600' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Nav Items */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-success to-primary flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                AXIOM
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Discover
              </Button>
              <Button variant="default" size="sm">
                Pulse
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Trackers
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Perpetuals
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Yield
              </Button>
            </div>
          </div>

          {/* Chain Selector and Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/30 border border-border">
              {chains.map((chain) => (
                <button
                  key={chain.value}
                  onClick={() => dispatch(setFilter({ chain: chain.value as any }))}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    filter.chain === chain.value
                      ? 'bg-gradient-to-r ' + chain.color + ' text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  <div className={cn(
                    'h-2 w-2 rounded-full',
                    filter.chain === chain.value && 'bg-white animate-pulse'
                  )} />
                  {chain.label}
                </button>
              ))}
            </div>

            <Badge variant="success" className="hidden sm:flex items-center gap-1.5">
              <div className="h-2 w-2 bg-success-foreground rounded-full animate-pulse" />
              {tokens.length} Live
            </Badge>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Filter bar component
 */
function FilterBar() {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.tokens.filter);
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories: Array<{ value: TokenCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { value: 'all', label: 'All Tokens', icon: <Activity className="h-4 w-4" /> },
    { value: 'new-pairs', label: 'New Pairs', icon: <Zap className="h-4 w-4" /> },
    { value: 'final-stretch', label: 'Final Stretch', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'migrated', label: 'Migrated', icon: <Activity className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => dispatch(setFilter({ category: cat.value }))}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              'border border-border hover:border-primary/50',
              filter.category === cat.value
                ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/20'
                : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-accent/50'
            )}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tokens by name, symbol, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-accent/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Main page content component
 */
function PageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const loading = useSelector((state: RootState) => state.tokens.loading);
  const error = useSelector((state: RootState) => state.tokens.error);
  
  const { data, isLoading, error: queryError, refetch } = useTokens();
  
  // Load initial data
  React.useEffect(() => {
    if (isLoading) {
      dispatch(setLoading('loading'));
    } else if (queryError) {
      dispatch(setError(queryError.message));
    } else if (data) {
      dispatch(setTokens(data.data));
    }
  }, [data, isLoading, queryError, dispatch]);

  // Connect to WebSocket for real-time updates
  useWebSocket(tokens, tokens.length > 0);

  const handleSort = React.useCallback(
    (field: SortableField) => {
      const currentSort = store.getState().tokens.sort;
      const direction =
        currentSort.field === field && currentSort.direction === 'desc' ? 'asc' : 'desc';
      dispatch(setSort({ field, direction }));
    },
    [dispatch]
  );

  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-destructive text-lg">{error}</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container mx-auto px-4 md:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Token Discovery
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Track new pairs, final stretch tokens, and migrated tokens in real-time across multiple chains
          </p>
        </header>

        <FilterBar />

        <ErrorBoundary>
          <TokenTable onSort={handleSort} loading={loading === 'loading'} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

/**
 * Main page component with providers
 */
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PageContent />
      </Provider>
    </QueryClientProvider>
  );
}
