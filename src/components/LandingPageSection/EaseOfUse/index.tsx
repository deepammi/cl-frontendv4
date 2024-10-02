import { Button, Col, Row } from "antd";
import React from "react";
import Image from "next/image";
import EaseOfUseImgUrl from "@Image/EaseOfUseImg.svg";

export default function EaseOfUse() {
  return (
    <div className="p-[2%] flex flex-col items-center gap-8">
      <div className="text-[1.5rem] md:text-[2rem] text-[#4B5264] font-[700]">
        Ease of Use
      </div>
      <Row justify={"space-around"}>
        <Col span={24} order={2} md={{ span: 12, order: 1 }} style={{}}>
          <div className="text-center flex flex-col items-center">
            <div className="text-[1.8rem] mt-[5%] font-[500]">
              Create your account & start your work
            </div>
            <div className="text-[1rem] mt-[3%] w-[75%] text-[#2A3349]">
              The system and workflow is designed by a team of AI and PreSales
              experts. It blends in your existing workflow. Just create a login
              and upload your campaign doc to begin. See results in minutes.
            </div>
            <Button
              shape="round"
              size="large"
              className="mt-[5%] mb-[5%]"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Get Started
            </Button>
          </div>
        </Col>
        <Col span={24} order={1} md={{ span: 12, order: 2 }}>
          <div className="flex items-center justify-center" style={{}}>
            <Image
              src={EaseOfUseImgUrl}
              alt="Image"
              className="w-[90%] md:w-[70%]"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
