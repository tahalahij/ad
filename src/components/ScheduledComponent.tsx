import { useEffect, ReactNode, FC } from "react";

type ScheduledComponentProps = {
  children: ReactNode;
  onEnd: () => void;
  duration: number;
  resetKey: string,
};

export const ScheduledComponent: FC<ScheduledComponentProps> = ({
  children,
  onEnd,
  duration,
  resetKey,
  ...props
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd();
    }, duration*1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, resetKey]);

  return <>{children}</>;
};
