import { faker } from "@faker-js/faker";

// JEV: annotate return type here
export const buildInsertData = (body) => {
  const keys = Object.keys(body);
  const stringifiedKeys = keys.join(", ");
  const stringifiedValues = keys.map((key) => body[key]).join("', '");
  return { stringifiedKeys, stringifiedValues };
};

// JEV: annotate return type here
export let buildUpdateData = (body) => {
  const keys = Object.keys(body);
  const data = keys.map((key) => `${key} = '${body[key]}'`);
  const stringifiedData = data.join(", ");
  return stringifiedData;
};

// JEV: annotate return type here
export const buildCreateTableData = (attrs) => {
  const parsedAttrs = JSON.parse(attrs);
  console.log(attrs, "attrs");
  let finalStringifiedAttrs = "";
  const columnNames = Object.keys(parsedAttrs);
  console.log(columnNames, "columnNames");
  for (const colName of columnNames) {
    console.log(colName, "colName");
    console.log(parsedAttrs[colName], "parsedAttrs[colName]");
    finalStringifiedAttrs =
      finalStringifiedAttrs +
      `${colName} ${parsedAttrs[colName]["type"]} ${
        parsedAttrs[colName]["nullStatus"] ?? ""
      }, `;
  }
  console.log(finalStringifiedAttrs, "finalStringifiedAttrs");

  // Trim off dangling comma and whitespace
  return finalStringifiedAttrs.slice(0, -2);
  // npx run-func db.CRUD.js createTable 'friends' <shell_variable>
};