import { v4 } from "uuid";
import { CSVToJSON } from "./csvParser.js";
import {
  buildCreateTableData,
  buildFakeUser,
  buildInsertData,
  buildUpdateData,
  getItemNameFromTable,
} from "./db.CRUD.utilities.js";
import {
  dbQueryResponseWithMessage,
  dbQueryResponseWithData,
} from "./db.utilities.js";

// Get table data of dynamic table
export const getTableData = (
  successMessage = "Success!",
  query,
  httpResponse
) => dbQueryResponseWithData(successMessage, query, httpResponse);

// Insert single row in dynamic table
export const insertRow = (body, tableName, httpResponse) => {
  const id = v4();
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Insertion was successful of new ${itemName} of ID: ${id}`;
  const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
  const insertQuery = `INSERT INTO ${tableName}(id, inserted_at, ${stringifiedKeys}) VALUES ('${id}', '${Date.now()}', '${stringifiedValues}')`;

  dbQueryResponseWithMessage(successMessage, insertQuery, httpResponse);
};

// Update row of single dynamic table
export const updateRow = async (body, tableName, httpResponse) => {
  const id = body?.id;
  // `throw` stops the execution of the function, no `return` required
  if (!id) throw Error("no ID sent with Req Body.");
  delete body.id;
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Update was successful of ${itemName} of ID: ${id}`;
  const updatedData = buildUpdateData(body);
  const updateQuery = `UPDATE ${tableName} SET ${updatedData} WHERE id=${id}`;

  dbQueryResponseWithMessage(successMessage, updateQuery, httpResponse);
};

// Delete row of single dynamic table
export const deleteRow = async (id, tableName, httpResponse) => {
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Deletion was successful of ${itemName} of ID: ${id}`;
  const deleteQuery = `DELETE FROM ${tableName} WHERE id='${id}'`;

  dbQueryResponseWithMessage(successMessage, deleteQuery, httpResponse);
};

// Insert CSV data into table
export const insertCSVData = async (filePath, tableName) => {
  try {
    const data = await CSVToJSON(filePath);
    if (!!data?.length) {
      data.forEach((entry) => {
        insertRow(entry, tableName);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
  // This throw will tie up the conditional from the `try` block above
  throw new Error("no data present in .CSV file");
};

// Create new Table
// Type out args
export const createTable = async (tableName, tableAttrs) => {
  // console.log(tableName, "tablename");
  // console.log(tableAttrs, "tableAttrs");
  const successMessage = `Successfully created the ${tableName} table!`;
  const creatTableQuery = `CREATE TABLE ${tableName} (${buildCreateTableData(
    tableAttrs
  )})`;
  console.log(creatTableQuery, "creatTableQuery");

  dbQueryResponseWithMessage(successMessage, creatTableQuery);
};

// For inserting a new User from the command line
// JEV: when the express app is running in a termrinal window, and this function is run with run-func in a nother window, the db connection breaks?!?!?!?!
export const insertNewUser = () => {
  // JEV: figure out how to async process.exit() only after insertion is complete
  insertRow(buildFakeUser(), "users");
  //   console.log(addedUserResponse);
  //   process.exit();
};
