<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import shortenLink from './scripts/api/shorten-api';
import { saveLink, getLinks } from './scripts/data/links-data';

import NavBar from './components/NavBar.vue';
import Jumbotron from './components/Jumbotron.vue';
import InputForm from './components/InputForm.vue';
import LinkItem from './components/LinkItem.vue';
import Footer from './components/Footer.vue';

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
    const { ok, disallowed_reason, error } = shortLink;

    if (!ok) throw new Error(disallowed_reason || error);

    const { original_link, full_short_link2 } = shortLink.result;
    saveLink({
      link: original_link,
      shortLink: full_short_link2,
    });

    links.value.unshift({
      link: original_link,
      shortLink: full_short_link2,
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
  <div @scroll="onScrollHandler">
    <!-- <header class="sticky top-0 z-10"> -->
    <header class="sticky top-0 z-10 bg-white" :class="headerClassOnScroll">
      <NavBar />
    </header>

    <main class="bg-neutral-gray bg-opacity-20">
      <div
        class="jumbotron-container overflow-x-hidden pb-36 px-8 bg-white md:pt-12 xl:px-0"
      >
        <Jumbotron linkDestination="#shortenLinkForm" />
      </div>

      <div
        class="shorten-link-container px-8 text-neutral-very-dark-violet lg:px-0"
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

        <div class="statistic-container container mx-auto mt-4 text-center">
          <section>
            <h2 class="text-3xl font-bold tracking-tighter mb-3 md:text-4xl">
              Advanced Statistic
            </h2>
            <p
              class="mx-auto text-neutral-grayish-violet leading-relaxed sm:w-11/12 md:w-7/12 lg:w-1/3"
            >
              Track how your links are performing across the web with our
              advanced statistics dashboard.
            </p>
          </section>

          <div
            class="card-container relative flex flex-col gap-x-8 gap-y-16 text-left mt-20 md:flex-row"
          >
            <hr
              class="w-3 h-[45rem] mx-auto bg-primary-cyan absolute top-[35rem] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 sm:top-[28rem] md:top-40 md:w-full md:h-3"
            />

            <div
              class="card flex flex-col items-center w-full p-8 pt-0 bg-white rounded-md md:w-1/3 md:items-start"
            >
              <div
                class="bg-primary-dark-violet p-6 rounded-full w-fit relative -top-10"
              >
                <img
                  src="./assets/icon-brand-recognition.svg"
                  alt="Icon Brand Recognition"
                />
              </div>

              <h3 class="text-xl font-bold text-neutral-very-dark-violet mb-4">
                Brand Recognition
              </h3>

              <p
                class="text-neutral-gray leading-relaxed text-center md:text-left"
              >
                Boost your brand recognition with each click. Generic links
                don’t mean a thing. Branded links help instil confidence in your
                content.
              </p>
            </div>

            <div
              class="card flex flex-col items-center w-full p-8 pt-0 bg-white rounded-md relative top-10 md:w-1/3 md:items-start"
            >
              <div
                class="bg-primary-dark-violet p-6 rounded-full w-fit relative -top-10"
              >
                <img
                  src="./assets/icon-detailed-records.svg"
                  alt="Icon Brand Recognition"
                />
              </div>

              <h3 class="text-xl font-bold text-neutral-very-dark-violet mb-4">
                Detailed Records
              </h3>

              <p
                class="text-neutral-gray leading-relaxed text-center md:text-left"
              >
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </p>
            </div>

            <div
              class="card flex flex-col items-center w-full p-8 pt-0 bg-white rounded-md relative top-20 md:w-1/3 md:items-start"
            >
              <div
                class="bg-primary-dark-violet p-6 rounded-full w-fit relative -top-10"
              >
                <img
                  src="./assets/icon-fully-customizable.svg"
                  alt="Icon Brand Recognition"
                />
              </div>

              <h3 class="text-xl font-bold text-neutral-very-dark-violet mb-4">
                Fully Customizable
              </h3>

              <p
                class="text-neutral-gray leading-relaxed text-center md:text-left"
              >
                Improve brand awareness and content discoverability through
                customizable links, supercharging audience engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        class="mt-48 py-16 text-center bg-boost-mobile bg-cover bg-center bg-primary-dark-violet sm:bg-boost-desktop"
      >
        <h1 class="text-3xl font-bold mb-10 text-white md:text-4xl">
          Boost your links today
        </h1>

        <a
          href="#shortenLinkForm"
          class="bg-primary-cyan px-9 py-4 my-8 rounded-full text-white hover:brightness-110 duration-200 text-themeSize font-bold"
        >
          Get Started
        </a>
      </section>
    </main>

    <Footer />
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
