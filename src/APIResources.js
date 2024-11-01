import axios from "axios";

const apiResources = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/" // Local backend URL
      : "https://cl-backendv4-production.up.railway.app/", // Production backend URL
});
export default apiResources;
