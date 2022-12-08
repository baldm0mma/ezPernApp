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
  const finalStringifiedAttrs = "";
  const columnNames = Object.keys(attrs);
  for (const colName of columnNames) {
    finalStringifiedAttrs +
      `${colName} ${attrs[colName][type]} ${attrs[colName][nullStatus]}} `;
  }

  // This trim() removes any trailing whitespace from the above concatination
  return finalStringifiedAttrs.trim();
};

export const getItemNameFromTable = (tableName) => tableName.slice(0, -1);

export const buildFakeUser = () => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
});
