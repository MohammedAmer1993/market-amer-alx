const initialState = {
  products: [
    // Sample product data (replace with your actual data)
    {
      id: 1,
      name: "Laptop",
      price: 1200,
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
      description: "Powerful laptop with...",
      seller: "Tech Store",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Book",
      price: 20,
      imageUrl: "https://via.placeholder.com/150",
      description: "Interesting book about...",
      seller: "Bookstore",
      category: "Books",
    },
    // ... more products
  ],
  cart: [],
  orders: [
    {
      id: 1,
      date: new Date(),
      items: [
        { id: 1, name: "Laptop", quantity: 1, price: 1200 },
        { id: 2, name: "Book", quantity: 2, price: 20 },
      ],
      total: 1240,
    },
  ], // We'll add order details later
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "PLACE_ORDER": // We'll define this action later
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [], // Clear the cart after placing an order
      };
    // Add more cases for other actions later (e.g., place order, track order)
    default:
      return state;
  }
};

export default productReducer;
