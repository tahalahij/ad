export class Device {
  constructor(
    public _id: string,
    public __v: number,
    public name: string,
    public createdAt: string,
    public updatedAt: Date | string | null,
    public ip: string,
    public mac: string,
    public operatorId: string,
    public enabled: boolean,
    public isOnline: boolean
  ) {}
}
