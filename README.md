# E-commerce Application - Marketplace

This project is a simplified clone of the e-commerce platform, built using React, Redux, and Reactstrap. It provides a basic online shopping experience where users can browse products, add them to a cart, and simulate the checkout process.

## Features

- **Product Listing:**
  - Displays a paginated list of products with images, names, prices, ratings, and seller information.
  - Allows users to search for products by name or description.
  - Provides filtering options by category.
  - Enables sorting by price (low to high or high to low).
  - Includes "Show Details" buttons to expand product descriptions directly on the list.
- **Product Details:**
  - Shows detailed information about a selected product, including a larger image, description, price, seller, and rating.
  - Displays similar products based on category.
  - Allows users to add reviews (currently stored in local storage).
- **Shopping Cart:**
  - Users can add products to their cart.
  - Items in the cart are displayed with their name, price, and a "Remove" button.
  - A "Place Order" button simulates the checkout process.
- **Order History:**
  - Authenticated users can view their order history.
  - Orders are displayed with their ID, date, items, total price, and status.
  - Users can track orders (simulated tracking information).
  - Orders can be cancelled or returned (simulated actions).
  - Filtering and sorting options are available for the order history.
- **User Authentication:**
  - Users can register for an account.
  - Users can log in to access protected features (e.g., order history).
  - Basic authentication is implemented (username: "user", password: "password").
- **Seller Profiles:**
  - Users can view seller profiles to see other products offered by the same seller.

## Project Structure

The project is structured as follows:

├── src
│ ├── components
│ │ ├── Cart.js
│ │ ├── Login.js
│ │ ├── OrderHistory.js
│ │ ├── ProductDetails.js
│ │ ├── ProductList.js
│ │ ├── Register.js
| | ├── Layout.js
| | ├── SimilarProducts.js
│ │ └── SellerProfile.js
│ ├── store
│ │ ├── reducers
│ │ │ ├── authReducer.js
│ │ │ └── productReducer.js
│ │ └── index.js
│ ├── routes.js
│ └── App.js
└── ...

- `src/components`: Contains all the React components.
- `src/store`: Contains the Redux store setup (reducers, actions, etc.).
- `src/routes.js`: Defines the application's routes.
- `src/App.js`: The main application component.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **React Router:** Library for handling navigation and routing.
- **Redux:** State management library.
- **Redux Toolkit:** Simplifies Redux development with createSlice and configureStore.
- **Reactstrap:** Provides Bootstrap components for React.
- **Axios:** Promise-based HTTP client for making API requests (simulated in this project).

## Installation and Running

1.  Clone the repository: `git clone <repository-url>`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start`

## Future Improvements

- System for points and cash back
- Signing in through google and other platform
- Add other ways of payment
- System for offers base on the client
