import { useEffect, useState } from "react";
import { getFilesListRequest } from "../../network/requests";
import { ScreenItem } from "../../types";

const FAKE_DATA: Array<ScreenItem> = [];

export const useData = (data: ScreenItem[], id: string) => {
  const [currentItem, setCurrentItem] = useState<ScreenItem>();

  // useEffect(() => {
  //   //fake fetch
  //   const index = data.findIndex((item) => item.id === id);
  //   setCurrentItem(data[index]);
  //   // setTimeout(() => {
  //   // }, 5000);
  // }, [id]);

  return currentItem;
};

export const useFetchSchedules = () => {
  const [data, setData] = useState<ScreenItem | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const clearError = () => {
    setError("");
  };

  const fetchData = async () => {
    try {
      if (!data) {
        setLoading(true);
        const response = await getFilesListRequest();
        if (response.success) {
          setData(response.payload);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, clearError, loading, fetchData };
};
