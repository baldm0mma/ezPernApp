import { v4 } from "uuid";
import { CSVToJSON } from "./csvParser.js";
import { buildInsertData, buildUpdateData } from "./db.CRUD.utilities.js";
import { dbQuery } from "./db.utilities.js";
import { getItemNameFromTable } from "./general.utilities.js";

// Get table data of dynamic table
export const getTableData = async (query) => {
  try {
    const tableData = await dbQuery(query);
    return Promise.resolve(tableData);
  } catch (error) {
    return error;
  }
};

// Insert single row in dynamic table
export const insertTableRow = async (body, tableName) => {
  const id = v4();
  const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
  const insertQuery = `INSERT INTO ${tableName}(id, inserted_at, ${stringifiedKeys}) VALUES ('${id}', '${Date.now()}', '${stringifiedValues}')`;

  try {
    const insertedRow = await dbQuery(insertQuery);
    return await Promise.resolve(insertedRow);
  } catch (error) {
    return error;
  }
};

// Update row of single dynamic table
export const updateRow = async (body, tableName) => {
  // JEV: ID through query params or header budy???
  const id = body?.id;
  // `throw` stops the execution of the function, no `return` required
  if (!id) throw Error("no ID sent with Req Body.");
  delete body.id;
  const updatedData = buildUpdateData(body);
  const updateQuery = `UPDATE ${tableName} SET ${updatedData} WHERE id=${id}`;

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
