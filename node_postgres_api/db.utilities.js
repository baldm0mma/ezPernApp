import { client } from "./db.config.js";

// Connect to PostgreSQL DB
client.connect();

export const dbQueryResponseWithMessage = (
  successMessage = "Success!",
  query,
  res
) => {
  // This query handles inserts/updates/deletes, so all we send back is a success message, instead of "results"
  client.query(query, (err, _result) => {
    if (!err) {
      if (res) {
        res.send(successMessage);
      } else {
        console.log(successMessage);
      }
    } else throw err;
  });
  client.end;
};

export const dbQueryResponseWithData = (successMessage, query, res) => {
  // This query handles reads, so we need to send data (results) back in the response
  client.query(query, (err, result) => {
    if (!err) {
      res.send(result?.rows);
      console.log(successMessage);
    } else throw err;
  });
  client.end;
};
