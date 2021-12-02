import Vue from 'vue'
import App from './App.vue'
import router from './router'
import getToppings from './toppings.js'

Vue.config.productionTip = false

let data = {
	toppings: [],
	selectedToppings: [],
}
getToppings(data)
new Vue({
  router,
    data,
  render: h => h(App)
}).$mount('#app')
