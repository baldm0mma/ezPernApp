// This function builds the singular item name from a table name: "users" -> "user"
export const getItemNameFromTable = (tableName) => tableName.slice(0, -1);