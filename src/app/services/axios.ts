import _axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

const axios = _axios.create({
  baseURL: BASE_URL,
});

export { axios };
