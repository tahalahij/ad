import { Device } from "../../types";
import NetworkHandler from "../NetworkHandler";

export const getWhoAmI = async () => {
  return NetworkHandler.get<Device>(`devices/app/whoami`);
};
