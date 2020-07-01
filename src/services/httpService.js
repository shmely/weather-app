import { history } from '../history';
import Axios from 'axios';

const BASE_URL = 'http://dataservice.accuweather.com/'


const axios = Axios.create({
    //withCredentials: true
});


export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {

        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method = 'get', data = null) {

    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.dir(err);
        // if (err.response && err.response.status === 401) {
        if (err.response) {
            history.push('/login');
        }
        throw err;
    }
}