const Books = require("../model/booksModel");

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.getAllBooks();
    return res.status(201).json(books);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks };
