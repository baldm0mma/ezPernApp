import { client } from "./db.config.js";

export const dbQuery = (query) => {
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
