import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMessages,
  loadMessagesSuccess,
  newMessage,
} from "../redux/actions/chatActions";
import { logoutUser } from "../redux/actions/authActions";
import "../css/Chat.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();
  console.log(message, "this is messages");
  console.log(user, "this is user");
  useEffect(() => {
    const wss = new WebSocket("ws://localhost:3000");
    setSocket(wss);
    dispatch(loadMessages());

    wss.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(newMessage(message));
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/messages");
        dispatch(loadMessagesSuccess(response.data));
      } catch (error) {
        console.error("Error in loading messages", error);
      }
    };

    fetchData();

    return () => {
      wss.close();
    };
  }, [dispatch]);

  const sendMessage = useCallback(() => {
    if (socket && user) {
      const msg = {
        senderId: user._id,
        username: user.username,
        content: message,
      };
      socket.send(JSON.stringify(msg));
      setMessage("");
    }
  }, [socket, user, message]);

  const logout = useCallback(() => {
    dispatch(logoutUser());
    navigate("/login");
  }, [dispatch, navigate]);
  console.log(messages,"This si mesefasdfasdfsadfsdafsadf")
  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              user && msg.senderId === user._id ? "sender" : "receiver"
            }
          >
            {msg?.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
        <button onClick={sendMessage}>Send</button>

        </div>
      </div>
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Chat;
