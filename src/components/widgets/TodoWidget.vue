<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

// Define a ref for the list of todos
const todos = ref<string[]>([]);

// Pagination variables
const currentPage = ref(1);
const todosPerPage = 3;

// Load todos from localStorage on component mount
onMounted(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
});

// Watch for changes in todos and save them to localStorage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  { deep: true }
);

// Function to add a new todo
const newTodo = ref("");
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push(newTodo.value.trim());
    newTodo.value = "";
  }
};

// Function to delete a todo by index
const deleteTodo = (index: number) => {
  todos.value.splice(index, 1);
};

// Computed property to get paginated todos
const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * todosPerPage;
  const end = start + todosPerPage;
  return todos.value.slice(start, end);
});

// Total pages based on todos length
const totalPages = computed(() => {
  return Math.ceil(todos.value.length / todosPerPage);
});

// Function to change the page
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="p-4 flex flex-col justify-between bg-white h-[320px]">
    <div>
      <h1 class="text-xl mb-4 text-violet-900">Todo List</h1>
      <!-- Add todo input -->
      <div class="mb-4 flex items-center gap-1">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Add a new todo"
          class="w-full border-violet-900 border rounded-lg h-10 pl-4 ring-0 focus:ring-0 focus:border-violet-900"
        />
        <button
          @click="addTodo"
          class="text-violet-900 border-violet-900 border rounded-lg w-32 h-10 hover:bg-violet-900 hover:text-white"
        >
          Add Todo
        </button>
      </div>

      <!-- Todo items list -->
      <div>
        <p v-if="todos.length === 0" class="text-center text-violet-200">
          No todos found
        </p>
      </div>
      <ul>
        <li
          v-for="(todo, index) in paginatedTodos"
          :key="index"
          class="flex justify-between items-center border-b p-2"
        >
          <span>{{ todo }}</span>
          <i
            @click="deleteTodo(index + (currentPage - 1) * todosPerPage)"
            class="fa fa-trash text-violet-900"
          ></i>
        </li>
      </ul>
    </div>

    <!-- Pagination controls -->
    <div v-if="totalPages > 1" class="flex justify-center items-center mt-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="mx-2 text-violet-900 border-violet-900 border rounded-lg w-8 h-8 hover:bg-violet-900 hover:text-white"
      >
        &lt;
      </button>
      <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="mx-2 text-violet-900 border-violet-900 border rounded-lg w-8 h-8 hover:bg-violet-900 hover:text-white"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling */
</style>
