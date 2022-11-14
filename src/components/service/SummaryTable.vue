<script setup>
import { useServiceStore } from '@/stores/service'
import { storeToRefs } from 'pinia';
const { infoSummary, service, selectedWeek } = storeToRefs(useServiceStore())
</script>

<template>
  <table v-if="Object.keys(infoSummary).length" class="table table-bordered table-sm mb-1">
    <thead>
      <tr>
        <td class="bg-secondary bg-opacity-25" scope="col" colspan="2"><b>{{ service['name'] }}</b> Semana
          {{ selectedWeek }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="info in infoSummary">
        <td :style="{ background: info['color'] }">{{ info['name'] }}</td>
        <td class="text-center"><b>{{ info['count'] }}</b></td>
      </tr>
    </tbody>
  </table>
</template>
