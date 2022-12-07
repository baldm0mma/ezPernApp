import express from "express";
import cors from "cors";
// import { insertRow, getTableData, deleteRow, updateRow } from "./dbCRUD.js";
// import { getItemNameFromTable } from "./CRUDUtilities.js";
import { buildRoutes } from "./expressServer.utilities.js";

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is now listening at port ${PORT}`);
});

/*
  NOTE: These variables are instances of our Express app's built-in HTTP RESTful methods,
  i.e., app.get(route, (req, res) => do work here), app.post(route, (req, res) => do work here),
  app.put(route, (req, res) => do work here), app.delete(route, (req, res) => do work here), etc.,
  and therefore are "unused" variables in the sense that they are already invoked function 
  instances of the aformentioned, and do not need to be referenced later on.
*/
// Build a example "users" route
const { getList, getSingle, post, put, deleteSingle } = buildRoutes({
  app,
  route: "users",
});
