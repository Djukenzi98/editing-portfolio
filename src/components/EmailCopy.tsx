import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon, MailIcon } from './icons'
import { EMAIL } from '../site'

/**
 * The email address written out in full, with a copy button — for visitors
 * whose mailto: link opens nothing (no desktop mail client set up).
 */
export default function EmailCopy({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const addressRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      // clipboard blocked: select the address so Ctrl+C / long-press works
      const selection = window.getSelection()
      if (!addressRef.current || !selection) return
      const range = document.createRange()
      range.selectNodeContents(addressRef.current)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  return (
    <div
      className={`inline-flex max-w-full items-center gap-1 rounded-sm border border-border bg-surface/60 py-1 pr-1 pl-3 ${className}`}
    >
      <MailIcon className="h-4 w-4 shrink-0 text-accent" />
      <a
        ref={addressRef}
        href={`mailto:${EMAIL}`}
        className="truncate px-1.5 text-sm text-zinc-200 transition-colors select-all hover:text-accent"
      >
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        title={copied ? 'Copied!' : 'Copy'}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-2 font-type text-[0.7rem] tracking-[0.14em] text-zinc-400 uppercase transition-colors hover:bg-surface-2 hover:text-accent"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-accent" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}
