# Welcome to MyBasecamp

## Summary

**Project name**: MyBasecamp

**Objective**: MyBasecamp is a clone of more famous Basecamp. Basecamp is a web-based tool used to project management, to-do lists and tracking those objectives. The website i built mimiques some features from the original applicaion.

**Core Features**: User registration, Authentication, Role-based priviliges and accesses and full CRUD operations

## Tech Stack

_Frontend_: HTML5, CSS3, and EJS template

_Backend_: Node.js, Express.js

_Database_: PostgreSQL (Prisma as ORM)

_Security_: express-validator (to ensure data integrity), express-session (for safe authentication), bcrypt (password hashing)

## System Architecture

The application follows MVC (Model-View-Controller) Pattern to address Seperation of Concerns, and improve scalability, maintainabilty and easier debugging.
_Model_: Model hold our data structures and makes it possible to interact with the database

_View_: View holds our ejs template files which user sees and interacts with

_Controller_: Controller plays the intermediary role, acts as a bridge between model and view

_Routes_: Route files holds URL mapping which directs the traffic to the corresponding controller

_Middlewares_: Admin, Auth, Validation middlewares are passed to the routes acting as guards

_Environment variables_: `.env` file protects sensitive strings like database link (which holds password of db admin) and session secret

## Database Schema

**User table**:

| Field     | Type     | Attributes                  | Description                              |
| :-------- | :------- | :-------------------------- | :--------------------------------------- |
| id        | Int      | Primary Key, Auto-increment | Unique identifier for each user.         |
| name      | String   | Required                    | The user's full name.                    |
| email     | String   | Unique, Required            | Used for login, must be unique and valid |
| password  | String   | Required                    | Hashed user password.                    |
| role      | String   | Default: 'user'             | Defines access levels (admin or user).   |
| createdAt | DateTime | Default: now()              | Timestamp of account creation.           |
|           |

**Project table**
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| id | Int | Primary Key, Auto-increment | Unique identifier for each project. |
| name | String | Required | The name of the project. |
| description | String | Optional | Detailed notes regarding the project. |
| ownerId | Int | Foreign Key | References User.id (project owner) |
| createdAt | DateTime | Default: now() | Timestamp of project creation. |
| updatedAt | DateTime | Updated on change | Timestamp of the last modification. |
| |

## Routes

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

## Usage Guide

**Account Creation and Authentication**

- _Registration_: New users navigate to the /register page. The system validates that the name is at least 3 characters, the email is unique and valid, and the password contains both letters and numbers.

- _Login_: Existing users put in their email and password, on successful authentication, a secure session is established, and the user is redirected to dashboard.

**Project Management**

- _Creating a Project_: Clicking the "+ New Project" button shows a hidden form. Users provide a project name and description if any. Submitting the form updates the list with an asynchronous POST request.

- _Viewing Projects_: All projects owned by the user are fetched from the database and rendered as cards.

- _Inline Editing_: Clicking the "Edit" on any project card shows the hidden edit form. "Save Changes" triggers a PUT request to update the database.

- _Deletion_: The "Delete" button removes the project after a confirmation prompt.

**Admin Operations**
Users with the admin role have access to the specialized secret /admin page:

- _User List_: The dashboard displays a list of all the registered members.

- _Edit Users_: Admins can promote default users to administrators and remove their privileges, using the "Make Admin" and "Remove Admin" buttons, respectively. Additionally, admins have the authority to remove any users account

**Ending a Session**

- _Logout_: Clicking the "Logout" button triggers the req.session.destroy() method on the backend, clearing the browser cookie and redirecting them to the login screen. This is cruical step for ensuring user account can stay secure after logging in from another device.

**Future Improvements**

- File Uploads
- Task Deadlines and Milestone Management
- Notification System (via email probably)
