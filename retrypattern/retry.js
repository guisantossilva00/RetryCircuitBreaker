const api = require('../api');
const circuitBreaker = require('../circuitBreaker/circuitBreaker');

const circuit = (status) => {
    const breaker = new circuitBreaker(status)
    setInterval(() => {
        breaker
          .fire()
          .then(console.log)
          .catch(console.error)
      }, 1000);
}      

const apiComRetry = (url, numeroRetry) => {
    return new Promise((resolve, reject)=> {
        let tentativas = 1;
    
        const apiRetry = (url, numero) => {
            return api.get(url).then(resultado => {
                const status = resultado.data.status;

                if(status === 200) {
                    return resolve(resultado.data);
                } else if (numero === 1) {
                    // circuit({data: "Falha"});
                    throw reject("Erro ao obter dados");
                } else {
                    console.log('tentando ' + tentativas);
                    setTimeout(() => {
                        tentativas++;
                        apiRetry(url, numero -1);
                    }, tentativas * 3000);
                }
            }).catch((erro) => {
                if (numero === 1) {
                    circuit({data: "Falha"});
                } else {
                    console.log('tentando ' + tentativas);
                    setTimeout(() => {
                        tentativas++;
                        apiRetry(url, numero -1);
                    }, tentativas * 3000);
                }
            });
        }
        return apiRetry(url, numeroRetry); 
    });
}

module.exports = apiComRetry;