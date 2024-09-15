import React, { useEffect, useState } from "react";

const ChatBot = () => {
  const [webChatLoaded, setWebChatLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
    script.onload = () => {
      if (window.botpress) {
        window.botpress.init({
          botId: "1f8251f5-f029-4c4c-bf15-0694b4a56f53",
          hostUrl: "https://cdn.botpress.cloud/webchat/v2",
          botName: "ElectroMart Assistant",
          useSessionStorage: false,
          clientId: "4b30f646-557d-4a67-bfaa-8eea77c21312", // Add clientId here
        });
        console.log("Botpress WebChat initialized.");
        setWebChatLoaded(true);
      } else {
        console.error("Botpress WebChat script is not available.");
      }
    };
    script.onerror = () => {
      console.error("Failed to load Botpress WebChat script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (window.botpress) {
      window.botpress.open();
    } else {
      console.error("Botpress WebChat is not initialized.");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Chat with us!</button>
    </div>
  );
};

export default ChatBot;
