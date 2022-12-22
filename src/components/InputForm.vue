<template>
  <div>
    <input
      type="text"
      v-model="input"
      :name="name"
      :placeholder="placeholder"
      @change="changeHandler()"
      :class="[inputClass]"
    />
    <i
      class="text-secondary text-sm mt-2 sm:absolute"
      :class="[isErr ? 'block' : 'hidden']"
      >{{ errMsg }}</i
    >
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['inputChange']);
const props = defineProps({
  placeholder: String,
  errMsg: String,
  name: String,
  inputValue: String,
  inputChange: Event,
  inputClass: Array,
  isErr: Boolean,
});

const input = ref(props.inputValue);

const changeHandler = () => {
  emit('inputChange', input.value);
};
</script>

<style scoped></style>
