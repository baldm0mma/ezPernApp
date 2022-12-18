import {
  getTableListData,
  getTableSingleRowData,
  insertTableRow,
  updateRow,
  deleteRow,
  updateRow,
} from "./db.CRUD.js";
import { getItemNameFromTable } from "./general.utilities.js";
import { buildInsertData, buildUpdateData } from "./db.CRUD.utilities.js";

export const buildRoutes = ({ app, route }) => {
  console.log(`${route} routes built`);

  // List all Objects -> Object[]
  app.get(`/${route}`, async (_request, response, next) => {
    try {
      const tableData = await getTableListData(route);
      console.log(`Successfully queried all ${route}`);
      response.send(tableData);
    } catch (error) {
      next(error);
    }
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, async ({ params }, response, next) => {
    const itemName = getItemNameFromTable(route);

    try {
      const itemData = await getTableSingleRowData(route, params);
      console.log(`Successfully queried ${itemName} with ID: ${id}`);
      response.send(itemData[0]);
    } catch (error) {
      next(error);
    }
  });

  // Insert Object
  app.post(`/${route}`, async ({ body }, response, next) => {
    const id = v4();
    const itemName = getItemNameFromTable(route);
    const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
    const text =
      "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";
    const values = [route, stringifiedKeys, id, Date.now(), stringifiedValues];

    try {
      const insertedItem = await insertTableRow(text, values);
      const id = insertedItem[0]?.id;
      console.log(`Insertion was successful of new ${itemName} of ID: ${id}`);
      response.send(id);
    } catch (error) {
      next(error);
    }
  });

  // Update Object
  app.put(`/${route}`, async ({ body }, response, next) => {
    const { id } = body;
    if (!id) throw Error("no ID sent with Req Body.");
    const itemName = getItemNameFromTable(route);
    delete updatedData.id;
    const updatedData = buildUpdateData(body);
    const text = "UPDATE $1 SET $2 WHERE id=$3";
    const values = [route, updatedData, id];

    try {
      const updatedItem = await updateRow(text, values);
      console.log(`Update was successful of ${itemName} of ID: ${id}`);
      response.send(updatedItem);
    } catch (error) {
      next(error);
    }
  });

  // Delete Object
  app.delete(`/${route}/:id`, async (_request, response, next) => {
    const id = req.params.id;
    if (!id) throw Error("no ID sent with URL.");
    const text = "DELETE FROM $1 WHERE id='$2'";
    const values = [tableName, id];

    try {
      const deletedRow = await deleteRow(text, values);
      const { id } = deletedRow;
      console.log(`Deletion was successful of ${itemName} of ID: ${id}`);
      response.send(deletedRow);
    } catch (error) {
      next(error);
    }
  });
};
