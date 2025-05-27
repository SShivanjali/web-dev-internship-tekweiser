<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-white border-r shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-6">Employee Menu</h2>
        <button 
          @click="activeTab = 'form'" 
          :class="['w-full text-left mb-2 p-2 rounded hover:bg-gray-200', { 'bg-blue-100 border-l-4 border-blue-500': activeTab === 'form' }]"
        >
          Leave Form
        </button>
        <button 
          @click="activeTab = 'history'" 
          :class="['w-full text-left mb-2 p-2 rounded hover:bg-gray-200', { 'bg-blue-100 border-l-4 border-blue-500': activeTab === 'history' }]"
        >
          Leave History
        </button>
        <button 
          @click="activeTab = 'status'" 
          :class="['w-full text-left mb-2 p-2 rounded hover:bg-gray-200', { 'bg-blue-100 border-l-4 border-blue-500': activeTab === 'status' }]"
        >
          Status
        </button>
      </div>

      <button 
        @click="logout" 
        class="mt-6 w-full text-left p-2 rounded bg-red-100 hover:bg-red-200 text-red-700"
      >
        Logout
      </button>
    </aside>

    <main class="flex-1 p-6 bg-gray-50">
      <h1 class="text-2xl font-bold mb-4">Welcome, {{ user?.username || 'Employee' }}!</h1>
      <div v-if="activeTab === 'form'">
        <LeaveForm @new-leave="addLeave" />
      </div>
      <div v-if="activeTab === 'history'">
        <LeaveList :leaves="leaves" />
      </div>
      <div v-if="activeTab === 'status'">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-xl font-semibold mb-4">Leave Status Overview</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-yellow-100 p-4 rounded">
              <h3 class="font-semibold text-yellow-800">Pending</h3>
              <p class="text-2xl font-bold text-yellow-600">{{ getPendingCount }}</p>
            </div>
            <div class="bg-green-100 p-4 rounded">
              <h3 class="font-semibold text-green-800">Approved</h3>
              <p class="text-2xl font-bold text-green-600">{{ getApprovedCount }}</p>
            </div>
            <div class="bg-red-100 p-4 rounded">
              <h3 class="font-semibold text-red-800">Rejected</h3>
              <p class="text-2xl font-bold text-red-600">{{ getRejectedCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LeaveForm from '../components/LeaveForm.vue';
import LeaveList from '../components/LeaveList.vue';

export default {
  name: 'EmployeeDashboard',
  components: {
    LeaveForm,
    LeaveList
  },
  data() {
    return {
      activeTab: 'form',
      leaves: [],
      user: null
    };
  },
  computed: {
    getPendingCount() {
      return this.leaves.filter(leave => leave.status === 'Pending').length;
    },
    getApprovedCount() {
      return this.leaves.filter(leave => leave.status === 'Approved').length;
    },
    getRejectedCount() {
      return this.leaves.filter(leave => leave.status === 'Rejected').length;
    }
  },
  methods: {
    addLeave(newLeave) {
      this.leaves.push(newLeave);
      this.saveLeaves();
      this.activeTab = 'history';
    },
    saveLeaves() {
      // Get all leaves from localStorage
      const allLeaves = JSON.parse(localStorage.getItem('leaves')) || [];

      // Remove this user's old leaves from allLeaves
      const filteredLeaves = allLeaves.filter(leave => leave.employeeName !== this.user.username);

      // Add current user's updated leaves
      const updatedLeaves = [...filteredLeaves, ...this.leaves];

      // Save back to localStorage
      localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  },
  mounted() {
    // Get logged-in user
    this.user = JSON.parse(localStorage.getItem('user'));

    // Load all leaves from localStorage
    const allLeaves = JSON.parse(localStorage.getItem('leaves')) || [];

    // Filter leaves for the current user only
    this.leaves = allLeaves.filter(leave => leave.employeeName === this.user.username);
  }
};
</script>
