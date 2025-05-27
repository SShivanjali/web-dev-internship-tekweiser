<template>
  <div class="coffee-card" :style="{ backgroundColor: color }">
    <img :src="image" :alt="name" class="coffee-image" />
    <h2 class="coffee-name">{{ name }}</h2>
    <p class="coffee-taste"><strong>Taste:</strong> {{ taste }}</p>
    <div class="coffee-measurements">
      <strong>Ingredients:</strong>
      <ul>
        <li v-for="(item, index) in measurements" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoffeeCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    taste: {
      type: String,
      required: true,
    },
    measurements: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.coffee-card {
  width: 280px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  color: #2e1b0f;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 15px;
  text-align: center;
  transition: transform 0.3s ease;
}
.coffee-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.35);
}
.coffee-image {
  width: 280px;     /* fixed width */
  height: 180px;    /* fixed height */
  object-fit: cover; /* crop and scale nicely */
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.coffee-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
}
.coffee-taste {
  font-size: 1rem;
  margin-bottom: 15px;
}
.coffee-measurements {
  font-size: 0.95rem;
  text-align: left;
}
.coffee-measurements ul {
  margin-top: 5px;
  padding-left: 20px;
}
.coffee-measurements li {
  margin-bottom: 5px;
  line-height: 1.3;
}
</style>
