"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRowQuery = exports.updateRowQuery = exports.insertRowQuery = exports.singleRowQuery = exports.fullTableQuery = void 0;
exports.fullTableQuery = "SELECT * FROM $1";
exports.singleRowQuery = "SELECT * FROM $1 WHERE id=$2";
exports.insertRowQuery = "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";
exports.updateRowQuery = "UPDATE $1 SET $2 WHERE id='$3'";
exports.deleteRowQuery = "DELETE FROM $1 WHERE id='$2'";
//# sourceMappingURL=templateSQL.js.map