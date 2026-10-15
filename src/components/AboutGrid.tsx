import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, Handshake } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the portrait on the
 * right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const MAKE = { src: '/icons/make.svg', name: 'Make.com' }
const N8N = { src: '/icons/ai/n8n.svg', name: 'n8n' }
const ZAPIER = { src: '/icons/ai/zapier.svg', name: 'Zapier' }
const CLICKUP = { src: '/icons/clickup.svg', name: 'ClickUp' }
const SLACK = { src: '/icons/ai/slack-color.svg', name: 'Slack' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'GoHighLevel builds, pipelines, and snapshots',
    marks: [GHL, SLACK],
  },
  {
    index: '02',
    title: 'Automations and two-way syncs',
    marks: [MAKE, N8N, ZAPIER, CLICKUP],
  },
  {
    index: '03',
    title: 'AI appointment setters and voice AI',
    marks: [GHL, CLAUDE],
  },
  {
    index: '04',
    title: 'System documentation and audits',
    marks: [CLAUDE, GWS],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          I build the systems behind growing real estate teams and service businesses.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            CRMs, automation platforms, and AI, wired into one system.
            <span> Pipelines that sync themselves, onboarding that runs without a human, and setters that book calls around the clock.</span>
          </p>

          <p className="agrid__note">
            <strong>Partner at</strong>{' '}
            <a className="agrid__link" href="https://sourcesystems.ai" target="_blank" rel="noopener noreferrer">
              Source Systems
            </a>
            {' '}since 2026, building and installing the GoHighLevel tech side of every client system. I started as a
            Meta Ads Strategist in 2020 and moved into automation in 2023. Engineering background, so I care
            about systems that don’t break and are documented well enough that someone else can run them.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · English, Filipino</span>
              </span>
            </span>

            <a className="agrid__cell" href="https://sourcesystems.ai" target="_blank" rel="noopener noreferrer">
              <span className="agrid__cell-mark">
                <Handshake size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Source Systems</span>
                <span className="agrid__cell-meta">Partner since 2026</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
