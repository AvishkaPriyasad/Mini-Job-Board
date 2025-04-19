import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h';

export async function POST(request) {
  try {
    const { email, password, action } = await request.json();

    // Input validation
    if (!email || !password || !action) {
      return NextResponse.json(
        { error: 'Email, password and action are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (action === 'login') {
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' }, // Generic message for security
          { status: 401 }
        );
      }

      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      if (!passwordValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

      return NextResponse.json(
        { 
          success: true,
          user: { id: user.id, email: user.email } 
        },
        {
          headers: {
            'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600${
              process.env.NODE_ENV === 'production' ? '; Secure' : ''
            }`
          },
          status: 200
        }
      );
    }

    if (action === 'signup') {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { 
          email, 
          passwordHash: hashedPassword 
        }
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

      return NextResponse.json(
        { 
          success: true, 
          user: { id: user.id, email: user.email }
        },
        {
          headers: {
            'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600${
              process.env.NODE_ENV === 'production' ? '; Secure' : ''
            }`
          },
          status: 201
        }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "login" or "signup"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}