const initialState = {
    user: null,
    error: null,
    loading: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER_REQUEST':
      case 'LOGIN_USER_REQUEST':
        return { ...state, loading: true, error: null };
      case 'AUTH_SUCCESS':
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        return { ...state, loading: false, user: action.payload, error: null };
      case 'AUTH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT_USER':
        localStorage.removeItem('user');
        return { ...state, user:null};
      default:
        return state;
    }
  };
  
  export default authReducer;
  