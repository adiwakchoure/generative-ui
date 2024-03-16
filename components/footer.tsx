import React from 'react';

import { cn } from '@/lib/utils';
import { ExternalLink } from '@/components/external-link';

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-purple-800',
        className,
      )}
      {...props}
    >
      With ♥ from Goa. Built with NextJS, FastAPI and PostgreSQL.
    </p>
  );
}
