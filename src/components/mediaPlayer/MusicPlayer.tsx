import { FC, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PauseCircle from "@mui/icons-material/PauseCircle";

type MusicPlayerType = {
  uri: string;
  resetKey: string;
  onEnd: () => void;
};

export const MusicPlayer: FC<MusicPlayerType> = ({ uri, resetKey, onEnd }) => {
  //   const [isPlaying, togglePlay] = useAudio(uri);
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    ref.current?.pause();
    ref.current?.load();
    ref.current?.play();
  }, [resetKey]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton aria-label="delete">
              {isPlaying ? <PauseCircle /> : <PlayArrow />}
            </IconButton>
          </div> */}
      <audio controls autoPlay={true} onEnded={onEnd} ref={ref}>
        <source src={uri} type="audio/mp3" />
        Sorry, your browser doesn't support audio.
      </audio>
    </Box>
  );
};

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(
    () => {
      playing ? audio.play() : audio.pause();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing]
  );

  //   useEffect(() => {
  //     audio.load();
  //     audio.addEventListener("load", () => {
  //       setPlaying(true);
  //       audio.play();
  //     });
  //   }, []);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [playing, toggle];
};
