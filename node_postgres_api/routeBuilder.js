import {
  getTableListData,
  getTableSingleRowData,
  insertTableRow,
  updateRow,
  deleteRow,
  updateRow,
} from "./resolvers.js";

export const buildRoutes = ({ app, route }) => {
  console.log(`${route} routes built`);

  // List all Objects -> Object[]
  app.get(`/${route}`, async (_request, response, next) => {
    try {
      const { tableData, successMessage } = await getTableListData(route);
      console.log(successMessage);
      response.send(tableData);
    } catch (error) {
      next(error);
    }
  });

  // Get single Objects by ID -> [Object]
  app.get(`/${route}/:id`, async ({ body }, response, next) => {
    /*
      No need to grab the `id` from the url parameters since it's already included in the request body.
      In the RESTful convention, the parsed url params *can* be used as data for the API, 
      but primarily they're used to suggest to the client what the API is querying.
    */

    try {
      const { itemData, successMessage } = await getTableSingleRowData(
        route,
        body
      );
      console.log(successMessage);
      response.send(itemData);
    } catch (error) {
      next(error);
    }
  });

  // Insert Object
  app.post(`/${route}`, async ({ body }, response, next) => {
    try {
      const { insertedItem, successMessage } = await insertTableRow(
        route,
        body
      );
      console.log(successMessage);
      response.send(insertedItem);
    } catch (error) {
      next(error);
    }
  });

  // Update Object
  app.put(`/${route}`, async ({ body }, response, next) => {
    try {
      const { updatedItem, successMessage } = await updateRow(route, body);
      console.log(successMessage);
      response.send(updatedItem);
    } catch (error) {
      next(error);
    }
  });

  // Delete Object
  app.delete(`/${route}/:id`, async ({ body }, response, next) => {
    try {
      const { deletedRow, successMessage } = await deleteRow(route, body);
      console.log(successMessage);
      response.send(deletedRow);
    } catch (error) {
      next(error);
    }
  });
};
