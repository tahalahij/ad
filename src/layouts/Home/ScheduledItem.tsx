import { FC } from "react";
import { FileTypeDetector } from "../../components";
import { ScreenItem } from "../../types";

type ScheduledItemProps = {
  item: ScreenItem;
  onEnd: (objectId: string) => void;
};

export const ScheduledItem: FC<ScheduledItemProps> = ({ item, onEnd }) => {
  return (
    <div
      // variant="outlined"
      // square
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FileTypeDetector onEnd={() => onEnd(item._id)} {...item} />
    </div>
  );
};
