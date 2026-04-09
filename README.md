# 📝 Full-Stack Task Manager

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

A lightweight, full-stack task management application built to demonstrate core API design, React state management, and clear architectural structure. Developed strictly within a 1-2 hour time constraint, focusing on functionality, correctness, and clean code over unnecessary complexity.

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Trade-offs](#-architecture--trade-offs)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)

---

## ✨ Features

### Core Requirements Implemented
* **CRUD Operations:** Create, Read, Update, and Delete tasks.
* **Validation:** Basic API validation to prevent empty or invalid task submissions.
* **State Management:** Seamless React state updates with appropriate loading and error UI states.
* **Clean UI:** A simple, intuitive, and responsive vanilla CSS interface.

### Optional Bonuses Implemented
* **Data Persistence:** Tasks are saved to a local JSON file (`tasks.json`) to persist across server restarts.
* **Task Filtering:** Filter tasks by "All", "Active", and "Completed" states.
* **Inline Editing:** Edit existing task titles directly from the UI without page reloads.
* **Containerization:** Fully containerized using Docker and Docker Compose.
* **Automated Testing:** Unit and integration tests for the API using Jest and Supertest.

---

## 🛠 Tech Stack

* **Frontend:** React (v18), Vite (v8), Axios, Vanilla CSS.
* **Backend:** Node.js (v22), Express.js.
* **Storage:** File-based JSON storage (`fs` module).
* **Testing:** Jest, Supertest.
* **DevOps:** Docker, Docker Compose.

---

## 🏗 Architecture & Trade-offs

To deliver a high-quality, working solution within the tight 1-2 hour timeframe, several intentional engineering decisions were made:

1. **File-Based Storage vs. External Database:** Opted for file-based JSON storage over an external database (like PostgreSQL or MongoDB). This keeps the application footprint extremely small, fulfills the persistence requirement, and guarantees zero setup friction for anyone reviewing the code.
2. **Vanilla CSS vs. UI Frameworks:** Used standard, scoped CSS rather than heavy frameworks like Tailwind or Material UI. This adheres to the instruction to avoid "unnecessary complexity" while maintaining a clean, readable codebase.
3. **Local React State vs. Global Store:** State is managed locally within `App.jsx`. Given the single-view nature of this application, introducing Redux or Context API would constitute over-engineering.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/) (v22 or higher recommended for Vite v8 compatibility)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Optional, for containerized execution)

### Running Locally

**1. Clone the repository:**
```bash
git clone https://github.com/The-morning-star23/task-manager.git
cd task-manager
```

**2. Start the Backend:**
```bash
cd backend
npm install
npm run dev
```
The API will run on http://localhost:5000

**3. Start the Frontend:**
Open a new terminal window/tab:
```bash
cd frontend
npm install
npm run dev
```
The UI will run on http://localhost:5173

### Running with Docker
Ensure Docker Desktop is running, then execute the following from the root directory:
```bash
docker-compose up --build
```
The Frontend will be available at http://localhost:5173

The Backend API will be available at http://localhost:5000

To shut down the containers cleanly:

Bash
docker-compose down
📡 API Documentation
Base URL: http://localhost:5000

GET /tasks
Retrieves all tasks.

Response: 200 OK

JSON
[
  {
    "id": "1712683901000",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-04-09T18:00:00.000Z"
  }
]
POST /tasks
Creates a new task.

Body:

JSON
{ "title": "Finish technical assessment" }
Response: 201 Created

PATCH /tasks/:id
Updates a task's title or completion status.

Body (can include one or both):

JSON
{ 
  "title": "Updated title",
  "completed": true 
}
Response: 200 OK

DELETE /tasks/:id
Deletes a task by ID.

Response: 204 No Content

🧪 Testing
The backend includes a suite of integration tests to verify API endpoints and data manipulation.

To run the test suite:

Bash
cd backend
npm test