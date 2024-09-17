<script setup lang="ts">
import { defineProps, toRefs, ref } from "vue";

const props = defineProps({
  gridTemp: String,
});

const { gridTemp } = toRefs(props);

// Calculator state
const display = ref("0"); // To show the input and result

// Function to append numbers and operators to the display
function append(value: string) {
  if (display.value === "0") {
    display.value = "";
  }
  display.value += value;
}

// Function to clear the display
function clearDisplay() {
  display.value = "";
}

// Function to calculate the result
function calculate() {
  try {
    // Evaluate the expression
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
</script>

<template>
  <div
    :class="gridTemp"
    class="h-[400px] bg-white flex items-center flex-row w-full p-4"
  >
    <div class="flex flex-col items-center w-full">
      <div class="">
        <input
          type="text"
          v-model="display"
          readonly
          class="w-full h-full mb-2 text-center text-4xl text-violet-900 font-bold focus:ring-0 focus:outline-none"
        />
      </div>
      <div class="grid grid-cols-4 gap-2 w-2/3">
        <!-- Number buttons -->
        <button @click="append('7')" class="p-2 bg-gray-200 rounded">7</button>
        <button @click="append('8')" class="p-2 bg-gray-200 rounded">8</button>
        <button @click="append('9')" class="p-2 bg-gray-200 rounded">9</button>
        <button @click="append('/')" class="p-2 bg-violet-300 rounded">
          /
        </button>

        <button @click="append('4')" class="p-2 bg-gray-200 rounded">4</button>
        <button @click="append('5')" class="p-2 bg-gray-200 rounded">5</button>
        <button @click="append('6')" class="p-2 bg-gray-200 rounded">6</button>
        <button @click="append('*')" class="p-2 bg-violet-300 rounded">
          *
        </button>

        <button @click="append('1')" class="p-2 bg-gray-200 rounded">1</button>
        <button @click="append('2')" class="p-2 bg-gray-200 rounded">2</button>
        <button @click="append('3')" class="p-2 bg-gray-200 rounded">3</button>
        <button @click="append('-')" class="p-2 bg-violet-300 rounded">
          -
        </button>

        <button @click="append('0')" class="p-2 bg-gray-200 rounded">0</button>
        <button @click="append('.')" class="p-2 bg-gray-200 rounded">.</button>
        <button @click="calculate" class="p-2 bg-green-300 rounded">=</button>
        <button @click="append('+')" class="p-2 bg-violet-300 rounded">
          +
        </button>
      </div>
      <button
        @click="clearDisplay"
        class="mt-4 p-2 bg-violet-900 text-white rounded w-2/3"
      >
        Clear
      </button>
    </div>
  </div>
</template>
