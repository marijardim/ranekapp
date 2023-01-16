<template>
  <section>
  <div v-if='product' class="product">
    <ul class="pics" v-if='product.pics'>
      <li v-for="pic, index in product.pics" :key='index'>
      <img :src="pic.src" alt="pic.title"></li>
    </ul>
    <div class="info">
      <h1>{{ product.name }}</h1>
      <p class="price">{{ price }}</p>
      <p class="description">{{ product.description}}</p>
      <button class="btn" v-if="product.sold === false">Comprar</button>
      <button class="btn" v-else disabled>Comprar</button>
    </div>
  </div>
  <LoadingPage v-else/>
  </section>
</template>

<script>
import { api } from '@/services/index'

export default {
  name: 'ProductView',
  props: ['id'],
  data () {
    return {
      product: null,
      price: []
    }
  },
  methods: {
    getProduct () {
      api.get(`/product/${this.id}`)
        .then(r => {
          this.product = r.data
          this.price = r.data.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}
.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}
.description {
  font-size: 1.2rem;
}
.btn {
  margin-top: 60px;
  width: 200px
}
</style>
