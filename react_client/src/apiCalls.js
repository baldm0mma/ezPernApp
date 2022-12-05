import { useState } from "react";

export const useGetData = async ({ url, options = {} }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  try {
    setIsLoading(true);
    const response = await fetch(url, options);
    const data = await response.json();
    if (data) setData(data);
    setIsLoading(false);
  } catch (error) {
    if (error) setError(error);
    setIsLoading(false);
  }

  return {
    isLoading,
    data,
    error,
  };
};
