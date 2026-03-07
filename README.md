# Welcome to My Basecamp 1

## Task
A web-based project management tool inspired by Basecamp. The challenge is to build a full-stack application with user authentication, role-based permissions, and project management features.

## Description
Built with Node.js and Express on the backend, PostgreSQL as the database, and Prisma as the ORM. The app supports user registration, login/logout with sessions, admin roles, and full project CRUD.

## Installation

1. Clone the repository:
```
git clone https://git.us.qwasar.io/my_basecamp_1_205948_ykgplx/my_basecamp_1.git
cd my_basecamp_1
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/mybasecamp"
SESSION_SECRET=anyrandomstring
```
4. Run Prisma migration to create the tables:
```
npx prisma migrate dev
```
5. Start the server:
```
npm run dev
```

## Usage

The server runs on `http://localhost:3000`

**User endpoints:**
- `POST /users` — register a new user
- `GET /users/:id` — get a user by id
- `DELETE /users/:id` — delete a user (admin only)
- `PUT /users/:id/admin` — promote user to admin (admin only)
- `PUT /users/:id/removeadmin` — demote admin to user (admin only)

**Session endpoints:**
- `POST /session` — login
- `DELETE /session` — logout

**Project endpoints:**
- `POST /projects` — create a project
- `GET /projects` — get all projects
- `GET /projects/:id` — get a project by id
- `PUT /projects/:id` — update a project
- `DELETE /projects/:id` — delete a project

## The Core Team
Made at Qwasar SV -- Software Engineering School <img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' />