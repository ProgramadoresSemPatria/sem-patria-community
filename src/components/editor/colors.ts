import { type BubbleColorMenuItem } from './types'

export const DARK_TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)'
  },
  {
    name: 'Purple',
    color: '#9333EA'
  },
  {
    name: 'Red',
    color: '#E00000'
  },
  {
    name: 'Yellow',
    color: '#EAB308'
  },
  {
    name: 'Blue',
    color: '#2563EB'
  },
  {
    name: 'Green',
    color: '#008A00'
  },
  {
    name: 'Orange',
    color: '#FFA500'
  },
  {
    name: 'Pink',
    color: '#BA4081'
  },
  {
    name: 'Gray',
    color: '#A8A29E'
  }
]

export const LIGHT_TEXT_COLORS: BubbleColorMenuItem[] = [
  ...DARK_TEXT_COLORS.filter(color => color.name !== 'Gray'),
  {
    name: 'Gray',
    color: '#78716C'
  }
]

export const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)'
  },
  {
    name: 'Purple',
    color: 'var(--novel-highlight-purple)'
  },
  {
    name: 'Red',
    color: 'var(--novel-highlight-red)'
  },
  {
    name: 'Yellow',
    color: 'var(--novel-highlight-yellow)'
  },
  {
    name: 'Blue',
    color: 'var(--novel-highlight-blue)'
  },
  {
    name: 'Green',
    color: 'var(--novel-highlight-green)'
  },
  {
    name: 'Orange',
    color: 'var(--novel-highlight-orange)'
  },
  {
    name: 'Pink',
    color: 'var(--novel-highlight-pink)'
  },
  {
    name: 'Gray',
    color: 'var(--novel-highlight-gray)'
  }
]
