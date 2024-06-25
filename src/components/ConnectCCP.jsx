// Copyright Amazon.com, Incon. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { memo, useRef, useState, useEffect } from "react";
import "amazon-connect-streams";
import axios from "axios";
import CallButton from "./phone/CallButton.tsx";
import HangUpButton from "./phone/HangUpButton.tsx";

const ConnectCCP = ({ phoneNum }) => {
  const ref = useRef();
  const [contactId, setContactId] = useState("");
  const [number, setNumber] = useState("1" + phoneNum.replace(/\D/g, ""));

  const [buttonState, setButtonState] = useState("enabled");

  useEffect(() => {
    try {
      connect.core.initCCP(ref.current, {
        ccpUrl: "https://tbi-test-connect.my.connect.aws/connect/ccp-v2",
        region: "us-east-1",
        loginPopup: true, // optional, defaults to `true`
        loginPopupAutoClose: true, // optional, defaults to `true`
        loginOptions: {
          // optional, if provided opens login in new window
          autoClose: true, // optional, defaults to `false`
          height: 600, // optional, defaults to 578
          width: 400, // optional, defaults to 433
          top: 0, // optional, defaults to 0
          left: 0, // optional, defaults to 0
        },
        softphone: {
          // optional, defaults below apply if not provided
          allowFramedSoftphone: true, // optional, defaults to false
          disableRingtone: false, // optional, defaults to false
          // ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
        },
        pageOptions: {
          // optional
          enableAudioDeviceSettings: true, // optional, defaults to 'false'
          enablePhoneTypeSettings: true, // optional, defaults to 'true'
        },
        contactFlowId: "b7f26976-0dc7-4391-b43d-bf6ea1b19e91",
        ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
        ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
        ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
      });
      global.connect.agent((agent) => {
        console.log("Agent initialized");

        // Handle agent state changes
        agent.onStateChange((state) => {
          console.log("Agent state changed:", state);
        });

        // Handle agent error
        agent.onError((error) => {
          console.error("Agent error:", error);
        });

        // Handle agent availability
        agent.onRoutableState((routableState) => {
          console.log("Agent routable state:", routableState);
        });
      });
      console.log("initCCP end");
    } catch (error) {
      console.error("Error initializing CCP:", error);
    }
  }, [ref]);

  const outBoundCall = async () => {
    setButtonState("callActived");
    try {
      const { data } = await axios.get(
        `https://o2xpogtamg.execute-api.us-east-1.amazonaws.com/dev/GetConnectManager?destPhone=%2B${number}&queueARN=695227e1-08a7-41ff-b42e-1fd6f882ea55`
      );
      setContactId(JSON.parse(data.body).ContactId);
      setButtonState("hangUpActived");
    } catch (error) {
      console.log("error", error);
    }
  };

  const disconnectCall = async () => {
    try {
      console.log(contactId);
      const { data } = await axios.get(
        `https://o2xpogtamg.execute-api.us-east-1.amazonaws.com/dev/HangUp?contactId=${contactId}`
      );
      console.log(data);
      setButtonState("enabled");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div ref={ref} style={{ display: "none" }} />
      <div className="flex justify-between mb-5">
        <CallButton status={buttonState} acceptHandler={outBoundCall} />
        <HangUpButton status={buttonState} disconnectHandler={disconnectCall} />
      </div>
    </>
  );
};

export default memo(ConnectCCP);
