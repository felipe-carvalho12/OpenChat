import React, { ReactElement, useState, useRef } from "react";
import { Socket } from "socket.io-client";

interface MessageInputProps {
  socket: Socket;
}

export default function MessageInput({
  socket,
}: MessageInputProps): ReactElement {
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setMessage("");
    socket.emit("message", { value: message });
  };

  return (
    <div
      className="w-full h-1/5 p-2 rounded-b-md cursor-text bg-transparent b-top-transparent"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Write a message"
        value={message}
        style={{ background: "transparent" }}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      ></input>
    </div>
  );
}
