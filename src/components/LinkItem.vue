<template>
  <div
    class="relative w-full flex flex-col items-center gap-y-4 gap-x-6 bg-white pl-8 pr-6 py-4 rounded-md text-themeSize text-neutral-very-dark-blue md:flex-row"
  >
    <p
      class="w-full break-words after:border-b-gray-200 after:border-b after:border-solid after:absolute after:left-0 after:w-full after:h-2.5 after:block after:content md:after:hidden"
    >
      {{ link }}
    </p>

    <div
      class="w-full flex flex-col items-start justify-end gap-x-6 gap-y-4 md:flex-row md:items-center"
    >
      <a
        :href="shortLink"
        class="w-full block text-primary-cyan break-words hover:underline md:w-auto"
        target="_blank"
        rel="noreferrer noopener"
      >
        {{ shortLink }}
      </a>

      <button
        class="w-full text-white rounded-md whitespace-nowrap text-center font-medium py-2 duration-300 md:w-28"
        :class="buttonClassOnCopied"
        @click="copyHandler"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  link: {
    type: String,
    required: true,
  },

  shortLink: {
    type: String,
    required: true,
  },
});

const buttonText = ref('Copy');
const buttonClassOnCopied = ref('bg-primary-cyan');

const copyHandler = async () => {
  buttonText.value = 'Copied!';
  buttonClassOnCopied.value = 'bg-primary-dark-violet';

  await setTimeout(() => {
    buttonText.value = 'Copy';
    buttonClassOnCopied.value = 'bg-primary-cyan';
  }, 2000);

  navigator.clipboard.writeText(props.shortLink);

  console.log('copied');
};
</script>

<style scoped></style>
