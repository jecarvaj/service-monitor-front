<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { getService } from '@/services/api.service'

const { serviceStore } = defineProps(['serviceStore'])
const weeks = ref([])
const selectedService = ref()

const { service, schedule_days, agents, services, infoSummary, selectedWeek, loading } = storeToRefs(serviceStore)

function setWeekOption(e) {
  weeks.value = [...services.value.find((el) => el['id'] == e.target.value)['weeks']]
  selectedWeek.value = null
}

function handleChangeWeek(e) {
  fetchService()
}

async function fetchService() {
  loading.value = true
  await getService(selectedService.value, selectedWeek.value)
    .then(res => {
      loading.value = false
      service.value = res.data['service']
      schedule_days.value = res.data['schedule_days']
    }).then(() => generateInfoSummary())
}

function generateInfoSummary() {
  agents.value.forEach(el => {
    infoSummary.value[el['id']] = { name: el['first_name'], count: countByAgent(el['id']), color: el['color'] }
  })
  infoSummary.value['X'] = { name: 'Sin asignar', count: countByAgent('X') }
}

function countByAgent(id) {
  return document.querySelectorAll(`[agent-id="${id}"]`).length
}

</script>

<template>
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <select @change="setWeekOption($event)" v-model="selectedService" class="form-select" id="select-service">
          <option selected disabled>Selecciona</option>
          <option v-for="service in services" :value="service['id']">{{ service['name'] }}</option>
        </select>
        <label for="select-service">Servicio</label>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <select @change="handleChangeWeek($event)" v-model="selectedWeek" class="form-select" id="select-week">
          <option selected disabled>Selecciona</option>
          <option v-for="week in weeks" :value="week['week']"> {{ week['label'] }} &nbsp; Semana {{ week['week'] }}
          </option>
        </select>
        <label for="select-week">Semana</label>
      </div>
    </div>
  </div>
</template>