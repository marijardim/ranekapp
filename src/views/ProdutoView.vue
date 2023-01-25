<template>
  <section>
    <div v-if='product' class="product">
      <ul class="fotos" v-if='produto.fotos'>
        <li v-for="pic, index in produto.fotos" :key='index'>
        <img :src="pic.src" alt="pic.title"></li>
      </ul>
      <div class="info">
        <h1>{{ produto.name }}</h1>
        <p class="preco">{{ preco }}</p>
        <p class="descricao">{{ produto.descricao}}</p>
        <transition name='fade' v-if="produto.sold === 'false'">
          <button class="btn" v-if='!finish' @click='finish = true'>Comprar</button>
          <FinishShopping v-else :product='product' />
        </transition>
        <button class="btn" v-else disabled>Produto vendido</button>
      </div>
    </div>
    <LoadingPage v-else/>
  </section>
</template>

<script>
import { api } from '@/services/index'
import FinishShopping from '@/components/FinishShopping.vue'

export default {
  name: 'ProductView',
  props: ['id'],
  components: { FinishShopping },
  data () {
    return {
      product: null,
      preco: [],
      finish: false
    }
  },
  methods: {
    getProduct () {
      api.get(`/produto/${this.id}`)
        .then(r => {
          this.product = r.data
          this.preco = r.data.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}
.descricao {
  font-size: 1.2rem;
}
.btn {
  margin-top: 60px;
  width: 200px
}
</style>
