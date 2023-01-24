<template>
  <section>
    <h2>Adicionar Produto</h2>
    <AddProduct />
    <h2>Seus produtos</h2>
    <transition-group name="fade" tag="ul">
      <li v-for='(product, index) in user_products' :key='index'>
        <ProductItem :product='product'>
          <p>{{ product.description }}</p>
          <button class="delete" @click='deleteProduct(product.id)'>Deletar</button>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
import { mapState, mapActions } from 'vuex'
import ProductItem from '@/components/ProductItem.vue'
import { api } from '@/services/index'

export default {
  name: 'UserProducts',
  components: { AddProduct, ProductItem },
  computed: {
    ...mapState(['login', 'user', 'user_products'])
  },
  methods: {
    ...mapActions(['getUserProducts']),
    deleteProduct (id) {
      const confirm = window.confirm('Deseja mesmo remover este produto?')
      if (confirm) {
        api.delete(`/product/${id}`).then(() => {
          this.getUserProducts()
        }).catch(error => {
          console.log(error.response)
        })
      } else {
        return null
      }
    }
  },
  watch: {
    login () {
      this.getUserProducts()
    }
  },
  created () {
    if (this.login) {
      this.getUserProducts()
    }
  }
}
</script>

<style scoped>
h2{
margin-bottom: 20px;
}
.delete {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('../../assets/remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
