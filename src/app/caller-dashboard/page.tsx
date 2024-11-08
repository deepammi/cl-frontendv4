import CallerDashboard from "@/components/CallerDashboard";
import Header from "@/components/Header";
import "../../app/globals.css";
import Footer from "@/components/Footer/index";
import Navbar from "@/components/Navbar";
import { Layout } from "antd";
import apiResources from "@/APIResources";
import { useEffect, useState } from "react";

// const getRecords = async () => {
//   try {
//     const response = await fetch(
//       "https://app-endcl.azurewebsites.net/records",
//       { cache: "no-store" }
//     );
//     let result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch("https://api.example.com/data");
//   const data = await res.json();

//   const records = await getRecords();

//   return {
//     props: {
//       records,
//     },
//   };
// };

const useRecords = () => {
  const [records, setRecords] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        console.log("getRecords called");
        const result = await apiResources.get("/buyer_list");
        console.log("API response data:", result.data);
        setRecords(result.data);
      } catch (err) {
        console.log("Error in getRecords:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getRecords();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return { records, loading, error };
};

const Page = () => {
  const { records, loading, error } = useRecords();

  console.log("Page. records:", records);

  return (
    <Layout>
      <Navbar />
      <CallerDashboard records={records} />
      <Footer />
    </Layout>
  );
};

export default Page;
