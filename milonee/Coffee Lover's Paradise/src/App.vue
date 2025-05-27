<template>
  <div>
    <h1>Welcome to the Coffee Lover's Paradise ☕️</h1>
    <div class="coffee-gallery">
      <CoffeeCard
        v-for="coffee in coffees"
        :key="coffee.name"
        :name="coffee.name"
        :image="coffee.image"
        :taste="coffee.taste"
        :measurements="coffee.measurements"
        :color="coffee.palette[0]"
      />
    </div>
  </div>
</template>

<script>
import CoffeeCard from './components/CoffeeCard.vue'

export default {
  name: "App",
  components: {
    CoffeeCard
  },
  data() {
    return {
      coffees: [
        {
          name: "Espresso",
          image: "/coffee-images/coffee-main.jpg",
          taste: "Bold, strong, and rich with a slightly bitter finish.",
          measurements: [
            "18-20 grams finely ground coffee",
            "30ml water",
            "Brew time: 25-30 seconds"
          ],
          palette: ["#6f4e37", "#3e2723", "#d7ccc8"]
        },
        {
          name: "Latte",
          image: "/coffee-images/latte.jpg",
          taste: "Creamy, smooth, and slightly sweet with a mild coffee flavor.",
          measurements: [
            "30ml espresso",
            "240ml steamed milk",
            "Thin layer of milk foam"
          ],
          palette: ["#cdb69b", "#845422", "#f3e5d0"]
        },
        {
          name: "Cappuccino",
          image: "/coffee-images/cappuccino.jpg",
          taste: "Rich and foamy with a balance of espresso, steamed milk, and foam.",
          measurements: [
            "30ml espresso",
            "60ml steamed milk",
            "60ml milk foam"
          ],
          palette: ["#9e7860", "#5d4037", "#f0e5d8"]
        },
        {
          name: "Mocha",
          image: "/coffee-images/mocha.jpg",
          taste: "Sweet and chocolatey with a strong coffee base.",
          measurements: [
            "30ml espresso",
            "240ml steamed milk",
            "30ml chocolate syrup",
            "Whipped cream (optional)"
          ],
          palette: ["#4b2e2e", "#8b5c2c", "#d7b89a"]
        },
        {
          name: "Americano",
          image: "/coffee-images/americano.jpg",
          taste: "Smooth, slightly diluted espresso with a clean finish.",
          measurements: [
            "30ml espresso",
            "120ml hot water"
          ],
          palette: ["#6b4c3b", "#362c24", "#b8a38f"]
        },
        {
          name: "Coffee Beans",
          image: "/coffee-images/coffee-beans.jpg",
          taste: "Raw, aromatic with earthy undertones.",
          measurements: [
            "Whole roasted beans",
            "Used for grinding fresh coffee"
          ],
          palette: ["#4b3832", "#6f4e37", "#a1887f"]
        },
        {
          name: "Coffee Cup",
          image: "/coffee-images/coffee-cup2.jpg",
          taste: "Visual representation of perfect coffee serving.",
          measurements: [
            "Cup size varies",
            "Ideal temperature: 60-70°C"
          ],
          palette: ["#c1a57b", "#f3e6d5", "#6f4e37"]
        },
        {
          name: "Coffee Machine",
          image: "/coffee-images/coffee-machine.jpg",
          taste: "No taste but essential for brewing.",
          measurements: [
            "Espresso machine",
            "Temperature and pressure control"
          ],
          palette: ["#7f8c8d", "#34495e", "#bdc3c7"]
        },
        {
          name: "Coffee Art",
          image: "/coffee-images/coffee-art.jpg",
          taste: "Visually stunning, artistic foam designs.",
          measurements: [
            "Microfoam milk",
            "Barista skill"
          ],
          palette: ["#8d6e63", "#d7ccc8", "#5d4037"]
        },
        {
          name: "Coffee Shop",
          image: "/coffee-images/coffee-shop.jpg",
          taste: "Ambiance and aroma enhancing coffee experience.",
          measurements: [
            "Warm environment",
            "Freshly brewed coffee"
          ],
          palette: ["#7b5e57", "#d7ccc8", "#a1887f"]
        }
      ]
    };
  },
};
</script>

<style>
@import './assets/styles.css';

.coffee-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
