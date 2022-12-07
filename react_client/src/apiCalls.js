import { useState } from "react";

export const useGetData = async ({ url, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  try {
    setIsLoading(true);
    const response = await fetch(url, options);
    const data = await response.json();
    if (data) onSuccess(data);
    setIsLoading(false);
  } catch (error) {
    if (error) onError(error);
    setIsLoading(false);
  }

  return isLoading;
};
