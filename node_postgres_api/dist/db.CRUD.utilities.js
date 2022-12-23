"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCreateTableData = exports.buildUpdateData = exports.buildInsertData = void 0;
const buildInsertData = (attrs) => {
    const keys = Object.keys(attrs);
    const stringifiedKeys = keys.join(", ");
    const stringifiedValues = keys.map((key) => attrs[key]).join("', '");
    return { stringifiedKeys, stringifiedValues };
};
exports.buildInsertData = buildInsertData;
const buildUpdateData = (attrs) => {
    const keys = Object.keys(attrs);
    const data = keys.map((key) => `${key} = '${attrs[key]}'`);
    const stringifiedData = data.join(", ");
    return stringifiedData;
};
exports.buildUpdateData = buildUpdateData;
const buildCreateTableData = (attrs) => {
    var _a;
    const parsedAttrs = JSON.parse(attrs);
    let finalStringifiedAttrs = "";
    const columnNames = Object.keys(parsedAttrs);
    for (const colName of columnNames) {
        finalStringifiedAttrs =
            finalStringifiedAttrs +
                `${colName} ${parsedAttrs[colName]["type"]} ${(_a = parsedAttrs[colName]["nullStatus"]) !== null && _a !== void 0 ? _a : ""}, `;
    }
    // Trim off dangling comma and whitespace
    return finalStringifiedAttrs.slice(0, -2);
};
exports.buildCreateTableData = buildCreateTableData;
//# sourceMappingURL=db.CRUD.utilities.js.map