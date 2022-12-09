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
export const getTableData = (successMessage = "Success!", query, res) => {
  dbQueryResponseWithData(successMessage, query, res);
};

// Insert single row in dynamic table
export const insertRow = (body, tableName, res) => {
  const id = v4();
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Insertion was successful of new ${itemName} of ID: ${id}`;
  const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
  const insertQuery = `INSERT INTO ${tableName}(id, inserted_at, ${stringifiedKeys}) VALUES ('${id}', '${Date.now()}', '${stringifiedValues}')`;

  dbQueryResponseWithMessage(successMessage, insertQuery, res);
};

// Update row of single dynamic table
export const updateRow = (body, tableName, res) => {
  const id = body?.id;
  if (!id) {
    throw Error("no ID send with Req Body.");
  }
  delete body.id;
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Update was successful of ${itemName} of ID: ${id}`;
  const updatedData = buildUpdateData(body);
  const updateQuery = `UPDATE ${tableName} SET ${updatedData} WHERE id=${id}`;

  dbQueryResponseWithMessage(successMessage, updateQuery, res);
};

// Delete row of single dynamic table
export const deleteRow = (id, tableName, res) => {
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Deletion was successful of ${itemName} of ID: ${id}`;
  const deleteQuery = `DELETE FROM ${tableName} WHERE id='${id}'`;

  dbQueryResponseWithMessage(successMessage, deleteQuery, res);
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
};

// Create new Table
// Type out args
export const createTable = (tableName, tableAttrs) => {
  console.log(tableName, "tablename");
  console.log(tableAttrs, "tableAttrs");
  const query = `CREATE TABLE ${tableName} (${buildCreateTableData(
    tableAttrs
  )})`;
  console.log(query, "query");

  // dbQueryResponseWithMessage(
  //   `Successfully created the ${tableName} table!`,
  //   query,
  //   res
  // );
};

// For inserting a new User from the command line
export const insertNewUser = () => {
  // JEV: figure out how to async process.exit() only after insertion is complete
  insertRow(buildFakeUser(), "users");
};
