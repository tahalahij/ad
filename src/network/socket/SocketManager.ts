import { io } from "socket.io-client";
import { WS_API_URL } from "../Constants";

export const socket = io(WS_API_URL!, {
//   transports: ["pulling"],
});

export const getSocketInstance = () => socket;
