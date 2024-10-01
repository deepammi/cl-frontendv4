import CallerDashboard from "@/components/CallerDashboard";
import Header from "@/components/Header";
import "../../app/globals.css";
import Footer from "@/components/Footer/index";
import Navbar from "@/components/Navbar";
import { Layout } from "antd";

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

const Page = async () => {
  const getRecords = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/records`,
        { cache: "no-store" }
      );
      let result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const records = await getRecords();

  return (
    <Layout>
      <Navbar />
      <CallerDashboard records={records} />
      <Footer />
    </Layout>
  );
};

export default Page;
