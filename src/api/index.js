// import axios from "axios";
// const BASE_URL = "https://newsapi.org/v2/";

// export const apiClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     "X-Api-key": "29572233891b420dbd348208afbda3db",
//   },
// });

import axios from "axios";

// const server = "http://192.168.1.56:8080";
const server = "http://localhost:8080";

const makeUrl = (endpoint) => {
  return `${server}${endpoint}`;
};

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
  };

  if (newConfig.headers["Content-Type"] === "multipart/form-data")
    return newConfig;

  return newConfig;
});

export const client = {
  get: async (endPoint, config) => {
    return axios.get(makeUrl(endPoint), config);
  },

  post: async (endPoint, data, config) => {
    return axios.post(makeUrl(endPoint), data, config);
  },

  put: async (endPoint, data, config) => {
    return axios.put(makeUrl(endPoint), data, config);
  },

  patch: async (endPoint, data, config) => {
    return axios.patch(makeUrl(endPoint), data, config);
  },

  delete: async (endPoint, config) => {
    return axios.delete(makeUrl(endPoint), config);
  },
};
