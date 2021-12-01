const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

router.post("/", async (req, res) => {
  const notebook = new Notebook(
    req.body.title,
    req.body.price,
    req.body.img,
    req.body.descr
  );
  await notebook.save();
  res.redirect("/notebooks");
});

module.exports = router;
