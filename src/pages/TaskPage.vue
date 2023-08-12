<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask" />

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
  import {
    allTasks,
    completeTask,
    createTask,
    updateTask,
    deleteTask,
  } from '../http/task-api';
  import Tasks from '../components/tasks/Tasks.vue';
  import NewTask from '../components/tasks/NewTask.vue';

  const store = useTaskStore();
  const { completedTasks, uncompletedTasks } = storeToRefs(store);
  const { fetchAllTasks } = store;

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

  const handleAddedTask = async (newTask) => {
    const { data: addedTask } = await createTask(newTask);
    tasks.value.unshift(addedTask.data);
  };

  const handleUpdatedTask = async (task) => {
    const { data: changedTask } = await updateTask(task.id, {
      name: task.name,
    });
    const currentTask = tasks.value.find((item) => item.id == task.id);
    currentTask.name = changedTask.data.name;
  };

  const handleCompletedTask = async (task) => {
    const { data: changedTask } = await completeTask(task.id, {
      is_completed: task.is_completed,
    });
    const currentTask = tasks.value.find((item) => item.id == task.id);
    currentTask.is_completed = changedTask.data.is_completed;
  };

  const handleRemovedTask = async (task) => {
    await deleteTask(task.id);
    const index = tasks.value.findIndex((item) => item.id === task.id);
    tasks.value.splice(index, 1);
  };
</script>
