'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { ArrowUpDown, TrendingUp, TrendingDown, Info } from 'lucide-react';
import type { RootState } from '@/store';
import type { Token, SortableField } from '@/types';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Badge } from '@/components/atoms/Badge';
import { Tooltip } from '@/components/molecules/Tooltip';
import { Modal } from '@/components/molecules/Modal';
import {
  formatPrice,
  formatNumber,
  formatPercentage,
  formatTimeAgo,
  getPriceChangeColor,
  cn,
} from '@/utils/helpers';

interface TokenTableProps {
  onSort?: (field: SortableField) => void;
  loading?: boolean;
}

/**
 * Token row component with animations and interactions
 */
const TokenRow = React.memo(({ token }: { token: Token }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [priceClass, setPriceClass] = React.useState('');

  // Animate price changes
  React.useEffect(() => {
    setPriceClass('animate-pulse-price');
    const timer = setTimeout(() => setPriceClass(''), 1000);
    return () => clearTimeout(timer);
  }, [token.price]);

  const priceChangeColor = getPriceChangeColor(token.priceChange24h);

  return (
    <>
      <tr className="border-b transition-colors hover:bg-muted/50 cursor-pointer">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold">{token.symbol.charAt(0)}</span>
            </div>
            <div>
              <div className="font-medium">{token.symbol}</div>
              <div className="text-sm text-muted-foreground">{token.name}</div>
            </div>
          </div>
        </td>

        <td className="p-4">
          <Tooltip content={`Address: ${token.address.slice(0, 12)}...`}>
            <Badge variant="outline">{token.chain}</Badge>
          </Tooltip>
        </td>

        <td className={cn('p-4 font-mono', priceClass)}>
          {formatPrice(token.price)}
        </td>

        <td className={cn('p-4', priceChangeColor)}>
          <div className="flex items-center gap-1">
            {token.priceChange24h > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {formatPercentage(token.priceChange24h)}
          </div>
        </td>

        <td className="p-4">${formatNumber(token.volume24h)}</td>
        
        <td className="p-4">${formatNumber(token.marketCap)}</td>

        <td className="p-4">{formatNumber(token.holders, 0)}</td>

        <td className="p-4">
          <Badge 
            variant={
              token.category === 'new-pairs' 
                ? 'success' 
                : token.category === 'final-stretch' 
                ? 'secondary' 
                : 'default'
            }
          >
            {token.category.replace('-', ' ')}
          </Badge>
        </td>

        <td className="p-4 text-sm text-muted-foreground">
          {formatTimeAgo(token.createdAt)}
        </td>

        <td className="p-4">
          <button
            onClick={() => setModalOpen(true)}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Info className="h-5 w-5" />
          </button>
        </td>
      </tr>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`${token.name} (${token.symbol})`}
        description={`Detailed information about ${token.symbol}`}
      >
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="text-lg font-bold">{formatPrice(token.price)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">24h Change</div>
              <div className={cn('text-lg font-bold', priceChangeColor)}>
                {formatPercentage(token.priceChange24h)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="text-lg font-bold">${formatNumber(token.marketCap)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Volume 24h</div>
              <div className="text-lg font-bold">${formatNumber(token.volume24h)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Liquidity</div>
              <div className="text-lg font-bold">${formatNumber(token.liquidity)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Holders</div>
              <div className="text-lg font-bold">{formatNumber(token.holders, 0)}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Contract Address</div>
            <div className="text-sm font-mono break-all">{token.address}</div>
          </div>
          {token.migrationProgress && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Migration Progress</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${token.migrationProgress}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {token.migrationProgress}% complete
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
});

TokenRow.displayName = 'TokenRow';

/**
 * Table header with sorting functionality
 */
interface TableHeaderProps {
  label: string;
  field?: SortableField;
  onSort?: (field: SortableField) => void;
}

function TableHeader({ label, field, onSort }: TableHeaderProps) {
  const sort = useSelector((state: RootState) => state.tokens.sort);
  const isSorted = field && sort.field === field;

  return (
    <th
      className={cn(
        'p-4 text-left text-sm font-medium text-muted-foreground',
        field && 'cursor-pointer hover:text-foreground transition-colors'
      )}
      onClick={() => field && onSort && onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        {field && (
          <ArrowUpDown
            className={cn(
              'h-4 w-4 transition-all',
              isSorted && 'text-primary'
            )}
          />
        )}
      </div>
    </th>
  );
}

/**
 * Main Token Table component
 */
export function TokenTable({ onSort, loading = false }: TokenTableProps) {
  const tokens = useSelector((state: RootState) => state.tokens.filteredTokens);

  if (loading) {
    return (
      <div className="rounded-md border">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4"><Skeleton height={40} /></td>
                <td className="p-4"><Skeleton height={24} width={60} /></td>
                <td className="p-4"><Skeleton height={24} width={80} /></td>
                <td className="p-4"><Skeleton height={24} width={60} /></td>
                <td className="p-4"><Skeleton height={24} width={80} /></td>
                <td className="p-4"><Skeleton height={24} width={80} /></td>
                <td className="p-4"><Skeleton height={24} width={60} /></td>
                <td className="p-4"><Skeleton height={24} width={100} /></td>
                <td className="p-4"><Skeleton height={24} width={60} /></td>
                <td className="p-4"><Skeleton height={24} width={24} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <TableHeader label="Token" />
            <TableHeader label="Chain" />
            <TableHeader label="Price" field="price" onSort={onSort} />
            <TableHeader label="24h Change" field="priceChange24h" onSort={onSort} />
            <TableHeader label="Volume" field="volume24h" onSort={onSort} />
            <TableHeader label="Market Cap" field="marketCap" onSort={onSort} />
            <TableHeader label="Holders" field="holders" onSort={onSort} />
            <TableHeader label="Category" />
            <TableHeader label="Created" field="createdAt" onSort={onSort} />
            <TableHeader label="Details" />
          </tr>
        </thead>
        <tbody>
          {tokens.length === 0 ? (
            <tr>
              <td colSpan={10} className="p-8 text-center text-muted-foreground">
                No tokens found
              </td>
            </tr>
          ) : (
            tokens.map((token) => <TokenRow key={token.id} token={token} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
