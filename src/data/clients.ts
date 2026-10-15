import { Buildings, Stack, Drop, type Icon } from '@/components/slab'

/**
 * The client ledger: who you build for and what you run for them. Used by
 * the Testimonials page, the Testimonials card on Home, and the proof block
 * on the phone's Home.
 *
 * Only show a client's name with their OK. Until then the name stays a TODO
 * and the role line describes them. `logoSrc` is optional - without it the
 * medallion falls back to the icon.
 */
export type Client = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  logoSrc?: string
  Icon: Icon
}

export const CLIENTS: Client[] = [
  {
    index: '01',
    name: 'FAM Realty Group',
    role: 'Top San Diego County real estate Mega team',
    daily:
      'Their attraction system since 2023: Wizehire applicants auto-qualified, an AI setter booking the right calendar and stage. Peak of 30+ appointments a week; 10 producing agents in 30 days in 2026.',
    work: ['Attraction System', 'AI Setter', 'GHL'],
    Icon: Buildings,
  },
  {
    index: '02',
    name: 'Medspa Max',
    role: 'US marketing agency for med spas',
    daily:
      'Built the agency’s master GHL snapshot for automated lead capture and nurture, still in use today. Plus GHL and integration support across client accounts, 2024.',
    work: ['GHL Snapshot', 'Make.com', 'Zapier'],
    Icon: Stack,
  },
  {
    index: '03',
    name: 'Invisible Ink Studio',
    role: 'Paramedical tattoo clinic, Sydney & Canberra',
    daily:
      'An automated lead capture and nurture system in GHL and CloseBot, fed by the Meta ad campaigns I ran. 2024 to 2026.',
    work: ['GHL', 'CloseBot', 'Meta Ads'],
    Icon: Drop,
  },
]
