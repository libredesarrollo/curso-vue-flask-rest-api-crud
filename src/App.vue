<template>
  <div class="container">
    <list-component />
  </div>
</template>

<script>
import ListComponent from "./components/products/ListComponent";

export default {
  name: "App",
  components: {
    ListComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.container {
  margin: auto;
  width: 100%;
  max-width: 1280px;
}
.center{
  margin:auto; 
  width: auto !important;
  display:table !important;
}
</style>
