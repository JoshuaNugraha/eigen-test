const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "eigen",
    waitForConnections: true,
  })
  .promise();

const query = async function getRowQuery(query, params = []) {
  try {
    const result = await pool.query(query, params); // Eksekusi query
    return result; // Mengembalikan hasil query
  } catch (error) {
    console.log("error");
    console.error("Database query error: ", error); // Logging error
    throw error; // Meneruskan error
  }
};

module.exports = query;
