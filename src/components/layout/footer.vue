<script setup lang="ts">
const links = [
  { img: "github", link: "https://github.com/Ratapan" },
  { img: "linkedin", link: "https://www.linkedin.com/in/javier-sabando/" },
  { img: "youtube", link: "https://youtube.com/@rtpdev", className: "h-7" },
  { img: "ig", link: "https://www.instagram.com/ratapics" },
] as { img: string; link: string; className?: string }[];

//https://www.buymeacoffee.com/ratapan
</script>
<template>
  <footer
    class="flex flex-col mt-auto gap-3 justify-center items-center bg-primary text-background py-4"
  >
    <p class="sm:hidden">
      Hecho con ❤️ por
      <strong>
        <a href="https://www.buymeacoffee.com/ratapan" target="_blank"
          >Ratapan</a
        >
      </strong>
    </p>
    <section class="flex gap-3 items-center">
      <p class="hidden sm:inline-block">
        Hecho con ❤️ por
        <strong>
          <a href="https://www.buymeacoffee.com/ratapan" target="_blank"
            >Ratapan</a
          >
        </strong>
      </p>
      <a
        v-for="({ img, link, className }, i) in links"
        :key="`links-footer-${i}`"
        :href="link"
        target="_blank"
      >
        <img :src="`/${img}.svg`" :class="className ?? ''" :alt="img" />
      </a>
      <a
        href="https://www.buymeacoffee.com/ratapan"
        target="_blank"
        class="flex border border-backgound p-1 rounded-lg"
      >
        <span>
          <img src="/coffe.svg" alt="" />
        </span>
        Buy me a Coffe
      </a>
    </section>
  </footer>
</template>
