const Members = require("../model/membersModel");

const getAllMembers = async (req, res) => {
  try {
    const members = await Members.getAllMembers();
    return res.status(201).json(members);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMembers,
};
