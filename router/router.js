const express = require('express');
const router = express.Router();
const retry = require("../retrypattern/retry");

router.get("/", async (req, res) => {
    res.render("../views/formulario");
});

router.get("/cep/:cep", async (req, res) => {
    const {cep} = req.params
    try{
        const data = await retry(`${cep}.json`, 3);

        res.send({endereco: data});
    } catch(err) {
        res.send(err);
    }
});

router.get('/salvar', (req, res) => {
    
});


module.exports = app => app.use(router);