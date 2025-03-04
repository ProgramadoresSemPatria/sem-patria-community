import prismadb from '@/lib/prismadb'
import { clerkClient } from '@clerk/nextjs/server'
import { hash } from 'bcrypt'
import { faker } from '@faker-js/faker'
import { Roles } from '@prisma/client'

async function seed() {
  console.log('🌱 Starting seed process...')

  const existingUsers = await clerkClient().users.getUserList({
    emailAddress: [
      process.env.DEFAULT_SEM_PATRIA_EMAIL ?? '',
      process.env.ADMIN_SEM_PATRIA_EMAIL ?? ''
    ]
  })

  for (const user of existingUsers.data) {
    await clerkClient().users.deleteUser(user.id)
  }
  console.log('✅ Deleted existing users from Clerk')

  await prismadb.$transaction([
    prismadb.commentLike.deleteMany(),
    prismadb.like.deleteMany(),
    prismadb.comment.deleteMany(),
    prismadb.post.deleteMany(),
    prismadb.note.deleteMany(),
    prismadb.user.deleteMany(),
    prismadb.interest.deleteMany(),
    prismadb.course.deleteMany(),
    prismadb.category.deleteMany(),
    prismadb.classroomModule.deleteMany(),
    prismadb.video.deleteMany(),
    prismadb.classroom.deleteMany()
  ])
  console.log('✅ Cleared existing data in Prisma')

  const interests = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    interest: faker.hacker.noun(),
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  for (const interest of interests) {
    await prismadb.interest.upsert({
      where: { interest: interest.interest },
      update: {},
      create: interest
    })
  }

  console.log('✅ Inserted mock interests')

  const categories = Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  await prismadb.category.createMany({ data: categories })
  console.log('✅ Inserted mock categories')

  const courses = Array.from({ length: 3 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    courseUrl: faker.internet.url(),
    level: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced']),
    categoryId: categories[i % categories.length].id,
    isPaid: faker.datatype.boolean(),
    isPending: faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  await prismadb.course.createMany({ data: courses })
  console.log('✅ Inserted mock courses')

  const userInputs = [
    {
      email: process.env.DEFAULT_SEM_PATRIA_EMAIL ?? '',
      password: process.env.DEFAULT_SEM_PATRIA_PASSWORD ?? '',
      name: process.env.DEFAULT_SEM_PATRIA_NAME ?? '',
      username: process.env.DEFAULT_SEM_PATRIA_USERNAME ?? '',
      role: ['ProgramadorSemPatria']
    },
    {
      email: process.env.ADMIN_SEM_PATRIA_EMAIL ?? '',
      password: process.env.ADMIN_SEM_PATRIA_PASSWORD ?? '',
      name: process.env.ADMIN_SEM_PATRIA_NAME ?? '',
      username: process.env.ADMIN_SEM_PATRIA_USERNAME ?? '',
      role: ['Admin']
    }
  ]

  const clerkUsers = []
  for (const userInput of userInputs) {
    const clerkUser = await clerkClient().users.createUser({
      emailAddress: [userInput.email],
      password: userInput.password,
      firstName: userInput.name,
      username: userInput.username
    })
    clerkUsers.push({ ...userInput, id: clerkUser.id })
  }
  console.log('✅ Inserted Clerk users')

  const hashedUsers = await Promise.all(
    clerkUsers.map(async user => ({
      ...user,
      password: await hash(user.password, 5),
      role: user.role.map(r => r as Roles)
    }))
  )
  await prismadb.user.createMany({ data: hashedUsers })
  console.log('✅ Inserted users into Prisma')

  const posts = Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: JSON.stringify({ text: faker.lorem.paragraphs(2) }),
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: categories[i % categories.length].id,
    userId: hashedUsers[i % hashedUsers.length].id
  }))
  await prismadb.post.createMany({ data: posts })
  console.log('✅ Inserted mock posts')

  const comments = Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date(),
    postId: posts[i % posts.length].id,
    userId: hashedUsers[i % hashedUsers.length].id
  }))
  await prismadb.comment.createMany({ data: comments })
  console.log('✅ Inserted mock comments')

  const likes = Array.from({ length: 5 }, (_, i) => ({
    userId: hashedUsers[i % hashedUsers.length].id,
    postId: posts[i % posts.length].id
  }))
  await prismadb.like.createMany({ data: likes })
  console.log('✅ Inserted mock likes')

  const classrooms = Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    title: faker.company.buzzNoun(),
    permissions: [faker.helpers.arrayElement(Object.values(Roles))],
    createdAt: new Date()
  }))

  await prismadb.classroom.createMany({ data: classrooms })
  console.log('✅ Inserted mock classrooms')
  const imageUrl = (path: string) => `https://img.clerk.com/${path}`

  const classroomModules = classrooms.flatMap(classroom =>
    Array.from({ length: 2 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      classroomId: classroom.id,
      fileUrl: imageUrl(`avatar/${faker.string.uuid()}.jpg`),
      order: faker.number.int({ min: 1, max: 5 })
    }))
  )

  await prismadb.classroomModule.createMany({ data: classroomModules })
  console.log('✅ Inserted mock classroom modules')

  const videos = classroomModules.flatMap(module =>
    Array.from({ length: 2 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      url: faker.internet.url(),
      createdAt: new Date(),
      classroomModuleId: module.id,
      order: faker.number.int({ min: 1, max: 5 })
    }))
  )

  await prismadb.video.createMany({ data: videos })
  console.log('✅ Inserted mock videos')

  console.log('🎉 Seed process completed successfully!')
}

seed().catch(error => {
  console.error('\n ❌ Seed failed \n', error)
  process.exit(1)
})
