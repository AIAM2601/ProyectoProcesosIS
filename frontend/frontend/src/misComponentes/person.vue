<template>
  <div id="myFormPerson">
    <form @submit.prevent="submitForm()">
      <h3>Buscar por cedula</h3>

        <span id="cedula"> Cedula:</span>
        <input v-model="cedula"/>
        
      <button v-on:click="isHidden = false">Buscar</button>

    </form>
  </div>
  <div id="personInfo" v-if="!isHidden">
    <div id="info">

        <div v-for="data in info">
          { <br><span class="textInfo"> "Nombre:"  </span> {{data.titulo}} {{data.Nombre}} {{data.SegundoNombre}} {{data.Apellido}} {{data.SegundoApellido}} {{data.sufijo}}  <br> 

          <span class="textInfo"> "Edad:" </span> {{age}}  años {{month}}  meses <br> 
          <span class="textInfo"> "Cedula:" </span>{{myCedula}} <br>  

          <span class="textInfo"> "Idiomas:" </span> <br> [ <br> { <br>

          <div v-for="insideData in data.Idiomas">

          <span class="tabs"></span> <span class="textInfo"> "Nombre:"</span>{{insideData.idiomaNombre}} <br>
          <span class="tabs"></span><span class="textInfo"> "Sigla:"  </span>{{insideData.Siglas}} <br>
          <span class="tabs"></span><span class="textInfo"> "Idioma Nativo:" </span>{{insideData.IdiomaNativo?si:no}} <br> 
          <span class="tabs"></span><span class="textInfo"> "Porcentaje de dominio:" </span>{{insideData.NivelDominio}}% <br>

          <span class="insideLang1">}</span> <br>
          <span class="insideLang">]</span><br> }

          </div>
          <hr>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  el: "myFormPerson",
  data() {
    return {
      cedula: '',
      results:[],
      Nombre: '',
      isHidden: true,
      myCedula: '',
      fechaNacido:'',
      age: '',
      month:'',
      id: [],
      info:'',
      si:'Si',
      no:'No',

    }
  },
  methods: {
     submitForm() {
         axios.get('http://localhost:8080/person/' + this.cedula)
        .then((response) => {
          this.results = response.data;
         //console.log(this.results);
         //console.log(response.data[0].Nombre);
          console.log(this.results);

          //para la cedula
          this.myCedula = this.cedula.replace(/(\d{1})(\d{4})(\d{3})/, "$1-$2-$3");
          //para cambio de fecha
          this.fechaNacido = response.data[0].FechaNacimiento;
          console.log(this.fechaNacido);
          var today = new Date();
          var birthdate = new Date(this.fechaNacido);
          this.age = today.getFullYear() - birthdate.getFullYear();
          this.month = today.getMonth() - birthdate.getMonth();
          if (this.month < 0 || (this.month === 0 && today.getDate() < birthDate.getDate())) {
            this.age--;
          }
          console.log( this.age + ' años ' + this.month + ' meses');

        // si es la misma persona agregar toda la info es un solo array
        this.info = Object.values(this.results.reduce((acc,{Id, cedula, titulo, Nombre, SegundoNombre, Apellido, SegundoApellido, sufijo,  IdiomaNativo, NivelDominio, idiomaNombre, Siglas}) => 
        (acc[Id]||={Id, cedula, titulo, Nombre, SegundoNombre,  Apellido, SegundoApellido, sufijo, Idiomas:[]}, acc[Id].Idiomas.push({IdiomaNativo, NivelDominio, idiomaNombre, Siglas}), acc), {}));

        console.log(this.info);

         })
        .catch(function (error) {
        console.log(error);
        })
        .finally(function () {
        });
        //console.log(this.cedula);

     }, 
    }
}

</script>

<style scoped>

#myFormPerson {
  text-align: center;
  margin-left: 10px;
  /* background-color: aqua; */
  border-radius: 10px;
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  width: 460px;
  height: 100px;
  margin-top: 50px;
  /* float: left; */
}

select {
  margin-left: 10px;
  margin-right: 10px;
}

#cedula {
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
}

#personInfo {
  border-radius: 10px;
  border-color: hsla(160, 100%, 37%, 1);
  border-style: solid;
  /* background-color: rgb(42, 34, 113); */
  width: 460px;
  margin-left: 10px;
  margin-top: 15px;
}

#info {
  margin-top: 10px;
  margin-left: 10px;
}

.textInfo {
  font-weight: bold;
  font-size: 15px;
}

.insideLang {
  margin-left: 5px;
}
.insideLang1 {
  margin-left: 10px;
}

.tabs {
  margin-left: 15px;
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