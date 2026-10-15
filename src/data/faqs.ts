export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view. Five questions, two or three sentences
 * each: the accordion sits in a fixed panel and more than that pushes the
 * email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I build GoHighLevel systems: CRM builds, workflow automation, two-way syncs, and AI appointment setters. As a partner at Source Systems, I set up the GHL side of every client system.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'Real estate teams and brokerages are the main focus. I also build for agencies, clinics and med spas, coaching and membership programs, solar, and fintech.',
  },
  {
    q: 'What tools do you use?',
    a: 'GoHighLevel at the center, with Make.com, n8n, and Zapier for automation and CloseBot for AI setters. ClickUp, Lofty, Slack, and Google Workspace are usually on the other end of the syncs.',
  },
  {
    q: 'Where are you based?',
    a: 'In the Philippines (GMT+8). I work with clients globally.',
  },
  {
    q: 'What happens after I write?',
    a: 'I read your message and reply by email. If you would rather talk it through, book a call with the button below.',
  },
]
