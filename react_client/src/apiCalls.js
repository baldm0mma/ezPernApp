export const useGetData = async ({ url, onSuccess, onError, options = {} }) => {
  const [isLoading, setIsLoading] = useState(true);

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data) {
      onSuccess(data);
      setIsLoading(false);
    }
  } catch (error) {
    if (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return isLoading;
};
