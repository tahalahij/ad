import { Fragment, PropsWithChildren } from "react";
import { ImageAnimation } from "../types/Animations";
const Fade = require("react-reveal/Fade");
const Flip = require("react-reveal/Flip");
const Zoom = require("react-reveal/Zoom");
const Rotate = require("react-reveal/Rotate");
const Bounce = require("react-reveal/Bounce");

interface AnimatorProps {
  animation: ImageAnimation;
}

export const Animator = ({
  animation = "none",
  children,
}: PropsWithChildren<AnimatorProps>) => {
  let Wrapper = Fragment;
  let props = {};
  if (animation.includes("fade")) {
    Wrapper = Fade;
  }
  if (animation.includes("flip")) {
    Wrapper = Flip;
  }
  if (animation.includes("bounce")) {
    Wrapper = Bounce;
  }
  if (animation === "zoom") {
    Wrapper = Zoom;
  }
  if (animation === "rotate") {
    Wrapper = Rotate;
  }
  if (animation.split("-").length > 1) {
    //@ts-ignore
    props[animation.split("-")[1]] = true;
    console.log(props);
  }

  return <Wrapper {...props} key={animation}>{children}</Wrapper>;
};
