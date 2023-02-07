let nomeUsuario = document.getElementById("cadastro-usuario");
let senhaUsuario = document.getElementById("cadastro-senha");
let repeteSenhaUsuario = document.getElementById("repete-senha");
function cadastrar() {
    if (
        nomeUsuario.value !== "" &&
        senhaUsuario.value !== "" &&
        repeteSenhaUsuario.value !== ""
    ) {
        if (senhaUsuario.value !== repeteSenhaUsuario.value) {
            alert("Senhas nao conferem, Tente Novamente");
            return;
        }

        let listaUsuarios = JSON.parse(
            localStorage.getItem("listaUsuarios") || "[]"
        );
        let cadastrado = listaUsuarios.some(
            (valor) => valor.nome == nomeUsuario.value
        );
        if (cadastrado) {
            alert("Usuario ja cadastrado, Tente outro Email !!");
            return;
        } else {
            listaUsuarios.push({
                nome: nomeUsuario.value,
                senha: senhaUsuario.value,
                recados: [],
            });
        }

        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

        alert("Usuario cadastrado com Sucesso");

        sair();
    } else {
        alert("Preencha todos os campos!");
        return;
    }
}

function sair() {
    window.location.href = "../Login/login.html";
}
