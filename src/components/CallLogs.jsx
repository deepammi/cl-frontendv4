"use client";

import apiResources from "../APIResources";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { thirdSectionText } from "@/config/CallerDahsboardPageText";

export const getServerSideProps = async () => {
  // Load initial table
  const callLogs = await apiResources.get(`/get-call-logs?page=1&limit=50`);

  console.log(callLogs.data.retrievedRows);
  return {
    props: { datatableUsers: callLogs.data.retrievedRows },
  };
};

export default function CallLogs({
  datatableUsers = [],
  parentTran = "",
  modShow = true,
}) {
  const [showPortal, setShowPortal] = useState(false);
  const [perPage, setPerPage] = useState(50);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [currentEntries, setCurrentEntries] = useState(
    datatableUsers.length ? datatableUsers : []
  );
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [transcript, setTranscript] = useState([]);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(datatableUsers.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev")
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    if (type === "next")
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    return originalElement;
  };

  const fetchRecordings = async () => {
    try {
      const res = await apiResources.post("fetchDataType", {
        mode: "recording",
      });
    } catch (e) {
      console.log(e);
    }

    setRefresh(true);
  };

  const fetchCallLogs = async () => {
    const res = await apiResources.post("fetchDataType", {
      mode: "transcript",
    });

    setRefresh(true);
  };

  const openTranscript = (data) => {
    if (data.transcript) {
      parentTran(JSON.parse(data.transcript));
    } else {
      parentTran([]);
    }
    modShow(true);
  };

  useEffect(() => {
    const call = async () => {
      const newCallLogs = await apiResources.get(
        `/get-call-logs?page=${current}&limit=${perPage}`
      );
      setCurrentEntries(newCallLogs.data.retrievedRows);
      setRefresh(false);
    };
    call();
  }, [current, perPage, refresh]);

  const data = [
    {
      id: 15,
      call_id: "e5afae27-97d6-43ce-94a0-900ba32df53a",
      call_date: "2024-08-30T19:50:10.757Z",
      record_fetched: true,
      buyer_id: 1,
      transcript:
        '[{"participant":"CUSTOMER","content":"Hello, this is a testing call."},{"participant":"AGENT","content":"No"},{"participant":"AGENT","content":"This is the best thing."},{"participant":"CUSTOMER","content":"Hello?"},{"participant":"AGENT","content":"I know"},{"participant":"CUSTOMER","content":"This is a testing on."},{"participant":"AGENT","content":"This"},{"participant":"AGENT","content":"Hello."},{"participant":"CUSTOMER","content":"No."},{"participant":"CUSTOMER","content":"No, no."},{"participant":"AGENT","content":"Hello."},{"participant":"CUSTOMER","content":"This is this thing called."},{"participant":"AGENT","content":"just"}]',
      call_recording:
        "s3://amazon-connect-call-recordings-caller-dashboard/connect/tbi-test-connect/CallRecordings/2024/07/10/e5afae27-97d6-43ce-94a0-900ba32df53a_20240710T14:04_UTC.wav",
    },
  ];

  const columns = [
    {
      title: <div className="text-center">Date</div>,
      dataIndex: "call_date",
      key: "call_date",
      width: "15%",
      align: "center",
      className: "text-center",
      render: (_date) => {
        const date = _date
          ? new Date(_date).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "2-digit",
            })
          : "N/A";
        return <div>{date}</div>;
      },
    },
    {
      title: <div className="text-center">Summary</div>,
      dataIndex: "summary",
      key: "summary",
      width: "35%",
      render: (summary) => {
        return <div>{summary ?? "N/A"}</div>;
      },
    },
    {
      title: <div className="text-center">Call Recording</div>,
      dataIndex: "call_recording",
      key: "call_recording",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text || "N/A"}
        </a>
      ),
      width: "30%",
    },
    {
      title: <div className="text-center">Transcript</div>,
      dataIndex: "transcript",
      key: "transcript",
      render: (transcript) => (
        <Button
          onClick={() => {
            if (transcript) {
              setTranscript(JSON.parse(transcript));
            } else {
              setTranscript([]);
            }
            setShowTranscriptModal(true);
          }}
          type="primary"
          shape="round"
        >
          view
        </Button>
      ),
      width: "20%",
      align: "center",
    },
  ];

  return (
    <div className="w-[100%]">
      <Modal
        centered={true}
        title={"Transcript"}
        open={showTranscriptModal}
        onCancel={() => {
          setShowTranscriptModal(false);
        }}
        footer={null}
      >
        {transcript.length ? (
          transcript.map((dat, id) => {
            return (
              <p key={id}>
                Participant: {dat.participant} - {dat.content}
              </p>
            );
          })
        ) : (
          <p>No transcript</p>
        )}
      </Modal>
      <div className="w-100%] flex flex-col gap-8 items-center mt-[3%]">
        <div className="text-2xl md:text-3xl font-semibold">{thirdSectionText.title}</div>
        <div className="flex gap-4 md:gap-10">
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={fetchRecordings}
          >
            {thirdSectionText.button1Text}
          </Button>
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={fetchCallLogs}
          >
            {thirdSectionText.button2Text}
          </Button>
        </div>
        <div className="px-[5%] md:px-[15%]">
          <Table
            dataSource={currentEntries}
            columns={columns}
            bordered
            pagination={true}
            style={{ backgroundColor: "inherit",tableLayout: 'fixed' }}
          />
        </div>
      </div>
    </div>
  );
}
