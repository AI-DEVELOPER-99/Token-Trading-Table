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

const queryClient = new QueryClient();

/**
 * Filter bar component
 */
function FilterBar() {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.tokens.filter);

  const categories: Array<{ value: TokenCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'new-pairs', label: 'New Pairs' },
    { value: 'final-stretch', label: 'Final Stretch' },
    { value: 'migrated', label: 'Migrated' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={filter.category === cat.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch(setFilter({ category: cat.value }))}
          >
            {cat.label}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2">
        {(['all', 'SOL', 'ETH', 'BASE'] as const).map((chain) => (
          <Button
            key={chain}
            variant={filter.chain === chain ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch(setFilter({ chain }))}
          >
            {chain}
          </Button>
        ))}
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
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-destructive text-lg">{error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Token Discovery Table</h1>
        <p className="text-muted-foreground">
          Track new pairs, final stretch tokens, and migrated tokens in real-time
        </p>
        <div className="flex gap-2 mt-4">
          <Badge variant="success">Live Updates</Badge>
          <Badge variant="secondary">{tokens.length} Tokens</Badge>
        </div>
      </header>

      <FilterBar />

      <ErrorBoundary>
        <TokenTable onSort={handleSort} loading={loading === 'loading'} />
      </ErrorBoundary>
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
