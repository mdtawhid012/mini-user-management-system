# Mini User Management System

A full-stack user management system with role-based access control (Admin & User), authentication, and responsive profile management.

## 🚀 Overview

This project is a robust implementation of a user management system featuring secure authentication, admin dashboard for user oversight, and personal profile management. It is designed with a mobile-first approach, ensuring a seamless experience across all devices.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI (components)
- **State/Context**: React Context API
- **Routing**: React Router DOM (v6)
- **Notifications**: Sonner

### Backend

- **Runtime**: Bun.js / Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Language**: TypeScript

## ⚙️ Environment Variables

Create `.env` files in both `backend` and `frontend` directories based on the following templates.

### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

## 🏗️ Setup Instructions

### Prerequisites

- Node.js or Bun installed
- Docker (optional, for containerization)
- MongoDB instance (local or Atlas)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    bun install
    # or
    npm install
    ```
3.  Start the server:
    ```bash
    bun run dev
    # or
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🐳 Docker Deployment

To build and run the backend container:

```bash
cd backend
docker build -t user-mgmt-backend .
docker run -p 5000:5000 --env-file .env user-mgmt-backend
```

## 📚 API Documentation

### Authentication

#### `POST /auth/signup`

Register a new user.

- **Body**: `{ "fullName": "John Doe", "email": "john@example.com", "password": "password123" }`
- **Response**: `{ "message": "User created successfully", "token": "..." }`

#### `POST /auth/signin`

Log in an existing user.

- **Body**: `{ "email": "john@example.com", "password": "password123" }`
- **Response**: `{ "token": "...", "user": { ... } }`

### User Operations

#### `PUT /user`

Update user profile details.

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "fullName": "John Updated", "email": "john@new.com" }`

#### `PUT /user/password`

Change user password.

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "oldPassword": "...", "newPassword": "..." }`

### Admin Operations

#### `GET /admin`

List all users (paginated).

- **Headers**: `Authorization: Bearer <admin_token>`
- **Query Params**: `page=1`, `limit=10`

#### `PUT /admin/:userId/toggle`

Activate or deactivate a user account.

- **Headers**: `Authorization: Bearer <admin_token>`
