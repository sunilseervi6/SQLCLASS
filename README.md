# Delta App - User Management System

## Overview

Delta App  demonstrates **CRUD operations (Create, Read, Update, Delete)** on a MySQL database using Node.js, Express, and EJS templates. The application allows users to:

- View all users
- Add a new user
- Edit an existing user
- Delete a user with confirmation

The project emphasizes how data flows from the database to the server, then to the frontend, and back to the server for updates or deletion.

---

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Framework for building web applications and handling routes.
- **MySQL (mysql2)**: Relational database to store user information.
- **EJS**: Template engine to render dynamic HTML pages.
- **Faker.js**: Generates fake data for testing purposes.
- **Method-Override**: Allows HTML forms to use HTTP verbs like PUT and DELETE.

---

## Features

### 1. Display Users

- Fetches all users from the `user` table in MySQL.
- Dynamically renders the data in a table using EJS.
- Each row includes **Edit** and **Delete** buttons for individual actions.

### 2. Add User

- Provides a form to enter `username`, `email`, and `password`.
- Generates a unique ID for each user using `faker`.
- Inserts the new user into the MySQL database.
- Redirects to the main users table after successful addition.

### 3. Edit User

- Opens an edit form for a selected user.
- Requires the correct password to update the username.
- Uses a PATCH route with `method-override` to update data in MySQL.

### 4. Delete User

- Opens a confirmation form for deletion.
- Requires the user to enter their `email` and `password` for verification.
- Deletes the user from MySQL using a DELETE route.
- Uses `method-override` to convert the POST request to DELETE.

---

## How Data Flows

1. **Database → Server**: Node.js queries MySQL to fetch user data.
2. **Server → Frontend**: Data is passed to EJS templates and rendered as HTML.
3. **Frontend → Server**: Forms submit user input to server routes (POST, PATCH, DELETE).
4. **Server → Database**: Server executes SQL queries to insert, update, or delete data.
5. **Database → Frontend**: Updated data is fetched again and displayed.

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>

npm install

in sql
created_at (TIMESTAMP, default CURRENT_TIMESTAMP)

run
node index.js
