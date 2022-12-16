import { faker } from "@faker-js/faker";

// Create new Table
// Type out args
export const createTable = async (tableName, tableAttrs) => {
  // console.log(tableName, "tablename");
  // console.log(tableAttrs, "tableAttrs");
  const successMessage = `Successfully created the ${tableName} table!`;
  const creatTableQuery = `CREATE TABLE ${tableName} (${buildCreateTableData(
    tableAttrs
  )})`;
  console.log(creatTableQuery, "creatTableQuery");

  dbQueryResponseWithMessage(successMessage, creatTableQuery);
};

// For inserting a new User from the command line
// JEV: when the express app is running in a termrinal window, and this function is run with run-func in a nother window, the db connection breaks?!?!?!?!
export const insertNewUser = () => {
  // JEV: figure out how to async process.exit() only after insertion is complete
  insertRow(
    {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
    },
    "users"
  );
  //   console.log(addedUserResponse);
  //   process.exit();
};
