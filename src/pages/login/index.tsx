import Header from "@/components/Header";
import Login from "@/components/Login";
import '../../app/globals.css';

const Page = () => {
  return (
    <>
      <Header theme="dark" heroBkg={false} hideActionButton={true} />
      <Login />
    </>
  );
};

export default Page;
