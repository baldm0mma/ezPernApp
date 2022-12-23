// This function builds the singular item name from a table name: "users" -> "user"
export const getItemNameFromTable = (tableName: string): string =>
  tableName.slice(0, -1);
