<template>
  <div class="bg-main">
    <div class="h-screen overflow-y-hidden flex flex-col">
      <div
        style="max-width: 650px"
        class="w-1/2 flex-1 mx-auto flex justify-center items-center px-5"
      >
        <form action="" @submit.prevent="submit" class="w-full text-white">
          <h1 class="text-3xl text-center mb-3">Sign in</h1>
          <label for="username" class="text-xl block mb-2">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="username"
            class="
              border-2
              text-xl
              border-black
              bg-transparent
              rounded
              w-full
              mb-3
              py-2
              px-5
            "
          />
          <label for="password" class="text-xl block mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="
              border-2
              text-xl
              border-black
              bg-transparent
              rounded
              w-full
              mb-10
              py-2
              px-5
            "
          />
          <button
            type="submit"
            class="
              bg-blue-dark
              text-xl
              shadow
              w-full
              py-2.5
              bg-opacity-30
              transition-opacity
               hover:bg-opacity-100
              mb-5
            "
            :class="{'bg-opacity-100' : isValid}"
          >
            Login
          </button>
          <div class="flex justify-center">
            <a
              href=""
              class="link text-3xl transition-colors hover:text-gray-400"
              >Create new account</a
            >
          </div>
        </form>
      </div>
      <footer class="absolute bottom-0 bg-main-400 block w-full py-5">
        <ul class="flex space-x-4 w-3/5 mx-auto text-xl text-white">
          <li>
            <a href="" class="link hover:text-gray-400 transition-colors"
              >About Us</a
            >
          </li>
          <li>
            <a href="" class="link hover:text-gray-400 transition-colors"
              >Contact Us</a
            >
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ''
      , password: ''
    }
  },
  computed: {
    isValid() {
      return this.username.trim() != '' && this.password.trim() != ''
    }
  },
  methods: {
    submit() {
      console.log('Submit with params')
      console.log('username', this.username)
      console.log('password', this.password)
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