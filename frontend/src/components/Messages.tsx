import React, { ReactElement } from "react";
import { Message } from "../App";

interface MessageProps {
  messages: Message[];
  myId: string;
}

export default function Messages({
  messages,
  myId,
}: MessageProps): ReactElement {
  return (
    <div className="h-4/5 p-2 overflow-y-auto flex flex-col">
      {messages.map((message, index) => {
        const isMyMessage = message.senderid === myId;
        return (
          <div
            key={index}
            className={`bg-dark p-2 mb-2 rounded-md shadow-lg w-max ${
              isMyMessage ? "self-end" : ""
            }`}
          >
            <div
              className="text-sm"
              style={{
                color: isMyMessage ? "var(--secondary-color)" : "var(--red)",
              }}
            >
              {message.senderid}
            </div>
            <div>{message.value}</div>
          </div>
        );
      })}
    </div>
  );
}
