<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition name='fade'>
      <button v-if='!create' @click='create = true' class='btn'>Criar Conta</button>
      <userForm v-else >
        <button class="btn btn-form" @click.prevent='createUser'>Criar usuário</button>
      </userForm>
    </transition>
  </section>
</template>

<script>
import UserForm from './UserForm.vue'

export default {
  components: { UserForm },
  data () {
    return {
      create: false
    }
  },
  methods: {
    async createUser () {
      try {
        await this.$store.dispatch('createUser', this.$store.state.user)
        await this.$store.dispatch('getUser', this.$store.state.user.email)
        this.$router.push('/')
      } catch (erro) {
        console.log(erro)
      }
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.btn-form {
  max-width: 100%;
}
</style>
