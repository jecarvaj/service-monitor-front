import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000/" });

const setHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = token;
};

const removeToken = () => {
    delete axiosInstance.defaults.headers.common["Authorization"]
};

const loginUser = (email, password) => {
  return axiosInstance
    .post("login", { user: { email, password } })
    .catch((error) => error);
};

const getServices = () => {
  return axiosInstance.get("services").catch((error) => error);
};
const getService = (id, week) => {
  return axiosInstance.get(`services/${id}/${week}`).catch((error) => error);
};

const postUpdateAvailability = (data, service_id, week) => {
  return axiosInstance
    .post(`services/${service_id}/${week}/update_availability`, { data: data })
    .catch((error) => error);
};

const deleteSession = () => {
  return axiosInstance.delete("logout").catch((error) => error);
};

const createService = (data) => {
  return axiosInstance
    .post('services', data)
    .catch((error) => error);
}

export {
  loginUser,
  setHeader,
  getServices,
  getService,
  postUpdateAvailability,
  deleteSession,
  removeToken,
  createService
};
