<template>
  <div class="bg-main">
    <div class="h-screen overflow-y-hidden flex flex-col">
      <div style="max-width: 650px" class="w-1/2 flex-1 mx-auto flex justify-center items-center px-5">
        <form action="" @submit.prevent="submit" class="w-full text-white">
          <h1 class="text-3xl text-center mb-3">Add Product</h1>
          <!-- Name -->
          <label for="proName" class="text-xl block mb-2">Product Name</label>
          <input type="text" name="proName" id="proName" v-model="proName"
            class="border-2 text-xl border-black bg-transparent rounded w-full mb-3 py-2 px-5" />
          <!-- Deacription -->
          <label for="desc" class="text-xl block mb-2">Description</label>
          <input type="text" name="desc" id="desc" v-model="desc"
            class="border-2 text-xl border-black bg-transparent rounded w-full mb-3 py-2 px-5" />
          <!-- Price -->
          <label for="price" class="text-xl block mb-2">Price per unit($)</label>
          <input type="number" name="price" id="price" v-model="price"
            class="border-2 text-xl border-black bg-transparent rounded w-full mb-3 py-2 px-5" />
          <!-- Size -->
          <label for="size" class="text-xl block mb-2">Size</label>
          <input type="text" name="size" id="size" v-model="size"
            class="border-2 text-xl border-black bg-transparent rounded w-full mb-3 py-2 px-5" />
          <!-- Qty -->
          <label for="qty" class="text-xl block mb-2">Number of product</label>
          <input type="number" name="qty" id="qty" v-model="qty"
            class="border-2 text-xl border-black bg-transparent rounded w-full mb-3 py-2 px-5" />
          <!-- Submit button -->
          <button type="submit"
            class=" bg-blue-dark text-xl shadow w-full py-2.5 bg-opacity-30 transition-opacity hover:bg-opacity-100 mb-5"
            :class="{'bg-opacity-100' : isValid}">Add</button>
        </form>
      </div>
      <footer class="absolute bottom-0 bg-main-400 block w-full py-5">
        <ul class="flex space-x-4 w-3/5 mx-auto text-xl text-white">
          <li>
            <a href="" class="link hover:text-gray-400 transition-colors">Log out</a>
          </li>
          <li>
            <NuxtLink to="/dashboard" class="link hover:text-gray-400 transition-colors">Dashboard</NuxtLink>
          </li>
        </ul>
      </footer>
    </div>
    <div id="defaultModal" tabindex="-1" aria-hidden="true" v-if="requesting"
      class=" bg-black bg-opacity-60 overflow-hidden fixed z-50 w-full inset-0 flex justify-center items-center">
      <div class=" text-white flex space-x-2">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span>Processing...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      proName: '',
      desc: '',
      size: '',
      price: 0,
      qty: 0,
      requesting: false

    }
  },
  computed: {
    isValid() {
      try {
        return this.proName.trim() != '' &&
        this.desc.trim() != '' &&
        this.size.trim() != '' &&
        parseFloat(this.price) > 0 &&
        parseInt(this.qty) > 0
      } catch (error) {
        console.error(error)
        return false
      }
    }
  },
  methods: {
    submit() {
      let params = {
        proName : this.proName.trim(),
        desc  : this.desc.trim(),
        size  : this.size.trim(),
        price : parseFloat(this.price),
        qty   : parseInt(this.qty)
      }
      console.log('params', params)
      this.requesting = true;
      setTimeout(() => {
        this.requesting = false;
        alert('success')

        // clear form
        this.proName = '';
        this.desc = '';
        this.size = '';
        this.price = 0;
        this.qty = 0;
      }, 2000);
    }
  }
};
</script>

<style>
.link {
  position: relative;
}
.link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;

  border-radius: 5px;
  opacity: 0;
  bottom: 4px;
  transition: bottom ease-in-out 0.2s, opacity ease-in 0.2s,
    background-color ease-in 0.2s;
}

.link:hover:before {
  bottom: 0;
  opacity: 1;
  @apply bg-gray-400;
}
</style>