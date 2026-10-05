/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Every value below is a PLACEHOLDER.
 * Replace the text, or hand this file to your AI assistant and tell it what
 * to put in each field.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, CalendarCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Philip Charles Bumanglag',
  firstName: 'Philip',
  handle: '@sourcesystems',
  role: 'Systems Integrator & Automation Specialist',
  avatarSrc: '/avatar.svg',
  verifiedLabel: 'BS Electronics Engineering, University of Saint Louis Tuguegarao',
  email: 'philip@sourcesystems.ai',
  location: 'Philippines',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: '6+ yrs', label: 'Automating since 2020', Icon: Briefcase },
    { value: '200/mo', label: 'Interviews booked, one client', Icon: CalendarCheck },
    { value: 'GMT+8', label: 'Works with US, AU, UK', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'Your business,', line2: 'on autopilot.' },
  hero: {
    body: 'GoHighLevel CRMs, workflow automations and AI appointment setters for agencies, real estate teams and service businesses.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Portrait of Philip Charles Bumanglag',
  },
  socials: [
    {
      label: 'LinkedIn profile',
      href: 'https://www.linkedin.com/in/philip-charles-bumanglag-7b1453191/',
      iconPath: '/icons/linkedin.svg',
    },
  ],
}
