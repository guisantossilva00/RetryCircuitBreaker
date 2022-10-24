const express = require('express');
const router = express.Router();
const retry = require("../retrypattern/retry");

router.get("/", async (req, res) => {
    try{
        const data = await retry("06310-30.json", 3);

        res.send({endereco: data});
    } catch(err) {
        res.send(err);
    }
});

router.get("/form", async (req, res) => {
    res.render("../views/formulario");
});

module.exports = app => app.use(router);