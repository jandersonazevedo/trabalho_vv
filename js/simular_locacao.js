import fs from 'fs';

var simulacao = fs.readFileSync("db/simulacao.json", "utf8");
var simulacao_json = JSON.parse(simulacao);

console.log(simulacao_json);

var lista_imoveis = document.querySelector("#imoveis");
var imovel = null;
var cpf_cliente = null;
var form_simulacao = document.querySelector("#form_simulacao");

var mensagem_sucesso = document.querySelector("#msg_sucesso");

mensagem_sucesso.style.display = "none";
form_simulacao.style.display = "none";

function setImovel(imovel) {
  this.imovel = imovel;

  lista_imoveis.style.display = "none";
  form_simulacao.style.display = "block";
}

function setCPF() {
  this.cpf_cliente = document.querySelector(".cpf_cliente").value;
  form_simulacao.style.display = "none";
  simulacao_json.simulacoes.push({ cpf_cliente, imovel, status: "pendente" });
  fs.writeFileSync("db/simulacao.json", JSON.stringify(simulacao_json, null, 2));
  mensagem_sucesso.style.display = "block";
}