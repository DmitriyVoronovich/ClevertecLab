export const getToken = () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    return !!token && JSON.parse(token)
}
