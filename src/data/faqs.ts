export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I build GoHighLevel CRMs, workflow automations, AI appointment setters and Meta Ads lead generation for agencies, real estate teams and service businesses. GoHighLevel is home turf; Make and n8n are the wiring behind it.',
  },
  {
    q: 'How fast can you start?',
    a: 'We start with a scoping call where we map how leads move through your business today. The timeline depends on the size of the build, and you get it in writing before anything is built.',
  },
  {
    q: 'How much do you charge?',
    a: 'Every quote comes after the scoping call, once we know what "done" looks like in numbers. I will tell you honestly whether it is worth automating, what it would take and what it would cost.',
  },
  {
    q: 'Where are you based?',
    a: 'I am based in the Philippines (GMT+8) and work with clients worldwide. Current and past clients are in the US, Australia and the UK.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply with a link to book a free call. On the call you walk me through what you do manually today, and I tell you what I would automate first.',
  },
]
