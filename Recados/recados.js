let descricao = document.querySelector("#descricaoUsuario");
let detalhamento = document.querySelector("#detalhamentoUsuario");
let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
let salvar = document.querySelector("#salvar");

const modalExcluir = new bootstrap.Modal("#modal-excluir");

const toastElement = document.getElementById("toast-recados");
const toastRecado = new bootstrap.Toast(toastElement);

if (usuarioLogado === null) {
  mostrarAlerta("danger", "Acesso a pagina, somente com login!!");
  setTimeout(() => {
    window.location.href = "../Login/login.html";
  }, 2000);
}

function sair() {
  salvarDadosJSON();
  localStorage.removeItem("usuarioLogado");
  window.location.href = "../Login/login.html";
}

function listarRecados() {
  if (descricao.value === "" || detalhamento.value === "")
    return mostrarAlerta(
      "danger",
      "Obrigatorio o preenchimento de todos os campos"
    );

  usuarioLogado.recados.push({
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  });
  mostrarAlerta("success", "Recado salvo com sucessso");
  mostrarRecados();

  salvarRecadosJSON();
}

function mostrarRecados() {
  let olHTML = document.querySelector("#listarRecados");
  olHTML.innerHTML = "";
  usuarioLogado.recados.forEach((usuario, i) => {
    let recado = document.createElement("li");

    recado.innerHTML = `
            <div class="div-principal row">
            <div class="col-6">
            <p class="h5">${i + 1}  | Descrição: ${usuario.descricao} </p>
            <p class="h6">Detalhamento: ${usuario.detalhamento}</p>
            </div>
            <div class="">
              <div class="div-btn col-6">
                  <button id = 'btnInserir' onclick="editarRecado(${i})" class="btn btn-success">Editar</button>
                  <button onclick="mostrarModalExcluir(${i})" class="btn btn-danger">Apagar</button>
              </div>
            </div>
            </div>
            <hr>
        `;

    olHTML.appendChild(recado);
    salvarRecadosJSON();

    descricao.value = "";
    detalhamento.value = "";
  });
}

function salvarRecadosJSON() {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  salvarDadosJSON();
}

setTimeout(() => {
  passarDados();
  mostrarRecados();
});

function id() {
  usuarioLogado.recados.forEach((usuario, i) => {
    console.log(usuario.id);
    if (usuario.id !== i + 1) {
      console.log(usuario.id);
    }
  });
}

function mostrarModalExcluir(i) {
  modalExcluir.show();
  const botaoExcluir = document.getElementById("btn-delete");
  botaoExcluir.setAttribute("onclick", `apagarRecado(${i})`);
}

function apagarRecado(i) {
  usuarioLogado.recados.splice(i, 1);
  modalExcluir.hide();
  salvarDadosJSON();
  mostrarRecados();
}

function editarRecado(i) {
  let editarRecado = usuarioLogado.recados[i];

  salvar.setAttribute("onclick", `salvarEdicao(${i})`);
  salvar.innerHTML = "Editar";

  descricao.value = editarRecado.descricao;
  detalhamento.value = editarRecado.detalhamento;

  console.log(usuarioLogado.recados[i]);
}

function salvarEdicao(i) {
  if (descricao.value !== "" || detalhamento.value !== "") {
    usuarioLogado.recados[i].descricao = descricao.value;
    usuarioLogado.recados[i].detalhamento = detalhamento.value;
  } else {
    return alert("Preencha os campos necessarios!!");
  }
  salvar.setAttribute("onclick", `listarRecados()`);
  salvar.innerHTML = "Salvar";

  descricao.value = "";
  detalhamento.value = "";
  mostrarAlerta("success", "Recado editado com suceesso");
  mostrarRecados();
}

function salvarDadosJSON() {
  listaUsuarios.forEach((dados) => {
    console.log(dados);
    if (dados.nome == usuarioLogado.email) {
      dados.recados = usuarioLogado.recados;
    }
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
  });
}

function passarDados() {
  listaUsuarios.forEach((dados) => {
    console.log(dados);
    if (dados.nome == usuarioLogado.email) {
      usuarioLogado.recados = dados.recados;
    }
  });
}

function mostrarAlerta(tipo, mensagem) {
  toastElement.classList.add(`text-bg-${tipo}`);

  const espacoMensagem = document.getElementById("espaco-mensagem");
  espacoMensagem.innerHTML = mensagem;

  toastRecado.show();

  setTimeout(() => {
    toastRecado.hide();

    toastElement.classList.add(`text-bg-${tipo}`);
  }, 5000);
}
setTimeout(() => {
  mostrarRecados();
});
