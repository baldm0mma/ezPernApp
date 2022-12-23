export const fullTableQuery = "SELECT * FROM $1";

export const singleRowQuery = "SELECT * FROM $1 WHERE id=$2";

export const insertRowQuery =
  "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";

export const updateRowQuery = "UPDATE $1 SET $2 WHERE id='$3'";

export const deleteRowQuery = "DELETE FROM $1 WHERE id='$2'";
