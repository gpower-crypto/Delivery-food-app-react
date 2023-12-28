import { useState, useEffect } from "react";

const useFetchData = (api) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(api);
    const json = await data.json();
    setInfo(json.data);
  };

  return info;
};

export default useFetchData;
