const db = require("../config/database");

exports.getAllMembers = async function () {
  let query = `
      SELECT a.code, a.name as Nama, COUNT(b.id) AS buku_dipinjam FROM members a 
      LEFT JOIN borrowing b ON a.id=b.member_id AND b.status = 'ongoing'
      GROUP BY a.id
    `;
  let data = await db(query);
  return data[0];
};
