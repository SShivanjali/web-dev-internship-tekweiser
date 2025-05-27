<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <input class="w-full p-3 border border-gray-300 rounded mb-4" placeholder="Username" />
      <input class="w-full p-3 border border-gray-300 rounded mb-4" placeholder="Email" />
      <input class="w-full p-3 border border-gray-300 rounded mb-4" placeholder="Password" type="password" />
      <button class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupPage'
};
</script>