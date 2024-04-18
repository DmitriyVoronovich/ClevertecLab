import axios from 'axios';

import { getToken } from '@utils/get-token.ts';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = getToken();

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});
