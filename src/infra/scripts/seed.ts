import prismadb from '@/lib/prismadb'
import { clerkClient } from '@clerk/nextjs/server'
import { hash } from 'bcrypt'

const defaultUserInput = {
  email: process.env.DEFAULT_SEM_PATRIA_EMAIL ?? '',
  password: process.env.DEFAULT_SEM_PATRIA_PASSWORD ?? '',
  name: process.env.DEFAULT_SEM_PATRIA_NAME ?? '',
  username: process.env.DEFAULT_SEM_PATRIA_USERNAME ?? ''
}

const adminUserInput = {
  email: process.env.ADMIN_SEM_PATRIA_EMAIL ?? '',
  password: process.env.ADMIN_SEM_PATRIA_PASSWORD ?? '',
  name: process.env.ADMIN_SEM_PATRIA_NAME ?? '',
  username: process.env.ADMIN_SEM_PATRIA_USERNAME ?? ''
}

async function seed() {
  const defaultUsers = await clerkClient().users.getUserList({
    emailAddress: [defaultUserInput.email, adminUserInput.email]
  })

  if (defaultUsers.totalCount > 0) {
    for (const user of defaultUsers.data) {
      await clerkClient().users.deleteUser(user.id)
    }
  }

  const clerkNormalUser = await clerkClient().users.createUser({
    emailAddress: [defaultUserInput.email],
    password: defaultUserInput.password,
    firstName: defaultUserInput.name,
    username: defaultUserInput.username
  })

  const clerkAdminUser = await clerkClient().users.createUser({
    emailAddress: [adminUserInput.email],
    password: adminUserInput.password,
    firstName: adminUserInput.name,
    username: adminUserInput.username
  })

  const saltRounds = 5
  const userHashedPassword = await hash(defaultUserInput.password, saltRounds)
  const adminHashedPassword = await hash(adminUserInput.password, saltRounds)

  await prismadb.$transaction([
    prismadb.user.deleteMany(),
    prismadb.user.createMany({
      data: [
        {
          id: clerkNormalUser.id,
          email: defaultUserInput.email,
          password: userHashedPassword,
          name: defaultUserInput.name,
          username: defaultUserInput.username,
          role: ['ProgramadorSemPatria']
        },
        {
          id: clerkAdminUser.id,
          email: adminUserInput.email,
          password: adminHashedPassword,
          name: adminUserInput.name,
          username: adminUserInput.username,
          role: ['Admin', 'Builder']
        }
      ]
    })
  ])
}

seed()
  .then(() => {
    console.log(`
    ✅ Seed completed successfully!
      - Regular user created: ${defaultUserInput.email}
      - Admin user created: ${adminUserInput.email}
    `)
  })
  .catch(error => {
    console.error('\n ❌ Seed failed \n', error)
  })
