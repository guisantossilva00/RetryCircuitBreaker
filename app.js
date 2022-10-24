const express = require("express");
const app = express();
const handlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const hbs = handlebars.create({defaultLayout: "main", runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use("/", express.static(__dirname + "/"));

require("./router/router")(app);

app.listen(2022, () => {
    console.log("Servidor rodando http://localhost:2022/");
})