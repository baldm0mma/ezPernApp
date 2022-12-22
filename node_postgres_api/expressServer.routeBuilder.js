import {
  getTableListData,
  getTableSingleRowData,
  insertTableRow,
  updateRow,
  deleteRow,
  updateRow,
} from "./resolvers.js";
import { getItemNameFromTable } from "./general.utilities.js";
import { buildInsertData, buildUpdateData } from "./db.CRUD.utilities.js";

export const buildRoutes = ({ app, route }) => {
  console.log(`${route} routes built`);

  // List all Objects -> Object[]
  app.get(`/${route}`, async (_request, response, next) => {
    try {
      const { tableData, successMessage } = await getTableListData(route);
      console.log(successMessage);
      response.send(tableData);
    } catch (error) {
      next(error);
    }
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, async ({ body }, response, next) => {
    /*
      No need to grab the `id` from the url parameters since it's already included in the request body.
      In the RESTful convention, the parsed url params *can* be used as data for the API, 
      but primarily they're used to suggest to the client what the API is querying.
    */

    try {
      const { itemData, successMessage } = await getTableSingleRowData(
        route,
        body
      );
      console.log(successMessage);
      response.send(itemData);
    } catch (error) {
      next(error);
    }
  });

  // Insert Object
  app.post(`/${route}`, async ({ body }, response, next) => {
    try {
      const { insertedItem, successMessage } = await insertTableRow(
        route,
        body
      );
      const id = insertedItem?.id;
      console.log(successMessage);
      response.send(id);
    } catch (error) {
      next(error);
    }
  });

  // Update Object
  app.put(`/${route}`, async ({ body }, response, next) => {
    // const { id } = body;
    // if (!id) throw Error("no ID sent with Req Body.");
    // const itemName = getItemNameFromTable(route);
    // delete updatedData.id;
    // const updatedData = buildUpdateData(body);
    // const text = "UPDATE $1 SET $2 WHERE id=$3";
    // const values = [route, updatedData, id];

    try {
      const { updatedItem, successMessage } = await updateRow(text, values);
      console.log(successMessage);
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
