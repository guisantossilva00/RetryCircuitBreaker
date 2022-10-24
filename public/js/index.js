const teste = document.querySelector("#teste");

teste.addEventListener('change', teste)

function teste(e) {
    alert('ddd')
    // let certo = teste.value;
    console.log('teste => ' + e.target.value);
}