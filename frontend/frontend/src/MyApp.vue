<script setup>
import titulo from './misComponentes/titulo.vue'
import langPercent from './misComponentes/langPercent.vue'
import person from './misComponentes/person.vue'
import nativeList from './misComponentes/nativeList.vue'

</script>

<template>
  <header>
    <div class="wrapper">
      <titulo msg="Base de datos de idiomas!" />
    </div>
  </header>

  <main>
      <div id="lang"><langPercent/></div>
      <div id="person"><person /></div>
      <div id="nativeList"><nativeList /></div>
  </main>
</template>

<style>
#lang {
  position: static;
  /* background-color: aqua; */
  width: 480px;
  height: 100%;
  float: left;
}
#person {
  position: static;
  width: 480px;
  height: 100%;
  float: left;
}
#nativeList {
  position: static;
  /* background-color: aqua; */
  width: 480px;
  height: 100%;
  float: left;
}
</style>