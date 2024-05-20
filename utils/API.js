import axios from 'axios'
const BASE_API_URL = 'http://localhost:3000/api'
export const instance = axios.create({ baseURL: BASE_API_URL });

export const handelRequest = async (method, endpoint, payload = {}) => {
    try {
        const response = await method(endpoint, payload);
        return response.data ? response.data : response;
    }
    catch (error) {
        return error;
    }
}



