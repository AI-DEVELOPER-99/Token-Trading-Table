import type { Token, TokenCategory } from '@/types';

const TOKEN_SYMBOLS = [
  'BONK', 'WIF', 'MYRO', 'SAMO', 'ORCA', 'RAY', 'MNGO', 'COPE', 
  'TULIP', 'PORT', 'FIDA', 'MEDIA', 'SNY', 'SBR', 'SOLC', 'SLIM',
  'JET', 'STAR', 'BASIS', 'GRAPE', 'GST', 'GMT', 'DUST', 'POLIS'
];

const TOKEN_NAMES = [
  'Bonk Inu', 'Dogwifhat', 'Myro', 'Samoyedcoin', 'Orca Protocol',
  'Raydium', 'Mango Markets', 'Cope Protocol', 'Tulip Protocol',
  'Port Finance', 'Bonfida', 'Media Network', 'Synthetify', 'Saber',
  'Solcasino', 'Solanium', 'JetProtocol', 'Solster', 'Basis Markets',
  'Grape Protocol', 'Green Satoshi', 'STEPN', 'Dust Protocol', 'Star Atlas'
];

/**
 * Generate random price between min and max
 */
function randomPrice(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer between min and max
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random token address
 */
function generateAddress(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

/**
 * Generate mock token data
 */
export function generateMockToken(index: number, category: TokenCategory): Token {
  const symbol = TOKEN_SYMBOLS[index % TOKEN_SYMBOLS.length];
  const name = TOKEN_NAMES[index % TOKEN_NAMES.length];
  const price = randomPrice(0.0001, 100);
  const volume24h = randomPrice(100000, 50000000);
  const marketCap = price * randomInt(1000000, 1000000000);
  
  // Calculate creation date based on category
  let createdAt: Date;
  const now = new Date();
  
  if (category === 'new-pairs') {
    // Created within last 24 hours
    createdAt = new Date(now.getTime() - randomInt(0, 24 * 60 * 60 * 1000));
  } else if (category === 'final-stretch') {
    // Created 5-7 days ago
    createdAt = new Date(now.getTime() - randomInt(5, 7) * 24 * 60 * 60 * 1000);
  } else {
    // Created 8+ days ago
    createdAt = new Date(now.getTime() - randomInt(8, 30) * 24 * 60 * 60 * 1000);
  }

  return {
    id: `${category}-${index}`,
    symbol: `${symbol}${index}`,
    name: `${name} ${index}`,
    address: generateAddress(),
    price,
    priceChange24h: randomPrice(-50, 100),
    volume24h,
    marketCap,
    liquidity: marketCap * randomPrice(0.1, 0.3),
    holders: randomInt(100, 50000),
    category,
    createdAt: createdAt.toISOString(),
    lastUpdated: now.toISOString(),
    chain: ['SOL', 'ETH', 'BASE'][randomInt(0, 2)] as 'SOL' | 'ETH' | 'BASE',
    verified: Math.random() > 0.3,
    migrationProgress: category === 'final-stretch' ? randomInt(60, 95) : undefined,
    migrationDate: category === 'final-stretch' 
      ? new Date(now.getTime() + randomInt(1, 3) * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
  };
}

/**
 * Generate a full set of mock tokens
 */
export function generateMockTokens(
  newPairsCount: number = 20,
  finalStretchCount: number = 15,
  migratedCount: number = 25
): Token[] {
  const tokens: Token[] = [];
  
  // Generate new pairs
  for (let i = 0; i < newPairsCount; i++) {
    tokens.push(generateMockToken(i, 'new-pairs'));
  }
  
  // Generate final stretch tokens
  for (let i = 0; i < finalStretchCount; i++) {
    tokens.push(generateMockToken(i, 'final-stretch'));
  }
  
  // Generate migrated tokens
  for (let i = 0; i < migratedCount; i++) {
    tokens.push(generateMockToken(i, 'migrated'));
  }
  
  return tokens;
}
