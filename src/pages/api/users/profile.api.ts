import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'PUT') {
    return response.status(405).end()
  }

  const session = await getServerSession(
    request,
    response,
    buildNextAuthOptions(request, response),
  )

  if (!session) {
    return response.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(request.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return response.status(204).end()
}
