import { Fragment } from 'react'

const KEYWORDS: Record<'go' | 'cpp', string[]> = {
  go: ['type', 'struct', 'func', 'return', 'package', 'import', 'const', 'map', 'string', 'var'],
  cpp: ['class', 'public', 'const', 'double', 'float', 'std', 'uint64_t', 'vector', 'return', 'struct'],
}

// A deliberately tiny highlighter: comments, keywords, everything else plain.
function highlight(line: string, lang: 'go' | 'cpp') {
  const comment = line.indexOf('//')
  const code = comment >= 0 ? line.slice(0, comment) : line
  const kw = new Set(KEYWORDS[lang])
  const parts = code.split(/(\b\w+\b)/)
  return (
    <>
      {parts.map((p, i) =>
        kw.has(p) ? (
          <span key={i} className="text-signal-ink">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
      {comment >= 0 && <span className="text-ink-3 italic">{line.slice(comment)}</span>}
    </>
  )
}

/** A real excerpt from the repo, for projects that have no screenshot. */
export function CodeThumb({ file, lang, code }: { file: string; lang: 'go' | 'cpp'; code: string }) {
  return (
    <div className="flex size-full flex-col bg-paper-3/60" role="img" aria-label={`Code excerpt from ${file}`}>
      <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
        <span className="size-2 bg-rule-strong" />
        <span className="size-2 bg-rule-strong" />
        <span className="size-2 bg-rule-strong" />
        <span className="ml-2 truncate font-mono text-[0.625rem] text-ink-3">{file}</span>
      </div>
      <pre aria-hidden="true" className="flex-1 overflow-hidden px-3 py-2.5 font-mono text-[0.625rem] leading-[1.65] text-ink-2 [font-stretch:87.5%] sm:text-[0.6875rem]">
        {code.split('\n').map((line, i) => (
          <div key={i} className="whitespace-pre">
            <span className="mr-3 inline-block w-4 text-right text-ink-3/60 select-none">{i + 1}</span>
            {highlight(line.replaceAll('\t', '    '), lang)}
          </div>
        ))}
      </pre>
    </div>
  )
}
