# Task Management System

A full-stack Task Management System built with modern web technologies. This application provides a robust platform for managing tasks with a scalable architecture, utilizing a Next.js frontend and an Express backend.

## Features

- **User Authentication**: Secure login and registration using NextAuth, JWT, and bcrypt.
- **Task Management**: Create, read, update, and delete tasks.
- **State Management**: Predictable state container using Redux Toolkit.
- **Responsive Design**: Modern and responsive UI built with Tailwind CSS and Lucide React icons.
- **Form Validation**: Strict schema validation using Zod.
- **Scheduled Jobs**: Background task processing using node-cron.

## Tech Stack

### Frontend (Client)
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Language**: TypeScript
- **Authentication**: JWT & bcrypt
- **Validation**: [Zod](https://zod.dev/)
- **Scheduling**: node-cron

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Management-System
   ```

2. **Setup Backend (Server)**
   ```bash
   cd server
   npm install
   # Copy .env.example to .env and configure your environment variables
   cp .env.example .env
   npm run dev
   ```

3. **Setup Frontend (Client)**
   ```bash
   cd ../client
   npm install
   # Copy .env.example to .env and configure your environment variables
   cp .env.example .env
   npm run dev
   ```

## Project Structure
- `/client` - Next.js frontend application
- `/server` - Express backend API