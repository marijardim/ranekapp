<template>
  <section class='products-container'>
    <div v-if='products && products.length' class='products'>
      <div v-for='(product, index) in products' :key='index' class='product'>
        <router-link to='/'>
          <img v-if='product.pics' :src='product.pics[0].src' :alt='product.pics[0].title'>
          <p class='price'>{{ product.price }}</p>
          <h2 class='title'>{{ product.name }}</h2>
          <p class='description'>{{ product.description }}</p>
        </router-link>
      </div>
      <ProductsPage :productsTotal='productsTotal' :productsPerPage='productsPerPage'/>
    </div>
    <div v-else-if='products && products.length === 0'>
      <p class="no-results">Busca sem resultados. Tente buscar outro termo.</p>
    </div>
    <div v-else>
      <LoadingPage />
    </div>
  </section>
</template>

<script>
import ProductsPage from './ProductsPage.vue'
import { api } from '@/services/index.js'
import { serialize } from '@/helpers/index.js'

export default {
  name: 'ProdutosLista',
  components: {
    ProductsPage
  },
  data () {
    return {
      products: null,
      productsPerPage: 3,
      productsTotal: 0
    }
  },
  computed: {
    url () {
      const query = serialize(this.$route.query)
      return `/product?_limit=${this.productsPerPage}${query}`
    }
  },
  watch: {
    url () {
      this.getProducts()
    }
  },
  methods: {
    getProducts () {
      api.get(this.url)
        .then(r => {
          this.productsTotal = Number(r.headers['x-total-count'])
          this.products = r.data
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}
.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all .2s;
}
.product:hover{
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.1);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.product img{
  border-radius: 4px;
  margin-bottom: 20px;
}
.title{
  margin-bottom: 10px;
}
.price {
  font-weight: bold;
  color: #e80;
}
.no-results{
  text-align: center;
}
</style>
