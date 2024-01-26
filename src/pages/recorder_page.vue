<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { ScreenRecorder } from "./recorder/utils.ts";

const video: Ref<HTMLVideoElement | null> = ref(null);
const micro = ref(false);
const allCodec = [
  "video/webm;codecs=h264",
  "video/webm;codecs=daala",
  "video/webm;codecs=vp8",
  "video/webm",
  "video/mpeg",
];
const codec: Ref<string[]> = ref([]);
const config: Ref<string> = ref("");

const frame: Ref<24 | 30 | 50 | 60> = ref(30);

function startVideo() {
  if (video.value) {
    const screenRecorder = new ScreenRecorder({
      recordAudio: micro.value,
      frameRate: 30,
      targetVideoElement: video.value,
      codec: config.value as
        | "video/webm"
        | "video/webm;codecs=vp8"
        | "video/webm;codecs=daala"
        | "video/webm;codecs=h264"
        | "video/mpeg",
    });
    screenRecorder.startRecording();
  }
}
onMounted(() => {
  allCodec.forEach((el) => {
    if (MediaRecorder.isTypeSupported(el)) {
      if (config.value == "") config.value = el;
      codec.value.push(el);
    }
  });
});
</script>
<template>
  <article>
    <div class="rounded-lg border border-foreground aspect-video w-full">
      <video
        ref="video"
        class="bg-accent aspect-video w-full rounded-lg"
        autoplay
        playsinline
        muted
      ></video>
    </div>

    <h4 class="py-4">Config:</h4>
    <div
      class="p-4 rounded-lg flex flex-col justify-center items-center border border-foreground"
    >
      <div class="py-2 w-60 border-foreground border-b-2">
        <label for="micro" class="flex select-none items-center">
          <input
            type="checkbox"
            class="hidden"
            v-model="micro"
            name="micro"
            id="micro"
          />
          <img
            v-if="micro"
            src="/microphone.svg"
            height="24"
            width="24"
            alt=""
          />
          <img
            v-else
            src="/microphone-slash.svg"
            height="24"
            width="24"
            alt=""
          />
          <p class="pl-4 py-1">Audio</p></label
        >
      </div>
      <div class="py-2 w-60 border-foreground border-b-2">
        <label for="frame" class="flex select-none items-center">
          <img src="/frame.svg" height="24" width="24" alt="" />
          <select
            class="ml-4 py-1 pr-2 bg-background w-full focus:outline-none"
            name="frame"
            v-model.number="frame"
            id="frame"
          >
            <option class="focus:bg-primary hover:text-primary" value="24">24 frames</option>
            <option class="focus:bg-primary hover:text-primary" value="30">30 frames</option>
            <option class="focus:bg-primary hover:text-primary" value="50">50 frames</option>
            <option class="focus:bg-primary hover:text-primary" value="60">60 frames</option>
          </select>
        </label>
      </div>

      <div class="py-2 w-60 border-foreground border-b-2">
        <label for="config" class="flex select-none items-center">
          <img src="/config.svg" height="24" width="24" alt="" />
          <select
            class="ml-4 py-1 pr-2 bg-background w-full focus:outline-none"
            name="config"
            v-model="config"
            id="config"
          >
            <option class="focus:bg-primary hover:text-primary" v-for="cod in codec" :key="`codec-${cod}`" :value="cod">
              {{ cod }}
            </option>
          </select>
        </label>
      </div>

      <br />
      <button
        class="bg-primary mt-2 text-primary-foreground rounded-sm select-none py-2 px-4"
        @click="startVideo"
      >
        Start
      </button>
    </div>
  </article>
</template>
