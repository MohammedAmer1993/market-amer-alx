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
    default:
      return state;
  }
};

export default authReducer;
