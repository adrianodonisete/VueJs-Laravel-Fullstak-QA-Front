<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask />

          <!-- List of tasks uncompleted -->
          <Tasks
            :tasks="uncompletedTasks"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          />

          <!-- show toogle botton -->
          <div
            class="text-center my-3"
            v-show="showToggleCompletedBtn"
            @click="($event) => (showCompletedTasks = !showCompletedTasks)"
          >
            <button class="btn btn-sm btn-secondary">
              <span v-if="!showCompletedTasks">Show completed</span>
              <span v-else>Hide completed</span>
            </button>
          </div>

          <!-- List of tasks completed -->
          <Tasks
            :tasks="completedTasks"
            :show="completedTasksIsVisible && showCompletedTasks"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTaskStore } from '../stores/task';
  import Tasks from '../components/tasks/Tasks.vue';
  import NewTask from '../components/tasks/NewTask.vue';

  const store = useTaskStore();
  const { completedTasks, uncompletedTasks } = storeToRefs(store);
  const { fetchAllTasks, handleAddedTask } = store;

  const tasks = ref([]);

  onMounted(async () => {
    await fetchAllTasks();
  });

  const showToggleCompletedBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
  );

  const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
  );

  const showCompletedTasks = ref(false);
</script>
