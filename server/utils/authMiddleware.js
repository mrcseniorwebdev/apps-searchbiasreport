const authCheck = (req, res, next) => {
  console.log("hellllllo");

  if (process.env.NODE_ENV == "dev") {
    next();
    return;
  }
  // console.log(req)
  console.log({ "req.user": req.user });
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = { authCheck };
