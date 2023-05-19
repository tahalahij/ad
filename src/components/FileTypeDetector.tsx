import { FC } from "react";
import { BASE_API_URL } from "../network/Constants";
import { ScreenItem } from "../types";
import {
  ImageViewer,
  MusicPlayer,
  ScheduledComponent,
  VideoPlayer,
} from "./index";

type FileTypeDetectorProps = {
  onEnd: () => void;
} & ScreenItem;

export const FileTypeDetector: FC<FileTypeDetectorProps> = ({
  path,
  name,
  _id,
  type,
  delay,
  resetKey,
  onEnd,
}) => {
  //@ts-ignore
  const _fileType: "image" | "video" | "audio" = type!;
  const uri = encodeURI(BASE_API_URL + "files/download/stream/" + name);

  if (_fileType === "image") {
    return (
      <ScheduledComponent duration={delay!} resetKey={resetKey!} onEnd={onEnd}>
        <ImageViewer uri={uri} />
      </ScheduledComponent>
    );
  }

  if (_fileType === "audio") {
    return <MusicPlayer resetKey={resetKey!} uri={uri} onEnd={onEnd} />;
  }

  if (_fileType === "video") {
    return <VideoPlayer resetKey={resetKey!} uri={uri} onEnd={onEnd} />;
  }

  return null;
};
