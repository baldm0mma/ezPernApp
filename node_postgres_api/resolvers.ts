import { v4 } from "uuid";
// JEV: Make CSV parser into package???
import { buildInsertData, buildUpdateData } from "./db.CRUD.utilities.js";
import { dbQuery } from "./db.utilities.js";
import { getItemNameFromTable } from "./general.utilities.js";
import {
  fullTableQuery,
  singleRowQuery,
  insertRowQuery,
  deleteRowQuery,
} from "./templateSQL.js";

// Get table data of dynamic table
export const getTableListData = async (
  tableName: string
): Promise<{ tableData: any[]; successMessage: string } | unknown> => {
  const values = [tableName];
  const successMessage = `Successfully queried ${tableName}`;

  try {
    const tableData = await dbQuery(fullTableQuery, values);
    // Why would I need to type this as `| Error` above? There should be no error, since the catch should catch it...
    return { tableData, successMessage };
  } catch (error) {
    return error;
  }
};

export const getTableSingleRowData = async (table, body) => {
  const { id } = body;
  if (!id) throw Error("no ID sent with Req Body.");

  const values = [table, id];
  const itemName = getItemNameFromTable(table);
  const successMessage = `Successfully queried ${itemName} with ID: ${id}`;

  try {
    const tableData = await dbQuery(singleRowQuery, values);
    const itemData = tableData[0];
    return Promise.resolve({ itemData, successMessage });
  } catch (error) {
    return error;
  }
};

// Insert single row in dynamic table
export const insertTableRow = async (table, body) => {
  const id = v4();
  const itemName = getItemNameFromTable(table);
  const successMessage = `Successfully inserted ${itemName} of ID: ${id}`;
  const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
  const values = [table, stringifiedKeys, id, Date.now(), stringifiedValues];

  try {
    const insertedRow = await dbQuery(insertRowQuery, values);
    return await Promise.resolve({ insertedRow, successMessage });
  } catch (error) {
    return error;
  }
};

// Update row of single dynamic table
export const updateRow = async (table, body) => {
  const { id } = body;
  if (!id) throw Error("no ID sent with Req Body.");

  const itemName = getItemNameFromTable(table);
  const successMessage = `Successfully inserted ${itemName} of ID: ${id}`;
  const updatedData = buildUpdateData(body);
  delete updatedData.id;
  const values = [route, updatedData, id];

  try {
    const updatedRow = await dbQuery(updateQuery, values);
    return await Promise.resolve({ updatedRow, successMessage });
  } catch (error) {
    return error;
  }
};

// Delete row of single dynamic table
export const deleteRow = async (table, { id }) => {
  if (!id) throw Error("no ID sent with Req Body.");

  const values = [tableName, id];
  const itemName = getItemNameFromTable(table);
  const successMessage = `Deletion was successful of ${itemName} of ID: ${id}`;

  try {
    const deletedRow = await dbQuery(deleteRowQuery, values);
    return await Promise.resolve({ deletedRow, successMessage });
  } catch (error) {
    return error;
  }
};

// Insert CSV data into table
// export const insertCSVData = async (filePath, tableName) => {
//   try {
//     const data = await CSVToJSON(filePath);
//     if (!!data?.length) {
//       data.forEach((entry) => {
//         insertTableRow(entry, tableName);
//       });
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
//   // This throw will tie up the conditional from the `try` block above
//   throw new Error("no data present in .CSV file");
// };
