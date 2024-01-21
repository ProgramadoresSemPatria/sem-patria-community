import React from 'react'
import { render, waitFor } from '@testing-library/react'
import TopBar from '@/components/top-bar'
// import * as clerk from '@clerk/nextjs'
// import * as prismadb from '@prisma/client'

jest.mock('@prisma/client', () => ({
  ...jest.requireActual('@prisma/client'),
  PrismaClient: jest.fn(() => ({
    user: {
      findFirst: jest.fn(() => {
        return {
          id: '1564132323',
          email: 'admin@example.com',
          isAdmin: true
        }
      })
    }
  }))
}))

jest.mock('@clerk/nextjs', () => ({
  ...jest.requireActual('@clerk/nextjs'),
  auth: jest.fn(() => ({
    userId: '1564132323'
  }))
}))

// type SutTypes = {
//   sut: RenderResult
// }
// const makeSut = (): SutTypes => {
//   const sut = render(
//     // <clerk.ClerkProvider>
//     <TopBar />
//     // {/* </clerk.ClerkProvider> */}
//   )
//   return {
//     sut
//   }
// }

describe('MainNav', () => {
  test('Should show CMS button if user is admin', async () => {
    // const prismaMock = new prismadb.PrismaClient()
    // const user = await prismaMock.user.findUnique({
    //   where: {
    //     id: clerk.auth().userId ?? undefined
    //   }
    // })


    await waitFor(async () => {
      // const { getByTestId } = render(<TopBar />)
      const { getByTestId } = render(await TopBar())

      const cmsButton = getByTestId('cms')
      expect(cmsButton).toBeTruthy()
    })

    // if (user?.isAdmin) {
    //   expect(cmsLinks).toBeTruthy()
    // } else {
    //   expect(cmsLinks).toBeFalsy()
    // }
  })
})
