import NetworkHandler from "../NetworkHandler";

export const getWhoAmI = async () => {
  return NetworkHandler.get<unknown>(`devices/app/whoami`);
};
