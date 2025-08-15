import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// PATCH /api/sessions/status - Update session status (e.g., to 'active')
export async function PATCH(req: NextRequest) {
  const { code, status } = await req.json()
  if (!code || !status) {
    return NextResponse.json({ error: 'code and status required' }, { status: 400 })
  }
  const session = await prisma.quiz_sessions.update({
    where: { code },
    data: { status },
  })
  return NextResponse.json({ session })
}
