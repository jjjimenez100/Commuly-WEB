import axios from 'axios';
import BASE_URL from '../config/httpService';

const httpService = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
    Expires: '-1',
    Pragma: 'no-cache',
  },
  baseURL: BASE_URL,
});

export default httpService;
