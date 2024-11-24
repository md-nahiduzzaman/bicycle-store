# Bicycle Store API

## A robust and scalable RESTful API for managing a bicycle store, including features for managing products, orders, and inventory. Built using TypeScript, Express, and MongoDB.

## Features

### Product Management

- Add, update, delete, and fetch bicycles.
- Search bicycles by name, brand, or type using a search term.
- Implements validation for bicycle details (e.g., positive price, valid quantity).

### Order Management

- Place orders for bicycles.
- Automatically updates inventory after an order is placed.
- Validates stock availability before processing an order.

### Revenue Calculation

- Aggregate total revenue from all orders.

### Error Handling

- Custom error responses with detailed validation and stack trace (development mode only).
- Handles insufficient stock scenarios gracefully.

## Tech Stack

- **Backend Framework**: Express.js (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose for schema validation)
- **Deployment**: Vercel

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance, e.g., MongoDB Atlas)

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```
   git clone https://github.com/md-nahiduzzaman/bicycle-store.git
   cd bicycle-store
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and provide the following variables:

   ```
   PORT=5000
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bicycle-store
   NODE_ENV=development
   ```

4. **Run the Application**

   - Start the development server:
     ```
     npm run dev
     ```
   - For production:
     ```
     npm run build
     ```

5. **API Documentation**
   Use tools like Postman or cURL to interact with the API. Examples:
   - Fetch all products:
     ```
     GET http://localhost:5000/api/products
     ```
   - Search products:
     ```
     GET http://localhost:5000/api/products?searchTerm=Road
     ```

## API Endpoints

### Product Endpoints

- **GET** `/api/products`: Retrieve all products or search using a query.
- **POST** `/api/products`: Create a new bicycle.
- **GET** `/api/products/:id`: Get a specific bicycle.
- **PUT** `/api/products/:id`: Update bicycle details.
- **DELETE** `/api/products/:id`: Delete a bicycle.

### Order Endpoints

- **POST** `/api/orders`: Place an order.
- **GET** `/api/orders/revenue`: Calculate total revenue.

## Contact

For any questions or suggestions, contact:

**Nahiduzzaman**  
**Email**: join.nahiduzzaman@gmail.com  
**GitHub**: https://github.com/md-nahiduzzaman
