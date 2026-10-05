import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
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
    label: 'Scope and map',
    body: 'We map how leads flow through your business, find where they leak and define "done" in numbers.',
    Icon: MagnetStraight,
    chips: ['Lead flow', 'Leak audit', 'Goals', 'Quote'],
  },
  {
    index: '02',
    label: 'Build and review',
    body: 'I build in stages and test every piece before it touches live data.',
    Icon: Timer,
    chips: ['Staged build', 'Testing', 'Review'],
  },
  {
    index: '03',
    label: 'Launch and hand over',
    body: 'Staged rollout, monitored first runs and docs your team can use. You own everything.',
    Icon: Trophy,
    chips: ['Rollout', 'Monitoring', 'Docs'],
  },
]

/* ---------- The services ---------- */

// Tool marks from /public/icons.
const GHL = '/icons/gohighlevel.png'
const N8N = '/icons/ai/n8n.svg'
const ZAPIER = '/icons/ai/zapier.svg'
const GWS = '/icons/googleworkspace.svg'
const META = '/icons/facebook.svg'

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
    title: 'GoHighLevel builds',
    description: 'Complete CRM setups: pipelines, calendars and automated follow-up.',
    chip: 'CRM Systems',
    logos: [GHL],
    bullets: ['Every lead gets a fast response', 'Pipelines and calendars set up', 'Nothing slips through the cracks'],
  },
  {
    index: '02',
    title: 'Systems that talk to each other',
    description: 'I connect the tools you already use so information moves on its own.',
    chip: 'Automation',
    logos: [N8N, ZAPIER, GWS],
    bullets: ['No copy-pasting between apps', 'Sheets update themselves', 'Make, n8n or Zapier'],
  },
  {
    index: '03',
    title: 'AI appointment setters',
    description: 'AI that replies to inbound leads in seconds and books them into your calendar.',
    chip: 'AI Agents',
    logos: [GHL],
    bullets: ['Replies in seconds', 'Qualifies before it books', 'Priced on real unit economics'],
  },
  {
    index: '04',
    title: 'Meta Ads that feed the system',
    description: 'Facebook and Instagram campaigns wired straight into your CRM and follow-up.',
    chip: 'Lead Generation',
    logos: [META, GHL],
    bullets: ['Ads land in the CRM', 'Follow-up starts on its own', 'Spend turns into appointments'],
  },
  {
    index: '05',
    title: 'Agency snapshots',
    description: 'One master system you deploy for every new client instead of rebuilding.',
    chip: 'For Agencies',
    logos: [GHL],
    bullets: ['Lead capture and nurture built in', 'Deploys per client', 'Ongoing tech support'],
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
          CRMs and automations that book the appointment.
        </h1>
        <p className="pgrid__lede">
          Lead capture, follow-up and booking for agencies, real estate teams and service businesses.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How an engagement runs</span>
            <h2 className="sgrid__method-title" id="method-title">
              One. Two. Three.
              <br />
              <span>Map. Build. Launch.</span>
            </h2>
            <p className="sgrid__method-sub">
              Bugs caught in review are free; bugs caught by your leads are not.
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
            <p className="sgrid__offers-sub">Not sure which fits? Book a free call.</p>
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
              <span className="sgrid__flow-eyebrow">Live automation</span>
              <h2 className="sgrid__flow-title">From new lead to booked call.</h2>
              <p className="sgrid__flow-sub">
                A form comes in, the CRM updates, reminders go out and every lead ends booked, nurtured or closed out, with nobody touching it.
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
