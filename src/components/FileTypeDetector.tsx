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
  path,
  _id,
  type,
  delay,
  onEnd,
}) => {
  //@ts-ignore
  const _fileType: "image" | "video" | "audio" = type!;

  if (_fileType === "image") {
    return (
      <ScheduledComponent duration={delay!} onEnd={onEnd}>
        <ImageViewer uri={path} />;
      </ScheduledComponent>
    );
  }

  if (_fileType === "audio") {
    return <MusicPlayer uri={path} onEnd={onEnd} />;
  }

  if (_fileType === "video") {
    return <VideoPlayer uri={path} onEnd={onEnd} />;
  }

  return null;
};
