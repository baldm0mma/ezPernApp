export const buildInsertData = (body) => {
  const keys = Object.keys(body);
  const stringifiedKeys = keys.join(", ");
  const stringifiedValues = keys.map((key) => body[key]).join("', '");
  return { stringifiedKeys, stringifiedValues };
};

export let buildUpdateData = (body) => {
  const keys = Object.keys(body);
  const data = keys.map((key) => `${key} = '${body[key]}'`);
  const stringifiedData = data.join(", ");
  return stringifiedData;
};

export const getItemNameFromTable = (tableName) => tableName.slice(0, -1);
