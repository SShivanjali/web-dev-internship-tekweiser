<template>
  <div class="p-4 border rounded bg-white shadow-sm">
    <p><strong>From:</strong> {{ leave.fromDate }}</p>
    <p><strong>To:</strong> {{ leave.toDate }}</p>
    <p><strong>Reason:</strong> {{ leave.reason }}</p>
    <p><strong>Status:</strong> {{ leave.status }}</p>
    <div v-if="isAdmin" class="mt-2 space-x-2">
      <button @click="$emit('update-status', { id: leave.id, status: 'Approved' })" class="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
      <button @click="$emit('update-status', { id: leave.id, status: 'Rejected' })" class="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['leave'],
  computed: {
    isAdmin() {
      return this.$route.path.includes('/admin');
    }
  }
};
</script>