<template>
  <div class="main-container">
    <h1>Simular Pré-Aprovação</h1>
    <nav>
      <div>
        <router-link to="/">Página Incial</router-link>
        <router-link to="/simular_locacao">Simular Locação</router-link>
      </div>
    </nav>
    <div class="lista_simulacoes" v-show="!simulacao">
      <div v-for="(simulacao) in simulacoes" :key="simulacao.id">
        <p> {{ simulacao }}</p>
        <p> {{ imoveis.find(imovel => imovel.id === simulacao.imovel)}} </p>
        <button @click="excluir(simulacao.id)">Excluir</button>
        <button @click="rejeitar(simulacao.id)">Rejeitar</button>
        <button @click="aprovar(simulacao.id)">Aprovar</button>
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
      cpf: null,
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
    setSimulacao(simulacao) {
      this.simulacao = simulacao;
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
    async getImovel(imovel){
      const req = await fetch(`http://localhost:3000/imoveis/${imovel}`);
      const data = await req.json();
      return data;
    }
  }
};
</script>