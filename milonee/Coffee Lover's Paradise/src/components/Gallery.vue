<template>
  <section>
    <h2 class="text-3xl font-bold mb-6 text-center text-coffee-dark">Coffee Gallery</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <img
        v-for="img in galleryImages"
        :key="img"
        :src="`/coffee-images/${img}`"
        alt="Coffee image"
        class="rounded-lg shadow-md object-cover w-full h-32"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup>
const galleryImages = [
  'espresso.jpg',
  'latte.jpg',
  'cappuccino.jpg',
  'mocha.jpg',
  'americano.jpg',
  'coffee-beans.jpg',
  'coffee-cup2.jpg',
  'coffee-machine.jpg',
  'coffee-art.jpg',
  'coffee-shop.jpg',
]
</script>
