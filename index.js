const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

// ``
