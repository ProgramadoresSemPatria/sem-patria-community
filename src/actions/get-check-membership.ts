import { api } from '@/lib/api'

export const getCheckMembership = async (username: string) => {
  const url = `https://api.github.com/orgs/ProgramadoresSemPatria/members/${username}`

  const { status, data } = await api.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  })
  console.log(data)

  if (status === 204) return true

  return false
}
