var simulacoes_list = document.querySelector("#simulacoes");
var simuacoes = [];

var simulacao = fs.readFileSync("../../db/simulacao.json", "utf8");
var simulacao_json = JSON.parse(simulacao).filter(
  (simulacao) => simulacao.status !== "aprovado"
);

var simulacao_json = [
  {
    cpf_cliente: "000000000000",
    imovel: "1",
    status: "pendente",
  },
  {
    cpf_cliente: "11111111111",
    imovel: "2",
    status: "aprovado",
  },
];

setSimulacoes();
function setSimulacoes() {
  simulacao_json.forEach((simulacao) => {
    simuacoes.push(
      `<div><span>CPF do cliente: ${simulacao.cpf_cliente}<span><span>Imovel: ${simulacao.imovel}<span><span>Status: ${simulacao.status}<span><button onclick='aprovar(${simulacao.imovel})'>Aprovar</button></div>`
    );
  });
  simulacoes_list.innerHTML = 'aaa';
  simulacoes_list.innerHTML = simuacoes;
}

function aprovar(imovel) {
  console.log(imovel);
  var simulacao_temp = [];
  simulacao_json.forEach((simulacao) => {
    if (simulacao.imovel === imovel) {
      simulacao.status = "aprovado";
    }
    simulacao_temp.push(simulacao);
  });
  console.log(simulacao_temp);

  simulacao_json = simulacao_temp;
  simulacao_temp = [];
  setSimulacoes();

  // fs.writeFileSync("../../db/simulacao.json", simulacao_temp);
}
