"use client";

import CallerDashboard from "@/components/CallerDashboard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import '../../app/globals.css';

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

export async function getStaticProps() {
  const records = await getRecords();
  return {
    props: {
      records,
    }
  }
};

const Page = ({ records }: any) => {
  return (
    <>
      <Header theme="dark" hideActionButton={true} isUserLogged={true} />
      <CallerDashboard records={records} />
      <Footer />
    </>
  );
};

export default Page;
