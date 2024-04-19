export const clearTokenInfo = () => {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('isLoggedIn');
}
