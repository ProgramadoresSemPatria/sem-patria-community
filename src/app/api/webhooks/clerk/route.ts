/* eslint-disable camelcase */
import { type WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  // CREATE
  if (eventType === 'user.created') {
    // ! Disabled for further development
    // const { id, email_addresses } = evt.data
    // const user: User = {
    //   id,
    //   email: email_addresses[0].email_address
    //   // Add other user properties here
    // }
    // const newUser = await prisma?.user.create({
    //   data: user
    // })
    // // Set public metadata
    // if (newUser) {
    //   await clerkClient.users.updateUserMetadata(id, {
    //     publicMetadata: {
    //       // Add public metadata here
    //     }
    //   })
    // }
    // return NextResponse.json({ message: 'OK', user: newUser })
  }

  // UPDATE
  if (eventType === 'user.updated') {
    const {
      id,
      image_url: imageUrl,
      email_addresses: emails,
      last_sign_in_at: lastSignInAt
    } = evt.data

    const updatedUser = await prismadb.user.update({
      where: {
        id
      },
      data: {
        imageUrl,
        email: emails[0].email_address,
        lastLogin: new Date(lastSignInAt ?? Date.now())
      }
    })

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  // DELETE
  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await prismadb.user.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}
