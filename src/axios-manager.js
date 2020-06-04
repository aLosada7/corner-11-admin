import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://corner-11-api.herokuapp.com'
});

// http://localhost:5000
// https://corner-11-api.herokuapp.com

export default instance;