export enum AzanTypeEnum {
  SUNRISE = "SUNRISE",
  NOON = "NOON",
  VESPER = "VESPER",
}

export type AzanTime = {
  start: Date;
  date: string;
  type: AzanTypeEnum;
  createdAt: Date;
  updatedAt: Date;
};
