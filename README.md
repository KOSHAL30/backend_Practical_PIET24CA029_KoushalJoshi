# Backend Practical Exam

Name - Koushal Joshi
Register No - PIET24CA029

I made this using Node.js, Express and MongoDB (mongoose).

## Files

- file/A1.js - task 1 (library book api)
- file/A2.js - task 2 (student portal with login)
- file/A3.js - small script i wrote to test all the apis of both tasks
- file/models - Book and User model
- file/routes - bookRoutes and authRoutes
- file/middleware - logger, error handler, auth middleware (jwt check and admin check)
- outputs - screenshots

## How to run

1. Start mongodb (i used local mongodb on mongodb://127.0.0.1:27017)
2. Open terminal in the file folder and run `npm install`
3. Make a .env file (copy from .env.example)
4. `node A1.js` - task 1 runs on port 3000
5. `node A2.js` - task 2 runs on port 5000
6. `node A3.js` - run this when both servers are on, it tests every route

## Task 1 - Library Book Management API

Book has title, author, price, category and isAvailable (true by default). Title and author are required and price should be at least 1.

Routes:
- POST /books - add new book
- GET /books - get all books
- GET /books/:id - get one book
- PUT /books/:id - update book
- DELETE /books/:id - delete book

If book is not found it gives 404 and if data is wrong it gives 400.
Logger middleware prints the method and url of every request in the terminal.

Example body for POST /books

```
{
  "title": "Let Us C",
  "author": "Yashavant Kanetkar",
  "price": 350,
  "category": "Programming"
}
```

## Task 2 - Student Portal

Routes:
- POST /register - register user (student or admin)
- POST /login - login and get token
- GET /profile - only for logged in user
- GET /students - only admin can see this

What i did:
- checked the input with joi (email should be valid, password min 6 characters)
- password is hashed with bcrypt before saving
- same email cant register again
- login gives jwt token, it expires in 1 hour
- auth middleware checks the token from Authorization header, if no token or wrong token then 401
- if student opens /students it gives 403
- added helmet, cors and rate limit (100 requests in 15 min)

Example body for POST /register

```
{
  "name": "Rahul",
  "email": "rahul@college.com",
  "password": "rahul123",
  "role": "student"
}
```

For /profile and /students in postman, add header
Authorization : Bearer (token you get from login)

## Outputs

- A1.png - task 1 server running
- A2.png - task 2 server running
- A3.png - output of A3.js testing all routes

Postman screenshots (task 1):
- postman_01_post_book.png - add book (201)
- postman_02_post_book_400.png - wrong data (400)
- postman_03_get_books.png - all books
- postman_04_get_book_by_id.png - one book
- postman_05_put_book.png - update book
- postman_06_delete_book.png - delete book
- postman_07_delete_book_404.png - deleting again gives 404

Postman screenshots (task 2):
- postman_08_register_admin.png - register admin
- postman_09_register_student.png - register student
- postman_10_login.png - login with token
- postman_11_profile_401.png - profile without token (401)
- postman_12_profile_200.png - profile with token
- postman_13_students_403.png - student trying /students (403)
- postman_14_students_200_admin.png - admin getting all students

MongoDB Compass:
- compass_01_libraryDB_books.png - books collection
- compass_02_studentPortalDB_users.png - users collection (passwords are hashed)
