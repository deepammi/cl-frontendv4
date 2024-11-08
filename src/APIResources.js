import axios from "axios";

const apiResources = axios.create({
  // baseURL: "http://localhost:4000/" // uncomment and use this for LOCAL dev development. Make sure local server (cl-backendv4) is up and running
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://happy-mercy-staging.up.railway.app" // Staging backend URL
      : "https://cl-backendv4-production.up.railway.app/", // Production backend URL
});
export default apiResources;
