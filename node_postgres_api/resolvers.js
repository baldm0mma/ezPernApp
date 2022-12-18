// JEV: Make CSV parser into package???
import { CSVToJSON } from "./csvParser.js";
import { buildInsertData, buildUpdateData } from "./db.CRUD.utilities.js";
import { dbQuery } from "./db.utilities.js";
import { getItemNameFromTable } from "./general.utilities.js";
import { fullTableQuery, singleRowQuery } from "./rawSQL.js";

// Get table data of dynamic table
export const getTableListData = async (table) => {
  const values = [table];

  try {
    const tableData = await dbQuery(fullTableQuery, values);
    return Promise.resolve(tableData);
  } catch (error) {
    return error;
  }
};

export const getTableSingleRowData = async (table, { id }) => {
  const values = [table, id];

  try {
    const tableData = await dbQuery(singleRowQuery, values);
    return Promise.resolve(tableData);
  } catch (error) {
    return error;
  }
};

// Insert single row in dynamic table
export const insertTableRow = async (text, values) => {
  try {
    const insertedRow = await dbQuery(text, values);
    return await Promise.resolve(insertedRow);
  } catch (error) {
    return error;
  }
};

// Update row of single dynamic table
export const updateRow = async (body, tableName) => {
  // send body
  try {
    const updatedRow = await dbQuery(updateQuery);
    return await Promise.resolve(updatedRow);
  } catch (error) {
    return error;
  }
};

// Delete row of single dynamic table
export const deleteRow = async (id, tableName) => {
  const itemName = getItemNameFromTable(tableName);
  const successMessage = `Deletion was successful of ${itemName} of ID: ${id}`;
  const deleteQuery = `DELETE FROM ${tableName} WHERE id='${id}'`;

  return dbQuery(insertQuery)
    .then((data) => Promise.resolve(data))
    .catch((error) => error);
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
