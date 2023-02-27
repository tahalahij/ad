export class ScreenItem {
    constructor(
      public _id: string,
      public __v: number,
      public path: string,
      public createdAt: string,
      public updatedAt: Date | string | null,
      public ownerId: string,
      public type: "image" | "video" | "audio",
      public delay?: number,
    ) {}
  }
  
