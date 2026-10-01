export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-fg px-4 py-2 text-sm font-medium text-canvas focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[200]"
    >
      {label}
    </a>
  );
}
