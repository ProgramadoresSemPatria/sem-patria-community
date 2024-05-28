import { type ChallengeSections } from '../type'
import { formatISO } from 'date-fns'

export const mockData: ChallengeSections = {
  uniqueActions: [
    {
      id: '1',
      completed: false,
      title:
        'Technical Feedback: After participating in 3 technical interviews, collect feedback and share it with the community.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '2',
      completed: false,
      title:
        '#CodeUp Challenge: Participate and complete the #CodeUp challenge.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '3',
      completed: false,
      title:
        'Organization: Keep the interview marathon spreadsheet updated (available in the Job Prospecting module).',
      updatedAt: formatISO(new Date())
    }
  ],
  daily: [
    {
      id: '1',
      completed: false,
      title: 'Job Applications: Apply for 2 jobs per day.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '2',
      completed: false,
      title: 'LinkedIn Interactivity: Comment on 1 post per day.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '3',
      completed: false,
      title: 'LinkedIn Engagement: Like 2 posts per day.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '4',
      completed: false,
      title:
        'English Study: (for NON-B2) Dedicate at least 30 minutes per day to studying English.',
      updatedAt: formatISO(new Date())
    }
  ],
  weekly: [
    {
      id: '1',
      completed: false,
      title:
        'Mock Interview: Participate in 1 Mock Interview per week, either as a listener or an active participant.',
      updatedAt: formatISO(new Date())
    }
  ],
  monthly: [
    {
      id: '1',
      completed: false,
      title:
        "CV Preparation: Prepare at least 4 different versions of your resume, making specific adjustments based on the 'CV Chameleon' strategy (see the recorded mentoring on how to create an impactful resume).",
      updatedAt: formatISO(new Date())
    },
    {
      id: '2',
      completed: false,
      title:
        'Interview Recording: Record one interview per month for analysis.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '3',
      completed: false,
      title: 'Job Prospecting Module: Attend all sessions 1x/month.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '4',
      completed: false,
      title: 'Selection Process Module: Attend all sessions 1x/month.',
      updatedAt: formatISO(new Date())
    },
    {
      id: '5',
      completed: false,
      title:
        "Professional Networking Module: Attend the 'how to maintain effective follow-ups' and 'Feedback for the win' sessions 1x/month.",
      updatedAt: formatISO(new Date())
    }
  ]
}
