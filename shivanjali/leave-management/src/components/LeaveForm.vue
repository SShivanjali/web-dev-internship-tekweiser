<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Apply for Leave</h2>
    <input type="date" v-model="fromDate" class="w-full mb-3 p-2 border rounded" />
    <input type="date" v-model="toDate" class="w-full mb-3 p-2 border rounded" />
    <textarea v-model="reason" placeholder="Reason" class="w-full mb-3 p-2 border rounded"></textarea>
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fromDate: '',
      toDate: '',
      reason: ''
    };
  },
  methods: {
    submitForm() {
      const user = JSON.parse(localStorage.getItem('user'));
      const newLeave = {
        id: Date.now(),
        fromDate: this.fromDate,
        toDate: this.toDate,
        reason: this.reason,
        status: 'Pending',
        employeeName: user?.username || 'Unknown'
      };

      // Emit to parent
      this.$emit('new-leave', newLeave);

      // Reset form
      this.fromDate = '';
      this.toDate = '';
      this.reason = '';
    }
  }
};
</script>
