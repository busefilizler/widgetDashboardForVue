<script setup lang="ts">
import { defineProps, toRefs, ref } from "vue";

const props = defineProps(
  {
    gridTemp: String,
  }
);
const { gridTemp } = toRefs(props);
const quotes = [
  "Believe in yourself and all that you are.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Your only limit is your mind."
];
// Randomly select a quote
const randomQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);
</script>

<template>
<div :class="gridTemp" class=" h-[200px] bg-white flex items-center flex-col justify-center w-full">
  <p class="text-violet-900 text-2xl font-medium">{{ randomQuote }}..</p>
  <p class="pr-4 text-xs text-end w-full italic text-violet-900 pt-6">- Buse Filizler</p>
</div>
</template>
