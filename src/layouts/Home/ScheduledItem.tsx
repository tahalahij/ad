import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { FileTypeDetector } from "../../components";
import { ScreenItem } from "../../types";

type ScheduledItemProps = {
  item: ScreenItem;
  onEnd: (objectId: string) => void;
};

export const ScheduledItem: FC<ScheduledItemProps> = ({ item, onEnd }) => {
  //   const item = useData(objectId);

  return (
    <Paper
      variant="outlined"
      square
      style={{
        flex: 1,
        height: "100%",
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FileTypeDetector onEnd={() => onEnd(item.objectId)} {...item} />
    </Paper>
  );
};
