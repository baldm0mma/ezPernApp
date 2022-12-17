import { client } from "./db.config.js";

export const dbQuery = (query) => {
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
