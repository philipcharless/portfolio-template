import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick, PhoneCall } from '@/components/slab'
import { SparkIcon } from './ProjectIcons'
import { AIWindow, CaseStudyPanel } from './ProjectPanels'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of cards,
 * each previewing its own body of work, each opening the work itself in a
 * near-fullscreen dialog. Every project opens its case study
 * (public/case-study.html?p=<id>); the Systems card opens all of them as a
 * grid.
 *
 * The dialog is a portal at z 8000.
 */
type Project = {
  id: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  Section: ComponentType
  span?: 2
  /** A small orange kicker above the title (stacked builds only). */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  /** Shown as chips when the card has no other preview. */
  tags?: string[]
  Preview?: ComponentType
  /** Phone filter buckets. Empty means the card only shows under All. */
  cats: Cat[]
}

type Cat = 'ghl' | 'sync' | 'ai'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ghl', label: 'GHL' },
  { key: 'sync', label: 'Syncs' },
  { key: 'ai', label: 'AI' },
]

/** Tool marks, from public/icons. */
const GHL = '/icons/gohighlevel.png'
const MAKE = '/icons/make.svg'
const CLICKUP = '/icons/clickup.svg'
const SLACK = '/icons/slack.svg'
const CLAUDE = '/icons/ai/claude-color.svg'

const caseStudy = (id: string, title: string) => () => <CaseStudyPanel id={id} title={title} />

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
const AI_LEAVES = leaves(aiStack)

/* ---------- Previews ---------- */

/** A paper mock of the case study, the way the page itself reads. */
function AttractionPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Case study</span>
      <span className="bento__doc-title">Agent recruiting, end to end.</span>
      <span className="bento__doc-flow">
        <i>Apply</i>
        <i>Qualify</i>
        <i>Setter</i>
        <i className="is-on">Onboard</i>
      </span>
      <span className="bento__doc-line" />
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

function SystemsPreview() {
  const half = Math.ceil(AI_LEAVES.length / 2)
  const rows = [AI_LEAVES.slice(0, half), AI_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <span className="bento__media bento__tags" aria-hidden="true">
      {tags.map((t) => (
        <span key={t} className="bento__chip">
          {t}
        </span>
      ))}
    </span>
  )
}

/* ---------- The work ---------- */

const ATTRACTION: Project = {
  id: 'attraction-system',
  cats: ['ghl'],
  span: 2,
  title: 'Real Estate Attraction System',
  desc: 'A done-for-you GHL agent recruiting system modeled on a top San Diego mega team: job board intake that auto-qualifies, AI-booked alignment calls, nurture, and training onboarding. Sold in three tiers.',
  Icon: SparkIcon,
  logos: [GHL, MAKE, SLACK, CLICKUP],
  Section: caseStudy('attraction-system', 'Real Estate Attraction System'),
  Preview: AttractionPreview,
}

/** Three integration builds, stacked in one grid cell, each its own pop-up. */
const BUILDS: Project[] = [
  {
    id: 'clickup-sync',
    cats: ['sync'],
    kicker: 'Make.com',
    title: 'ClickUp to GHL Two-Way Sync',
    desc: 'Four scenarios that keep an agent onboarding pipeline in sync, stage and office included.',
    Icon: SparkIcon,
    logos: [CLICKUP],
    Section: caseStudy('clickup-sync', 'ClickUp to GHL Two-Way Sync'),
  },
  {
    id: 'client-onboarding',
    cats: ['sync'],
    kicker: 'Make.com',
    title: 'Automated Client Onboarding',
    desc: 'A survey submission creates the GHL sub-account and a dedicated Slack channel.',
    Icon: SparkIcon,
    logos: [SLACK],
    Section: caseStudy('client-onboarding', 'Automated Client Onboarding'),
  },
  {
    id: 'lofty-sync',
    cats: ['sync'],
    kicker: 'Make.com',
    title: 'Lofty to GHL Lender Sync',
    desc: 'A lender assigned in Lofty puts the buyer in GHL as a contact, automatically.',
    Icon: SparkIcon,
    logos: [MAKE],
    Section: caseStudy('lofty-sync', 'Lofty to GHL Lender Sync'),
  },
]

const SYSTEMS: Project = {
  id: 'systems',
  cats: [],
  title: 'All systems',
  desc: 'Every build on one page, grouped by what it does.',
  Icon: SparkIcon,
  logos: [GHL, MAKE, CLAUDE],
  Section: AIWindow,
  Preview: SystemsPreview,
}

const SMALL: Project[] = [
  {
    id: 'ai-setters',
    cats: ['ai'],
    title: 'AI Appointment Setters',
    desc: 'CloseBot setters that book and reschedule calls without human input.',
    Icon: SparkIcon,
    logos: [GHL],
    tags: ['CloseBot', 'GHL', 'AI'],
    Section: caseStudy('ai-setters', 'AI Appointment Setters'),
  },
  {
    id: 'voice-ai',
    cats: ['ai'],
    title: 'Voice AI Receptionist',
    desc: 'Scoped for a church: LLM selection and warm transfer to staff.',
    Icon: ({ size }) => <PhoneCall size={size} weight="duotone" />,
    tags: ['Voice AI', 'LLMs'],
    Section: caseStudy('voice-ai', 'Voice AI Receptionist'),
  },
  {
    id: 'semaphore-sms',
    cats: ['ghl'],
    title: 'GHL to Semaphore SMS',
    desc: 'GHL texting through a Philippine SMS provider, formats and segments handled.',
    Icon: SparkIcon,
    logos: [GHL],
    tags: ['GHL', 'Semaphore', 'Webhooks'],
    Section: caseStudy('semaphore-sms', 'GHL to Semaphore SMS'),
  },
  {
    id: 'documentation',
    cats: ['ghl'],
    title: 'Documentation as a Service',
    desc: 'Audits and documentation of existing GHL systems for agencies.',
    Icon: SparkIcon,
    logos: [GHL, CLAUDE],
    tags: ['GHL', 'Documentation', 'Claude'],
    Section: caseStudy('documentation', 'Documentation as a Service'),
  },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window. */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cats.includes(cat)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const card = (p: Project) =>
    keep(p) ? (
      <button
        key={p.id}
        type="button"
        className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
        data-id={p.id}
        onClick={(e) => show(p, e.currentTarget)}
        aria-haspopup="dialog"
      >
        <span className="bento__head">
          <Marks p={p} />
          <span className="bento__title">{p.title}</span>
          <span className="bento__desc">{p.desc}</span>
          <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
        </span>
        {p.Preview ? <p.Preview /> : p.tags ? <Tags tags={p.tags} /> : null}
      </button>
    ) : null

  const stack = builds.length > 0 ? (
    <div className="bento__stack">
      {builds.map((b) => (
        <button
          key={b.id}
          type="button"
          className="bento__card bento__card--btn bento__card--build"
          onClick={(e) => show(b, e.currentTarget)}
          aria-haspopup="dialog"
        >
          <span className="bento__build-plate">
            {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}
          </span>
          <span className="bento__build-text">
            <span className="bento__kicker">{b.kicker}</span>
            <span className="bento__build-title">{b.title}</span>
            <span className="bento__build-desc">{b.desc}</span>
          </span>
          <span className="bento__build-arrow">
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Systems I have built and installed.
        </h1>
        <p className="pgrid__lede">
          Recruiting systems, two-way syncs, and AI setters for real estate teams and service businesses. Open a card to see how it works.
        </p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not another card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {card(ATTRACTION)}
          {stack}
          {card(SYSTEMS)}
          {SMALL.map(card)}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
