// JEV: annotate return type here
export const buildInsertData = (body) => {
  const keys = Object.keys(body);
  const stringifiedKeys = keys.join(", ");
  const stringifiedValues = keys.map((key) => body[key]).join("', '");
  return { stringifiedKeys, stringifiedValues };
};

// JEV: annotate return type here
export const buildUpdateData = (body) => {
  const keys = Object.keys(body);
  const data = keys.map((key) => `${key} = '${body[key]}'`);
  const stringifiedData = data.join(", ");
  return stringifiedData;
};

// JEV: annotate return type here
export const buildCreateTableData = (attrs) => {
  const parsedAttrs = JSON.parse(attrs);
  let finalStringifiedAttrs = "";
  const columnNames = Object.keys(parsedAttrs);
  for (const colName of columnNames) {
    finalStringifiedAttrs =
      finalStringifiedAttrs +
      `${colName} ${parsedAttrs[colName]["type"]} ${
        parsedAttrs[colName]["nullStatus"] ?? ""
      }, `;
  }

  // Trim off dangling comma and whitespace
  return finalStringifiedAttrs.slice(0, -2);
};
