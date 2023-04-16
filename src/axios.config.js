import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        "Access-Control-Allow-Origin": "*",
           
    }
});

export default instance;

