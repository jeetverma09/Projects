export const registerUser = (userData) => ({
    type: 'REGISTER_USER_REQUEST',
    payload: userData,
});

export const loginUser = (userData) => ({
    type: 'LOGIN_USER_REQUEST',
    payload: userData,
});

export const authSuccess = (userData) => ({
    type: 'AUTH_SUCCESS',
    payload: userData,
});

export const authFailure = (error) => ({
    type: 'AUTH_FAILURE',
    payload: error,
});

export const logoutUser = (error)=>{
    sessionStorage.removeItem('user')
    return {type: 'LOGOUT_USER'}
}
