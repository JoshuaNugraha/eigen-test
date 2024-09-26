const db = require("../config/database");

exports.cekMember = async function (member_id) {
  let today = new Date().toISOString().split("T")[0];
  let query = `
        SELECT 
        (SELECT COUNT(a.id) FROM members a
        JOIN penalty b ON a.id=b.member_id
        WHERE b.penalty_end > '${today}' AND a.id = '${member_id}') AS penalty,
        (SELECT COUNT(a.id) FROM members a
        JOIN borrowing b ON a.id=b.member_id
        WHERE b.status = 'ongoing' AND a.id = '${member_id}') AS borrowed
    `;
  let data = await db(query);
  return data[0];
};

exports.cekBook = async function (book_id) {
  let query = `
        SELECT * FROM books a
        JOIN borrowing b ON a.id=b.book_id
        WHERE b.book_id = '${book_id}' AND
        b.status = 'ongoing'
    `;
  let data = await db(query);
  return data[0];
};

exports.borrowBook = async function (member_id, book_id, today) {
  let borrow_date = today.toISOString().split("T")[0];

  today.setDate(today.getDate() + 7);
  let return_date = today.toISOString().split("T")[0];
  const query = `
    INSERT INTO borrowing (member_id, book_id, borrow_date, return_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [member_id, book_id, borrow_date, return_date, "ongoing"];
  try {
    const [result] = await db(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.cekReturn = async function (member_id, book_id, today) {
  let query = `
       SELECT return_date FROM borrowing
       WHERE member_id = '${member_id}' AND
       book_id = '${book_id}' AND
       status = 'ongoing'
    `;
  let data = await db(query);
  let return_date = data[0][0].return_date.toISOString().split("T")[0];
  return return_date;
};

exports.makePenalty = async function (member_id, today) {
  let penalty_start = today;

  // cek jika ada penalty yang masih berjalan
  let queryCekPenalty = `
       SELECT penalty_end FROM penalty
       WHERE member_id = '${member_id}'
       AND penalty_end > '${today}'
       ORDER BY id DESC
    `;
  let cek_penalty = await db(queryCekPenalty);

  if (cek_penalty[0].length > 0) {
    // jika ada penalty yang masih berjalan, maka akan diakumulasikan
    penalty_start = new Date(cek_penalty[0][0].penalty_end).toLocaleDateString(
      "en-CA"
    );
  }
  let date = new Date(penalty_start);
  date.setDate(date.getDate() + 3);
  let penalty_end = date.toISOString().split("T")[0];

  const query = `
          INSERT INTO penalty (member_id, penalty_start, penalty_end)
          VALUES (?, ?, ?)
      `;
  const values = [member_id, penalty_start, penalty_end];
  try {
    const [result] = await db(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.returnBook = async function (member_id, book_id) {
  const query = `
    UPDATE  borrowing SET status = 'returned'
    WHERE member_id = '${member_id}' AND
    book_id = '${book_id}'
    AND status = 'ongoing'
  `;

  try {
    const [result] = await db(query);
    return result;
  } catch (error) {
    throw error;
  }
};
