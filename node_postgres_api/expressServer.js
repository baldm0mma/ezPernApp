import express from "express";
import cors from "cors";
import { buildRoutes } from "./expressServer.utilities.js";
import { getTableData } from "./db.CRUD.js";

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is now listening at port ${PORT}`);
});

// const route = "users";
// JEV: first build db
// JEV: second build a table - I suggest "users"
// JEV: instert shit into table

// Build example "users" routes - only `get` routes are defined by default
buildRoutes({ app, route: "users" });
// List all Objects -> Object[]
// app.get(`/${route}`, (_req, res) => {
//   console.log("app.get(`/${route}`");
//   getTableData(
//     `Successfully queried all ${route}`,
//     `SELECT * FROM ${route}`,
//     res
//   );
// });

// // Get single Objects by ID -> [Object]
// app.get(`/${route}/:id`, (req, res) => {
//   const id = req.params.id;
//   const itemName = getItemNameFromTable(route);
//   getTableData(
//     `Successfully queried ${itemName} with ID: ${id}`,
//     `SELECT * FROM ${route} WHERE id=${id}`,
//     res
//   );
// });
