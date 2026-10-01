import type { ReactNode } from "react";

/**
 * Renders the inline markup used in content files:
 *   *serif accent*  →  the editorial italic accent
 *   **emphasis**    →  brighter text
 */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      match[1] !== undefined ? (
        <span key={match.index} className="text-fg">
          {match[1]}
        </span>
      ) : (
        <span key={match.index} className="font-accent">
          {match[2]}
        </span>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <>{parts}</>;
}
