<template>
  <div id="myForm">
    <form  @submit.prevent="submitForm()">
      <h3>Buscar por idioma y nivel de dominio</h3>

        <span class="search"> Idioma:</span>
      <select v-model="language">
        <option disabled value="">Seleccione</option>
        <option value="ingles">ingles</option>
        <option value="español">español</option>
        <option value="aleman">aleman</option>
      </select>

        <span class="search"> Nivel de dominio:</span>
      <select v-model="level">
        <option disabled value="">Seleccione</option>
        <option value="0">0%</option>
        <option value="25">25%</option>
        <option value="50">50%</option>
        <option value="75">75%</option>
        <option value="100">100%</option> 
        <!-- acordarse que esto es string no se si afecte sino va a haber que poner v bind -->
      </select>

      <button v-on:click="isHidden = false">Buscar</button>
      
    </form>
  </div>
  <div id="langPerInfo" v-if="!isHidden">
    <div id="info">
      <div v-for="data in results">
       <span class="personInfo"> Nombre Completo: </span> {{data.titulo}} {{data.Nombre}} {{data.segundoNombre}} {{data.Apellido}} {{data.Sufijo}} <br>
       <span class="personInfo"> Tipo Nombre: </span> {{data.titulo}} {{data.Apellido}}  <span v-for="first in firstNameLetter">{{first}}</span> {{data.Sufijo}}<br>
       <span class="personInfo"> Nativo: </span> {{data.IdiomaNativo?si:no}} <br> <!--se podria poner en vez de 1 un si-->
       <span class="personInfo"> Porcentaje de dominio: </span> {{data.NivelDominio}}<br>
       <hr>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  el: '#myForm',
  data () {
    return {
      language: '',
      level: '',
      results:[],
      firstNameLetter: [],
      isHidden: true,
      si:'Si',
      no:'No',
    }
  },
  methods: { 
    submitForm() {
      axios.get('http://localhost:8080/langpercent/' + this.language + "/" + this.level)
      .then((response) => {
        this.results = response.data;
          if (this.results != null) {
          for(var i = 0; i < this.results.length; i++){
            //console.log(this.results[i].Nombre.charAt(0));
            this.firstNameLetter = this.results[i].Nombre.charAt(0);
            //console.log(this.results[i].IdiomaNativo);
          }
        }
      // console.log(this.results);
      })
        .catch(function (error) {
        console.log(error);
      })
        .finally(() => {
        // always executed
      });
      console.log('idioma ' + this.language + ' nivel ' + this.level)
    }
  }
}

</script>

<style scoped>

#myForm {
  position: static;
  text-align: center;
  margin-left: 10px;
  /* background-color: aqua; */
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  border-radius: 10px;
  width: 460px;
  height: 100px;
  margin-top: 50px;
}

select {
  margin-left: 1px;
  margin-right: 5px;
}

#langPerInfo {
  border-radius: 10px;
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  /* background-color: brown; */
  width: 460px;
  height: 100%;
  margin-left: 10px;
  margin-top: 15px;
}

#info {
  margin-top: 10px;
  
}

.personInfo {
  font-weight: bold;
  font-size: 15px;
  margin-left: 10px;
}

.search{
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