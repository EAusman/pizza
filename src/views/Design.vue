<template>
  <div class="Design">
	<DesignPizza :toppings="toppings"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DesignPizza from '@/components/DesignPizza.vue'

export default {
  name: 'Design',
  components: {
    DesignPizza
  },
  data(){
	return {
	toppings: this.$root.$data.toppings
}
},	
}
</script>
