"use client";
import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import axios from "axios";
import AiChat from "./AiChat";
import ConnectCCP from "./ConnectCCP.jsx";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Input,
  Row,
  Select,
  Table,
  Modal as AntDModal,
} from "antd";
const { TextArea } = Input;
import PreviousIconUrl from "@Image/PreviousIcon.svg";
import NextIconUrl from "@Image/NextIcon.svg";
import Image from "next/image";
import SearchIconUrl from "@Image/SearchIcon.svg";
import DownIconUrl from "@Image/DownIcon.svg";
const { Option } = Select;
import PersonIconUrl from "@Image/PersonIconDark.svg";
import CompanyIconUrl from "@Image/CompanyIcon.svg";
import TitleIconUrl from "@Image/TitleIcon.svg";
import PhoneIconUrl from "@Image/PhoneIcon.svg";
import EmailIconUrl from "@Image/FooterMailIcon.svg";
import LocationIconUrl from "@Image/LocationIcon.svg";
import CampaignIconUrl from "@Image/CompaignIcon.svg";
import PlusExpandIconUrl from "@Image/PlusExpandIcon.svg";
import LikeOutlinedIconUrl from "@Image/LikeOutlineIcon.svg";
import DislikeOutlinedIconUrl from "@Image/DislikeOutlinedIcon.svg";
import TickIconUrl from "@Image/TickIconBlueBG.svg";
import TickIconWhiteBG from "@Image/TickIconWhiteBG.svg";
import CallLogs from "./CallLogs";
import {
  fifthSectionText,
  firstSectionText,
  fourthSectionText,
  secondSectionText,
  seventhSectionText,
  sixthSectionText,
} from "@/config/CallerDahsboardPageText";
import apiResources from "@/APIResources";

type Props = {
  records: any[];
};

const CallerDashboard = ({ records }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [note, setNote] = useState("");
  const [openFAQModal, setOpenFAQModal] = useState<boolean>(false);

  const viewHandler = (payload: any) => {
    setOpenFAQModal(true);
    setSelectedFaq(payload);
  };

  const handleNext = () => {
    if (currentIndex < records.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const saveButtonHandler = async () => {
    let payload = {
      q1: "Prospect title in-correct",
      a1: a1,
      q2: "Prospect phone number wrong",
      a2: a2,
      q3: "Prospect didn’t answer",
      a3: a3,
      note,
    };
    let config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post(
      "https://app-endcl.azurewebsites.net/assessments",
      payload,
      config
    );
    if (response.status === 200) {
      initialState();
      alert("Assessment has been submitted, Thank You");
    }
  };

  const initialState = () => {
    setA1(false);
    setA2(false);
    setA3(false);
    setNote("");
  };

  const call_script = [
    {
      uuid: "ss_a4",
      title: "Intro: Linkedin Post",
      body: records?.[currentIndex]?.call_script?.ss_a4,
    },
    {
      uuid: "bs_a5",
      title: "Intro: LinkedIn Events",
      body: records?.[currentIndex]?.call_script?.bs_a5,
    },
    {
      uuid: "ss_a2",
      title: "Intro: News",
      body: records?.[currentIndex]?.call_script?.ss_a2,
    },
    {
      uuid: "ss_a3",
      title: "Intro: Investments ",
      body: records?.[currentIndex]?.call_script?.ss_a3,
    },
    {
      uuid: "bs_a3",
      title: "Intro: Company Awards",
      body: records?.[currentIndex]?.call_script?.bs_a3,
    },
    {
      uuid: "intro",
      title: "Buyer Job Challenges ",
      body: records?.[currentIndex]?.call_script?.intro,
    },
    {
      uuid: "bs_a1",
      title: "Value Proposition",
      body: records?.[currentIndex]?.call_script?.bs_a1,
    },
    {
      uuid: "bs_a4",
      title: "Case Study",
      body: records?.[currentIndex]?.call_script?.bs_a4,
    },
    {
      uuid: "ss_a1",
      title: "Buyer Industry Challenges",
      body: records?.[currentIndex]?.call_script?.ss_a1,
    },
    {
      uuid: "bs_a2",
      title: "Buyer Values",
      body: records?.[currentIndex]?.call_script?.bs_a2,
    },
  ];

  const RenderInfoTable = () => {
    return (
      <div className="w-100 ml-[5%] md:ml-[15%] mr-[5%] md:mr-[15%] pt-[1%] pb-[1%] pl-[5%] pr-[5%] shadow-md border">
        <Row gutter={[80, 32]}>
          <Col span={24} className="w-100">
            <div className="w-100 flex items-center justify-between">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handlePrev}
              >
                <Image
                  src={PreviousIconUrl}
                  alt="previous"
                  className="w-[0.8rem] md:w-[1.2rem]"
                />
                <div className="text-[0.8rem] md:text-[1rem]">Previous</div>
              </div>
              <div className="w-[50%] md:w-[30%]">
                <Input.Group
                  compact
                  size="small"
                  style={{
                    display: "flex",
                    borderRadius: "50px",
                    overflow: "hidden",
                    border: "1px solid #d9d9d9",
                  }}
                >
                  <Input
                    style={{
                      width: "30px",
                      border: "none",
                      textAlign: "center",
                    }}
                    prefix={<Image src={SearchIconUrl} alt="search" />}
                    disabled
                  />
                  <Select
                    style={{ width: "calc(100% - 30px)", border: "none" }}
                    placeholder="Search by Company"
                    suffixIcon={<Image src={DownIconUrl} alt="down" />}
                    bordered={false}
                    dropdownStyle={{ borderRadius: "10px" }}
                    onSelect={(value) => {
                      setCurrentIndex(parseInt(value));
                    }}
                  >
                    {records?.map((record) => {
                      return (
                        <Option key={record?.index} value={record?.index}>
                          {record.company}
                        </Option>
                      );
                    })}
                  </Select>
                </Input.Group>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleNext}
              >
                <div className="text-[0.8rem] md:text-[1rem]">Next</div>
                <Image
                  src={NextIconUrl}
                  alt="next"
                  className="w-[0.8rem] md:w-[1.2rem]"
                />
              </div>
            </div>
          </Col>
          {[
            {
              label: "First Name",
              value: records?.[currentIndex]?.f_name,
              IconUrl: PersonIconUrl,
            },
            {
              label: "Last Name",
              value: records?.[currentIndex]?.l_name,
              IconUrl: PersonIconUrl,
            },
            {
              label: "Company",
              value: records?.[currentIndex]?.company,
              IconUrl: CompanyIconUrl,
            },
            {
              label: "Title",
              value: records?.[currentIndex]?.title,
              IconUrl: TitleIconUrl,
            },
            {
              label: "Phone",
              value: records?.[currentIndex]?.phone,
              IconUrl: PhoneIconUrl,
            },
            {
              label: "Email",
              value: records?.[currentIndex]?.email,
              IconUrl: EmailIconUrl,
            },
            {
              label: "Location",
              value: records?.[currentIndex]?.location,
              IconUrl: LocationIconUrl,
            },
            {
              label: "Campaign.S",
              value: records?.[currentIndex]?.s_no,
              IconUrl: CampaignIconUrl,
            },
          ]?.map(({ label, value, IconUrl }) => {
            return (
              <Col span={24} md={12}>
                <div className="">
                  <div className="flex gap-2 items-center">
                    <Image src={IconUrl} alt="" />
                    <div>{label}</div>
                  </div>
                  <Input
                    style={{
                      border: "none",
                      cursor: "auto",
                      paddingLeft: "1.5rem",
                      marginTop: "0.5rem",
                      borderRadius: "0",
                    }}
                    value={value}
                    disabled
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  const getItems: () => CollapseProps["items"] = () => {
    const CollapseItems = call_script?.map(({ uuid, title, body }) => {
      return {
        key: `${uuid}`,
        label: (
          <div className="text-xl md:text-2xl font-medium w-100">{title}</div>
        ),
        children: (
          <div className=" flex flex-col gap-4 items-center w-[100%]">
            <div className="text-sm md:text-base">{body}</div>
            <div className="flex items-center justify-between w-[90%] md:w-[80%]  align-center">
              <div className="flex gap-4 md:gap-6">
                <Image
                  src={LikeOutlinedIconUrl}
                  alt="like"
                  className="w-[0.9rem] md:w-[1.1rem]"
                />
                <Image
                  src={DislikeOutlinedIconUrl}
                  alt="dislike"
                  className="w-[0.9rem] md:w-[1.1rem]"
                />
              </div>
              <div className="w-[40%] md:w-[50%]">
                <input
                  placeholder="Comments"
                  className="border-2 border-[#000000] rounded-full pl-3 w-[100%] pt-1 pb-1"
                />
              </div>
              <Button
                type="primary"
                shape="round"
                className="text-base md:text-lg lg:text-xl px-4 md:px-6 lg:px-8"
              >
                Submit
              </Button>
            </div>
          </div>
        ),
        style: { width: "100%", backgroundColor: "inherit" },
      };
    });
    return CollapseItems;
  };

  const RenderCallScript = () => {
    return (
      <div className="flex flex-col gap-8 items-center mt-[3%] ml-[5%] md:ml-[10%] mr-[5%] md:mr-[10%]">
        <div className="text-2xl md:text-3xl font-semibold">
          {secondSectionText.title}
        </div>
        <div className="w-[100%] border-2 rounded shadow-md">
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <Image
                src={PlusExpandIconUrl}
                alt="expand"
                className="w-[0.9rem] md:w-[1.2rem]"
              />
            )}
            expandIconPosition="end"
            style={{ padding: "1rem", width: "100%" }}
            items={getItems()}
            collapsible={"icon"}
            ghost={true}
          />
        </div>
      </div>
    );
  };

  const RenderCallHistory = () => {
    return (
      <>
        <CallLogs buyer_identifier={records?.[currentIndex]?.buyer_identifier} />
      </>
    );
  };

  const RenderFAQ = () => {
    return (
      <div className="mt-[4%] mx-[5%] md:mx-[10%] flex flex-col items-center gap-6 text-4xl font-semibold">
        <AntDModal
          centered={true}
          title={"FAQ"}
          open={openFAQModal}
          onCancel={() => {
            setOpenFAQModal(false);
          }}
          footer={null}
        >
          <div>{`${selectedFaq?.q ?? "Question"}?`}</div>
          <div>{`${selectedFaq?.a ?? "Answer"}.`}</div>
        </AntDModal>
        <div>{fourthSectionText.title}</div>
        <div className="w-[90%] border p-6 shadow-sm rounded">
          <Row gutter={[32, 48]}>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a1,
                    q: records?.[currentIndex]?.q1,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a2,
                    q: records?.[currentIndex]?.q2,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a3,
                    q: records?.[currentIndex]?.q3,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a4,
                    q: records?.[currentIndex]?.q4,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a5,
                    q: records?.[currentIndex]?.q5,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records?.[currentIndex]?.a6,
                    q: records?.[currentIndex]?.q6,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  const RenderCallNotes = () => {
    return (
      <div className="mt-[3%] mx-[5%] md:mx-[15%] flex flex-col items-center gap-8">
        <div className="text-4xl font-semibold">{fifthSectionText.title}</div>
        <div className="flex items-center justify-between gap-10">
          <div
            onClick={() => setA1((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a1 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>{fifthSectionText.check1text}</div>
          </div>
          <div
            onClick={() => setA2((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a2 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>{fifthSectionText.check2text}</div>
          </div>
          <div
            onClick={() => setA3((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a3 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>{fifthSectionText.check3text}</div>
          </div>
        </div>
        <div className="w-[70%]">
          <TextArea
            value={note}
            onChange={(e) => {
              e.preventDefault();
              setNote(e.target.value);
            }}
            placeholder="Call Note"
            autoSize={{ minRows: 8 }}
          />
        </div>
        <div>
          <Button
            onClick={saveButtonHandler}
            type="primary"
            shape="round"
            className="p-5"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  const RenderProductServiceQN = () => {
    return (
      <div className="mt-10 mx-[5%] md:mx-[15%] flex flex-col gap-4 items-center">
        <div className="text-4xl font-semibold">{sixthSectionText.title}</div>
        <div className="font-medium">{sixthSectionText.subTitle}</div>
        <AiChat />
      </div>
    );
  };

  const RenderQNSection = () => {
    return (
      <div className="mt-10 mx-[5%] md:mx-[15%] flex flex-col gap-4 items-center">
        <div className="text-4xl font-semibold">{seventhSectionText.title}</div>
        <div className="font-medium">{seventhSectionText.subTitle}</div>
        <AiChat />
      </div>
    );
  };

  return (
    <div className="mt-[10%] md:mt-[5%]">
      <div className=" flex flex-col items-center">
        <div className="flex flex-col items-center py-10">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold text-center">
            {firstSectionText.title}
          </div>
          <p className="text-[0.7rem] md:text-[1rem] font-medium text-center">
            {firstSectionText.subTitle}
          </p>
        </div>

        {RenderInfoTable()}

        <ConnectCCP phoneNum={records?.[currentIndex]?.phone} />
      </div>
      {RenderCallScript()}
      {RenderCallHistory()}
      {RenderFAQ()}
      {RenderCallNotes()}
      {RenderProductServiceQN()}
      {RenderQNSection()}
    </div>
  );
};

export default CallerDashboard;
