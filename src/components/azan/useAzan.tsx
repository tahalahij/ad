import { useEffect, useState } from "react";
import { getAzanTimeRequest } from "../../network/requests";
import { AzanTime, AzanTypeEnum, ScreenItem } from "../../types";
import { BASE_API_URL } from "../../network/Constants";

const MAX_RETRY_COUNT = 10;

export const useAzan = () => {
  const [times, setTimes] = useState<AzanTime[]>([]);
  const [azanItem, setAzanItem] = useState<ScreenItem>();

  const fetchAzanSchedule = async (retryCount: number = 1) => {
    getAzanTimeRequest()
      .then((res) => {
        if (res.success) {
          setTimes(res.payload?.azans!);
        } else {
          if (retryCount <= MAX_RETRY_COUNT) {
            setTimeout(() => {
              fetchAzanSchedule(retryCount + 1);
            }, retryCount * 1000);
          }
        }
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
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        // refetch schedule every day
        fetchAzanSchedule(1);
      }
      if (times.length > 0) {
        times.filter((value) => {
          return (
            value.type === AzanTypeEnum.DAWN_PRAYER ||
            value.type === AzanTypeEnum.NOON ||
            value.type === AzanTypeEnum.VESPER
          );
        }).forEach((time) => {
          const azanDate = new Date(time.start);
          azanDate.setMilliseconds(0);

          // TODO: check with backend diff
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

  const getPersianNameByType = (type: AzanTypeEnum) => {
    switch (type) {
      case AzanTypeEnum.SUNRISE:
        return 'طلوع آفتاب';
      case AzanTypeEnum.DAWN_PRAYER:
        return 'اذان صبح';
      case AzanTypeEnum.NOON:
        return 'اذان ظهر';
      case AzanTypeEnum.SUNSET:
        return 'غروب آفتاب';
      case AzanTypeEnum.VESPER:
        return 'اذان مغرب';
      case AzanTypeEnum.MIDNIGHT:
        return 'نیمه شب شرعی';
      default:
        return ''
    }
  }

  return { azanItem, times, getPersianNameByType };
};
