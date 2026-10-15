/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStackGrid.tsx renders
 * whatever shape it finds here, so swapping in content is a data edit and
 * never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - `status` is optional. Set it only when it is true today: "Live" (in use
 *   by others), "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  UsersThree,
  ArrowsClockwise,
  UserPlus,
  Buildings,
  Robot,
  ChatCircleDots,
  PhoneCall,
  ChatText,
  FileText,
  Stack,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  children?: StackNode[]
}

/** Single root: you. Branches are the categories. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'CRMs, automations, and AI that run the day-to-day for real estate teams and service businesses.',
  stack: 'Source Systems',
  children: [
    {
      id: 'ghl-systems',
      Icon: Stack,
      name: 'GHL Systems',
      what: 'Full GoHighLevel builds: pipelines, sequences, and the SMS plumbing behind them.',
      children: [
        {
          id: 'attraction-system',
          Icon: UsersThree,
          name: 'Real Estate Attraction System',
          what: 'A done-for-you agent recruiting system for real estate teams, from job board intake to training onboarding.',
          stack: 'GHL, CloseBot, Make.com, Slack, ClickUp, Skool',
        },
        {
          id: 'semaphore-sms',
          Icon: ChatText,
          name: 'GHL to Semaphore SMS',
          what: 'GHL texting through a local Philippine SMS provider, with number formats and message segments handled.',
          stack: 'GHL, Semaphore, Webhooks',
        },
      ],
    },
    {
      id: 'integrations',
      Icon: ArrowsClockwise,
      name: 'Integrations & Syncs',
      what: 'Make.com scenarios that keep two tools in step so nobody copies data by hand.',
      children: [
        {
          id: 'clickup-sync',
          Icon: ArrowsClockwise,
          name: 'ClickUp to GHL Two-Way Sync',
          what: 'Keeps a real estate team’s agent onboarding pipeline in sync between ClickUp and GoHighLevel.',
          stack: 'Make.com, ClickUp, GHL',
        },
        {
          id: 'client-onboarding',
          Icon: UserPlus,
          name: 'Automated Client Onboarding',
          what: 'One survey submission creates the client’s GHL sub-account and a dedicated Slack channel.',
          stack: 'Make.com, GHL API, Slack',
        },
        {
          id: 'lofty-sync',
          Icon: Buildings,
          name: 'Lofty to GHL Lender Sync',
          what: 'When a lender is assigned in Lofty, the buyer shows up in GHL as a contact automatically.',
          stack: 'Lofty, Make.com, GHL',
        },
      ],
    },
    {
      id: 'ai-agents',
      Icon: Robot,
      name: 'AI Agents',
      what: 'AI that books, reschedules, and answers so the team does not have to.',
      children: [
        {
          id: 'ai-setters',
          Icon: ChatCircleDots,
          name: 'AI Appointment Setters',
          what: 'CloseBot setters that book and reschedule calls without human input.',
          stack: 'CloseBot, GHL',
        },
        {
          id: 'voice-ai',
          Icon: PhoneCall,
          name: 'Voice AI Receptionist',
          what: 'A voice AI receptionist scoped for a church, with warm transfer to staff.',
          stack: 'Voice AI, LLMs',
        },
      ],
    },
    {
      id: 'documentation',
      Icon: FileText,
      name: 'Documentation as a Service',
      what: 'Audits and documentation for existing GHL systems, so someone else can run them.',
      stack: 'GHL, Claude',
    },
  ],
}
