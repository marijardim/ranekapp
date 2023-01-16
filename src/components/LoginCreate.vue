<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition>
      <button v-if='!create' @click='create = true' class='btn'>Criar Conta</button>
      <userForm v-else >
        <button class="btn btn-form">Criar usuário</button>
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
