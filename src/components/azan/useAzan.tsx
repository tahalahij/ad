import { useEffect, useState } from "react";
import { getAzanTimeRequest } from "../../network/requests";
import { AzanTime, ScreenItem } from "../../types";
import { BASE_API_URL } from "../../network/Constants";

const MAX_RETRY_COUNT = 10;

export const useAzan = () => {
  const [times, setTimes] = useState<AzanTime[]>([]);
  const [azanItem, setAzanItem] = useState<ScreenItem>();

  const fetchAzanSchedule = async (retryCount: number = 1) => {
    getAzanTimeRequest()
      .then((res) => {
        setTimes(res.payload?.azans!);
      })
      .catch(() => {
        if (retryCount <= MAX_RETRY_COUNT) {
          setTimeout(() => {
            fetchAzanSchedule(retryCount + 1);
          }, retryCount * 1000);
        }
      });
  };

  useEffect(() => {
    // fetch schedule at first load
    fetchAzanSchedule(1);
  }, []);

  useEffect(() => {
    // run interval to observe time
    const intervalId = setInterval(() => {
      const now = new Date();
      now.setMilliseconds(0);
      if (
        now.getHours() == 0 &&
        now.getMinutes() == 0 &&
        now.getSeconds() == 0
      ) {
        // refetch schedule every day
        fetchAzanSchedule(1);
      }
      if (times.length > 0) {
        times.forEach((time) => {
          const azanDate = new Date(time.start);
          azanDate.setMilliseconds(0);

          if (azanDate.valueOf() === now.valueOf()) {
            // change current playing item
            fetch(BASE_API_URL + "files/download/azan", { method: "HEAD" })
              .then((response) => {
                setAzanItem(
                  new ScreenItem(
                    "azan_id",
                    0,
                    "",
                    "azan",
                    new Date().toString(),
                    null,
                    "APP_ID",
                    response.headers.get("Content-Type")?.startsWith("audio")
                      ? "audio"
                      : "video",
                    0,
                    "azan-" + Date.now()
                  )
                );
              })
              .catch();
          }
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [times]);

  return { azanItem };
};
