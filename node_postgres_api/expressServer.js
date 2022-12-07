import express from "express";
import cors from "cors";
import { insertRow, getTableData, deleteRow, updateRow } from "./dbCRUD.js";
import { getItemNameFromTable } from "./CRUDUtilities.js";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is now listening at port ${PORT}`);
});

const TABLENAME = "users";

// List all Objects -> Object[]
app.get(`/${TABLENAME}`, (_req, res) => {
  getTableData(
    `Successfully queried all ${TABLENAME}`,
    `SELECT * FROM ${TABLENAME}`,
    res
  );
});

// Get single Objects by ID -> [Object]
app.get(`/${TABLENAME}/:id`, (req, res) => {
  const id = req.params.id;
  const itemName = getItemNameFromTable(TABLENAME);
  getTableData(
    `Successfully queried ${itemName} with ID: ${id}`,
    `SELECT * FROM ${TABLENAME} WHERE id=${id}`,
    res
  );
});

// Insert Object
app.post(`/${TABLENAME}`, (req, res) => {
  const body = req.body;
  insertRow(body, `${TABLENAME}`, res);
});

// Update Object
app.put(`/${TABLENAME}`, (req, res) => {
  const body = req.body;
  updateRow(body, `${TABLENAME}`, res);
});

// Delete Object
app.delete(`/${TABLENAME}/:id`, (req, res) => {
  const id = req.params.id;
  deleteRow(id, `${TABLENAME}`, res);
});
