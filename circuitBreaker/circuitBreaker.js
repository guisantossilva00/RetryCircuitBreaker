class CircuitBreaker {
    constructor(request) {
      this.request = request
      this.state = "FECHADO"
      this.falhaLimite = 3
      this.contadorFalha = 0
      this.sucessoLimite = 2
      this.contadorSucesso = 0
      this.timeout = 6000
      this.proximaTentativa = Date.now()
    }
  
    async fire() {
        if (this.state === "ABERTO") {
          if (this.proximaTentativa <= Date.now()) {
            this.state = "SEMIABERTO"
          } else {
            // throw new Error("O circuito está aberto no momento")
            console.log('')
            console.log('O circuito está aberto no momento')
            console.log('')
          }
        }
        try {
            const response = await this.request();
            return this.sucesso(response);
        } catch (err) {
            return this.falha(err)
        }
    }

    status(action) {
        console.table({
          Ação: action,
          Timestamp: Date.now(),
          Sucessos: this.contadorSucesso,
          Falhas: this.contadorFalha,
          State: this.state
        })
      }
  
    sucesso(response) {
        if (this.state === "SEMIABERTO") {
            this.contadorSucesso++;
            if (this.contadorSucesso > this.sucessoLimite) {
                this.contadorSucesso = 0;
                this.state = "FECHADO";
            }
        }
         
        this.falhaLimite = 0;
        this.status("Sucesso");
        return response;
    }
  
    falha(err) {
        this.contadorFalha++
        if (this.contadorFalha >= this.falhaLimite) {
          this.state = "ABERTO"
          this.proximaTentativa = Date.now() + this.timeout
        }
        this.status("Falha");
        return err;
      }
  }
  
  module.exports = CircuitBreaker