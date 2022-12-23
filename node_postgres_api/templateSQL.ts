export const fullTableQuery: string = "SELECT * FROM $1";

export const singleRowQuery: string = "SELECT * FROM $1 WHERE id=$2";

export const insertRowQuery: string =
  "INSERT INTO $1(id, inserted_at, $2) VALUES ('$3', '$4', '$5')";

export const updateRowQuery: string = "UPDATE $1 SET $2 WHERE id='$3'";

export const deleteRowQuery: string = "DELETE FROM $1 WHERE id='$2'";
