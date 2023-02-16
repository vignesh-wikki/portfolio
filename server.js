const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dbo = require("./mongodb");
const { engine } = require("express-handlebars");
const routeProjects = require("./routes/Projects");
const routeLogin = require("./routes/Login");
const routeRegister = require("./routes/Register");
const routeAboutme = require("./routes/Aboutme");
const bcrypt = require("bcryptjs");
require('dotenv').config()
var hashedPassword;
var wrongpassword;
const port = process.env.PORT;

app.engine(
  ".hbs",
  engine({
    layoutsDir: "views",
    defaultLayout: false,
    extname: ".hbs",
    partialsDir: __dirname + "/views/Partials/",
  })
);
app.set("view engine", ".hbs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use("/assets", express.static("assets"));
app.use(express.static("css"));
app.use(express.static("scripts"));

app.use(routeProjects);
app.use(routeLogin);
app.use(routeRegister);
app.use(routeAboutme);

app.get("/", (req, res, next) => {
  res.render("index");

  switch (req.query.status) {
    case 1:
      console.log("Logged in");
      break;

    default:
      break;
  }
});

app.post("/logged", async (req, res, next) => {
  const database = await dbo.getdatabase();
  const collection = database.collection("userdetails");
  let user = { email: req.body.email };
  await collection.find(user);
  if (!user) {
    return res.status(400);
  }

  bcrypt.compare(
    req.body.password,
    hashedPassword,
    async function (err, isMatch) {
      if (isMatch) {
        console.log("Encrypted password is: ", req.body.password);
        console.log("Decrypted password is: ", hashedPassword);
        return res.redirect("/?status=1");
      }

      if (!isMatch) {
        wrongpassword = "wrong Password";

        res.render("Login");
      }
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/registered", async (req, res, next) => {
  const database = await dbo.getdatabase();
  const collection = database.collection("userdetails");

  bcrypt.genSalt(10, async function (err, Salt) {
    bcrypt.hash(req.body.password, Salt, function (err, hash) {
      if (err) {
        return console.log("Cannot encrypt");
      }
      hashedPassword = hash;

      const userdata = {
        name: req.body.name,
        email: req.body.email,
        hashedPassword,
      };

      collection.insertOne(userdata);

      return res.redirect("/Login");
    });
  });
});

app.use((req, res, next) => {
  res.send("<strong><h5>404 not found</h5> </strong");
});

app.listen(port, () => {
  console.log("app listening at 5000");
});
