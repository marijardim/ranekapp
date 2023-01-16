<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition>
      <button v-if='!create' @click='create = true' class='btn'>Criar Conta</button>
      <userForm v-else />
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

<style>

</style>
