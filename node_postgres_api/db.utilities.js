import { pool } from "./db.config.js";

// Connect to PostgreSQL DB
pool.connect();

// Wrap Db queries in Promises???
export const dbQueryResponseWithMessage = (
  successMessage = "Success!",
  query,
  response
) => {
  // This query handles inserts/updates/deletes, so all we send back is a success message, instead of "results"
  return new Promise((resolve, reject) => {
    pool.query(query, (error, _) => {
      if (error) return reject(error);
      if (response) {
        response.send(successMessage);
        console.log(successMessage);
        return resolve(successMessage);
      }
    });
  });
};

export const dbQueryResponseWithData = (successMessage, query, response) => {
  // This query handles reads, so we need to send the data "result" back in the response
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) return reject(error);
      if (result) {
        const data = result?.rows;
        response.send(data);
        console.log(successMessage);
        return resolve(data);
      }
    });
  });
};
