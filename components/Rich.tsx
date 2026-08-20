"use client";

import { Fragment, type ReactNode } from "react";

const INLINE_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function rich(text: string, keyPrefix = "r"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;

  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-${i++}`} className="font-semibold text-ink">
          {tok.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(
        <code key={`${keyPrefix}-${i++}`} className="code-inline">
          {tok.slice(1, -1)}
        </code>
      );
    }
    last = INLINE_RE.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Paragraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const lines = text.split("\n");
  return (
    <p className={className}>
      {lines.map((line, idx) => (
        <Fragment key={idx}>
          {rich(line, `p${idx}`)}
          {idx < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}
