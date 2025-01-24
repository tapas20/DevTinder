export const Auth = (req, res, next) => {
  console.log("Middleware is getting executed");
  let token = "xyyz";
  let authorized = token === "xyz";
  if (!authorized) {
    res.status(401).send("Not authorized");
  } else {
    next();
  }
};

module.exports = { Auth };
