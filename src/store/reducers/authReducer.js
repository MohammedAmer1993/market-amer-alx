// src/store/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null, // Add user object here
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // Assuming you pass user details in the payload
      };
    case "LOGOUT": // We'll handle logout later
      return { ...state, isAuthenticated: false };
    case "LOGIN_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS": // Add this case
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGIN_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    case "REGISTER_REQUEST": // Add this case
      return { ...state, isLoading: true };
    case "REGISTER_SUCCESS": // Add this case
      return { ...state, isLoading: false };
    case "REGISTER_FAILURE": // Add this case
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
