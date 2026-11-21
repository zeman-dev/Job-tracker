import Link from "next/link";
import { IconLayoutKanban } from '@tabler/icons-react';

const ghostButtonClassName =
  "rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-900 transition-colors hover:bg-slate-50";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-3.5">
      <Link href="/" aria-label="Home Page">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
            <IconLayoutKanban className="h-4 w-4 text-white" />
          </div>
          <div className="text-[15px] font-semibold text-slate-900">JobTracker</div>
        </div>
      </Link>

      <nav className="flex items-center gap-2.5">
        <Link href="/login" className={ghostButtonClassName}>
          Log in
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-blue-600 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-700"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}
