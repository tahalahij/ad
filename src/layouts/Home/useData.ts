import { useEffect, useRef, useState } from "react";
import { getFilesListRequest } from "../../network/requests";
import { ScreenItem } from "../../types";

const retryInterval =
  parseInt(process.env.REACT_APP_NO_SCHEDULE_RETRY_MINUTE!, 10) * 60 * 1000;

export const useFetchSchedules = (azanIsPlaying = false) => {
  const [data, setData] = useState<ScreenItem | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const noScheduleInterval = useRef<ReturnType<typeof setTimeout>>();

  const clearError = () => {
    setError("");
  };

  const retryLater = () => {
    noScheduleInterval.current = setTimeout(() => {
      fetchData();
    }, retryInterval);
  };

  const fetchData = async () => {
    try {
      clearTimeout(noScheduleInterval.current);
      setLoading(true);
      const response = await getFilesListRequest();
      if (response.success) {
        setData({ ...response.payload!, resetKey: Date.now().toString() });
      } else if (!!data) {
        // to not replay last item
        setData(undefined);
        retryLater();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    if (azanIsPlaying) {
      clearTimeout(noScheduleInterval.current);
    }

    return () => {
      clearTimeout(noScheduleInterval.current);
    };
  }, [azanIsPlaying]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, clearError, loading, fetchData };
};
