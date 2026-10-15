import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Buildings,
  Stack,
  Quotes,
  AddressBook,
  FlowArrow,
  Robot,
  EnvelopeSimple,
  FileText,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { CLIENTS } from '@/data/clients'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the projects, the clients and the
 * services are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const OFFERS = [
  { Icon: AddressBook, title: 'GHL CRM Builds', note: 'Pipelines, snapshots, sub-accounts' },
  { Icon: FlowArrow, title: 'Automation & Syncs', note: 'Make.com, n8n, Zapier' },
  { Icon: Robot, title: 'AI Setters & Voice AI', note: 'Books calls around the clock' },
  { Icon: EnvelopeSimple, title: 'Email, SMS & Deliverability', note: 'Sequences, A2P 10DLC, DNS' },
  { Icon: FileText, title: 'Documentation & Audits', note: 'Systems someone else can run' },
] as const

const INDUSTRIES = [
  'Real estate teams',
  'Brokerages',
  'Agencies',
  'Clinics & med spas',
  'Coaching & memberships',
  'Solar',
  'Fintech',
]

// Three photos of you, fanned. The last one sits on top. Small copies are
// fine - the fan shows them under 100px.
const PHOTOS = ['/about-cafe-head.webp', '/about-desk-head.webp', profile.avatarSrc]

/** Every system from the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(INDUSTRIES.length / 2)
  const industryRows = [INDUSTRIES.slice(0, half), INDUSTRIES.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: every build drifting up a clipped column. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead
          Icon={FolderOpen}
          title="Projects"
          desc="Recruiting systems, two-way syncs, and AI setters, built in GoHighLevel."
        />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...BUILDS, ...BUILDS].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__review">
                <span className="bento__review-top">
                  <n.Icon size={14} weight="duotone" />
                  <b>{n.name}</b>
                </span>
                <span className="bento__review-work">{n.stack}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Engineering background. Partner at Source Systems." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* Industries: two chip rows scrolling against each other. */}
      <Link to="/services" className="bento__card bento__card--ai">
        <CardHead Icon={Buildings} title="Industries" desc="Real estate first, plus the service businesses around it." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {industryRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((name, i) => (
                  <span key={`${name}-${i}`} className="bento__chip">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="The GHL tech side, built, synced, and documented." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: client cards drifting up a clipped column. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Testimonials" desc="Real estate teams, agencies, and clinics I build for." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  {c.logoSrc ? (
                    <img src={c.logoSrc} alt="" width={18} height={18} />
                  ) : (
                    <c.Icon size={14} weight="fill" />
                  )}
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work.join(' · ')}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
