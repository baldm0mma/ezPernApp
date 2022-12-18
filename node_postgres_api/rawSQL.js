export const fullTableQuery = "SELECT * FROM $1";

export const singleRowQuery = "SELECT * FROM $1 WHERE id=$2";

export const insertRowQuery =
  "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";
