import { useEffect, useState } from "react";
import { getAzanTimeRequest } from "../../network/requests";
import { AzanTime } from "../../types";
import { time } from "console";

const MAX_RETRY_COUNT = 10;

export const useAzan = () => {
  const [times, setTimes] = useState<AzanTime[]>([]);

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
        times.forEach(time => {
            const azanDate = new Date(time.start);
            if (azanDate.valueOf() === now.valueOf()) {
                // change current playing item
            }
        });
      }

    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
