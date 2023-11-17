import { useEffect, useState } from "react";
import { getSocketInstance } from "./SocketManager";

export const useSocket = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    getSocketInstance().on("connect", () => {
      // getSocketInstance().emit("online", true, () => {
      //   setIsOnline(true);
      // });
      console.log('connected')
    });
    return () => {
      getSocketInstance().off("connect");
      getSocketInstance().off("disconnect");
      // getSocketInstance().disconnect();
    };
  }, []);

  return isOnline;
};
