export type TDifficulty = 'Easy' | 'Medium' | 'Hard'

export interface IExercise {
  id: string
  nodeId: string
  problem: string
  link: string
  difficulty: TDifficulty
  solution: string
}
