const initialState = {
  isLoading: false, // Add isLoading to the initial state

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
    case "ADD_TO_CART_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "ADD_TO_CART_SUCCESS": // Add this case
      // ... update cart in the state ...
      return { ...state, isLoading: false };
    case "ADD_TO_CART_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_REVIEWS_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "FETCH_REVIEWS_SUCCESS": // Add this case
      return { ...state, isLoading: false, reviews: action.payload }; // Assuming you store reviews separately
    case "FETCH_REVIEWS_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "SUBMIT_REVIEW_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "SUBMIT_REVIEW_SUCCESS": // Add this case
      // ... update reviews in the state ...
      return { ...state, isLoading: false };
    case "SUBMIT_REVIEW_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "TRACK_ORDER_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "TRACK_ORDER_SUCCESS": // Add this case
      return { ...state, isLoading: false, trackingInfo: action.payload }; // Assuming you store tracking info separately
    case "TRACK_ORDER_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "PLACE_ORDER_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "PLACE_ORDER_SUCCESS": // Add this case
      // ... update orders and clear cart ...
      return { ...state, isLoading: false };
    case "PLACE_ORDER_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_ORDER_HISTORY_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "FETCH_ORDER_HISTORY_SUCCESS": // Add this case
      return { ...state, isLoading: false, orders: action.payload };
    case "FETCH_ORDER_HISTORY_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_SELLER_PROFILE_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "FETCH_SELLER_PROFILE_SUCCESS": // Add this case
      return { ...state, isLoading: false, sellerProfile: action.payload }; // Assuming you store seller profile separately
    case "FETCH_SELLER_PROFILE_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_PRODUCT_DETAILS_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "FETCH_PRODUCT_DETAILS_SUCCESS": // Add this case
      return { ...state, isLoading: false, productDetails: action.payload }; // Assuming you store details separately
    case "FETCH_PRODUCT_DETAILS_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_PRODUCTS_REQUEST": // Add this case for fetching products
      return { ...state, isLoading: true };
    case "FETCH_PRODUCTS_SUCCESS": // Add this case for successful fetch
      return { ...state, isLoading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE": // Add this case for failed fetch
      return { ...state, isLoading: false, error: action.payload };
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
