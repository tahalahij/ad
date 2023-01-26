import { FC, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useFetchSchedules } from "./useData";
import { ScheduledItem } from "./ScheduledItem";
import { ScreenItem } from "../../types";

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { data, error, loading, clearError } = useFetchSchedules();
  const [currentItem, setCurrentItem] = useState<ScreenItem>();

  useEffect(() => {
    setCurrentItem(data[0]);
  }, [data]);

  const onEnd = (objectId: string) => {
    const index = data.findIndex((value) => value.objectId === objectId);
    if (index < data.length - 1) {
      setCurrentItem(data[index + 1]);
    } else {
      setCurrentItem(data[0]);
    }
  };

  return (
    <Container maxWidth="xl" style={{ height: "100%" }}>
      {currentItem ? <ScheduledItem item={currentItem} onEnd={onEnd} /> : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={!!error}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={clearError}
      >
        <Alert severity="error" sx={{ width: "100%", }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
