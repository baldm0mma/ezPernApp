import { client } from "./db.config.js";

export const dbQuery = async (
  templateSQL: string,
  values: any[]
  // `catch` clause variables may not have a type annotation (aside from, as of TypeScript 4.0, `unknown`)
): Promise<any[] | unknown> => {
  try {
    const result = await client.query(templateSQL, values);
    const rows = result?.rows;
    return rows;
  } catch (error) {
    return error;
  }
};
