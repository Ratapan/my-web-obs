<script setup lang="ts">
import { routesNav } from "../config/router.ts";
</script>

<template>
  <header>
    <ul>
      <li v-for="(noute, i) in routesNav" :key="`route-${i}`">
        {{ noute }}
      </li>
    </ul>
  </header>
  <main>
    <slot />
  </main>
</template>
