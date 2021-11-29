<template class = "page">
  <div class="home">
    <h1>Welcome to Tastee Pizza!</h1>
    <p>Click the Design Pizza tab to create your own pizza</p>
    <div class = pizzaImg>
      <img alt = "Pizza" src="../assets/img/brickOven.jpg"/>
      <img alt = "Pizza" src="../assets/img/yum.jpg"/>
      <img alt = "Pizza" src="../assets/img/eww.jpg"/>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
};
</script>
<style>
.page{
background:#DAF5FF;
font-size:30pt;
color:#587291;
}

.pizzaImg{
display:flex;
flex-direction:row;
}

.pizzaImg img {
padding:5px;
max-width:33%;
}
</style>
