<template>
  <div class="main-container">
    <h1>Simular Locação</h1>
    <nav>
      <div>
        <router-link to="/">Página Inicial</router-link>
        <router-link to="/simular_pre_aprovacao">Simular Pré-Aprovação</router-link>
      </div>
    </nav>
    <div class="lista_imoveis" v-show="!imovel">
      <div v-for="(imovel, index) in imoveis" :key="index" class="imovel">
        <img :src="imovel.foto" />
        <div class="descricao">
          <p><b>Valor: </b> R$ {{ imovel.valor.toFixed(2) }} / {{ imovel.tipo }}</p>
          <p><b>Endereço: </b> {{ imovel.endereco.rua }}, Nº {{ imovel.endereco.numero }}, {{ imovel.endereco.bairro }},
            {{ imovel.endereco.cidade }} - {{ imovel.endereco.uf }}, CEP {{ imovel.endereco.cep }}.
          </p>
        </div>
        <div class="actions">
          <button @click="setImovel(imovel)" class="btn-blue">Simular Locação</button>
        </div>
      </div>
    </div>
    <div class="form_simulacao" v-show="imovel && !success">
      <label>
        <b>CPF: </b>
        <input v-model="cpf" type="text" class="cpf_cliente" placeholder="Digite aqui o seu CPF" required />
      </label>
      <button @click="simular()" class="btn-blue">Realizar simulação</button>
    </div>
    <h3 class="msg_sucesso" v-show="success">Simulação enviada para aprovação.</h3>
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

<style scoped>
.lista_imoveis {
  margin-top: 30px;
  border-top: 3px solid #345EA8;
  padding-top: 20px;
}

img {
  width: 400px;
  border-radius: 5px;
}

.imovel {
  margin: 10px 0px;
  border: 2px solid #345EA8;
  border-radius: 5px;
  background-color: white;
  max-width: 400px;
}

.descricao {
  padding: 0px 10px;
}

.form_simulacao {
  margin-top: 30px;
  border-top: 3px solid #345EA8;
  padding-top: 20px;
}
</style>