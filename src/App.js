import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAlertContext from "./hooks/useAlertContext";

const App = () => {
  // Your frontend component
  const [messages, setMessages] = useState("");
  const { alert, dispatch } = useAlertContext();
  console.log(alert);
  const count = alert?.length;
  console.log(count);

  useEffect(() => {
    const fetchAlert = async () => {
      const response = await fetch("/api/alert", {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALERT", payload: json });
        setMessages(json[0].alert);
      }
    };
    fetchAlert();
    notify();
  }, []);
  const notify = () => toast(messages);

  const sendSMS = async () => {
    const response = await fetch("/api/sendSMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+9779808846298", // Replace with the recipient's phone number
        message: messages,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("SMS sent successfully hello khaita");
    } else {
      console.error(`Failed to send SMS: ${data.error}`);
    }
  };

  return (
    <>
      <div className="grid main grid-cols-10 h-screen bg-gray-700">
        <Navbar count={count} alert={alert} />
        <div className="col-span-7 flex flex-col h-screen mt-20 mr-5 p-8 relative">
          <button onClick={sendSMS} className="flex justify-end text-neutral-100 px-6 py-3 rounded-md absolute -top-10 right-6 bg-neutral-900">
            Send SMS
          </button>
          <Map />
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default App;
