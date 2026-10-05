/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - Status is what the thing actually does today: "Live" (in use by others),
 *   "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  Robot,
  FunnelSimple,
  Copy,
  Megaphone,
  UsersThree,
  UserPlus,
  ClipboardText,
  ChatCircleDots,
  Broadcast,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const GHL: StackLogo = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const N8N: StackLogo = { src: '/icons/ai/n8n.svg', name: 'n8n' }
const META: StackLogo = { src: '/icons/facebook.svg', name: 'Meta' }

/** Single root: you. Branches are the categories. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Systems that capture leads, follow up on their own and book the appointment.',
  stack: 'Source Systems',
  children: [
    {
      id: 'ai-setter',
      Icon: Robot,
      logos: [GHL],
      name: 'AI Appointment Setter',
      what: 'Replies to inbound leads in seconds, qualifies them and books them into the calendar, priced on break-even math.',
      stack: 'CloseBot + HighLevel, real estate agencies',
      status: 'Live',
    },
    {
      id: 'lead-systems',
      Icon: FunnelSimple,
      name: 'Lead capture and nurture',
      what: 'Every lead gets captured, answered fast and followed up until they book.',
      children: [
        {
          id: 'lead-nurture',
          Icon: FunnelSimple,
          logos: [GHL, N8N],
          name: 'Lead Capture and Nurture',
          what: 'New leads land in the CRM instantly and get automated follow-up by email and SMS.',
          stack: 'HighLevel + Make / n8n',
          status: 'Live',
        },
        {
          id: 'agency-snapshot',
          Icon: Copy,
          logos: [GHL],
          name: 'Med Spa Agency Snapshot',
          what: 'One master system a US agency deploys for every new med spa client instead of rebuilding each time.',
          stack: 'HighLevel snapshot, MedSpa Max',
          status: 'Live',
        },
        {
          id: 'meta-ads',
          Icon: Megaphone,
          logos: [META, GHL],
          name: 'Ads into the CRM',
          what: 'Facebook and Instagram campaigns wired straight into the CRM and follow-up, so ad spend turns into appointments.',
          stack: 'Meta Ads Manager + HighLevel',
          status: 'Live',
        },
      ],
    },
    {
      id: 'recruiting',
      Icon: UsersThree,
      name: 'Recruiting and onboarding',
      what: 'Candidates get found, screened, booked and onboarded without living in someone\'s inbox.',
      children: [
        {
          id: 'agent-attraction',
          Icon: UserPlus,
          logos: [GHL],
          name: 'Agent Attraction System',
          what: 'Lead capture, follow-up and calendar booking for agent candidates at a San Diego mega team.',
          stack: 'HighLevel + Make, FAM Realty Group',
          status: 'Live',
        },
        {
          id: 'onboarding-tracker',
          Icon: ClipboardText,
          logos: [GHL],
          name: 'Onboarding Tracker',
          what: 'Sales and operations see the same live onboarding status, with zero manual updates between them.',
          stack: 'HighLevel + Make + ClickUp',
          status: 'Live',
        },
        {
          id: 'recruiting-bot',
          Icon: ChatCircleDots,
          logos: [META],
          name: 'Recruiting Chatbot',
          what: 'Qualifies every applicant and books them into interview slots: about 200 interviews a month on PHP 5,000 of ads.',
          stack: 'FB Ads + chatbot + auto-scheduling',
          status: 'Live',
        },
      ],
    },
    {
      id: 'webinar',
      Icon: Broadcast,
      logos: [GHL],
      name: 'Webinar Marketing System',
      what: 'Registrations, reminders and post-webinar follow-up that run on their own.',
      stack: 'EverWebinar + HighLevel',
      status: 'Live',
    },
  ],
}
