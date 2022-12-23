import { client } from "./db.config.js";

export const dbQuery = (templateSQL: string, values: any[]) => {
  return new Promise((resolve, reject) => {
    client
      .query(templateSQL, values)
      .then((result) => {
        const data = result?.rows;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
