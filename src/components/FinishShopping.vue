<template>
  <section>
    <h2>Endereço de envio</h2>
    <UserForm>
      <button class="btn" @click.prevent='finishShopping'>Finalizar Compra</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from './UserForm.vue'
import { api } from '@/services/index.js'
import { mapState } from 'vuex'

export default {
  name: 'FinishShopping',
  components: {
    UserForm
  },
  props: ['product'],
  computed: {
    ...mapState(['user']),
    buying () {
      return {
        buyer_id: this.user.email,
        seller_id: this.product.user_id,
        product: this.product,
        fullAddress: {
          postal: this.user.postal,
          address: this.user.address,
          number: this.user.number,
          city: this.user.city,
          state: this.user.state
        }
      }
    }
  },
  methods: {
    async createTransaction () {
      try {
        const response = await api.post('/transaction', this.buying)
        this.$router.push({ name: 'buy' })
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async createUser () {
      try {
        await this.$store.dispatch('createUser', this.$store.state.user)
        await this.$store.dispatch('getUser', this.$store.state.user.email)
        await this.createTransaction()
      } catch (erro) {
        console.log(erro)
      }
    },
    finishShopping () {
      if (this.$store.state.login) {
        this.createTransaction()
      } else {
        this.createUser()
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .btn {
    background: #e80;
  }
</style>
