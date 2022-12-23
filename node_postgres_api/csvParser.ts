import csv from "csv-parser";
import fs from "fs";

// Pares CSV file
export const CSVToJSON = async (path) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(results);
      })
      .on("error", () => reject("Promise rejected in stream"));
  });
