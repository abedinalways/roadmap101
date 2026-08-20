"use client";

export type CodeToken = { text: string; cls: string };

const TOKEN_RE = new RegExp(
  [
    "(\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|<!--[\\s\\S]*?-->)", // 1 comment
    "(\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'|`(?:\\\\.|[^`\\\\])*`)", // 2 string
    "\\b(const|let|var|function|return|import|export|from|default|type|interface|enum|extends|implements|keyof|in|as|readonly|async|await|new|typeof|instanceof|if|else|switch|case|throw|try|catch|finally|for|while|of|using|void|declare|yield|class|this|super|true|false|null|undefined|private|protected|public|static|get|set|namespace|require|module|satisfies)\\b", // 3 keyword
    "([A-Za-z_$][\\w$]*)(?=\\s*\\()", // 4 function
    "\\b[A-Z][A-Za-z0-9_]*\\b", // 5 type
    "\\b\\d[\\d_]*(?:\\.\\d+)?\\b", // 6 number
    "(@[A-Za-z_][\\w$]*)", // 7 decorator
    "([A-Za-z-]+=)", // 8 attribute
    "([<>]\\/?\\s?\\w[\\w-]*)", // 9 jsx tag
  ].join("|"),
  "g"
);

export function tokenizeCode(code: string): CodeToken[] {
  const out: CodeToken[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) {
      out.push({ text: code.slice(last, m.index), cls: "tok-plain" });
    }
    const [, c, s, k, f, t, n, at, attr, tag] = m;
    const cls = c
      ? "tok-com"
      : s
        ? "tok-str"
        : k
          ? "tok-kw"
          : f
            ? "tok-fn"
            : t
              ? "tok-type"
              : n
                ? "tok-num"
                : at
                  ? "tok-at"
                  : attr
                    ? "tok-tag"
                    : tag
                      ? "tok-tag"
                      : "tok-plain";
    out.push({ text: m[0], cls });
    last = TOKEN_RE.lastIndex;
  }
  if (last < code.length) {
    out.push({ text: code.slice(last), cls: "tok-plain" });
  }
  return out;
}
