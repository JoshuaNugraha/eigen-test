const Borrow = require("../model/borrowModel");

const doBorrow = async (req, res) => {
  let member_id = req.body.member_id;
  let book_id = req.body.book_id;

  // cek member
  try {
    const cek_member = await Borrow.cekMember(member_id);
    if (cek_member[0].penalty > 0) {
      return res.status(400).json({
        message: "Tidak bisa meminjam buku. Sedang dalam masa penalty",
      });
    }
    if (cek_member[0].borrowed >= 2) {
      return res.status(400).json({
        message: "Tidak bisa meminjam buku. Sudah meminjam 2 buku",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // cek book
  try {
    const cek_book = await Borrow.cekBook(book_id);
    console.log(cek_book);

    if (cek_book.length > 0) {
      return res.status(400).json({
        message: "Tidak bisa meminjam buku. Buku sedang dipinjam member lain",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // simpan pinjam buku
  try {
    let today = new Date();
    const borrowBook = await Borrow.borrowBook(member_id, book_id, today);
    return res.status(200).json({ message: "Berhasil meminjam buku" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  let member_id = req.body.member_id;
  let book_id = req.body.book_id;
  let today = new Date().toISOString().split("T")[0];

  //cek apakah sesuai jadwal return (H+7)
  let cek_return = await Borrow.cekReturn(member_id, book_id, today);
  if (cek_return < today) {
    let makePenalty = await Borrow.makePenalty(member_id, today);
  }
  try {
    const returnBook = await Borrow.returnBook(member_id, book_id);
    return res.status(200).json({ message: "Berhasil mengembalikan buku" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  doBorrow,
  returnBook,
};
