<template>
  <div class="Cart">
	<CartView/>
  </div>
</template>

<script>
// @ is an alias to /src
import CartView from '@/components/CartView.vue'

export default {
  name: 'Cart',
  components: {
    CartView
  },
}
</script>
