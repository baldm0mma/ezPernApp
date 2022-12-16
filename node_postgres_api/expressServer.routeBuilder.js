import {
  getTableData,
  // insertRow,
  // deleteRow,
  // updateRow
} from "./db.CRUD.js";
import { getItemNameFromTable } from "./general.utilities.js";

export const buildRoutes = ({ app, route }) => {
  console.log(`${route} routes built`);
  // List all Objects -> Object[]
  app.get(`/${route}`, (_request, response, next) => {
    getTableData(`SELECT * FROM ${route}`)
      .then((tableData) => {
        console.log(`Successfully queried all ${route}`);
        response.send(tableData);
      })
      .catch((error) => {
        next(error);
      });
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, (request, response, next) => {
    const id = request.params.id;
    const itemName = getItemNameFromTable(route);
    getTableData(`SELECT * FROM ${route} WHERE id=${id}`)
      .then((itemData) => {
        console.log(`Successfully queried ${itemName} with ID: ${id}`);
        response.send(itemData[0]);
      })
      .catch((error) => {
        next(error);
      });
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
