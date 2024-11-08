"use client";
import CallerDashboard from "@/components/CallerDashboard";
import Header from "@/components/Header";
import "../../app/globals.css";
import Footer from "@/components/Footer/index";
import Navbar from "@/components/Navbar";
import { Layout } from "antd";
import apiResources from "@/APIResources";
import { useEffect, useState } from "react";

const useRecords = () => {
  const [records, setRecords] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const result = await apiResources.get("/buyer_list");
        setRecords(result.data);
      } catch (err) {
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

  return (
    <Layout>
      <Navbar />
      <CallerDashboard records={records} />
      <Footer />
    </Layout>
  );
};

export default Page;
