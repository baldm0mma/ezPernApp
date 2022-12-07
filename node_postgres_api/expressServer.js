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


// Build a example "users" route
buildRoutes({ app, route: "users" });
