"use client";
import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import logoIconUrl from "@Image/CompanyLogo.svg";
import { navMenu } from "@/config/NavMenu";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";

const Navbar = () => {
  const isLoggedIn = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const { Title } = Typography;

  const navigateToHandler = (key: string) => {
    if (key === "sign_in") {
      router.push("/login");
    }
    if (key === "pre_sales_ai") {
      router.push("/pre-sales-ai");
    }
    if (key === "benefit"){
      router.push("/benefit");
    }
    if (key === "easy"){
      router.push("/easy");
    }
    if (key === "blog"){
      router.push("/blog");
    }
    if (key === "visual_design"){
      router.push("/visual-design");
    }
    console.log(key, "k...");
    return;
  };

  const handleNavMenuClick = (e: any) => {
    setSelectedMenu([e.key]);
    navigateToHandler(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <Layout.Header
      className="absolute top-5"
      style={{ backgroundColor: "transparent", width: "100%" }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center cursor-pointer" onClick={()=>router.push("/")}>
          <Image src={logoIconUrl} alt="logo" width={60} height={60} />
          <Title level={3} style={{ color: "#767BDE", fontWeight: "800" }}>
            Turigma.ai
          </Title>
        </div>
        <div className="hidden md:flex" style={{ minWidth: "50%" }}>
          <div className="flex items-center gap-5">
            <Menu
              onClick={handleNavMenuClick}
              selectedKeys={selectedMenu}
              mode="horizontal"
              items={navMenu}
              style={{
                borderBottom: "none",
                minWidth: "90%",
                backgroundColor: "transparent",
              }}
            />
            {!isLoggedIn ? (
              <Button
                type="primary"
                shape="round"
                onClick={() => navigateToHandler("sign_in")}
              >
                Sign in
              </Button>
            ) : (
              <Button type="primary" shape="round" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="block md:hidden">
          <Button className="block md:hidden" type="text" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </div>
        <Drawer
          title={"Turigma.ai"}
          placement="right"
          closable={true}
          onClose={showDrawer}
          open={visible}
          style={{ zIndex: 99999, color: "#767BDE" }}
        >
          <Menu
            onClick={handleNavMenuClick}
            selectedKeys={selectedMenu}
            mode="vertical"
            items={navMenu}
          />
          {!isLoggedIn ? (
            <Button
              type="primary"
              shape="round"
              onClick={() => navigateToHandler("sign_in")}
            >
              Sign in
            </Button>
          ) : (
            <Button type="primary" shape="round" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Drawer>
      </div>
    </Layout.Header>
  );
};

export default Navbar;
