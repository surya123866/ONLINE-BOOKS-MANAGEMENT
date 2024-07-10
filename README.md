# Online Library Management System

## Objective

Build a comprehensive online library management system utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Core Components

### Backend Development

- **Runtime Environment:** Node.js
- **Server-Side Logic:** Express.js
- **Database:** MongoDB

### Frontend Development

- **User Interface:** React.js
- **Design:** Responsive and intuitive

## System Entities and Properties

### Books

- Name
- Author
- Current book Availability Status

### User

- Username
- Name
- Email
- Contact Number

### Admin User

- Username
- Name
- Password (Ensure secure handling)
- Email
- Contact Number

### Library Transaction

- User details
- Book details
- Due date
- Transaction type (borrowed/returned)

## Functional Requirements

### Admin User Operations

- Issue and return books, altering their availability status.
- Add new books to the system.
- Remove existing books from the inventory.

### User Interactions (Read-Only)

- Browse the library catalog.
- View personal transaction history

## Assumptions

- Normal users have no system privileges beyond viewing.
- All administrative operations (issuing, returning, adding, or removing books) are exclusively performed by the admin user.

### Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/surya123866/ONLINE-BOOKS-MANAGEMENT.git
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Database**:
   Ensure your database is up and running and update the database configuration in `.env` file as per your database setup.

4. **Initialize Server and Database**:
   ```bash
   nodemon server.js
   ```

## API Endpoints

## User APIs

### Login User API

- **Endpoint**: api/user/login
- **Methods**: POST
- **Parameters**: Body - {"username":"exampleuser","password": "dummypassword",}


### Register User API

- **Endpoint**: /api/user/register
- **Methods**: POST
- **Parameters**: Body -
  {"contactNumber": "000000000",
  "email": "gmail.@gmail.com",
  "name": "examplename",
  "password":"dummypassword",
  "username":"eampleuser"}

  
### User Transactions books API

- **Endpoint**: /api/transactions
- **Methods**: POST
- **Parameters**:
- **Authorization JWT-Token Required**


### Login Admin API

- **Endpoint**: /api/transactions/chart
- **Methods**: POST
- **Parameters**:
- **month**: The selected month (1-12).

### Register Admin API

- **Endpoint**: /api/admin/register
- **Methods**: POST
- **Parameters**:Body -
  {"contactNumber": "000000000",
  "email": "gmail.@gmail.com",
  "name": "examplename",
  "password":"dummypassword",
  "username":"eampleuser"}

### User Fectch books API

- **Endpoint**: /api/books/
- **Methods**: GET
- **Parameters**: Authorization JWT-Token Required

## User Return book API

- **Endpoint**: /api/admin/returnBook
- **Methods**: POST
- **Parameters**: Body-
{ 
"userId": "668920d457c4562e97f8fdff",
"bookId": "6689853e73a449bbbb526145"
 }
- **Authorization JWT-Token Required**

### Admin Fectch books API

- **Endpoint**: /api/transactions/chart
- **Methods**: POST
- **Parameters**:
- **Authorization JWT-Token Required**


### Admin Transactions books API

- **Endpoint**: /api/admin/transactions
- **Methods**: GEPOSTT
- **Parameters**:
- **Authorization JWT-Token Required**

### Admin Add book API

- **Endpoint**: /api/admin/addBook
- **Methods**: POST
- **Parameters**: Body - [
  {
  "author": "Hans Christian Andersen",
  "country": "Denmark",
  "imageLink": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hans_Christian_Andersen_%281834_painting%29.jpg",
  "language": "Danish",
  "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
  "pages": 784,
  "title": "Fairy tales",
  "year": 1836,
  "availability": true
  }]
- **Authorization JWT-Token Required**

## Admin Issue book API

- **Endpoint**: /api/admin/issueBook
- **Methods**: POST
- **Parameters**: Body-
{"user": "668920d457c4562e97f8fdff",
"book": "6689853e73a449bbbb526145",
"dueDate":"12/6/2024",
"transactionType": "borrowed"
}
- **Authorization JWT-Token Required**

## Admin Remove books API

- **Endpoint**:/api/admin/removeBook/bookID
- **Methods**: DELETE
- **Parameters**: Body-
- **Authorization JWT-Token Required**


# Frontend

## Project Setup

## Prerequisites
- **Node.js (v14 or higher)**

### Installation

1. Clone the repository:

```bash
git clone https://github.com/surya123866/ONLINE-BOOKS-MANAGEMENT.git
```

2. Navigate to the project directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm start
```

The application should now be running on http://localhost:3000.

## Features
- **Authentication: User and Admin login functionality.**
- **Catalog Browsing: Users can view available books.**
- **Admin Operations: Admins can add, remove, issue, and return books.**
- **Transaction History: Users can view their borrowing history.**

### APIs Used
- **User login, registration, fetch books, and transaction history.**
- **Admin login, registration, fetch books, add books, issue books, return books, remove books, and view transactions.**

## Components

### Authentication Components

- **Login: User and Admin login forms.**
- **Register: User and Admin registration forms.**
- **Catalog Components**

- **BookList: Displays list of books available in the library.**
- **BookDetail: Detailed view of a selected book.**

### Admin Components

- **AddBook: Form for adding new books.**
- **IssueBook: Form for issuing books to users.**
- **ReturnBook: Form for returning books.**
- **RemoveBook: Option to remove a book from the catalog.**
- **TransactionList: Displays list of all transactions.**

### User Components

- **UserTransaction: Displays the logged-in user's transaction history**

### Usage

- **Login: Users and Admins can log in using their credentials.**
- **Register: New users and admins can register.**
- **Browse Catalog: Users can view the list of available books.**
- **Admin Operations: Admins can manage books and transactions.**

### Contributing
- **Feel free to fork the repository and submit pull requests. Please ensure your changes are well-documented and tested.**

