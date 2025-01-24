# FoodExpress

**FoodExpress** is a web application designed to simplify the process of ordering food online. With features for browsing restaurants, selecting dishes, and managing orders, FoodExpress offers a seamless user experience.

## Features

- **User Authentication**: Secure user registration and login.
- **Restaurant Listings**: Browse and filter a wide variety of restaurants.
- **Menu Selection**: View detailed menus for each restaurant.
- **Cart Management**: Add, update, and remove items from your cart.
- **Order Tracking**: Track the status of your order in real-time.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)

- **Other Tools**:
  - Axios (HTTP client)
  - JSON Web Tokens (JWT) for authentication
  - Socket.IO for real-time features

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sumantahitk/FoodExpress.git
   cd FoodExpress
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
FoodExpress/
├── backend/          # Backend code
│   ├── controllers/  # API controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js     # Entry point for the backend
├── frontend/         # Frontend code
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Application pages
│   │   └── App.js      # Main React component
│   └── public/         # Static assets
└── README.md         # Project documentation
```


## Contact

For any inquiries or feedback, please reach out to [Sumanta](https://github.com/sumantahitk).
