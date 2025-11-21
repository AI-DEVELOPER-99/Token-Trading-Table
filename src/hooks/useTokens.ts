import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Token, ApiResponse } from '@/types';
import { generateMockTokens } from '@/services/mockData';

/**
 * Simulate API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API function to fetch tokens
 */
async function fetchTokens(): Promise<ApiResponse<Token[]>> {
  await delay(800); // Simulate network delay
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch tokens');
  }
  
  const tokens = generateMockTokens();
  
  return {
    data: tokens,
    timestamp: Date.now(),
  };
}

/**
 * Hook to fetch token data with React Query
 */
export function useTokens(): UseQueryResult<ApiResponse<Token[]>, Error> {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 300000, // Keep in cache for 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch single token details
 */
export function useTokenDetails(tokenId: string | null): UseQueryResult<Token | null, Error> {
  return useQuery({
    queryKey: ['token', tokenId],
    queryFn: async () => {
      if (!tokenId) return null;
      
      await delay(300);
      const response = await fetchTokens();
      return response.data.find(t => t.id === tokenId) || null;
    },
    enabled: !!tokenId,
    staleTime: 10000,
  });
}
