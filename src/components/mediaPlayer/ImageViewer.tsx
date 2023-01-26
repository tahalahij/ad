import { FC } from "react";

type ImageViewerType = {
  uri: string;
};

export const ImageViewer: FC<ImageViewerType> = ({ uri }) => {
  return (
    <div style={{ flex: 1, width: "100%", height: "100%" }}>
      <img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={uri} alt="not-available"/>
    </div>
  );
};
