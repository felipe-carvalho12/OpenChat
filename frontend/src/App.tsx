import React, { ReactElement, useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import io, { Socket } from "socket.io-client";

export interface Message {
  senderid: string;
  value: string;
}

const socket: Socket = io("ws://localhost:8000");

export default function App(): ReactElement {
  const [myId, setMyId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    value: "",
  });

  useEffect(() => {
    socket.on("id", (data: { id: string }) => {
      setMyId(data.id);
    });
    socket.on("new-connection", ({ connid }: { connid: string }) => {
      setSuccessMsg({
        isOpen: true,
        value: `New connection: ${connid}`,
      });
    });
    socket.on("message", ({ senderid, value }: Message) => {
      setMessages((messages) => [...messages, { senderid, value }]);
    });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center p-2">
      <div
        className="w-full h-4/5 rounded-md shadow-lg bg-transparent sm:w-1/2 lg:w-1/3"
        style={{
          boxShadow: "0 0 20px var(--primary-color)",
        }}
      >
        <div className="w-full h-1/5 p-4 b-bottom-primary-hover">
          <h1 style={{ color: "var(--primary-color)" }}>OpenChat</h1>
        </div>
        <div className="h-4/5">
          <Messages messages={messages} myId={myId} />
          <MessageInput socket={socket} />
        </div>
      </div>
      <Snackbar
        open={successMsg.isOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessMsg({ isOpen: false, value: "" })}
      >
        <Alert severity="success">{successMsg.value}</Alert>
      </Snackbar>
    </div>
  );
}
