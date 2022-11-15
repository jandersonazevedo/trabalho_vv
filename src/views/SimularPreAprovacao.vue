<template>
  <div class="main-container">
    <h1>Simular Pré-Aprovação</h1>
    <nav>
      <div>
        <router-link to="/">Página Inicial</router-link>
        <router-link to="/simular_locacao">Simular Locação</router-link>
      </div>
    </nav>
    <div class="lista_simulacoes" v-show="!simulacao">
      <div v-for="(simulacao) in simulacoes" :key="simulacao.id" class="simulacao">
        <div class="descricao">
          <img :src="getInfoImovel(simulacao.imovel)?.foto" />
          <span class="desc-texto">
            <p><b>CPF do cliente: </b> {{ simulacao.cpf_cliente }}</p>
            <p><b>Status: </b> {{ simulacao.status }}</p>
            <p><b>Valor: </b> R$ {{ getInfoImovel(simulacao.imovel).valor.toFixed(2) }} / {{
                getInfoImovel(simulacao.imovel).tipo
            }}</p>
            <p><b>Endereço: </b> {{ getInfoImovel(simulacao.imovel).endereco.rua }}, Nº {{
                getInfoImovel(simulacao.imovel).endereco.numero
            }}, {{ getInfoImovel(simulacao.imovel).endereco.bairro }},
              {{ getInfoImovel(simulacao.imovel).endereco.cidade }} - {{ getInfoImovel(simulacao.imovel).endereco.uf }},
              CEP {{ getInfoImovel(simulacao.imovel).endereco.cep }}.
            </p>
          </span>
        </div>
        <div class="actions">
          <button @click="excluir(simulacao.id)" class="btn-red">Excluir</button>
          <button @click="rejeitar(simulacao.id)" class="btn-orange"
            v-show="simulacao.status !== 'rejeitado'">Rejeitar</button>
          <button @click="aprovar(simulacao.id)" class="btn-green"
            v-show="simulacao.status !== 'aprovado'">Aprovar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "simularPreAprovacao",
  data() {
    return {
      simulacoes: [],
      simulacao: null,
      imoveis: [],
    }
  },
  mounted() {
    this.getSimulacoes();
  },
  methods: {
    async getSimulacoes() {
      const req = await fetch("http://localhost:3000/simulacoes");
      const data = await req.json();
      this.simulacoes = data;
      this.simulacoes.forEach((simulacao) => {
        this.getImovel(simulacao.imovel).then(imovel => this.imoveis.push(imovel));
      });
    },
    async aprovar(id) {
      const dataJson = JSON.stringify({ status: 'aprovado' });
      const req = await fetch(`http://localhost:3000/simulacoes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
    },
    async rejeitar(id) {
      const dataJson = JSON.stringify({ status: 'rejeitado' });
      const req = await fetch(`http://localhost:3000/simulacoes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
    },
    async excluir(id) {
      const req = await fetch(`http://localhost:3000/simulacoes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    },
    async getImovel(imovel) {
      const req = await fetch(`http://localhost:3000/imoveis/${imovel}`);
      const data = await req.json();
      return data;
    },
    getInfoImovel(imovelAtual) {
      return this.imoveis.find(imovel => imovel.id === imovelAtual);
    }
  }
};
</script>

<style scoped>
.lista_simulacoes {
  margin-top: 30px;
  border-top: 3px solid #345EA8;
  padding-top: 20px;
}

.simulacao {
  margin: 10px 0px;
  border: 2px solid #345EA8;
  border-radius: 5px;
  background-color: white;
}

.simulacao img {
  width: 200px;
  border-radius: 5px;
}

.descricao {
  padding: 10px;
  display: flex;
  column-gap: 10px;
}

.desc-texto {
  row-gap: 10px;
}
</style>