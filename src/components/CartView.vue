<template>
  <div id="page">
<h2>Checkout</h2>
<h3>Subtotals:</h3>
<div class="subtotals">
<div class="subtotal" v-for="topping in toppings" :key="topping.id">
<span>+${{topping.price.toFixed(2)}}: {{topping.name}}</span>
</div>
</div>
<h2>Total:</h2>
   <p>Your {{toppingNames}} pizza costs ${{price.toFixed(2)}} </p>
   <input v-model="address" placeholder="Delivery address">
   <button @click="createPizza()">Place Order </button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
	name: "CartView",
	data: function() {
        return {
            address: ""
        }
	},
	computed: {
	price(){
          return this.$root.$data.selectedToppings.reduce((prev, current) => {
		return prev+current.price;
            },10)
          },
	toppingNames(){
          return this.$root.$data.selectedToppings.reduce((prev,current) => {
              return prev+current.name + ", ";
         },"")+" Cheese";
	},
	toppings() {
		return this.$root.$data.selectedToppings;
	}
	},
	methods:{
         async createPizza(){
           try {
             let r1 = await axios.post('/api/pizzaOrders', {
             name: this.name,
             toppings: this.toppings,
             price: this.price,
             address: this.address,
             });
             this.addItem = r1.data;
             console.log(r1);
             }catch (error) {
               console.log(error);
               }
        },
	}
}
</script>	

<style scoped>
#page {
height: 100vh;
}
.toppings .topping{
display:flex;
justify-content:center;
}

.topping img {
position: absolute;

}
.subtotals {
display:flex;
flex-direction:column;
align-items:center;
}
</style>
