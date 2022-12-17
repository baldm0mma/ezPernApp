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
    try {
      const tableData = await getTableData(`SELECT * FROM ${route}`);
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
    try {
      const itemData = await getTableData(
        `SELECT * FROM ${route} WHERE id=${id}`
      );
      console.log(`Successfully queried ${itemName} with ID: ${id}`);
      response.send(itemData[0]);
    } catch (error) {
      next(error);
    }
  });

  // Optional routes.

  // Insert Object
  app.post(`/${route}`, async (request, response, next) => {
    const body = request.body;
    const itemName = getItemNameFromTable(route);
    try {
      const insertedItem = await insertTableRow(body, route);
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
