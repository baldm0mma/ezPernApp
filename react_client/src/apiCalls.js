export const useGetData = async ({ url, onSuccess, onError, options = {} }) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data) onSuccess(data);
  } catch (error) {
    if (error) onError(error);
  }

  return isLoading;
};
