<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-white border-r shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-6">Admin Menu</h2>
        <button 
          @click="activeTab = 'pending'" 
          :class="['w-full text-left mb-2 p-2 rounded hover:bg-gray-200', { 'bg-blue-100 border-l-4 border-blue-500': activeTab === 'pending' }]">
          Pending Requests
        </button>
        <button 
          @click="activeTab = 'all'" 
          :class="['w-full text-left mb-2 p-2 rounded hover:bg-gray-200', { 'bg-blue-100 border-l-4 border-blue-500': activeTab === 'all' }]">
          All Requests
        </button>
      </div>

      <button 
        @click="logout" 
        class="mt-6 w-full text-left p-2 rounded bg-red-100 hover:bg-red-200 text-red-700"
      >
        Logout
      </button>
    </aside>

    <main class="flex-1 p-6 bg-gray-50 overflow-x-auto">
  <h1 class="text-2xl font-bold mb-4">Welcome, Admin!</h1>

  <div v-if="activeTab === 'pending'">
    <h2 class="text-xl font-semibold mb-4">Pending Leave Requests</h2>
    <div v-if="pendingLeaves.length === 0" class="text-gray-500">No pending leave requests.</div>
    <table v-else class="min-w-full bg-white shadow rounded overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left">Employee</th>
          <th class="py-2 px-4 text-left">From</th>
          <th class="py-2 px-4 text-left">To</th>
          <th class="py-2 px-4 text-left">Reason</th>
          <th class="py-2 px-4 text-left">Status</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in pendingLeaves" :key="leave.id" class="border-t">
          <td class="py-2 px-4">{{ leave.employeeName }}</td>
          <td class="py-2 px-4">{{ leave.fromDate }}</td>
          <td class="py-2 px-4">{{ leave.toDate }}</td>
          <td class="py-2 px-4">{{ leave.reason }}</td>
          <td class="py-2 px-4 text-yellow-600">{{ leave.status }}</td>
          <td class="py-2 px-4 space-x-2">
            <button @click="updateStatus(leave.id, 'Approved')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
            <button @click="updateStatus(leave.id, 'Rejected')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeTab === 'all'">
    <h2 class="text-xl font-semibold mb-4">All Leave Requests</h2>
    <div v-if="leaves.length === 0" class="text-gray-500">No leave requests found.</div>
    <table v-else class="min-w-full bg-white shadow rounded overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left">Employee</th>
          <th class="py-2 px-4 text-left">From</th>
          <th class="py-2 px-4 text-left">To</th>
          <th class="py-2 px-4 text-left">Reason</th>
          <th class="py-2 px-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in leaves" :key="leave.id" class="border-t">
          <td class="py-2 px-4">{{ leave.employeeName }}</td>
          <td class="py-2 px-4">{{ leave.fromDate }}</td>
          <td class="py-2 px-4">{{ leave.toDate }}</td>
          <td class="py-2 px-4">{{ leave.reason }}</td>
          <td class="py-2 px-4">
            <span :class="{
              'text-yellow-500': leave.status === 'Pending',
              'text-green-600': leave.status === 'Approved',
              'text-red-600': leave.status === 'Rejected'
            }">{{ leave.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</main>

  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeTab: 'pending',
      leaves: []
    };
  },
  computed: {
    pendingLeaves() {
      return this.leaves.filter(leave => leave.status === 'Pending');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    updateStatus(id, status) {
      const updatedLeaves = this.leaves.map(leave => {
        if (leave.id === id) {
          return { ...leave, status };
        }
        return leave;
      });
      this.leaves = updatedLeaves;
      localStorage.setItem('leaves', JSON.stringify(this.leaves));
    }
  },
  mounted() {
    const storedLeaves = JSON.parse(localStorage.getItem('leaves'));
    if (storedLeaves) {
      this.leaves = storedLeaves;
    }
  }
};
</script>
