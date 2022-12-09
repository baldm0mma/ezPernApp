import { client } from "./db.config.js";

// Connect to PostgreSQL DB
client.connect();

export const dbQueryResponseWithMessage = (
  successMessage = "Success!",
  query,
  response
) => {
  // This query handles inserts/updates/deletes, so all we send back is a success message, instead of any returned `results`
  return new Promise((resolve, reject) => {
    client.query(query, (error, _) => {
      if (error) return reject(error);
      if (response) {
        response.send(successMessage);
        console.log(successMessage);
        return resolve(successMessage);
      }
    });
    client.end();
  });
};

export const dbQueryResponseWithData = (successMessage, query, response) => {
  // This query handles reads, so we need to send the data `result` back in the response
  return new Promise((resolve, reject) => {
    client.query(query, (error, result) => {
      if (error) return reject(error);
      if (result) {
        const data = result?.rows;
        response.send(data);
        console.log(successMessage);
        return resolve(data);
      }
    });
    client.end();
  });
};
