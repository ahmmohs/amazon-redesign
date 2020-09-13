import axios from 'axios';

/** Get dev env? */
const DEV_URL = 'http://localhost:5001/redesign-6fa8b/us-central1/api';
const PROD_URL = 'prod url'
const isDev = process.env.NODE_ENV === 'development';

/** Create instance based on if dev env */
const instance = axios.create({
  baseURL: isDev ? DEV_URL : PROD_URL,
});

export default instance;