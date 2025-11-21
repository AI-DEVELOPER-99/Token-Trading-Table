import * as React from 'react';
import { cn } from '@/utils/helpers';

/**
 * Skeleton loading component for shimmer effect
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, animate = true, ...props }, ref) => {
    const baseClasses = 'bg-muted relative overflow-hidden';
    
    const variantClasses = {
      rectangular: 'rounded-md',
      circular: 'rounded-full',
      text: 'rounded h-4',
    };

    const animateClasses = animate
      ? 'after:absolute after:inset-0 after:translate-x-[-100%] after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent'
      : '';

    const style: React.CSSProperties = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], animateClasses, className)}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
