import { client } from "./db.config.js";

export const dbQuery = (text, values) => {
  return new Promise((resolve, reject) => {
    client
      .query(text, values)
      .then((result) => {
        const data = result?.rows;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
