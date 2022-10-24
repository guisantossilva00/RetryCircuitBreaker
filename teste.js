const CircuitBreaker = require('./circuitBreaker/circuitBreaker');

// Our unstable request simulation
const unstableRequest = () => {
  return new Promise((resolve, reject) => {
      if (Math.random() > .5) {
        resolve({data: "Sucesso"})
      } else {
        reject({data: "Falha"})
      }
  })
}

const breaker = new CircuitBreaker(unstableRequest)

setInterval(() => {
    breaker
      .fire()
      .then(console.log)
      .catch(console.error)
  }, 1000)