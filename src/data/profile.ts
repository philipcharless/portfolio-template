/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email, booking link and the Home headline.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, Handshake, Clock, type Icon } from '@/components/slab'

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
  email: string
  /** Where "Book a call" goes. */
  bookingUrl: string
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
  name: 'Philip Bumanglag',
  firstName: 'Philip',
  handle: 'Partner at Source Systems',
  role: 'Systems Integrator & Automation Specialist',
  // Keep the preload in index.html pointing at the same file.
  avatarSrc: '/me.webp',
  email: 'philip@sourcesystems.ai',
  bookingUrl: 'https://app.flowsuite.digital/widget/booking/9XqrrQudMAO0X4a1iLvI',
  location: 'Philippines',
  stats: [
    { value: 'Since 2023', label: 'In automation', Icon: Briefcase },
    { value: 'Partner', label: 'Source Systems', Icon: Handshake },
    { value: 'GMT+8', label: 'Philippines', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'More booked calls.', line2: 'Less manual work.' },
  hero: {
    body: 'GoHighLevel systems, automations, and AI appointment setters for real estate teams and service businesses.',
    portraitSrc: '/about-desk.webp',
    portraitAlt: 'Illustration of Philip at his desk, building a workflow on screen',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/philip-charles-bumanglag-7b1453191/', iconPath: '/icons/linkedin.svg' },
  ],
}
