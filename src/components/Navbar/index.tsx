"use client";
import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer, Menu, Flex, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import logoIconUrl from "@Image/CompanyLogo.svg";
import { navMenu } from "@/config/NavMenu";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string[]>(["pre_sales_ai"]);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const { Title } = Typography;

  const navigateToHandler = (key: string) => {
    if (key === "sign_in") {
      router.push("/login");
    } else if (key === "pre_sales_ai") {
      router.push("/");
    }
    return;
  };

  const handleNavMenuClick = (e: any) => {
    setSelectedMenu([e.key]);
    navigateToHandler(e.key);
  };

  return (
        <Layout.Header className="absolute top-5" style={{ backgroundColor: "transparent", width:"100%" }}>
          <Flex justify={"space-between"} align={"center"}>
            <Flex gap={4} align="center">
              <Image src={logoIconUrl} alt="logo" width={60} height={60} />
              <Title level={3} style={{ color: "#767BDE", fontWeight: "800" }}>
                Turigma.ai
              </Title>
            </Flex>
            <div className="hidden md:block flex" style={{ minWidth: "50%" }}>
              <Flex align="center" gap={5}>
                <Menu
                  onClick={handleNavMenuClick}
                  selectedKeys={selectedMenu}
                  mode="horizontal"
                  items={navMenu}
                  style={{
                    borderBottom: "none",
                    minWidth: "90%",
                    backgroundColor:"transparent",
                  }}
                />
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => navigateToHandler("sign_in")}
                >
                  Sign in
                </Button>
              </Flex>
            </div>
            <div className="block md:hidden">
              <Button
                className="block md:hidden"
                type="text"
                onClick={showDrawer}
              >
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
              <Button
                type="primary"
                shape="round"
                onClick={() => navigateToHandler("sign_in")}
              >
                Sign in
              </Button>
            </Drawer>
          </Flex>
        </Layout.Header>
  );
};

export default Navbar;
