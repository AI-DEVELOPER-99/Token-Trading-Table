import type { PriceUpdate, Token } from '@/types';

type WebSocketCallback = (updates: PriceUpdate[]) => void;

/**
 * Mock WebSocket service for real-time price updates
 * Simulates live price feeds with realistic fluctuations
 */
export class MockWebSocketService {
  private callbacks: Set<WebSocketCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];
  private connected: boolean = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  /**
   * Connect to the mock WebSocket
   */
  connect(tokens: Token[]): void {
    this.tokens = tokens;
    this.connected = true;
    this.startPriceUpdates();
  }

  /**
   * Disconnect from the mock WebSocket
   */
  disconnect(): void {
    this.connected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  /**
   * Subscribe to price updates
   */
  subscribe(callback: WebSocketCallback): () => void {
    this.callbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Start sending mock price updates
   */
  private startPriceUpdates(): void {
    // Update prices every 2-5 seconds
    const updateInterval = 2000 + Math.random() * 3000;
    
    this.intervalId = setInterval(() => {
      if (!this.connected) return;
      
      // Randomly select 5-15 tokens to update
      const updateCount = Math.floor(Math.random() * 10) + 5;
      const updates: PriceUpdate[] = [];
      
      for (let i = 0; i < updateCount && i < this.tokens.length; i++) {
        const randomIndex = Math.floor(Math.random() * this.tokens.length);
        const token = this.tokens[randomIndex];
        
        // Generate realistic price change (-5% to +5%)
        const priceChangePercent = (Math.random() - 0.5) * 10;
        const newPrice = token.price * (1 + priceChangePercent / 100);
        
        // Generate volume change
        const volumeChange = (Math.random() - 0.5) * 0.2;
        const newVolume = token.volume24h * (1 + volumeChange);
        
        updates.push({
          tokenId: token.id,
          price: Math.max(0.0001, newPrice),
          priceChange24h: token.priceChange24h + priceChangePercent,
          volume24h: Math.max(0, newVolume),
          timestamp: Date.now(),
        });
      }
      
      // Notify all subscribers
      this.callbacks.forEach(callback => {
        try {
          callback(updates);
        } catch (error) {
          console.error('Error in WebSocket callback:', error);
        }
      });
    }, updateInterval);
  }

  /**
   * Simulate connection error and reconnection
   */
  simulateDisconnect(): void {
    this.connected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    // Attempt to reconnect after 3 seconds
    this.reconnectTimeout = setTimeout(() => {
      this.connected = true;
      this.startPriceUpdates();
    }, 3000);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton instance
let wsInstance: MockWebSocketService | null = null;

/**
 * Get the WebSocket service instance
 */
export function getWebSocketService(): MockWebSocketService {
  if (!wsInstance) {
    wsInstance = new MockWebSocketService();
  }
  return wsInstance;
}
