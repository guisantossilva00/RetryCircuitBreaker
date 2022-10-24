const axios = require("axios");

const apiCep = axios.create({
    baseURL: 'https://cdn.apicep.com/file/apicep/'
})

module.exports = apiCep;