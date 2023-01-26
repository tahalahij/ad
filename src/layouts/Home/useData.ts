import { useEffect, useState } from "react";
import { ScreenItem } from "../../types";

const FAKE_DATA: Array<ScreenItem> = [
  {
    objectId: "1",
    fileName: "unknown",
    fileType: "video",
    uri: "https://aspb19.asset.aparat.com/aparat-video/f7853f4961c85408c83289a2bdca2bbb28797532-360p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI3ZWFkNjU5MjI1MGVjYzFkODlmOWUwYmI5Y2U1ZTFhIiwiZXhwIjoxNjc0Njc3MjkwLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.gO1dplFKBleI98lt_H6ED7k29jt0aX4F1rfDf91QGmE",
  },
  {
    objectId: "2",
    fileName: "unknown",
    fileType: "image",
    uri: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    onScreenDuration: 10,
  },
  {
    objectId: "3",
    fileName: "unknown",
    fileType: "music",
    uri: "https://ups.music-fa.com/tagdl/8e401/Mohammad%20Taher%20-%20Golam%20(320).mp3",
  },
];

export const useData = (data: ScreenItem[], objectId: string) => {
  const [currentItem, setCurrentItem] = useState<ScreenItem>();

  useEffect(() => {
    //fake fetch
    const index = data.findIndex((item) => item.objectId === objectId);
    setTimeout(() => {
      setCurrentItem(data[index]);
    }, 5000);
  }, [objectId]);

  return currentItem;
};

export const useFetchSchedules = () => {
  const [data, setData] = useState<ScreenItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const clearError = () => {
    setError("");
  };

  useEffect(() => {
    const fetchData = async () => {
      //fake fetch
      try {
        if (data.length === 0) {
          setLoading(true);
          //   const response = await fetch('https://url/schedules');
          //   const json = await response.json();
          //   setLoading(false);
          //   setError('');
          //   setData(response.data);
          setTimeout(() => {
            setData(FAKE_DATA);
            setLoading(false);
            setError("");
          }, 4000);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("خطا در دریافت اطلاعات");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, clearError, loading };
};
