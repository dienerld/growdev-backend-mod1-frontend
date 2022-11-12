import _axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axios = _axios.create({
  baseURL: BASE_URL,
});

export { axios };
