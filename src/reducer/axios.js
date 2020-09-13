import axios from 'axios';

const DEV_URL = 'dev url';
const PROD_URL = 'prod url'
const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: isDev ? DEV_URL : PROD_URL,
});

export default instance;