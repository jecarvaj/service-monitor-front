<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth"
const auth = useAuthStore()

const props = defineProps(['day', 'agents', 'dataEdit'])

const classBlock = (agent) => {
  if (agent) {
    return "bg-success bg-gradient bg-opacity-25 text-center"
  } else {
    return "bg-danger bg-gradient bg-opacity-50 text-center"
  }
}

function handleSwitch(checked, agent_id, block_id) {
  props.dataEdit.push({
    block_id: block_id,
    agent_id: agent_id,
    action: checked ? 'add' : 'remove'
  })
}

function isAvailable(agent_id, block) {
  return block['available_agents']?.filter((a) => a.id == agent_id).length
}

function canEdit(agent) {
  return auth.isAdmin || agent.id == auth.user?.id
}

function activeAll(e, agent_id) {
  const block_ids = props.day['schedule_blocks'].map(el => el['id'])

  block_ids.forEach((block_id) => {
    handleSwitch(e.target.checked, agent_id, block_id)
    document.getElementById(`${agent_id}-${block_id}`).checked = e.target.checked
  })
}
</script>

<template>
  <table class="table table-bordered table-sm">
    <thead>
      <tr>
        <th class="bg-warning bg-opacity-50 text-center" scope="col">{{ day['label'] }}</th>
        <td v-for="agent in agents" class="text-center" :style="{ background: agent['color'] }">
          <div class="form-check form-check-reverse">
            <input :disabled="!canEdit(agent)" @click="activeAll($event, agent['id'])" class="form-check-input"
              type="checkbox" value="" :id="`check-all-${agent['id']}-${day['week_day']}`">
            <label class="form-check-label" :for="`check-all-${agent['id']}-${day['week_day']}`">
              {{ agent['first_name'] }}
            </label>
          </div>
        </td>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-if="!day['schedule_blocks'].length">
        <td :colspan="agents.length + 1" class="text-center">Sin turnos programados</td>
      </tr>
      <tr v-else v-for="block in day['schedule_blocks']">
        <th :class="classBlock(block['assigned_agent'])" style="width: 35%">{{ block['label'] }}</th>
        <td v-for="agent in agents" class="align-middle text-center" :style="{ background: agent['color'] }">

          <div class="form-check form-switch form-check-inline m-0" style="scale: 1.15">
            <input :disabled="!canEdit(agent)" :checked="isAvailable(agent['id'], block)"
              @change="handleSwitch($event.target.checked, agent['id'], block['id'])" class="form-check-input"
              type="checkbox" role="switch" :id="`${agent['id']}-${block['id']}`">
          </div>

        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.form-check-reverse .form-check-input {
  margin-right: -1.4em;
  margin-top: 0.4em;
}
</style>