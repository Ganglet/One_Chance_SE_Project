import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function GET(req: NextRequest) {
  try {
    // Test database connection
    const sessionCount = await prisma.quiz_sessions.count()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection working',
      sessionCount 
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 