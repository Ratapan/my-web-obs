<script setup lang="ts">
import { routesNav } from "../../config/router";
</script>

<template>
    <nav
      class="sticky top-0 left-0 flex justify-center items-center bg-background shadow shadow-foreground"
    >
      <router-link
        :to="route.path"
        v-for="(route, i) in routesNav"
        :key="`route-${i}`"
        class="mx-2 my-1"
      >
        {{ route.name["es"] }}
      </router-link>
    </nav>
</template>
