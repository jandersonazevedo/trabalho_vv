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
        <button @click="rejeitar(simulacao.id)">Rejeitar</button>
        <button @click="aprovar(simulacao.id)">Aprovar</button>
      </div>
    </div>
    <div id="form_simulacao" v-show="simulacao && !success">
      <label>
        CPF:
        <input v-model="cpf" type="text" class="cpf_cliente" placeholder="Digite aqui o seu CPF" required />
      </label>
      <button @click="simular()">Realizar simulação</button>
    </div>
    <h3 id="msg_sucesso" v-show="success">Simulação enviada para aprovação.</h3>
  </div>
</template>

<script>

export default {
  name: "simularLocacao",
  data() {
    return {
      success: false,
      simulacoes: [],
      simulacao: null,
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
      const res = await req.json();

      this.success = true;
    },
    async rejeitar(id) {
      const dataJson = JSON.stringify({ status: 'rejeitado' });
      const req = await fetch(`http://localhost:3000/simulacoes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();

      this.success = true;
    },
  }
};
</script>