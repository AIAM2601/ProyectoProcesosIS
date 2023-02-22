
<template>
  <div id="myFormNativeList">
      <form @submit.prevent="submitForm()">
        <h3>Buscar por idioma y nativo si/no</h3>

          <span class="search"> Idioma:</span>
        <select v-model="language">
          <option disabled value="">Seleccione</option>
          <option value="ingles">ingles</option>
          <option value="español">español</option>
          <option value="aleman">aleman</option>
        </select>

          <span class="search"> Nativo:</span>
        <select v-model="yesNo">
          <option disabled value="">Seleccione</option>
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>

        <button v-on:click="isHidden = false">Buscar</button>
    </form>
  </div>
  <div id="nativeListInfo" v-if="!isHidden">
    <div id="infoNative">
      <span>Cantidad de personas: {{this.counter}}</span>
      <div v-for="data in results">
       <li> {{data.Nombre}} {{data.Apellido}} </li>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  el: "myFormNativeList",
  data() {
    return {
      language: '',
      yesNo: '',
      results:[],
      counter: 0,
      isHidden: true,
    }
  },
  methods: { 
    submitForm() {
      axios.get('http://localhost:8080/nativeList/' + this.language + '/' + this.yesNo)
      .then((response) => {
        this.results = response.data;
        console.log(response);
        console.log(this.results.length);
        this.counter = this.results.length;
      })
        .catch(function (error) {
        console.log(error);
      })
        .finally(function () {
        // always executed
      });
      console.log(this.language + this.yesNo);
    }
  }
}
</script>

<style scoped>

#myFormNativeList {
  text-align: center;
  margin-left: 10px;
  /* background-color: aqua; */
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  border-radius: 10px;
  width: 460px;
  height: 100px;
  margin-top: 50px;
  /* float: left; */
}

select {
  margin-left: 10px;
  margin-right: 10px;
  
}

#nativeListInfo {
  border-radius: 10px;
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  /* background-color: rgb(42, 165, 58); */
  width: 460px;
  height: 100%;
  margin-left: 10px;
  margin-top: 15px;
}

#infoNative {
  margin-top: 10px;
  margin-left: 10px;
}

.search {
  font-size: 18px;
  font-weight: bold;
}

button {
  margin-left: 5px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
}

</style>