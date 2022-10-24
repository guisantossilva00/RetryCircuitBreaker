const cepInput = document.getElementById("cep");
const enderecoInput = document.getElementById("endereco");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

cepInput.addEventListener('change', testenovo);

function testenovo() {
    // alert(e.target.value)
    let cepValor = cepInput.value;

    if(cepValor) {
        const url =`http://localhost:2022/cep/${cepValor}`

        axios.request(url).then((res) => {
            let {data} = res;
            let {endereco} = data;
            enderecoInput.value = endereco.address;
            bairroInput.value = endereco.district;
            cidadeInput.value = endereco.city;
            estadoInput.value = endereco.state;
        })
    }
    // console.log('teste => ' + certo);
}