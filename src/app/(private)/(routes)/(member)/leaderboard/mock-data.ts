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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-9',
      userId: 'user-9',
      seasonId: 'season-1',
      points: 450,
      user: {
        id: 'user-9',
        name: 'Chris Evans',
        username: 'chrise',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-10',
      userId: 'user-10',
      seasonId: 'season-1',
      points: 400,
      user: {
        id: 'user-10',
        name: 'Emma Watson',
        username: 'emmaw',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-11',
      userId: 'user-11',
      seasonId: 'season-1',
      points: 350,
      user: {
        id: 'user-11',
        name: 'Robert Downey Jr.',
        username: 'robertd',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-12',
      userId: 'user-12',
      seasonId: 'season-1',
      points: 300,
      user: {
        id: 'user-12',
        name: 'Scarlett Johansson',
        username: 'scarlettj',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-13',
      userId: 'user-13',
      seasonId: 'season-1',
      points: 250,
      user: {
        id: 'user-13',
        name: 'Tom Holland',
        username: 'tomh',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-14',
      userId: 'user-14',
      seasonId: 'season-1',
      points: 200,
      user: {
        id: 'user-14',
        name: 'Natalie Portman',
        username: 'nataliep',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-15',
      userId: 'user-15',
      seasonId: 'season-1',
      points: 150,
      user: {
        id: 'user-15',
        name: 'Chris Hemsworth',
        username: 'chrish',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-16',
      userId: 'user-16',
      seasonId: 'season-1',
      points: 100,
      user: {
        id: 'user-16',
        name: 'Gal Gadot',
        username: 'galg',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-17',
      userId: 'user-17',
      seasonId: 'season-1',
      points: 50,
      user: {
        id: 'user-17',
        name: 'Dwayne Johnson',
        username: 'dwaynej',
        imageUrl: '',
        position: Positions.BASE,
        level: 'Beginner'
      }
    },
    {
      id: 'score-18',
      userId: 'user-18',
      seasonId: 'season-1',
      points: 25,
      user: {
        id: 'user-18',
        name: 'Jennifer Lawrence',
        username: 'jenniferl',
        imageUrl: '',
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
        imageUrl: '',
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
        imageUrl: '',
        position: 'BASE',
        level: 'Beginner'
      }
    }
  ]
}
