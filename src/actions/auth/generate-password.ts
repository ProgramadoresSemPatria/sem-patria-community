import { randomBytes } from 'crypto'

export default function generatePassword(
  length = 15,
  charsets: string[] = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    '!@#$%^&*()_+-=[]{};:\'"\\|,.<>/?'
  ]
): string {
  const password: string[] = []

  for (let i = 0; i < length; i++) {
    const charsetIndex = Math.floor(randomBytes(1)[0] % charsets.length)
    password.push(
      charsets[charsetIndex][
        Math.floor(Math.random() * charsets[charsetIndex].length)
      ]
    )
  }

  for (const charset of charsets) {
    if (!password.some(char => charset.includes(char))) {
      const randomIndex = Math.floor(Math.random() * password.length)
      password[randomIndex] =
        charset[Math.floor(Math.random() * charset.length)]
    }
  }

  return password.join('')
}
