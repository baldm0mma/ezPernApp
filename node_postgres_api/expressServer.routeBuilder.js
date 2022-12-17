import {
  getTableData,
  insertTableRow,
  updateRow,
  // deleteRow,
  // updateRow
} from "./db.CRUD.js";
import { getItemNameFromTable } from "./general.utilities.js";

export const buildRoutes = ({ app, route }) => {
  console.log(`${route} routes built`);

  // List all Objects -> Object[]
  app.get(`/${route}`, async (_request, response, next) => {
    const text = "SELECT * FROM $1";
    const values = [route];

    try {
      const tableData = await getTableData(text, values);
      console.log(`Successfully queried all ${route}`);
      response.send(tableData);
    } catch (error) {
      next(error);
    }
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, async (request, response, next) => {
    const id = request.params.id;
    const itemName = getItemNameFromTable(route);
    const text = "SELECT * FROM $1 WHERE id=$2";
    const values = [route, id];

    try {
      const itemData = await getTableData(text, values);
      console.log(`Successfully queried ${itemName} with ID: ${id}`);
      response.send(itemData[0]);
    } catch (error) {
      next(error);
    }
  });

  // Optional routes.

  // Insert Object
  app.post(`/${route}`, async ({ body }, response, next) => {
    const itemName = getItemNameFromTable(route);
    const { stringifiedKeys, stringifiedValues } = buildInsertData(body);
    const text =
      "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";
    const values = [
      tableName,
      stringifiedKeys,
      id,
      Date.now(),
      stringifiedValues,
    ];

    try {
      const insertedItem = await insertTableRow(body, route, insertQuery);
      const id = insertedItem[0]?.id;
      console.log(`Insertion was successful of new ${itemName} of ID: ${id}`);
      response.send(id);
    } catch (error) {
      next(error);
    }
  });

  // Update Object
  app.put(`/${route}`, async (request, response, next) => {
    const body = request.body;
    const { id } = body;
    const itemName = getItemNameFromTable(tableName);

    try {
      const updatedItem = await updateRow(body, route);
      console.log(`Update was successful of ${itemName} of ID: ${id}`);
      response.send(updatedItem);
    } catch (error) {
      next(error);
    }
  });

  // Delete Object
  // const deleteSingle = app.delete(`/${route}/:id`, (req, res) => {
  //   const id = req.params.id;
  //   deleteRow(id, `${route}`, res);
  // });
};
