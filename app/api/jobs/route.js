import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { published: true },
      include: {
        user: {
          select: {
            id: true,
            email: true
            // Add other user fields you need, but exclude sensitive ones like passwordHash
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(jobs);
    
  } catch (error) {
    console.error('Job fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}