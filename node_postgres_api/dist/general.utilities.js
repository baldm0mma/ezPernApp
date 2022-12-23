"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemNameFromTable = void 0;
// This function builds the singular item name from a table name: "users" -> "user"
const getItemNameFromTable = (tableName) => tableName.slice(0, -1);
exports.getItemNameFromTable = getItemNameFromTable;
//# sourceMappingURL=general.utilities.js.map