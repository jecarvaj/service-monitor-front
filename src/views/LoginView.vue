<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
let email = ref("")
let password = ref("")

function login() {
  if (email.value.trim() == "" || password.value == "") {
    return false
  }
  const data = { email: email.value, password: password.value }
  useAuthStore().login(data)
}

</script>

<template>
  <div class="text-center">
    <main class="form-signin w-100 m-auto">
      <form>
        <img class="mb-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/1200px-No-logo.svg.png" alt=""
          width="272">

        <div class="form-floating">
          <input required v-model="email" type="email" class="form-control" id="floatingInput"
            placeholder="name@example.com">
          <label for="floatingInput">Correo</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Contrasena</label>
        </div>
        <button @click.prevent="login" class="w-100 mt-3 btn btn-lg btn-dark" type="submit">Entrar</button>
        <p class="mt-5 mb-3 text-muted">© Made by Jean</p>
      </form>
    </main>
  </div>

</template>
  
<style >
.form-signin {
  max-width: 330px;
  padding: 15px;
}

input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
  