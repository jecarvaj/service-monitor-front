<script setup>
import { useAuthStore } from "@/stores/auth"
import { RouterLink } from "vue-router";
const auth = useAuthStore()

function hideMenu() {
  document.getElementById("btn-close-offcanvas").click()
}
</script>

<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Service Monitor App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header float-center">
          <small class="px-3 text-muted">{{ auth.isAdmin ? 'Admin' : 'Agente' }}</small>
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">{{ auth.user?.first_name }}</h5> <br>
          <button id="btn-close-offcanvas" type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <RouterLink to="/" @click="hideMenu" class="nav-link" aria-current="page">Turnos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/services" @click="hideMenu" class="nav-link" href="#">Crear servicio</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/agents" @click="hideMenu" class="nav-link" href="#">Agentes</RouterLink>
            </li>
            <hr>
            <li class="nav-item">
              <a class="nav-link" @click="auth.logout(); hideMenu()" href="#">Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
