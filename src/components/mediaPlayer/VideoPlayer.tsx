import { FC } from "react";

type VideoPlayerType = {
  uri: string;
  onEnd: () => void;
};

export const VideoPlayer: FC<VideoPlayerType> = ({ uri, onEnd }) => {
  return (
    <div style={{ flex: 1 }}>
      <video controls autoPlay={true} muted onEnded={onEnd}>
        <source src={uri} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    </div>
  );
};
