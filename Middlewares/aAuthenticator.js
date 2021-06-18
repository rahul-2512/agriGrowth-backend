const jwt = require("jsonwebtoken");
const config = require("../config");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Could not serve the request.");
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if(decoded.role!=='admin'){
        return res.status(400).send("Invalid token");
    }
    req.authUser = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
}

module.exports = auth;