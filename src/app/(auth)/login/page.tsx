import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Header from "@/components/Header";
import Login from "@/components/Login";

// import AuthLayout from "../layout";

const Page = () => {
  return (
    <>
      <Login />
    </>
  );
};

const PageWithLayout: React.FC = () => (
  <AuthLayout
    title={"Welcome Back"}
    description={
      "To keep connected  with us please login with your personal info"
    }
  >
    <Page />
  </AuthLayout>
);

export default PageWithLayout;
