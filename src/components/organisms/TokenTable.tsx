'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { ArrowUpDown, TrendingUp, TrendingDown, ExternalLink, Copy, Check } from 'lucide-react';
import type { RootState } from '@/store';
import type { Token, SortableField } from '@/types';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Badge } from '@/components/atoms/Badge';
import { Tooltip } from '@/components/molecules/Tooltip';
import { Modal } from '@/components/molecules/Modal';
import { useWebSocket } from '@/hooks/useWebSocket';
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
 * Sparkline chart component for price trends
 */
const Sparkline = ({ trend }: { trend: number }) => {
  const points = React.useMemo(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(50 + Math.sin(i * 0.5 + trend) * 20 + Math.random() * 10);
    }
    return data;
  }, [trend]);

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min;

  const pathData = points
    .map((point, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="80" height="30" className="opacity-60">
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

/**
 * Token row component with animations and interactions
 */
const TokenRow = React.memo(({ token, index }: { token: Token; index: number }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [priceClass, setPriceClass] = React.useState('');
  const [imageError, setImageError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Animate price changes
  React.useEffect(() => {
    setPriceClass('animate-pulse-price');
    const timer = setTimeout(() => setPriceClass(''), 1000);
    return () => clearTimeout(timer);
  }, [token.price]);

  // Reset image error state when token changes
  React.useEffect(() => {
    setImageError(false);
  }, [token.id]);

  const priceChangeColor = getPriceChangeColor(token.priceChange24h);
  const isPositive = token.priceChange24h > 0;

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <tr
        className={cn(
          'border-b border-border/50 transition-all duration-200 cursor-pointer group',
          'hover:bg-accent/20',
          isPositive && 'hover:gradient-border'
        )}
        onClick={() => setModalOpen(true)}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Rank */}
        <td className="p-3 text-muted-foreground text-sm font-medium w-12">
          {index + 1}
        </td>

        {/* Token Info */}
        <td className="p-3">
          <div className="flex items-center gap-3">
            {token.profilePic && !imageError ? (
              <img
                src={token.profilePic}
                alt={token.name}
                className="h-9 w-9 rounded-full object-cover bg-muted ring-2 ring-border"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-xs ring-2 ring-border"
                style={{ backgroundColor: `hsl(${(token.symbol.charCodeAt(0) * 137) % 360}, 65%, 50%)` }}
              >
                {token.symbol.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="font-semibold text-foreground flex items-center gap-2">
                {token.symbol}
                <Badge variant="outline" className="text-xs py-0 px-1.5 h-5">
                  {token.chain}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                {token.name}
              </div>
            </div>
          </div>
        </td>

        {/* Price */}
        <td className={cn('p-3 font-mono text-sm font-medium', priceClass)}>
          <div className="flex flex-col">
            <span>{formatPrice(token.price)}</span>
          </div>
        </td>

        {/* 24h Change with Sparkline */}
        <td className={cn('p-3', priceChangeColor)}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-medium text-sm">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {formatPercentage(token.priceChange24h)}
            </div>
            <div className={priceChangeColor}>
              <Sparkline trend={token.priceChange24h} />
            </div>
          </div>
        </td>

        {/* Volume */}
        <td className="p-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium">${formatNumber(token.volume24h)}</span>
            <span className="text-xs text-muted-foreground">24h Vol</span>
          </div>
        </td>

        {/* Market Cap */}
        <td className="p-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium">${formatNumber(token.marketCap)}</span>
            <span className="text-xs text-muted-foreground">MCap</span>
          </div>
        </td>

        {/* Liquidity */}
        <td className="p-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium">${formatNumber(token.liquidity)}</span>
            <span className="text-xs text-muted-foreground">Liq</span>
          </div>
        </td>

        {/* Holders */}
        <td className="p-3 text-sm font-medium">
          {formatNumber(token.holders, 0)}
        </td>

        {/* Category */}
        <td className="p-3">
          <Badge
            variant={
              token.category === 'new-pairs'
                ? 'success'
                : token.category === 'final-stretch'
                ? 'secondary'
                : 'default'
            }
            className="text-xs font-medium"
          >
            {token.category.replace('-', ' ')}
          </Badge>
        </td>

        {/* Created */}
        <td className="p-3 text-sm text-muted-foreground">
          {formatTimeAgo(token.createdAt)}
        </td>

        {/* Actions */}
        <td className="p-3">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip content={copied ? "Copied!" : "Copy address"}>
              <button
                onClick={copyAddress}
                className="p-1.5 rounded hover:bg-accent transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </Tooltip>
            <Tooltip content="View details">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="p-1.5 rounded hover:bg-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`${token.name} (${token.symbol})`}
        description={`Detailed information about ${token.symbol}`}
      >
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Price</div>
              <div className="text-xl font-bold">{formatPrice(token.price)}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">24h Change</div>
              <div className={cn('text-xl font-bold', priceChangeColor)}>
                {formatPercentage(token.priceChange24h)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
              <div className="text-xl font-bold">${formatNumber(token.marketCap)}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Volume 24h</div>
              <div className="text-xl font-bold">${formatNumber(token.volume24h)}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Liquidity</div>
              <div className="text-xl font-bold">${formatNumber(token.liquidity)}</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/20 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Holders</div>
              <div className="text-xl font-bold">{formatNumber(token.holders, 0)}</div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-accent/20 border border-border">
            <div className="text-sm text-muted-foreground mb-2">Contract Address</div>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-mono break-all text-foreground">{token.address}</code>
              <button
                onClick={copyAddress}
                className="p-2 rounded hover:bg-accent transition-colors shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
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
  align?: 'left' | 'right' | 'center';
}

function TableHeader({ label, field, onSort, align = 'left' }: TableHeaderProps) {
  const sort = useSelector((state: RootState) => state.tokens.sort);
  const isSorted = field && sort.field === field;

  return (
    <th
      className={cn(
        'p-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider',
        field && 'cursor-pointer hover:text-foreground transition-colors select-none',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center'
      )}
      onClick={() => field && onSort && onSort(field)}
    >
      <div className={cn('flex items-center gap-2', align === 'right' && 'justify-end')}>
        {label}
        {field && (
          <ArrowUpDown
            className={cn(
              'h-3.5 w-3.5 transition-all',
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
  const { isConnected } = useWebSocket(tokens, true);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-3"><Skeleton height={20} width={30} /></td>
                <td className="p-3"><Skeleton height={36} width={150} /></td>
                <td className="p-3"><Skeleton height={24} width={80} /></td>
                <td className="p-3"><Skeleton height={24} width={120} /></td>
                <td className="p-3"><Skeleton height={40} width={100} /></td>
                <td className="p-3"><Skeleton height={40} width={100} /></td>
                <td className="p-3"><Skeleton height={40} width={100} /></td>
                <td className="p-3"><Skeleton height={24} width={60} /></td>
                <td className="p-3"><Skeleton height={24} width={80} /></td>
                <td className="p-3"><Skeleton height={24} width={60} /></td>
                <td className="p-3"><Skeleton height={24} width={60} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {!isConnected && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm border-b border-destructive/20">
          ⚠ Disconnected from live updates
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-accent/30 border-b border-border">
            <tr>
              <TableHeader label="#" />
              <TableHeader label="Token" />
              <TableHeader label="Price" field="price" onSort={onSort} />
              <TableHeader label="24h Change" field="priceChange24h" onSort={onSort} />
              <TableHeader label="Volume" field="volume24h" onSort={onSort} />
              <TableHeader label="Market Cap" field="marketCap" onSort={onSort} />
              <TableHeader label="Liquidity" />
              <TableHeader label="Holders" field="holders" onSort={onSort} />
              <TableHeader label="Category" />
              <TableHeader label="Created" field="createdAt" onSort={onSort} />
              <TableHeader label="" />
            </tr>
          </thead>
          <tbody>
            {tokens.length === 0 ? (
              <tr>
                <td colSpan={11} className="p-12 text-center">
                  <div className="text-muted-foreground text-lg">No tokens found</div>
                  <div className="text-muted-foreground text-sm mt-2">Try adjusting your filters</div>
                </td>
              </tr>
            ) : (
              tokens.map((token, index) => <TokenRow key={token.id} token={token} index={index} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
