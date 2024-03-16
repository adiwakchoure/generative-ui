import Link from 'next/link';
import { forum } from '@/app/fonts';

import {
  IconSparkles,
  IconSeparator,
} from '@/components/ui/icons';

let context = "Market Research Demo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <div className="flex-grow" />
      <span className={`text-xl ${forum.className} font-bold inline-flex items-center home-links whitespace-nowrap`}>
        <Link href="/">
          <span className = "font-bold text-purple-800">
            <IconSparkles className="inline mr-0 w-4 sm:w-5 mb-0.5" />
            Mentat
          </span>
        </Link>
        <IconSeparator className="w-6 h-6 text-muted-foreground/20" />
        <a href="/">
          {context}
        </a>
      </span>
      <div className="flex-grow" />
    </header>
  );
}

{/* <Button variant="outline" asChild>
  <a
    target="_blank"
    href="https://github.com/vercel/ai/tree/main/examples/next-ai-rsc"
    rel="noopener noreferrer"
  >
    <IconGitHub />
    <span className="hidden ml-2 md:flex">GitHub</span>
  </a>
</Button> */}