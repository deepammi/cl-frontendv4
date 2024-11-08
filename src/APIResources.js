import axios from "axios";

const apiResources = axios.create({
  // baseURL: "http://localhost:4000/"
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://happy-mercy-staging.up.railway.app" // Local backend URL
      : "https://cl-backendv4-production.up.railway.app/", // Production backend URL
});
export default apiResources;
