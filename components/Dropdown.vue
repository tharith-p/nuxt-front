<template>
  <div @click="isShowDowndown = !isShowDowndown" tabindex="0" class="group-hover:block hidden relative hover:bg-gray-500 p-1 rounded ">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
    <Transition name="fade">
      <div v-if="isShowDowndown" class="absolute top-full right-0 bg-gray-700 rounded py-1">
        <NuxtLink class="py-1 px-5 text-sm text-white hover:bg-gray-600" :to="'/item/edit?id=' + id">Edit{{id}}</NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    props: ['id'],
    data() {
      return {
        isShowDowndown: false
      }
    }
  }
</script>

<style>
.nuxt-logo {
  height: 180px;
}
</style>
