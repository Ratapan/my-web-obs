<script setup lang="ts">
import Nav from "./layout/nav.vue";
import Footer from "./layout/footer.vue";
</script>

<template>
  <div class="rtp_scroll h-dvh relative flex flex-col justify-between">
    <Nav/>
    <br>
    <main class="max-w-full w-3xl px-4  mx-auto">
      <slot />
    </main>
    <br>
    <Footer/>
  </div>
</template>
