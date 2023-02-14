let nomeUsuario = document.getElementById("cadastro-usuario");
let senhaUsuario = document.getElementById("cadastro-senha");
let repeteSenhaUsuario = document.getElementById("repete-senha");

const toastElement = document.getElementById("toast-cadastro");
const toastCadastro = new bootstrap.Toast(toastElement);

function cadastrar() {
  if (
    nomeUsuario.value !== "" &&
    senhaUsuario.value !== "" &&
    repeteSenhaUsuario.value !== ""
  ) {
    if (senhaUsuario.value !== repeteSenhaUsuario.value) {
      mostrarAlerta("danger", "Senhas não conferem, Tente Novamente");
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

    mostrarAlerta("success", "Usuario cadastrado com Sucesso");

    setTimeout(() => {
      sair();
    }, 2000);
  } else {
    mostrarAlerta("danger", "Preencha todos os campos!");
    return;
  }
}

function sair() {
  window.location.href = "../Login/login.html";
}

function mostrarAlerta(tipo, mensagem) {
  toastElement.classList.add(`text-bg-${tipo}`);

  const espacoMensagem = document.getElementById("espaco-mensagem");
  espacoMensagem.innerHTML = mensagem;

  toastCadastro.show();

  setTimeout(() => {
    toastCadastro.hide();

    toastElement.classList.remove(`text-bg-${tipo}`);
  }, 5000);
}
