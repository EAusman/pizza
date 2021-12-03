<template>
  <div class="Design">
	<DesignPizza v-if="this.$root.$data.toppings" :toppings="this.$root.$data.toppings"/>
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
}
},	
}
</script>
