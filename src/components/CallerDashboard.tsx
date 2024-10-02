"use client";
import { CSSProperties, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import AiChat from "./AiChat";
import Accordion from "./Accordion";
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
  theme,
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
import DialCallIconUrl from "@Image/DialCallIcon.svg";
import CutCallIconUrl from "@Image/CutCallIcon.svg";
import PlusExpandIconUrl from "@Image/PlusExpandIcon.svg";
import LikeOutlinedIconUrl from "@Image/LikeOutlineIcon.svg";
import DislikeOutlinedIconUrl from "@Image/DislikeOutlinedIcon.svg";
import TickIconUrl from "@Image/TickIconBlueBG.svg";
import TickIconWhiteBG from "@Image/TickIconWhiteBG.svg";
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

  // Function to go back to the previous item
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
                    {records.map((record) => {
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
              value: records[currentIndex]?.f_name,
              IconUrl: PersonIconUrl,
            },
            {
              label: "Last Name",
              value: records[currentIndex]?.l_name,
              IconUrl: PersonIconUrl,
            },
            {
              label: "Company",
              value: records[currentIndex]?.company,
              IconUrl: CompanyIconUrl,
            },
            {
              label: "Title",
              value: records[currentIndex]?.title,
              IconUrl: TitleIconUrl,
            },
            {
              label: "Phone",
              value: records[currentIndex]?.phone,
              IconUrl: PhoneIconUrl,
            },
            {
              label: "Email",
              value: records[currentIndex]?.email,
              IconUrl: EmailIconUrl,
            },
            {
              label: "Location",
              value: records[currentIndex]?.location,
              IconUrl: LocationIconUrl,
            },
            {
              label: "Campaign.S",
              value: records[currentIndex]?.s_no,
              IconUrl: CampaignIconUrl,
            },
          ].map(({ label, value, IconUrl }) => {
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
    const CollapseItems = call_script.map(({ uuid, title, body }) => {
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
        <div className="text-2xl md:text-3xl font-semibold">Call Script</div>
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

  const dataSource = [
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "1",
      date: "6/2/24",
      summary:
        "The customer demonstrated interest in learning more about the embedding model and in doing a pilot. He asked for a call back in August.",
      callRecording: "www.caallrecordinglink1.com",
    },
    {
      key: "2",
      date: "5/12/24",
      summary: "Customer busy, asked to call later",
      callRecording: "www.caallrecordinglink2.com",
    },
    {
      key: "3",
      date: "5/10/24",
      summary: "Did Not Pick up",
      callRecording: "",
    },
    {
      key: "4",
      date: "10/12/24",
      summary: "Did Not Pick up",
      callRecording: "",
    },
  ];
  const columns: any = [
    {
      title: <div className="text-center">Date</div>,
      dataIndex: "date",
      key: "date",
      width: "15%",
      align: "center",
      className: "text-center",
    },
    {
      title: <div className="text-center">Summary</div>,
      dataIndex: "summary",
      key: "summary",
      width: "55%",
    },
    {
      title: <div className="text-center">Call Recording</div>,
      dataIndex: "callRecording",
      key: "callRecording",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text || "N/A"}
        </a>
      ),
      width: "30%",
    },
  ];

  const RenderCallHistory = () => {
    return (
      <div className="flex flex-col gap-8 items-center mt-[3%]">
        <div className="text-2xl md:text-3xl font-semibold">Call History</div>
        <div className="flex gap-4 md:gap-10">
          <Button type="primary" shape="round" size="small">
            Fetch Call History
          </Button>
          <Button type="primary" shape="round" size="small">
            Fetch Call Details
          </Button>
        </div>
        <div className="px-[5%] md:px-[15%]">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
            style={{ backgroundColor: "inherit" }}
          />
        </div>
      </div>
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
        <div>Frequently Asked Questions</div>
        <div className="w-[90%] border p-6 shadow-sm rounded">
          <Row gutter={[32, 48]}>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a1,
                    q: records[currentIndex]?.q1,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a2,
                    q: records[currentIndex]?.q2,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a3,
                    q: records[currentIndex]?.q3,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a4,
                    q: records[currentIndex]?.q4,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a5,
                    q: records[currentIndex]?.q5,
                  })
                }
                className="w-100% bg-[#BAE4F1] rounded-xl h-[3rem] cursor-pointer"
              ></div>
            </Col>
            <Col span={8}>
              <div
                onClick={() =>
                  viewHandler({
                    a: records[currentIndex]?.a6,
                    q: records[currentIndex]?.q6,
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
        <div className="text-4xl font-semibold">Your Call notes</div>
        <div className="flex items-center justify-between gap-10">
          <div
            onClick={() => setA1((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a1 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>title in-correct</div>
          </div>
          <div
            onClick={() => setA2((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a2 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>Prospect phone number wrong</div>
          </div>
          <div
            onClick={() => setA3((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-[2rem] border-2 rounded-full">
              <Image src={a3 ? TickIconUrl : TickIconWhiteBG} alt="tick" />
            </div>
            <div>Prospect didn’t answer</div>
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
        <div className="text-4xl font-semibold">
          Ask Product/Services Question
        </div>
        <div className="font-medium">
          Ask any question about what we are seeling
        </div>
        <div className="w-[70%] p-4 border border-[#000000] radius-md shadow-sm flex flex-col gap-6 items-center">
          <TextArea
            placeholder="For any selling-side questions use this chat bot"
            autoSize={{ minRows: 8 }}
            bordered={false}
            disabled
          />
          <Input placeholder="Type free from query here" size="large" />
          <Button type="primary" shape="round">
            Get Answer
          </Button>
        </div>
      </div>
    );
  };

  const RenderQNSection = () => {
    return (
      <div className="mt-10 mx-[5%] md:mx-[15%] flex flex-col gap-4 items-center">
        <div className="text-4xl font-semibold">Ask Anything</div>
        <div className="font-medium">General Q&A</div>
        <div className="w-[70%] p-4 border border-[#000000] radius-md shadow-sm flex flex-col gap-6 items-center">
          <TextArea
            placeholder="For any selling-side questions use this chat bot"
            autoSize={{ minRows: 8 }}
            bordered={false}
            disabled
          />
          <Input placeholder="Type free from query here" size="large" />
          <Button type="primary" shape="round">
            Get Answer
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[10%] md:mt-[5%]">
      <div className=" flex flex-col items-center">
        <div className="flex flex-col items-center py-10">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold text-center">
            Caller Dashboard
          </div>
          <p className="text-[0.7rem] md:text-[1rem] font-medium text-center">
            All you need to create call magic
          </p>
        </div>

        {RenderInfoTable()}

        <div className="flex items-center mt-[2%] justify-center">
          <div className="flex gap-[3rem] md:gap-[6rem] border-2 pt-2 pb-2 pl-10 pr-10 border-[#CCCCCC] rounded-full">
            <Image
              src={DialCallIconUrl}
              alt="dialCall"
              className="w-[1.2rem] md:w-[1.7rem] cursor-pointer"
            />
            <Image
              src={CutCallIconUrl}
              alt="cut"
              className="w-[1.3rem] md:w-[1.8rem] cursor-pointer"
            />
          </div>
        </div>

        {/* <div className="flex flex-wrap justify-center lg:justify-between py-10 gap-20">
          <div className="flex flex-wrap gap-10 justify-center lg:justify-between items-end w-full">
            <div className="xl:w-2/12">
              <ConnectCCP phoneNum={records[currentIndex]?.phone} />
            </div>
          </div>
        </div> */}
      </div>
      {RenderCallScript()}
      {RenderCallHistory()}
      {RenderFAQ()}
      {RenderCallNotes()}
      {RenderProductServiceQN()}
      {RenderQNSection()}
      {/*
      <hr className="border-gray-300" /> */}

      {/* <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-20">
          <p className="text-[25px]">
            For any selling-side questions use this chat bot
          </p>
          <div className="bg-[#5236FF] p-4 rounded-lg mt-5">
            <p className="text-3xl text-white">Ask Sell-side Queries</p>
            <AiChat />
          </div>
        </div>
      </section> */}

      {/* <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-20">
          <p className="text-[25px]">
            For any general questions use this chat bot
          </p>
          <p>
            (Note: this bot can answer general questions too, but can be less
            reliable sometimes. So double check responses)
          </p>
          <div className="bg-[#5236FF] p-4 rounded-lg mt-5">
            <p className="text-3xl text-white">AI Co-pilot</p>
            <AiChat />
          </div>
        </div>
      </section> */}

      {/* {selectedFaq && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <p className="mb-5">{selectedFaq.q}</p>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {selectedFaq.a}
            </p>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default CallerDashboard;
