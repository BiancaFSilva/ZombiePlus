import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export async function executeQuery(sqlScript, data) {
  try {
    const queryResult = await sql.query(sqlScript, data);
    console.log(queryResult);

  } catch (error) {
    console.error('Error executing SQL: ', error);
  }
}