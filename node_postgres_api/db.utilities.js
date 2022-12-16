import { client } from "./db.config.js";

export const dbQueryResponseWithMessage = (
  successMessage = DEFAULT_SUCCESS_MESSAGE,
  query,
  response
) => {
  // This query handles inserts/updates/deletes, so all we send back is a success message, instead of any returned `results`
  client
    .query(query)
    .then((_result) => {
      if (response) {
        response.send(successMessage);
      }
      console.log(successMessage);
    })
    .catch((error) => {
      throw error;
    });
};

export const dbQueryResponseWithData = (query) => {
  // This query handles reads, so we need to send the data `result` back in the response
  return new Promise((resolve, reject) => {
    client
      .query(query)
      .then((result) => {
        const data = result?.rows;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
