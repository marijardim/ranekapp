<template>
  <section>
    <h2>Compras</h2>
    <div v-if='purchasing'>
      <div class="products-wrapper" v-for="(purchase, index) in purchasing" :key='index'>
      <ProductItem v-if='purchase.product' :product='purchase.product'>
        <p class="seller"><span>Vendedor</span>{{ purchase.seller_id }}</p>
      </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import { api } from '@/services/index.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      purchasing: null
    }
  },
  components: { ProductItem },
  methods: {
    getPurchases () {
      api.get(`/transaction?buyer_id=${this.user.id}`)
        .then(r => {
          this.purchasing = r.data
        })
    }
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  watch: {
    login () {
      this.getPurchases()
    }
  },
  created () {
    if (this.login) {
      this.getPurchases()
    }
  }
}
</script>

<style scoped>
.products-wrapper {
margin-bottom: 40px;
}
.buyer span {
  color: #e80;
}
h2 {
  margin-bottom: 20px;
}
</style>
