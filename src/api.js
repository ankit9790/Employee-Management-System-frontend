import axios from "axios";

const API = axios.create({
   baseURL: "https://employee-management-system-backend-12w2.onrender.com/api",
   // baseURL:"http://localhost:3000/api",
});

export default API;
