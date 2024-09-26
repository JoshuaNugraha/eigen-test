const db = require("../config/database");

exports.getAllBooks = async function () {
  let query = `
        SELECT a.code, a.title, (a.stock - COUNT(b.id)) AS qty FROM books a
        LEFT JOIN borrowing b ON a.id=b.book_id GROUP BY a.id
     `;
  let data = await db(query);
  return data[0];
};
