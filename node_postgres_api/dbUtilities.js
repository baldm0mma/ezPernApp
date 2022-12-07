import { client } from "./dbConfig.js";

// Connect to PostgreSQL DB
client.connect();

export const messageResponse = (successMessage = "Success!", query, res) => {
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

export const dataResponse = (successMessage, query, res) => {
  client.query(query, (err, result) => {
    if (!err) {
      res.send(result?.rows);
      console.log(successMessage);
    } else throw err;
  });
  client.end;
};
