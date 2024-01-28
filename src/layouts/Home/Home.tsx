import { FC, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useFetchSchedules } from "./useData";
import { ScheduledItem } from "./ScheduledItem";
import { ScreenItem } from "../../types";
import { useAzan } from "../../components/azan/useAzan";
import { ReligiousTimesBackground } from "../../assets/images";
import {
  ConvertToArabicNumbers,
  convertDateToPersian,
  twoDigitIt,
} from "../../utils/helpers";

type HomeProps = {
  shouldRefetchSchedule: string; // as reset key
};

export const Home: FC<HomeProps> = ({ shouldRefetchSchedule }) => {
  const [interaction, setInteraction] = useState(false);
  const [currentItem, setCurrentItem] = useState<ScreenItem>();
  const { data, error, loading, clearError, fetchData } = useFetchSchedules(
    currentItem?.resetKey?.startsWith("azan")
  );
  const { azanItem, times: azanTimes, getPersianNameByType } = useAzan();

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

  useEffect(() => {
    if (
      shouldRefetchSchedule !== "ideal" &&
      !currentItem?.resetKey?.startsWith("azan")
    ) {
      fetchData();
    }
  }, [shouldRefetchSchedule]);

  const sortedAzanTimes = azanTimes.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.start).valueOf() - new Date(b.start).valueOf();
  });

  return (
    <Box
      style={{
        height: "100%",
        padding: 0,
        display: "flex",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "34ch",
          height: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <img
          src={ReligiousTimesBackground}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "left top",
          }}
          alt={"item.title"}
          loading="lazy"
        />
        <div
          style={{
            zIndex: 2,
            width: "inherit",
            height: "70%",
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0) 5%, rgb(25, 25, 25) 20%)",
          }}
        />
        <div
          style={{
            zIndex: 3,
            width: "inherit",
            height: "100%",
            backgroundColor: "rgba(22, 22, 64, 0.1)",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color={"white"} sx={{ mt: "8ch" }}>
            اوقات شرعی
          </Typography>
          <Typography
            variant="h6"
            color={"white"}
            sx={{ mt: "4ch", mb: "2ch" }}
          >
            {`${convertDateToPersian(sortedAzanTimes[0]?.start)}`}
          </Typography>
          {sortedAzanTimes.map((t) => {
            const startTime = new Date(t.start);
            return (
              <div
                key={t.start.toString()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Typography variant="subtitle1" color={"white"}>
                  {ConvertToArabicNumbers(
                    `${twoDigitIt(startTime.getHours())}:${twoDigitIt(
                      startTime.getMinutes()
                    )}:${twoDigitIt(startTime.getSeconds())}`
                  )}
                </Typography>
                <Typography variant="subtitle1" color={"white"}>
                  {getPersianNameByType(t.type)}
                </Typography>
              </div>
            );
          })}
        </div>
      </Box>
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
    </Box>
  );
};
