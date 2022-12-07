import { insertRow, getTableData, deleteRow, updateRow } from "./db.CRUD.js";
import { getItemNameFromTable } from "./db.CRUD.utilities.js";

export const buildRoutes = ({ app, route }) => {
  // List all Objects -> Object[]
  const getList = app.get(`/${route}`, (_req, res) => {
    getTableData(
      `Successfully queried all ${route}`,
      `SELECT * FROM ${route}`,
      res
    );
  });

  // Get single Objects by ID -> [Object]
  const getSingle = app.get(`/${route}/:id`, (req, res) => {
    const id = req.params.id;
    const itemName = getItemNameFromTable(route);
    getTableData(
      `Successfully queried ${itemName} with ID: ${id}`,
      `SELECT * FROM ${route} WHERE id=${id}`,
      res
    );
  });

  // Insert Object
  const post = app.post(`/${route}`, (req, res) => {
    const body = req.body;
    insertRow(body, `${route}`, res);
  });

  // Update Object
  const put = app.put(`/${route}`, (req, res) => {
    const body = req.body;
    updateRow(body, `${route}`, res);
  });

  // Delete Object
  const deleteSingle = app.delete(`/${route}/:id`, (req, res) => {
    const id = req.params.id;
    deleteRow(id, `${route}`, res);
  });
  return { getList, getSingle, post, put, deleteSingle };
};
