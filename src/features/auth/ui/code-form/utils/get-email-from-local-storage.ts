export const getEmailFromLocalStorage = () => {
    const jsonEmail = localStorage.getItem('email');

    return jsonEmail && JSON.parse(jsonEmail);
}
