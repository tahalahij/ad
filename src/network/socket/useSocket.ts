import { useEffect, useState } from "react";
import { getSocketInstance } from "./SocketManager";
import { getWhoAmI } from "../requests";

export const useSocket = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [resetKey, setResetKey] = useState("ideal");

  useEffect(() => {
    getSocketInstance().on("connect", () => {
      // getSocketInstance().emit("online", true, () => {
      //   setIsOnline(true);
      // });
      console.log("connected");
    });
    getSocketInstance().on("SCHEDULE_CREATED", (arg) => {
      if (arg.device === deviceId) {
        setResetKey(Date.now().toString());
      }
    });
    return () => {
      getSocketInstance().off("SCHEDULE_CREATED");
      getSocketInstance().off("connect");
      getSocketInstance().off("disconnect");
      // getSocketInstance().disconnect();
    };
  }, [deviceId]);

  useEffect(() => {
    getWhoAmI()
      .then((response) => {
        if (response.success) {
          setDeviceId(response.payload?._id!);
        }
      })
      .catch(console.log);
  }, []);

  return resetKey;
};
