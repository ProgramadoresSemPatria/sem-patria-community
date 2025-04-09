import type {
  CurrentSeasonResponse,
  SearchUsersResponse
} from '@/actions/leaderboard/types'
import { Positions } from '@prisma/client'

export const mockLeaderboardData: CurrentSeasonResponse = {
  id: 'season-1',
  name: 'Summer 2023',
  initDate: new Date('2023-06-01T00:00:00Z'),
  endDate: new Date('2023-08-31T23:59:59Z'),
  isCurrent: true,
  createdAt: new Date('2023-05-15T00:00:00Z'),
  updatedAt: new Date('2023-08-31T23:59:59Z'),
  metadata: {
    description:
      'Summer season leaderboard with exciting prizes for top performers.',
    awards: [
      {
        position: '1st Place',
        description:
          'Exclusive badge, 1000 points, and a special role in the community.'
      },
      {
        position: '2nd Place',
        description:
          'Special badge, 500 points, and recognition in the community.'
      },
      {
        position: '3rd Place',
        description:
          'Unique badge, 250 points, and a shoutout in the community.'
      }
    ]
  },
  scores: [
    {
      id: 'score-1',
      userId: 'user-1',
      seasonId: 'season-1',
      points: 1250,
      user: {
        id: 'user-1',
        name: 'Alex Johnson',
        username: 'alexj',
        imageUrl: 'https://placekitten.com/200/200',
        position: Positions.ADMIN,
        level: 'Expert'
      }
    },
    {
      id: 'score-2',
      userId: 'user-2',
      seasonId: 'season-1',
      points: 980,
      user: {
        id: 'user-2',
        name: 'Sam Rodriguez',
        username: 'samr',
        imageUrl: 'https://placekitten.com/201/201',
        position: Positions.AMBASSADOR,
        level: 'Advanced'
      }
    },
    {
      id: 'score-3',
      userId: 'user-3',
      seasonId: 'season-1',
      points: 875,
      user: {
        id: 'user-3',
        name: 'Jordan Lee',
        username: 'jordanl',
        imageUrl: 'https://placekitten.com/202/202',
        position: Positions.BASE,
        level: 'Intermediate'
      }
    },
    {
      id: 'score-4',
      userId: 'user-4',
      seasonId: 'season-1',
      points: 720,
      user: {
        id: 'user-4',
        name: 'Taylor Kim',
        username: 'taylork',
        imageUrl: 'https://placekitten.com/203/203',
        position: Positions.BASE,
        level: 'Intermediate'
      }
    },
    {
      id: 'score-5',
      userId: 'user-5',
      seasonId: 'season-1',
      points: 650,
      user: {
        id: 'user-5',
        name: 'Morgan Patel',
        username: 'morganp',
        imageUrl: 'https://placekitten.com/204/204',
        position: Positions.BASE,
        level: 'Intermediate'
      }
    },
    {
      id: 'score-6',
      userId: 'user-6',
      seasonId: 'season-1',
      points: 580,
      user: {
        id: 'user-6',
        name: 'Casey Wong',
        username: 'caseyw',
        imageUrl: 'https://placekitten.com/205/205',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-7',
      userId: 'user-7',
      seasonId: 'season-1',
      points: 520,
      user: {
        id: 'user-7',
        name: 'Riley Garcia',
        username: 'rileyg',
        imageUrl: 'https://placekitten.com/206/206',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-8',
      userId: 'user-8',
      seasonId: 'season-1',
      points: 480,
      user: {
        id: 'user-8',
        name: 'Jamie Chen',
        username: 'jamiec',
        imageUrl: 'https://placekitten.com/207/207',
        position: Positions.BASE,
        level: 'Beginner'
      }
    }
  ]
}

export const mockSearchResults: SearchUsersResponse = {
  users: [
    {
      userId: 'user-1',
      points: 1250,
      user: {
        id: 'user-1',
        name: 'Alex Johnson',
        username: 'alexj',
        imageUrl: 'https://placekitten.com/200/200',
        position: 'ADMIN',
        level: 'Expert'
      }
    },
    {
      userId: 'user-6',
      points: 580,
      user: {
        id: 'user-6',
        name: 'Casey Wong',
        username: 'caseyw',
        imageUrl: 'https://placekitten.com/205/205',
        position: 'BASE',
        level: 'Beginner'
      }
    }
  ]
}
