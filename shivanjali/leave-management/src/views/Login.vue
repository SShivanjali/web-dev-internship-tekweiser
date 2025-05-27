<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-blue-700">Employee Leave Management</h1>
        <p class="text-sm text-gray-500 mt-1">Login to continue</p>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Role</label>
          <select
            v-model="role"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option disabled value="">Select your role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p class="text-center text-xs text-gray-400 mt-4">
        © 2025 Leave Management System. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      role: ''
    };
  },
  methods: {
    login() {
  if (!this.username || !this.role) {
    alert('Please fill in all fields.');
    return;
  }

  // Save user info to localStorage
  localStorage.setItem('user', JSON.stringify({
    username: this.username,
    role: this.role
  }));

  // Redirect based on role
  if (this.role === 'admin') {
    this.$router.push('/admin');
  } else {
    this.$router.push('/employee');
  }
}

  }
};
</script>
