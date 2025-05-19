import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const gymId = localStorage.getItem('gym_id');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('user_id');
    const url:string | undefined  = config.url;
    if (gymId && role && userId) {
      config.url = `${config.baseURL}/gym/${gymId}/${role}/${userId}`+url;
    }else{
      const link=document.createElement('a');
      link.href= '/login';
      link.click();
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting...');
      const link=document.createElement('a');
      link.href= '/login';
      link.click();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
