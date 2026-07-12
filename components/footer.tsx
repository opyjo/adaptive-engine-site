import Link from "next/link";
import { API_BASE_URL, GITHUB_URL } from "@/lib/snippets";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Adaptive Engine — invisible adaptive-learning infrastructure.
          Stores no names, no emails, no question content.
        </p>
        <div className="flex gap-4">
          <a href={`${API_BASE_URL}/health/live`} target="_blank" rel="noreferrer" className="hover:text-zinc-800 dark:hover:text-zinc-200">
            API status
          </a>
          <Link href="/reference" className="hover:text-zinc-800 dark:hover:text-zinc-200">
            Reference
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-zinc-800 dark:hover:text-zinc-200">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
