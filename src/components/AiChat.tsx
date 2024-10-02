"use client";

import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";

const AiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    // Make a request to the ChatGPT API with the user input
    const response = await axios.post(
      "https://app-endcl.azurewebsites.net/chatbot",
      { input: input }
    );

    // Update the conversation history with the response from ChatGPT
    setMessages([...messages, { role: "assistant", content: response.data }]);

    // Clear the input field
    setInput("");
  };

  return (
    <>
      <div className="w-[70%] p-4 border border-[#000000] radius-md shadow-sm flex flex-col gap-6 items-center">
        <TextArea
          placeholder="For any selling-side questions use this chat bot"
          autoSize={{ minRows: 8 }}
          bordered={false}
          value={messages}
          disabled
        />
        <Input
          placeholder="Type free from query here"
          size="large"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="primary" shape="round" onClick={handleSendMessage}>
          Get Answer
        </Button>
      </div>
    </>
  );
};

export default AiChat;
