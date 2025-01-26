const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "REGISTER_REQUEST":
      return { ...state, isLoading: true };
    case "REGISTER_SUCCESS":
      return { ...state, isLoading: false };
    case "REGISTER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "CLEAR_AUTH_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
