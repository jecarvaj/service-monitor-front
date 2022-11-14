<script setup>
import IconWarning from '../icons/IconWarning.vue';
const props = defineProps(['day'])

const classBlock = (agent) => {
  if (agent) {
    return "bg-success bg-gradient bg-opacity-25 text-center"
  } else {
    return "bg-danger bg-gradient bg-opacity-50 text-center"
  }
}
</script>

<template>
  <table class="table table-bordered table-sm">
    <thead>
      <tr>
        <th class="bg-warning bg-opacity-50 text-center" scope="col" colspan="2">{{ day['label'] }}</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-if="!day['schedule_blocks'].length">
        <td colspan="2" class="text-center">Sin turnos programados</td>
      </tr>
      <tr v-else v-for="block in day['schedule_blocks']">
        <th :class="classBlock(block['assigned_agent'])" style="width: 35%">{{ block['label'] }}</th>
        <td class="text-center" :style="{ background: block['assigned_agent']?.['color'] }"
          :agent-id="block['assigned_agent']?.['id'] || 'X'">{{ block['assigned_agent']?.['name'] }}
          <IconWarning v-if="!block['assigned_agent']" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
