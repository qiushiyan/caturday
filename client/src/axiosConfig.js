import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://caturday-backend.herokuapp.com'
});

instance.defaults.method = "POST"
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;