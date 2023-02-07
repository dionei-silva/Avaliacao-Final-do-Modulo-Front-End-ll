let usuario = document.getElementById("email");
let senha = document.getElementById("senha");
const divForm = document.getElementById("div-login");

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
  else return; /* alert("Email e senha Invalidos. Tente novamente!!"); */

  let usuarioLogado = {
    email: usuario.value,
    recados: [],
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
}
