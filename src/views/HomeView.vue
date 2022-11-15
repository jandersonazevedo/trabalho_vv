<template>
  <div class="main-container">
    <h1>My Dream Home</h1>
    <nav>
      <div>
        <router-link to="/simular_locacao">Simular Locação</router-link>
        <router-link to="/simular_pre_aprovacao">Simular Pré-Aprovação</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: 0.2s;
  color: #333;
}

body {
  background-color: #3B8AC3;
}

.main-container {
  display:grid;
  justify-content: center;
  justify-items: center;
  margin: 10px;
  background-color: #EEDBCB;
  padding: 20px 10px 40px 10px;
  border-radius: 5px;
}

h1 {
  font-size: 2em;
  color: #345EA8;
  border-bottom: 4px solid #345EA8;
  margin-bottom: 25px;
}

a {
  text-decoration: none;
  color: #EEDBCB;
  background: #345EA8;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  font-weight: 500;
  border: 2px solid #345EA8;
}

a:hover {
  color: #345EA8;
  background: #EEDBCB;
}

p {
  color: #333;
}

button {
  cursor: pointer;
  padding: 5px;
  font-weight: 500;
  border-radius: 5px;
  margin: 5px;
}

.actions {
  text-align: right;
}

.btn-blue {
  color: white;
  background: #345EA8;
  border: 2px solid #345EA8;
}

.btn-orange {
  color: white;
  background: #d66519;
  border: 2px solid #d66519;
}

.btn-green {
  color: white;
  background: green;
  border: 2px solid green;
}

.btn-red {
  color: white;
  background: rgb(177, 33, 33);
  border: 2px solid rgb(177, 33, 33);
}

input {
  padding: 5px;
  border: 2px solid #345EA8;
  border-radius: 5px;
}

.msg_sucesso {
  margin-top: 30px;
  border-top: 3px solid #345EA8;
  padding-top: 20px;
  color: green;
}

</style>
