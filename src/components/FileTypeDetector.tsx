import { FC } from "react";
import { ScreenItem } from "../types";
import {
  ImageViewer,
  MusicPlayer,
  ScheduledComponent,
  VideoPlayer,
} from "./index";

type FileTypeDetectorProps ={
    onEnd: () => void
} & ScreenItem;

export const FileTypeDetector: FC<FileTypeDetectorProps> = ({
  uri,
  fileName,
  fileType,
  onScreenDuration,
  onEnd,
}) => {
  //@ts-ignore
  const _fileType: "image" | "video" | "music" = fileType!;

  if (_fileType === "image") {
    return (
      <ScheduledComponent duration={onScreenDuration!} onEnd={onEnd}>
        <ImageViewer uri={uri} />;
      </ScheduledComponent>
    );
  }

  if (_fileType === "music") {
    return <MusicPlayer uri={uri} onEnd={onEnd} />;
  }

  if (_fileType === "video") {
    return <VideoPlayer uri={uri} onEnd={onEnd} />;
  }

  return null;
};
