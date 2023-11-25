const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No auth token, access denied" });
    }
    const verfied = jwt.verify(token, "passwordKey");
    if (!verfied) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied" });
    }
    req.user = verfied.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
