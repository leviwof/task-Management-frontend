import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api"
    baseURL: "https://task-management-system-j0k1.onrender.com/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("Tk111111111111", token)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
