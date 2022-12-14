import {
  getTableData,
  // insertRow,
  // deleteRow,
  // updateRow
} from "./db.CRUD.js";
import { getItemNameFromTable } from "./db.CRUD.utilities.js";

export const buildRoutes = ({ app, route }) => {
  console.log("routesBuilt");
  // List all Objects -> Object[]
  app.get(`/${route}`, (_req, res) => {
    console.log("app.get(`/${route}`");
    getTableData(
      `Successfully queried all ${route}`,
      `SELECT * FROM ${route}`,
      res
    );
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, (req, res) => {
    const id = req.params.id;
    const itemName = getItemNameFromTable(route);
    getTableData(
      `Successfully queried ${itemName} with ID: ${id}`,
      `SELECT * FROM ${route} WHERE id=${id}`,
      res
    );
  });

  // Optional routes.

  // Insert Object
  // const post = app.post(`/${route}`, (req, res) => {
  //   const body = req.body;
  //   insertRow(body, `${route}`, res);
  // });

  // Update Object
  // const put = app.put(`/${route}`, (req, res) => {
  //   const body = req.body;
  //   updateRow(body, `${route}`, res);
  // });

  // Delete Object
  // const deleteSingle = app.delete(`/${route}/:id`, (req, res) => {
  //   const id = req.params.id;
  //   deleteRow(id, `${route}`, res);
  // });
};
