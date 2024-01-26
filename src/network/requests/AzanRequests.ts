// import type {ExpertCardType} from './../types';
import { AzanTime, ScreenItem } from "../../types";
import NetworkHandler from "../NetworkHandler";

export const getAzanTimeRequest = async () => {
  return NetworkHandler.get<{
    azans: AzanTime[];
    azanDurationInSec: number;
    milisecToNextAzan: null | number;
  }>(`schedule/azan-time`);
};

export const getAzanScheduleRequest = async () => {
  return NetworkHandler.get<any>(`schedule/azan`);
};
