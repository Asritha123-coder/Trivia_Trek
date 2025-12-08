TriviaTrek — Online Quiz Management System

TriviaTrek is a full-stack quiz management application where users can create categories, add questions, update and delete them, and play quizzes built from both API-based and custom questions.
It includes animations, protected routes, authentication, debouncing, timer logic, and data normalization for smooth performance.

🚀 Features
✅ Category Management (CRUD)

Create categories

Edit category names

Delete categories (with safety check if questions exist)

View all categories

✅ Question Management (CRUD)

Add single or multiple questions

Edit question text, options, and correct answer

Delete questions

Fetch questions by category

✅ Quiz Features

Timer per question

Answer tracking

Flag questions

Debouncing API calls

Backup questions if API fails

Normalized data format for both API & custom questions

✅ Authentication

Login system using Context API

Protected routes (normal user vs admin)

✅ UI/UX

Framer Motion animations

Toast notifications (success/error)

Clean and responsive interface

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Context API

Axios

Framer Motion

useState, useEffect, useMemo, useRef

Backend

JSON Server (db.json)

REST API structure



⚙️ Installation & Setup
Clone the repository
git clone https://github.com/Asritha123-coder/Trivia_Trek.git
cd Trivia_Trek

Install dependencies
npm install

Start frontend
npm run dev

Start JSON Server (Backend)
npx json-server --watch db.json --port 3000


Your app is now running at:

Frontend → http://localhost:5173

Backend → http://localhost:3000

🌐 API Endpoints (JSON Server)
Categories
Method	Endpoint	Description
GET	/categories	Get all categories
POST	/categories	Add new category
PUT	/categories/:id	Update category
DELETE	/categories/:id	Delete category
Questions
Method	Endpoint	Description
GET	/questions?catId=1	Get questions by category
POST	/questions	Add question
PUT	/questions/:id	Edit question
DELETE	/questions/:id	Delete question
🔥 Important Logic Used
1️⃣ State Management (useState + useRef)

Used to store quiz state, avoid unnecessary re-renders, and prevent duplicate API calls.

2️⃣ useEffect for Debouncing & Error Handling

Prevents multiple API calls when switching categories quickly.

3️⃣ useMemo for Performance Boost

Used for:

Leaderboard calculations

Counting answered questions

4️⃣ Data Normalization

Custom questions + API questions → converted into:

correct_answer
incorrect_answers
merged


So quiz logic stays consistent.


🚧 Future Improvements

JWT authentication

Admin dashboard

User progress tracking

MCQ import using Excel

Dark mode

📜 License

This project is licensed under the MIT License.
