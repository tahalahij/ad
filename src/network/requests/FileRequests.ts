// import type {ExpertCardType} from './../types';
import { ScreenItem } from "../../types";
import NetworkHandler from "../NetworkHandler";

type fileListParamsReq = {
  page?: number;
  limit?: number;
  _order?: "desc" | "asc";
};

export const getFilesListRequest = async () => {
  return NetworkHandler.get<ScreenItem>(`schedule`, {});
};
