import axios from "axios";

const ApiClient = axios.create();

ApiClient.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_APP_BACKEND_URL;
  return config;
});

export default ApiClient;
