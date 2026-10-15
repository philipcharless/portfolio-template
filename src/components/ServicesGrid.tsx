import type { CSSProperties } from 'react'
import { MagnifyingGlass, Wrench, FileText, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Copy and tool marks for each service live in the data below.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Audit',
    body: 'Map what is already in the account and what is missing or broken.',
    Icon: MagnifyingGlass,
    chips: ['Pipelines', 'Workflows', 'Integrations', 'Deliverability'],
  },
  {
    index: '02',
    label: 'Build',
    body: 'Install the CRM, the automations, and the AI setters.',
    Icon: Wrench,
    chips: ['GHL', 'Make.com', 'CloseBot'],
  },
  {
    index: '03',
    label: 'Document',
    body: 'Write it up so your team, or anyone else, can run it.',
    Icon: FileText,
    chips: ['System docs', 'Standards', 'Handoff'],
  },
]

/* ---------- The services ---------- */

const GHL = '/icons/gohighlevel.png'
const MAKE = '/icons/make.svg'
const N8N = '/icons/ai/n8n.svg'
const ZAPIER = '/icons/ai/zapier.svg'
const CLAUDE = '/icons/ai/claude-color.svg'
const GWS = '/icons/googleworkspace.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'GHL CRM Builds',
    description: 'Pipelines, snapshots, and sub-account setup in GoHighLevel.',
    chip: 'CRM',
    logos: [GHL],
    bullets: ['Pipelines and snapshots', 'Sub-account setup', 'Agent recruiting systems'],
  },
  {
    index: '02',
    title: 'Automation & Syncs',
    description: 'Workflows across your tools, and CRMs that stay in step.',
    chip: 'Automation',
    logos: [MAKE, N8N, ZAPIER],
    bullets: ['Make.com, n8n, Zapier', 'Two-way ClickUp, Lofty, GHL syncs', 'Automated client onboarding'],
  },
  {
    index: '03',
    title: 'AI Setters & Voice AI',
    description: 'AI that books and reschedules calls without human input.',
    chip: 'AI',
    logos: [GHL, CLAUDE],
    bullets: ['CloseBot setters and chatbots', 'Knowledge bases and agent flows', 'Voice AI receptionists'],
  },
  {
    index: '04',
    title: 'Email, SMS & Deliverability',
    description: 'Sequences, webinar funnels, and the sending setup behind them.',
    chip: 'Messaging',
    logos: [GHL, GWS],
    bullets: ['Email and SMS sequences', 'Webinar funnels', 'A2P 10DLC, sending domains, DNS'],
  },
  {
    index: '05',
    title: 'Documentation & Audits',
    description: 'Audits and documentation for GHL systems that already exist.',
    chip: 'Docs',
    logos: [CLAUDE, GWS],
    bullets: ['System audits', 'Documentation as a Service', 'Written so someone else can run it'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          The GHL tech side, built and documented.
        </h1>
        <p className="pgrid__lede">
          GoHighLevel systems, automations, and AI appointment setters for real estate teams and service businesses.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              One. Two. Three.
              <br />
              <span>Audit, build, document.</span>
            </h2>
            <p className="sgrid__method-sub">
              Systems that don’t break, documented well enough that someone else can run them.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I build.</h2>
            <p className="sgrid__offers-sub">Pick one, or combine them.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Example flow</span>
              <h2 className="sgrid__flow-title">Agent recruiting, on autopilot.</h2>
              <p className="sgrid__flow-sub">
                An applicant is qualified by license, location, and experience, an AI setter books the alignment call, and each outcome routes to onboarding or nurture.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
