export enum AzanTypeEnum {
  SUNRISE = 'SUNRISE',
  NOON = 'NOON', //azan
  VESPER = 'VESPER',//azan
  DAWN_PRAYER = 'DAWN_PRAYER',//azan
  SUNSET = 'SUNSET',
  MIDNIGHT = 'MIDNIGHT',
}

export type AzanTime = {
  start: Date;
  date: string;
  type: AzanTypeEnum;
  createdAt: Date;
  updatedAt: Date;
};
