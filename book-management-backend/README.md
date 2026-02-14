
# Book Management Web Application

## Description
This project is a full-stack web application for managing books, users, and authentication. It consists of a Vue.js frontend and a Node.js/Express backend, with a PostgreSQL database running on Docker. The application provides a user-friendly interface for managing books, user accounts, and roles, along with secure authentication and robust API services.

## Features
- User authentication (login, register)
- Role-based access control (admin, user)
- Manage and search books (CRUD)
- Responsive web interface (Vue.js)
- RESTful API services (Express.js)
- API documentation with Swagger
- Error handling and logging

## Tech Stack
- **Frontend:** Vue.js, Axios (for API requests)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (running in Docker)

## How to Run the Project (One Command)

### Prerequisites
- Install [Docker](https://www.docker.com/get-started)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/kittiBank/book-management.git
   cd book-management-backend
   ```
2. **Ensure the frontend project is in `../book-management-frontend`**
   - If not, clone or create your Vue.js frontend there.

3. **Start all services (database, backend, frontend) with one command:**
   ```sh
   docker-compose up --build
   ```
   - This will:
     - Start PostgreSQL
     - Install backend dependencies, run Prisma migrations, and start the backend
     - Install frontend dependencies and start the frontend server

4. **Access the app:**
   - web-app : http://localhost:5000
   - Swagger API docs: http://localhost:3000/docs/#/
   - Database: localhost:5432 (PostgreSQL)

## Notes
- ตรวจสอบให้แน่ใจว่า database connection ในไฟล์ `.env` ตรงกับการตั้งค่า PostgreSQL ใน Docker Compose
- You can stop all services with:
  ```sh
  docker-compose down
  ```
- For development, you can still run backend or frontend individually if needed.

---
Feel free to update this README with more details as your project evolves.
