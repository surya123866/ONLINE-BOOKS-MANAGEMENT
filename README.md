# ONLINE-BOOKS-MANAGEMENT-SYSTEM

## Backend

This repository contains the backend task for handling product transactions from a third-party API. The task involves fetching data, initializing a database, and creating various APIs for querying and analyzing transaction data.

### Data Source

- **Product Transactions JSON API URL**: [https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **Request Method**: GET
- **Response Format**: JSON

### Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/surya123866/transactions-statistics.git
    cd transactions-statistics
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure Database**:
    Ensure your database is up and running and update the database configuration in `config.js` or `.env` file as per your database setup.

4. **Initialize Database**:
    Fetch the JSON data from the third-party API and initialize the database with seed data by running:
    ```bash
    npm run init-db
    ```

### API Endpoints

#### Initialize Database

- **Endpoint**: `/api/init`
- **Method**: GET
- **Description**: Fetches JSON from the third-party API and initializes the database with seed data.

#### List All Transactions

- **Endpoint**: `/api/transactions`
- **Method**: GET
- **Query Parameters**:
  - `month` (required): Month for filtering transactions (values: January to December).
  - `page` (optional): Page number for pagination (default: 1).
  - `per_page` (optional): Number of transactions per page (default: 10).
  - `search` (optional): Search text for filtering transactions based on product title, description, or price.
- **Description**: Lists all transactions filtered by month. Supports search and pagination.

#### Statistics

- **Endpoint**: `/api/statistics`
- **Method**: GET
- **Query Parameters**:
  - `month` (required): Month for filtering transactions (values: January to December).
- **Description**: Provides statistics for the selected month, including total sale amount, total number of sold items, and total number of not sold items.

#### Bar Chart Data

- **Endpoint**: `/api/bar-chart`
- **Method**: GET
- **Query Parameters**:
  - `month` (required): Month for filtering transactions (values: January to December).
- **Description**: Returns data for a bar chart showing the number of items in various price ranges for the selected month.

#### Pie Chart Data

- **Endpoint**: `/api/pie-chart`
- **Method**: GET
- **Query Parameters**:
  - `month` (required): Month for filtering transactions (values: January to December).
- **Description**: Returns data for a pie chart showing unique categories and the number of items in each category for the selected month.

#### Combined Data

- **Endpoint**: `/api/combined-data`
- **Method**: GET
- **Query Parameters**:
  - `month` (required): Month for filtering transactions (values: January to December).
- **Description**: Fetches data from all three APIs (`/api/statistics`, `/api/bar-chart`, `/api/pie-chart`) and returns it in a single response.

### Running the Server

Start the server using the following command:
    ```bash
    npm start



# Frontend

This project is a frontend application designed to display transactions data using provided APIs. The dashboard features a transactions table, statistical summaries, and a bar chart, all of which update dynamically based on user input and selected month.

## Table of Contents
- [Project Setup](#project-setup)
- [Features](#features)
- [APIs Used](#apis-used)
- [Components](#components)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/transactions-dashboard.git
```

2. Navigate to the project directory:
```bash
cd transactions-dashboard
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

# Features

## Transactions Table

- Displays a list of transactions for the selected month.
- Month selection dropdown with options from January to December.
- Default selection is March.
- Search functionality to filter transactions by title, description, or price.
- Pagination support with "Next" and "Previous" buttons to navigate through transaction pages.
- Transactions Statistics
- Displays total amount of sales, total sold items, and total unsold items for the selected month.
- Data updates dynamically based on the selected month.

# Transactions Bar Chart
Displays a bar chart showing the price range and number of items within each range for the selected month.
Data updates dynamically based on the selected month.

## APIs Used

### Transactions Listing API
- **Endpoint**: /api/transactions
- **Methods**: GET
- **Parameters**:
- **month**: The selected month (1-12).
- **search**: (Optional) Text to search in title, description, or price.
- **page**: The page number for pagination.

### Transactions Statistics API
- **Endpoint**: /api/transactions/stats
- **Methods**: GET
- **Parameters**:
- **month**: The selected month (1-12).

### Transactions Bar Chart API
- **Endpoint**: /api/transactions/chart
- **Methods**: GET
- **Parameters**:
- **month**: The selected month (1-12).


### Month Selector
- A dropdown component to select the month. The selected month affects the data displayed in the table, statistics, and chart.

### Transactions Table
- A table component that lists transactions with pagination and search functionality.

### Statistics Box
- Displays total sales amount, total sold items, and total unsold items for the selected month.

### Bar Chart
- Displays a bar chart representing the price range and number of items within that range for the selected month.

### Usage
-  Select a month from the dropdown to filter data by month.
- Use the search box to filter transactions by title, description, or price.
-  Navigate through transaction pages using the "Next" and "Previous" buttons.
-  View the updated statistics and bar chart based on the selected month.

**Contributing**
- Contributions are welcome! Please fork the repository and create a pull request with your changes.



