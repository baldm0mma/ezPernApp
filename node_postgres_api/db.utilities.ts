import { client } from "./db.config.js";

export const dbQuery = async (
  templateSQL: string,
  values: any[]
): Promise<any[]> => {
  // return new Promise((resolve, reject) => {
  //   client
  //     .query(templateSQL, values)
  //     .then((result) => {
  //       const data = result?.rows;
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  try {
    const result = await client.query(templateSQL, values);
    return Promise.resolve(result?.rows);
  } catch (error) {
    throw new Error(error);
  }
};
