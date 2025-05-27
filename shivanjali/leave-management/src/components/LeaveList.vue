<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Leave Requests</h2>
    <LeaveItem
      v-for="leave in leaves"
      :key="leave.id"
      :leave="leave"
      @update-status="$emit('update-status', $event)"
    />
  </div>
</template>

<script>
import LeaveItem from './LeaveItem.vue';

export default {
  props: ['leaves'],
  components: { LeaveItem }
};
</script>