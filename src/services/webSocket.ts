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
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (!this.connected || this.tokens.length === 0) return;

      const updates: PriceUpdate[] = this.tokens.map((token) => ({
        tokenId: token.id,
        price: token.price * (1 + (Math.random() - 0.5) * 0.01), // Simulate small price changes
        priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 2,
        volume24h: token.volume24h * (1 + (Math.random() - 0.5) * 0.05),
        timestamp: Date.now(),
      }));

      this.callbacks.forEach((callback) => callback(updates));
    }, 2000); // Send updates every 2 seconds
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
