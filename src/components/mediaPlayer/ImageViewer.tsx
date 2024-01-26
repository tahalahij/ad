import { FC } from "react";
import { ImageAnimation } from "../../types/Animations";
import { Animator } from "../Animator";

type ImageViewerType = {
  uri: string;
  animation: ImageAnimation;
};

export const ImageViewer: FC<ImageViewerType> = ({
  uri,
  animation = "none",
}) => {
  return (
    <Animator animation={animation}>
      <div style={{ display: "flex", flex: 1, width: "100%", height: "100%" }}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={uri}
          alt="not-available"
        />
      </div>
    </Animator>
  );
};
