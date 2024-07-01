const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

module.exports = router;
