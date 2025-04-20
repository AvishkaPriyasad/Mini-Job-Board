# Job-Board Application 

## Overview

A full-stack job board application with user authentication, job posting, and management features. Built with Next.js, Prisma, and Tailwind CSS.

## Features

- User authentication (login/signup)
- Job posting and management
- Admin dashboard
- Form validation
- Secure API endpoints

## Prerequisites

- Node.js (v18 or higher)
- npm 
- PostgreSQL database
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AvishkaPriyasad/Mini-Job-Board.git
cd job-board
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/jobboard?schema=public"
JWT_SECRET="your-strong-secret-key-here"
```

### 4. Set Up Database

Run database migrations:

```bash
npx prisma migrate dev --name init
```

### 5. Seed Initial Data (Optional)

```bash
npx prisma db seed
```

### 6. Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
/job-board
├── app/                  # Application routes
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   └── admin/            # Admin dashboard
├── components/           # Reusable components
├── lib/                  # Utility functions
├── prisma/               # Database schema and client
├── public/               # Static assets
└── styles/               # Global styles
```

## Available Scripts

- `dev`: Starts the development server
- `build`: Creates an optimized production build
- `start`: Starts the production server
- `lint`: Runs ESLint
- `prisma`: Prisma CLI commands
- `db:push`: Push schema changes to database
- `db:studio`: Open Prisma Studio

## Additional Notes

### Authentication

- Uses JWT for session management
- Passwords are hashed with bcrypt
- Protected routes check for valid sessions

### Database

- Uses PostgreSQL with Prisma ORM
- Includes migrations for schema changes
- Relationships:
  - Users can post multiple jobs
  - Jobs belong to users
