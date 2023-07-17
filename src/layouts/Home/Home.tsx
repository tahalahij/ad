import { FC, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import { useFetchSchedules } from "./useData";
import { ScheduledItem } from "./ScheduledItem";
import { ScreenItem } from "../../types";
import { useAzan } from "../../components/azan/useAzan";

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const [interaction, setInteraction] = useState(false);
  const { data, error, loading, clearError, fetchData } = useFetchSchedules();
  const [currentItem, setCurrentItem] = useState<ScreenItem>();
  const { azanItem } = useAzan();

  useEffect(() => {
    setCurrentItem(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.resetKey]);

  useEffect(() => {
    setCurrentItem(azanItem);
  }, [azanItem?.resetKey]);

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
      {currentItem && interaction ? (
        <ScheduledItem item={currentItem} onEnd={onEnd} />
      ) : null}
      <Backdrop
        sx={{ color: "#322", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || !interaction}
      >
        {!interaction && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography color={"#FFF"}>برای شروع پخش کلیک کنید</Typography>
            <Button
              variant="contained"
              onClick={() => setInteraction(true)}
              // startIcon={<MdAdd />}
            >
              شروع پخش
            </Button>
          </div>
        )}
        {loading && <CircularProgress color="info" />}
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
