<template>
  <div class="main-container">
    <h1>Simular Locação</h1>
    <nav>
      <div>
        <router-link to="/">Página Incial</router-link>
        <router-link to="/simular_pre_aprovacao">Simular Pré-Aprovação</router-link>
      </div>
    </nav>
    <div class="lista_imoveis" v-show="!imovel">
      <div v-for="(imovel, index) in imoveis" :key="index">
        <img :src="imovel.foto"/>
        <p> R$ {{ imovel.valor.toFixed(2) }} / {{imovel.tipo}}</p>
        <p> {{ imovel.endereco.rua }}, Nº {{ imovel.endereco.numero }}, {{ imovel.endereco.bairro }}.</p>
        <p>{{ imovel.endereco.cidade }} - {{ imovel.endereco.uf }}</p>
        <button @click="setImovel(imovel)">Simular</button>
      </div>
    </div>
    <div id="form_simulacao" v-show="imovel && !success">
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
      imoveis: [],
      imovel: null,
      cpf: null,
    }
  },
  mounted() {
    this.getImoveis();
  },
  methods: {
    async getImoveis() {
      const req = await fetch("http://localhost:3000/imoveis");
      const data = await req.json();
      this.imoveis = data;
    },
    setImovel(imovel) {
      this.imovel = imovel;
    },
    async simular() {
      if (this.cpf && this.imovel) {
        const data = {
          cpf_cliente: this.cpf,
          imovel: this.imovel.id,
          status: "pendente",
        };
        const dataJson = JSON.stringify(data);
        const req = await fetch("http://localhost:3000/simulacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
        });

        const res = await req.json();
        console.log(res);
        this.success = true;
      }
    },
  }
};
</script>
