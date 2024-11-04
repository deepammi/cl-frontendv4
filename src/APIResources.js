import axios from "axios";

//const apiResources = axios.create({
//    baseURL:
//      process.env.NODE_ENV === "development"
//        ? "http://localhost:4000/" // Local backend URL
//        : "http://localhost:4000/", // Production backend URL old= https://cl-backendv4-production.up.railway.app/ new = happy-mercy-staging.up.railway.app/
//  });
  
const apiResources = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://happy-mercy-staging.up.railway.app/" // Local backend URL http://localhost:4000
      : "https://happy-mercy-staging.up.railway.app/", // Production backend URL old= https://cl-backendv4-production.up.railway.app/ new = https://happy-mercy-staging.up.railway.app/
});

export default apiResources;
