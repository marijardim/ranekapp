<template>
  <form class='add-product'>
    <label for="name">Nome</label>
    <input type="text" id="name" name='name' v-model='produto.name'>
    <label for="price">Preço (R$)</label>
    <input type="number" id="price" name='price' v-model='produto.price'>
    <label for="fotos">Fotos</label>
    <input type="file" id="fotos" name='fotos' ref='fotos'>
    <label for="description">Descrição</label>
    <textarea id="description" name='description' v-model='produto.description'></textarea>
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent='addProduct'>
  </form>
</template>

<script>
import { api } from '@/services/index.js'

export default {
  name: 'AddProduct',
  data () {
    return {
      produto: {
        name: '',
        price: '',
        description: '',
        pics: null,
        sold: 'false'
      }
    }
  },
  methods: {
    formatProduct () {
      this.produto.user_id = this.$store.state.user.id
    },
    addProduct () {
      this.formatProduct()
      this.produto.user_id = this.$store.state.user.id
      api.post('/product', this.produto)
        .then(() => {
          this.$store.dispatch('getUserProducts')
        })
    }
  }
}
</script>

<style scoped>
  .add-product{
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
  }
  .btn {
    grid-column: 2;
  }
</style>
