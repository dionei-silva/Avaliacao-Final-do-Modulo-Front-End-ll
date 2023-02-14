let usuario = document.getElementById("email");
let senha = document.getElementById("senha");
const divForm = document.getElementById("div-login");

const toastElement = document.getElementById("toast-login");
const toastLogin = new bootstrap.Toast(toastElement);

divForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputEmail = usuario.value;
  const inputSenha = senha.value;

  if (!inputEmail || !inputSenha || !inputEmail.includes("@")) {
    divForm.classList.add("was-validated");
    return;
  }
});

function encontrarContato() {
  let encontraUsuario = [];

  encontraUsuario = JSON.parse(localStorage.getItem("listaUsuarios"));

  let encontrarNome = encontraUsuario.some(
    (valor) => valor.nome == usuario.value && valor.senha == senha.value
  );

  if (encontrarNome) window.location.href = "../Recados/recados.html";
  else
    return mostrarAlerta("danger", "Email ou senha Invalidos. Tente novamente");

  let usuarioLogado = {
    email: usuario.value,
    recados: [],
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
}

function mostrarAlerta(tipo, mensagem) {
  toastElement.classList.add(`text-bg-${tipo}`);

  const espacoMensagem = document.getElementById("espaco-mensagem");
  espacoMensagem.innerHTML = mensagem;

  toastLogin.show();

  setTimeout(() => {
    toastLogin.hide();
    toastElement.classList.remove(`text-bg-${tipo}`);
  }, 5000);
}
