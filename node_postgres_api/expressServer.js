import express from "express";
import cors from "cors";
import { buildRoutes } from "./expressServer.utilities.js";

const PORT = 4000;

const DEFAULT_ROUTE = "users";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is now listening at port ${PORT}`);
});

// JEV: first build db
// JEV: second build a table - I suggest "users"
// JEV: instert shit into table

/*
  Build example "users" routes - only `get` routes are defined by default;
  i.e. list table data and get single item in table.
*/
buildRoutes({ app, route: DEFAULT_ROUTE });
