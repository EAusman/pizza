<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/design">Design Pizza</router-link> |
      <router-link to="/cart">Cart</router-link>
    </div>
    <img alt = "Tastee Pizza" src = '../public/images/logo.png'/>
    <router-view class = "router"/>
    <div id="footer">
      <a href = 'https://github.com/Gameslinger/pizzalab'>Github</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background:#DAF5FF;
  font-size:30pt;
  color:#587291;
  height: 100vh;
}
.router {
background:#DAF5FF;
}
#footer {
  background:#DAF5FF;
  padding:30pt;
}
#footer a {
  color: #59788a;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
