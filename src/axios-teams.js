import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://basket-manager-react.firebaseio.com/'
});

export default instance;