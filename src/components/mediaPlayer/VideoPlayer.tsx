import { FC, useEffect, useRef } from "react";

type VideoPlayerType = {
  uri: string;
  resetKey: string;
  onEnd: () => void;
};

export const VideoPlayer: FC<VideoPlayerType> = ({ resetKey, uri, onEnd }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.pause();
    ref.current?.load();
    ref.current?.play();
  }, [resetKey]);

  return (
    <div style={{ flex: 1 }}>
      <video controls autoPlay={true} muted onEnded={onEnd} ref={ref}>
        <source src={uri} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    </div>
  );
};
