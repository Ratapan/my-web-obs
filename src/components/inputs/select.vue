<template>
  <div @click="toggleDropdown" class="relative ml-4 py-1 pr-2 bg-background w-full focus:outline-none cursor-pointer">
    <div>{{ selectedFrame }} frames</div>
    <div v-if="showDropdown" class="absolute top-full left-0 right-0 bg-white shadow-md mt-1">
      <div 
        v-for="frame in frames" 
        :key="frame"
        class="py-2 px-4 hover:bg-primary hover:text-white cursor-pointer"
        @click="selectFrame(frame)"
      >
        {{ frame }} frames
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// TODO: Crear un select decente para mi app :)

const {} = defineProps({
  //options
})

const frames = [24, 30, 50, 60];
const selectedFrame = ref(frames[0]);
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectFrame(frame) {
  selectedFrame.value = frame;
  showDropdown.value = false;
}
</script>