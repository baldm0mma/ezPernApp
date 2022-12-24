// JEV: rethink this any
type BuildInsertDataArgsType = { [key: string]: any };

type BuildInsertDataReturnType = {
  stringifiedKeys: string;
  stringifiedValues: string;
};

export const buildInsertData = (
  attrs: BuildInsertDataArgsType
): BuildInsertDataReturnType => {
  const keys = Object.keys(attrs);
  const stringifiedKeys = keys.join(", ");
  const stringifiedValues = keys.map((key) => attrs[key]).join("', '");
  return { stringifiedKeys, stringifiedValues };
};

type BuildUpdateDataArgsType = { [key: string]: any };

export const buildUpdateData = (attrs: BuildUpdateDataArgsType): string => {
  const keys = Object.keys(attrs);
  const data = keys.map((key) => `${key} = '${attrs[key]}'`);
  const stringifiedData = data.join(", ");
  return stringifiedData;
};

export const buildCreateTableData = (attrs: string): string => {
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
