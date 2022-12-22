<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import shortenLink from './scripts/api/shorten-api';
import { saveLink, getLinks } from './scripts/data/links-data';

import NavBar from './components/NavBar.vue';
import InputForm from './components/InputForm.vue';
import LinkItem from './components/LinkItem.vue';

const links = ref(getLinks());
const loading = ref(false);

const isInputErr = ref(false);
const input = ref('');

const inputChangeHandler = (val) => {
  input.value = val;
};

const submitHandler = async () => {
  // Set loading
  loading.value = true;

  if (input.value.length === 0) {
    loading.value = false;

    isInputErr.value = true;
    console.log('input error');
    return;
  }

  isInputErr.value = false;

  try {
    const shortLink = await shortenLink(input.value);
    // const { ok, disallowed_reason, error } = shortLink;
    // console.log(shortLink)
    if (!shortLink.short_url) throw new Error(shortLink.message);

    // const { original_link, full_short_link2 } = shortLink.result;
    saveLink({
      shortLink: shortLink.short_url,
    });

    links.value.unshift({
      shortLink: shortLink.short_url,
    });

    input.value = '';
    console.log('Submitted');
  } catch (error) {
    alert(error);
    console.log(error);
  }

  // Set not loading
  loading.value = false;
};

// Styling
const headerClassOnScroll = ref('');

window.onscroll = () => {
  if (window.scrollY > 40) {
    headerClassOnScroll.value = 'shadow-lg';
    return;
  }

  headerClassOnScroll.value = '';
};
</script>

<template>
  <div>
    <!-- <header class="sticky top-0 z-10"> -->
    <header class="sticky top-0 z-10 bg-white" :class="headerClassOnScroll">
      <NavBar />
    </header>

    <main class="bg-neutral-gray bg-opacity-20 flex flex-col h-screen">
      <div
        class="shorten-link-container px-8 text-neutral-very-dark-violet lg:px-0 my-auto"
      >
        <div
          class="form-container container mx-auto relative -top-[5.5rem] flex flex-col gap-y-4"
        >
          <form
            id="shortenLinkForm"
            @submit.prevent="submitHandler"
            class="flex flex-col gap-x-6 gap-y-5 items-center bg-primary-dark-violet bg-shorten-desktop bg-cover bg-center rounded-lg p-6 scroll-mt-28 sm:p-14 sm:flex-row"
          >
            <InputForm
              name="Shorten Input"
              placeholder="Shorten a link here..."
              errMsg="Please add a link"
              :inputValue="input"
              @inputChange="inputChangeHandler"
              :inputClass="[
                isInputErr
                  ? 'border-secondary placeholder:text-secondary placeholder:opacity-50'
                  : 'border-transparent',
                'w-full px-4 py-4 rounded-lg border-[3px] border-solid  placeholder:text-themeSize focus:outline-none sm:px-8',
              ]"
              class="w-full"
              :isErr="isInputErr"
            />

            <button
              type="submit"
              class="w-full h-full bg-primary-cyan text-white font-bold text-themeSize px-10 py-4 rounded-lg whitespace-nowrap hover:brightness-110 sm:w-auto"
            >
              <div :class="[loading ? '' : 'hidden']">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <span :class="{ hidden: loading }">Shorten It!</span>
            </button>
          </form>

          <transition-group
            name="link-items-transition"
            enter-active-class="duration-300"
            enter-from-class="scale-x-0"
            enter-to-class="scale-x-100"
          >
            <LinkItem
              v-for="item in links"
              :key="item"
              :link="item.link"
              :shortLink="item.shortLink"
            />
          </transition-group>
        </div>
      </div>
    </main>

    <div class="attribution bg-primary-cyan text-white text-center py-1 px-8">
      Challenge by
      <a
        href="https://www.frontendmentor.io/profile/ValdiANS"
        target="_blank"
        class="underline"
      >
        Frontend Mentor</a
      >. Coded by
      <a href="https://github.com/ValdiANS" target="_blank" class="underline">
        Valdi</a
      >.
    </div>
  </div>
</template>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 23px;
  height: 23px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin-left: -4px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
