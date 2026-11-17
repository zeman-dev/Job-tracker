import Link from "next/link";
import { IconLayoutKanban } from '@tabler/icons-react';
export function Header() {
  return (
    <header>
      <Link href="/" aria-label="Home Page">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <IconLayoutKanban className="w-4 h-4 text-white" />
          </div>
          <div className="text-[15px] font-medium">JobTracker</div>
        </div>
      </Link>
    </header>
  );
}
