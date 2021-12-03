<template>
<div>
<h1>Delivery Page</h1>
<p>You have the following deliveries to make</p>
<div v-for="order in pizzaOrders" :key="order.id">
<p >{{getAllToppings(order)}}: {{order.address}}</p>
<button @click="removePizza(order)">Delete</button>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Delivery',
      data(){
	return { pizzaOrders:[] }
      },
      created(){
         this.getOrders();
      },
      methods:{
	getOrders(){
		axios.get("/api/pizzaOrders").then((res) => {
			this.pizzaOrders = res.data.pizzaOrder;	
		});
	},
	getAllToppings(pizzaOrder){
            let toppingNames = "";
            for(let pizzaToppingId of pizzaOrder.toppings){ 
            for(let topping of this.$root.$data.toppings) {
		if(pizzaToppingId === topping.id)
		toppingNames += topping.name + ", " 
            }
	}	
	return toppingNames + "cheese pizza";
      },
	async removePizza(order){
		await axios.delete('api/pizzaOrders/'+order.id);
		
	}
    },
}	
</script>
