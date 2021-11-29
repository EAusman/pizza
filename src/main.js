import Vue from 'vue'
import App from './App.vue'
import router from './router'
import toppingsMock from './toppings.js'

Vue.config.productionTip = false

let data = {
	toppings: toppingsMock,
	selectedToppings: [],
}
new Vue({
  router,
    data,
  render: h => h(App)
}).$mount('#app')
