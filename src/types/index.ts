/**
 * Token data interface representing a trading pair
 */
export interface Token {
  id: string;
  symbol: string;
  name: string;
  address: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  category: TokenCategory;
  createdAt: string;
  lastUpdated: string;
  chain: 'SOL' | 'ETH' | 'BASE';
  logo?: string;
  verified: boolean;
  migrationProgress?: number; // 0-100 for Final Stretch
  migrationDate?: string;
}

/**
 * Token category types
 */
export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';

/**
 * Price update from WebSocket
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  timestamp: number;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: SortableField;
  direction: 'asc' | 'desc';
}

export type SortableField = 
  | 'price' 
  | 'priceChange24h' 
  | 'volume24h' 
  | 'marketCap' 
  | 'liquidity' 
  | 'holders' 
  | 'createdAt';

/**
 * Filter state
 */
export interface FilterState {
  category: TokenCategory | 'all';
  chain: 'SOL' | 'ETH' | 'BASE' | 'all';
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  verifiedOnly: boolean;
}

/**
 * Loading state types
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

/**
 * Redux state interfaces
 */
export interface TokenState {
  tokens: Token[];
  filteredTokens: Token[];
  loading: LoadingState;
  error: string | null;
  sort: SortConfig;
  filter: FilterState;
  selectedToken: Token | null;
}

/**
 * WebSocket connection state
 */
export interface WebSocketState {
  connected: boolean;
  reconnecting: boolean;
  error: string | null;
}
