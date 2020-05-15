import axios from 'axios';

export const get = async (url) => {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        throw e;
    }
};

export const getSafe = async (url) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    } catch (e) {
        throw e;
    }
};

export const post = async (url, data) => {
    try {
        return await axios.post(url, data);
    } catch (e) {
        throw e;
    }
};

export const postSafe = async (url, body) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await axios.post(url, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            });
        }
    } catch (e) {
        throw e;
    }
};

export const putSafe = async (url, body) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await axios.put(url, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            });
        }
    } catch (e) {
        throw e;
    }
};

export const deleteSafe = async (url) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    } catch (e) {
        throw e;
    }
};
