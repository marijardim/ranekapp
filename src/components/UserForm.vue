<template>
  <form>
    <div class="user" v-if='showLoginData'>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name='nome' v-model='name'>
      <label for="email">Email:</label>
      <input type="email" id="email" name='email' v-model='email'>
      <label for="senha">Senha:</label>
      <input type="password" id="senha" name='senha' v-model='password'>
    </div>
    <label for="postal">Cep:</label>
    <input type="text" id="postal" name='postal' v-model='postal' @keyup='setCep'>
    <label for="address">Rua:</label>
    <input type="text" id="address" name='address' v-model='address'>
    <label for="numero">Numero:</label>
    <input type="text" id="numero" name='numero' v-model='numero'>
    <label for="city">Cidade:</label>
    <input type="text" id="city" name='city' v-model='city'>
    <label for="state">Estado:</label>
    <input type="text" id="state" name='state' v-model='state'>
    <div class="button">
      <slot></slot>
    </div>
</form>
</template>

<script>
import { mapFields } from '@/helpers/index.js'
import { getCep } from '@/services/index.js'

export default {
  name: 'UserForm',
  computed: {
    ...mapFields({
      fields: [
        'name',
        'email',
        'password',
        'postal',
        'address',
        'numero',
        'city',
        'state'
      ],
      base: 'user',
      mutation: 'UPDATE_USER'
    }),
    showLoginData () {
      return (!this.$store.state.login || this.$route.name === 'user-edit')
    }
  },
  methods: {
    setCep () {
      const postal = this.postal.replace(/\D/g, '')
      if (postal.length === 8) {
        getCep(postal).then(r => {
          this.address = r.data.logradouro
          this.city = r.data.localidade
          this.state = r.data.uf
        })
      }
    }
  }
}
</script>

<style scoped>
form, .user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.user {
  grid-column: 1 / 3;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
