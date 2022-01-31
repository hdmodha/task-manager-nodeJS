const jwt = require("jsonwebtoken");

const authenticateMiddleWare = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ") || header === "") {
    return res.status(401).json({ msg: "Enter a valid jsonwebtoken" });
  }
  const token = header.split(" ")[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Not authorized to access this route." });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// const authenticateUser = async (req, res, next) => {
//   const { username, email, password } = req.body.createdBy;
//   if (!username || !email || !password) {
//     res.status(400).json({ error: "Enter username, email and password" });
//   } else {
//     next();
//   }
// };

module.exports = authenticateMiddleWare;
