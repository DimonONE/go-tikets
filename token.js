let token = '';

const setToken = (newToken) => (token = newToken);

const getToken = () => token;

export { setToken, getToken };
