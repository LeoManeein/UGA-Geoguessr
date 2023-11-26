const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No auth token, access denied" });
    }
    const verfied = jwt.verify(token, JWT_SECRET_KEY);
    if (!verfied) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied" });
    }
    req.user = verfied.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
