const initialState = {
  isLoading: false,
  trackingError: null,
  products: [
    {
      id: 1,
      name: "Laptop",
      price: 1200,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Powerful laptop with excellent performance and design.",
      seller: "Tech Store",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Book",
      price: 20,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Interesting book about science and technology.",
      seller: "Bookstore",
      category: "Books",
    },
    {
      id: 3,
      name: "Smartphone",
      price: 800,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "High-end smartphone with an amazing camera.",
      seller: "Mobile Hub",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Headphones",
      price: 150,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Noise-cancelling headphones for immersive sound.",
      seller: "Audio Gear",
      category: "Accessories",
    },
    {
      id: 5,
      name: "Gaming Console",
      price: 500,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Next-generation gaming console with 4K support.",
      seller: "Game World",
      category: "Gaming",
    },
    {
      id: 6,
      name: "Smartwatch",
      price: 250,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Feature-packed smartwatch with fitness tracking.",
      seller: "Tech Store",
      category: "Wearables",
    },
    {
      id: 7,
      name: "Tablet",
      price: 300,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Lightweight tablet for work and entertainment.",
      seller: "Gadget Shop",
      category: "Electronics",
    },
    {
      id: 8,
      name: "Camera",
      price: 700,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "DSLR camera with interchangeable lenses.",
      seller: "Photo Pro",
      category: "Photography",
    },
    {
      id: 9,
      name: "Backpack",
      price: 50,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Durable and spacious backpack for travel.",
      seller: "Outdoor Store",
      category: "Accessories",
    },
    {
      id: 10,
      name: "Shoes",
      price: 100,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Comfortable running shoes for daily use.",
      seller: "Footwear Plus",
      category: "Fashion",
    },
    {
      id: 11,
      name: "Chair",
      price: 120,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Ergonomic chair for home or office.",
      seller: "Furniture Depot",
      category: "Furniture",
    },
    {
      id: 12,
      name: "Electric Kettle",
      price: 40,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Fast-heating electric kettle for quick boiling.",
      seller: "Kitchen Essentials",
      category: "Home Appliances",
    },
    {
      id: 13,
      name: "Bluetooth Speaker",
      price: 80,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      seller: "Sound Hub",
      category: "Audio",
    },
    {
      id: 14,
      name: "Fitness Tracker",
      price: 90,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Track your daily activities and stay fit.",
      seller: "Wellness Store",
      category: "Wearables",
    },
    {
      id: 15,
      name: "Desk Lamp",
      price: 30,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Adjustable LED desk lamp with brightness control.",
      seller: "Light Store",
      category: "Home Decor",
    },
    {
      id: 16,
      name: "Wireless Mouse",
      price: 25,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Ergonomic wireless mouse with smooth navigation.",
      seller: "Tech Store",
      category: "Accessories",
    },
    {
      id: 17,
      name: "Keyboard",
      price: 45,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Mechanical keyboard for comfortable typing.",
      seller: "Tech Store",
      category: "Accessories",
    },
    {
      id: 18,
      name: "Sunglasses",
      price: 60,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Stylish sunglasses with UV protection.",
      seller: "Fashion Hub",
      category: "Fashion",
    },
    {
      id: 19,
      name: "Coffee Maker",
      price: 100,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Automatic coffee maker for barista-quality coffee.",
      seller: "Kitchen Essentials",
      category: "Home Appliances",
    },
    {
      id: 20,
      name: "T-Shirt",
      price: 20,
      imageUrl: "https://www.1zoom.me/prev/303/302250.jpg",
      description: "Comfortable cotton T-shirt in multiple colors.",
      seller: "Fashion Hub",
      category: "Clothing",
    },
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
  ],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RETURN_ORDER_REQUEST":
      return { ...state, isLoading: true };
    case "RETURN_ORDER_SUCCESS":
      return { ...state, isLoading: false };
    case "RETURN_ORDER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "CANCEL_ORDER_REQUEST":
      return { ...state, isLoading: true };
    case "CANCEL_ORDER_SUCCESS":
      return { ...state, isLoading: false };
    case "CANCEL_ORDER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "CLEAR_SELLER_PROFILE_ERROR":
      return { ...state, error: null };
    case "CLEAR_PRODUCT_LIST_ERROR":
      return { ...state, error: null };
    case "CLEAR_ORDER_HISTORY_ERROR":
      return { ...state, error: null };
    case "CLEAR_TRACKING_ERROR":
      return { ...state, trackingError: null };
    case "CLEAR_CART_ERROR":
      return { ...state, error: null };
    case "CLEAR_PRODUCT_ERROR":
      return { ...state, error: null };
    case "TRACK_ORDER_REQUEST":
      return { ...state, isLoading: true, trackingError: null };
    case "TRACK_ORDER_SUCCESS":
      return { ...state, isLoading: false, trackingInfo: action.payload };
    case "TRACK_ORDER_FAILURE":
      return { ...state, isLoading: false, trackingError: action.payload };
    case "REMOVE_FROM_CART_REQUEST":
      return { ...state, isLoading: true };
    case "REMOVE_FROM_CART_SUCCESS":
      return { ...state, isLoading: false };
    case "REMOVE_FROM_CART_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_TO_CART_REQUEST":
      return { ...state, isLoading: true };
    case "ADD_TO_CART_SUCCESS":
      return { ...state, isLoading: false };
    case "ADD_TO_CART_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_REVIEWS_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_REVIEWS_SUCCESS":
      return { ...state, isLoading: false, reviews: action.payload };
    case "FETCH_REVIEWS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SUBMIT_REVIEW_REQUEST":
      return { ...state, isLoading: true };
    case "SUBMIT_REVIEW_SUCCESS":
      return { ...state, isLoading: false };
    case "SUBMIT_REVIEW_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "TRACK_ORDER_REQUEST":
      return { ...state, isLoading: true };
    case "TRACK_ORDER_SUCCESS":
      return { ...state, isLoading: false, trackingInfo: action.payload };
    case "TRACK_ORDER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "PLACE_ORDER_REQUEST":
      return { ...state, isLoading: true };
    case "PLACE_ORDER_SUCCESS":
      return { ...state, isLoading: false };
    case "PLACE_ORDER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_ORDER_HISTORY_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_ORDER_HISTORY_SUCCESS":
      return { ...state, isLoading: false, orders: action.payload };
    case "FETCH_ORDER_HISTORY_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_SELLER_PROFILE_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_SELLER_PROFILE_SUCCESS":
      return { ...state, isLoading: false, sellerProfile: action.payload };
    case "FETCH_SELLER_PROFILE_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_PRODUCT_DETAILS_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_PRODUCT_DETAILS_SUCCESS":
      return { ...state, isLoading: false, productDetails: action.payload };
    case "FETCH_PRODUCT_DETAILS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, isLoading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
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
    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
      };
    default:
      return state;
  }
};

export default productReducer;
