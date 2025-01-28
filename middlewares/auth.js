const adminAuth = (req, res, next) => {
  let token = "xyz";
  let isauthenticated = token === "xyz";
  if (!isauthenticated) {
    res.status(401).send("User is not authenticated");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  let token = "xyz";
  let isauthenticated = token === "xyz";
  if (!isauthenticated) {
    res.status(401).send("User is not authenticated");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
