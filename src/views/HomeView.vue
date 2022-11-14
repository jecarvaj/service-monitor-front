<script setup>
import { onMounted, ref, computed } from 'vue';
import TurnsTable from '@/components/service/TurnsTable.vue';
import EditTable from '@/components/service/EditTable.vue';
import SummaryTable from '@/components/service/SummaryTable.vue';
import Selector from '@/components/service/Selector.vue';
import Loading from '@/components/Loading.vue';
import { postUpdateAvailability } from '@/services/api.service';
import { useServiceStore } from '@/stores/service'
import { storeToRefs } from 'pinia';

const dataEdit = ref([])
const tableKey = ref(0)
const serviceStore = useServiceStore()
const { service, schedule_days, agents, selectedWeek, infoSummary, loading } = storeToRefs(serviceStore)

onMounted(() => {
  serviceStore.fetchServices()
})


const editChanges = computed(() => {
  return dataEdit.value.length > 0
})

async function sendEditData() {
  loading.value = true
  await postUpdateAvailability(dataEdit.value, service.value['id'], selectedWeek.value)
    .then(res => {
      loading.value = false
      service.value = res.data['service']
      schedule_days.value = res.data['schedule_days']
    }).then(generateInfoSummary)
    .then(() => {
      document.getElementById('home-tab').click()
    }).then(() => { dataEdit.value = [] })
}

function generateInfoSummary() {
  agents.value.forEach(el => {
    infoSummary.value[el['id']] = { name: el['first_name'] + ' ' + el['last_name'], count: countByAgent(el['id']), color: el['color'] }
  })
  infoSummary.value['X'] = { name: 'Sin asignar', count: countByAgent('X') }
}

function countByAgent(id) {
  return document.querySelectorAll(`[agent-id="${id}"]`).length
}

function forceRerenderTableEdit() {
  tableKey.value += 1
  dataEdit.value = []
}


</script>

<template>
  <Selector :serviceStore="serviceStore" />
  <div class="row mt-4">
    <Loading v-if="loading" />
    <ul v-show="Object.keys(service).length" class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button"
          role="tab" aria-controls="home-tab-pane" aria-selected="true">Turnos Confirmados</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button"
          role="tab" aria-controls="profile-tab-pane" aria-selected="false">Editar
          disponibilidad</button>
      </li>
      <li v-if="editChanges" class="nav-item">
        <button :disabled="loading" type="button" @click="sendEditData" class="mx-2 btn btn-success">Guardar</button>
        <button :disabled="loading" type="button" @click="forceRerenderTableEdit"
          class="mx-2 btn btn-danger">Deshacer</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
        <div class="row">
          <div class="col-4 p-2 ">
            <SummaryTable />
          </div>
          <div v-for="day in schedule_days" class="col-4">
            <div class="list-group">
              <TurnsTable :day="day"></TurnsTable>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
        <div class="row">
          <div v-for="day in schedule_days" class="col-6">
            <div class="list-group">
              <EditTable :key="tableKey" :agents="agents" :day="day" :dataEdit="dataEdit"></EditTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
