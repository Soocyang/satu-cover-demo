'use client';

import { CONFIGS } from '@/lib/configs';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { PublicRoutes } from '@/types/common';

function DemoRibbon() {
  const pathname = usePathname();
  const isPublicRoute = useMemo(
    () => CONFIGS.PUBLIC_ROUTES.includes(pathname as PublicRoutes),
    [pathname],
  );

  if (!isPublicRoute) {
    return;
  }

  return (
    <div className="fixed top-0 right-0 overflow-visible pointer-events-none">
      <div className="absolute transform rotate-45 bg-yellow-500 py-2 w-80 text-center origin-center right-[-96px] top-[32px] shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium text-sm whitespace-nowrap">Demo</span>
        </div>
      </div>
    </div>
  );
}

function DemoTag({ className }: React.ComponentProps<'div'>) {
  return (
    <Badge className={cn('bg-yellow-500 hover:bg-yellow-400', className)}>
      Demo
    </Badge>
  );
}

export { DemoRibbon, DemoTag };
