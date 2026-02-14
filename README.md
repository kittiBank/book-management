<img width="1000" height="500" alt="Screenshot 2569-02-14 at 17 52 52" src="https://github.com/user-attachments/assets/0ccff3fd-c42a-411f-be52-1ecf7e8d9b37" />


# Book Management System

A simple and modern web application for managing books, built with a full-stack architecture. This project demonstrates CRUD operations, authentication, and responsive UI.

## Features
- User authentication (JWT)
- Add, edit, delete, and view books
- Responsive design with Tailwind CSS
- Pagination and search
- RESTful API
- PostgreSQL database running in Docker

## Tech Stack
- Frontend: Vue.js, Axios, Tailwind CSS
- Backend: Node.js, Express.js, JWT Authentication
- Database: PostgreSQL (Dockerized)
- Unit test: jest

## How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/kittiBank/book-management.git
   cd book-management
   ```

2. **Start with Docker Compose**
   ** Must install docker in your computer, docker will be run front-end, back-end, database with command belown.
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - run web-app: http://localhost:5173
   - Swagger api docs: http://localhost:3000/docs/
   - back-end: http://localhost:3000

## Screenshots

- Database pgAdmin
<img width="600" height="400" alt="Screenshot 2569-02-14 at 17 54 01" src="https://github.com/user-attachments/assets/247681c0-fe71-4354-a213-eab5345d71bd" />

- Postman test
<img width="600" height="400" alt="Screenshot 2569-02-08 at 13 07 13" src="https://github.com/user-attachments/assets/9f76888a-5c73-47ef-9da4-56fb5238739e" />

- Swagger API docs
<img width="600" height="400" alt="Screenshot 2569-02-14 at 17 55 01" src="https://github.com/user-attachments/assets/452b9d9f-31bf-49e7-8b8b-48679f0a1098" />

