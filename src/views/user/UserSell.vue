<template>
  <section>
    <h2>Vendas</h2>
    <div v-if='sales'>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key='index'>
      <ProductItem v-if='sale.product' :product='sale.product'>
        <p class="seller"><span>Comprador:</span>{{ sale.buyer_id }}</p>
      </ProductItem>
      <div class='deliver'>
        <h3>Entrega:</h3>
        <ul v-if="sale.fullAddress">
          <li v-for='(value, key) in sale.fullAddress' :key='key'>
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
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
      sales: null
    }
  },
  components: { ProductItem },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getSales () {
      api.get(`/transaction?seller_id=${this.user.id}`)
        .then(r => {
          this.sales = r.data
        })
    }
  },
  watch: {
    login () {
      this.getSales()
    }
  },
  created () {
    if (this.login) {
      this.getSales()
    }
  }
}
</script>

<style scoped>
.products-wrapper{
  margin-bottom: 40px;
}
.seller span {
  color: #e80
}
.deliver {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 60px;
}
h2{
  margin-bottom: 20px;
}
h3 {
  margin: 0;
  justify-self: end;
}
</style>
