<script setup>
import { onMounted, ref } from 'vue';
import { useServiceStore } from '@/stores/service'
import { createService } from '@/services/api.service'
import { storeToRefs } from 'pinia';
import router from "../router";
import Loading from '@/components/Loading.vue';

const { companies, loading } = storeToRefs(useServiceStore())

onMounted(() => {
  createRangeHours()
})

const company = ref(0)
const name = ref("")
const initDate = ref()
const endDate = ref()
const days = ref([])
const initHour = ref(0)
const endHour = ref(0)

const weekDays = [[0, 'Lunes'], [1, 'Martes'], [2, 'Miercoles'], [3, 'Jueves'], [4, 'Viernes'], [5, 'Sabado'], [6, 'Domingo']]
const hours = ref([[0, '00:00']])

function createRangeHours() {
  for (let i = 1; i <= 23; i++) {
    let text = i > 9 ? `${i}:00` : `0${i}:00`
    hours.value.push([i, text])
  }
}

function handleCheck(e) {
  if (e.target.checked) {
    days.value.push(e.target.value)
  } else {
    days.value = [...days.value.filter(d => d !== e.target.value)]
  }
}

async function generateService() {
  loading.value = true
  const data = {
    service: {
      name: name.value,
      company_id: company.value,
      init_date: initDate.value,
      end_date: endDate.value
    },
    days: {
      0: days.value.find(d => d[0] == 0) ? [initHour.value, endHour.value] : [],
      1: days.value.find(d => d[0] == 1) ? [initHour.value, endHour.value] : [],
      2: days.value.find(d => d[0] == 2) ? [initHour.value, endHour.value] : [],
      3: days.value.find(d => d[0] == 3) ? [initHour.value, endHour.value] : [],
      4: days.value.find(d => d[0] == 4) ? [initHour.value, endHour.value] : [],
      5: days.value.find(d => d[0] == 5) ? [initHour.value, endHour.value] : [],
      6: days.value.find(d => d[0] == 6) ? [initHour.value, endHour.value] : []
    }
  }

  await createService(data)
    .then(res => {
      if (res.status == 201) {
        router.push('/')
      } else {
        alert('No se pudo crear')
      }
    }).catch(err => console.log(err))
    loading.value = false
}
</script>

<template>
  <div class="row">
    <div class="col-3">
      <div class="form-floating">
        <select v-model="company" class="form-select" id="selectCompany">
          <option selected disabled></option>
          <option v-for="company in companies" :value="company['id']">{{ company['name'] }}</option>
        </select>
        <label for="selectCompany">Selecciona empresa</label>
      </div>
    </div>

    <div class="col-3">
      <div class="form-floating mb-3">
        <input v-model="name" type="text" class="form-control" id="nameService">
        <label for="nameService">Nombre del servicio</label>
      </div>
    </div>

    <div class="col-3">
      <div class="form-floating mb-3">
        <input v-model="initDate" type="date" class="form-control" id="initDateCompany">
        <label for="initDateCompany">Fecha inicio</label>
      </div>
    </div>

    <div class="col-3">
      <div class="form-floating">
        <input v-model="endDate" type="date" class="form-control" id="endDateCompany">
        <label for="endDateCompany">Fecha termino</label>
      </div>
    </div>
  </div>

  <div class="row mt-5">

    <div class="col-3 px-4">
      <label class="mx-2 mb-2"><b> Dias a monitorear</b></label>
      <div v-for="day in weekDays" class="form-check" @change="handleCheck($event)">
        <input class="form-check-input" type="checkbox" :id="`checkDay${day[0]}`" :value="day[0]">
        <label class="form-check-label" :for="`checkDay${day[0]}`">{{ day[1] }}</label>
      </div>
    </div>

    <div class="col-2 mt-5">
      <select v-model="initHour" class="form-select" aria-label="Default select example">
        <option selected>Hora Inicio</option>
        <option v-for="hour in hours" :value="hour[0]">{{ hour[1] }}</option>
      </select>
    </div>

    <div class="col-2 mt-5">
      <select v-model="endHour" class="form-select" aria-label="Default select example">
        <option selected>Hora termino</option>
        <option v-for="hour in hours" :value="hour[0]">{{ hour[1] }}</option>
      </select>
    </div>

    <div class="col-3 mt-5">
      <button type="button" @click="generateService" class="btn btn-success">Generar</button>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
