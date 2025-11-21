import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrices } from '@/store/tokenSlice';
import { getWebSocketService } from '@/services/webSocket';
import type { Token, PriceUpdate } from '@/types';

/**
 * Hook to manage WebSocket connection and price updates
 */
export function useWebSocket(tokens: Token[], enabled: boolean = true) {
  const dispatch = useDispatch();
  const wsRef = useRef(getWebSocketService());
  const tokensRef = useRef<Token[]>(tokens);

  // Update tokens ref when tokens change
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  // Handle price updates
  const handlePriceUpdate = useCallback((updates: PriceUpdate[]) => {
    dispatch(updatePrices(updates));
  }, [dispatch]);

  // Connect/disconnect WebSocket
  useEffect(() => {
    if (!enabled || tokens.length === 0) return;

    const ws = wsRef.current;
    ws.connect(tokens);
    
    const unsubscribe = ws.subscribe(handlePriceUpdate);

    return () => {
      unsubscribe();
      ws.disconnect();
    };
  }, [tokens, enabled, handlePriceUpdate]);

  return {
    isConnected: wsRef.current.isConnected(),
  };
}
