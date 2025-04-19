import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { title, company, location, description, jobType } = await request.json();
    
    // Validate required fields
    if (!title || !company || !location || !description || !jobType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        description: description.trim(),
        jobType,
        published: true
      }
    });

    return NextResponse.json(job, { status: 201 });
    
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create job', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    );
  }
}