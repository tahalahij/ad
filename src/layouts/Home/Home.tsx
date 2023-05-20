import { FC, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useFetchSchedules } from "./useData";
import { ScheduledItem } from "./ScheduledItem";
import { ScreenItem } from "../../types";

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { data, error, loading, clearError, fetchData } = useFetchSchedules();
  const [currentItem, setCurrentItem] = useState<ScreenItem>();

  useEffect(() => {
    setCurrentItem(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.resetKey]);

  const onEnd = (id: string) => {
    // const index = data.findIndex((value) => value.id === id);
    // if (index < data.length - 1) {
    //   setCurrentItem(data[index + 1]);
    // } else {
    //   setCurrentItem(data[0]);
    // }
    fetchData();
  };

  return (
    <Container maxWidth="xl" style={{ height: "100%", padding: 0 }}>
      {currentItem ? <ScheduledItem item={currentItem} onEnd={onEnd} /> : null}
      <Backdrop
        sx={{ color: "#322", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
