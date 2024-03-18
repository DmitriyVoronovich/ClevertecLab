export const authGoogle = () => {
    const currentUrl = window.location.search;

    const urlSearchParams = new URLSearchParams(currentUrl);
    if (urlSearchParams.has('accessToken')) {

        const paramValue = urlSearchParams.get('accessToken');
        localStorage.setItem('jwtToken', JSON.stringify(paramValue));
    }
}
