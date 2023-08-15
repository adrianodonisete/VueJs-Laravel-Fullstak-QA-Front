import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { allTasks, completeTask, createTask, updateTask, deleteTask } from '../http/task-api';

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed));
    const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed));

    const fetchAllTasks = async () => {
        const { data } = await allTasks();
        tasks.value = data.data;
    };

    const handleAddedTask = async newTask => {
        const { data: addedTask } = await createTask(newTask);
        tasks.value.unshift(addedTask.data);
    };

    const handleUpdatedTask = async task => {
        const { data: changedTask } = await updateTask(task.id, {
            name: task.name,
        });
        const currentTask = tasks.value.find(item => item.id == task.id);
        currentTask.name = changedTask.data.name;
    };

    const handleCompletedTask = async task => {
        const { data: changedTask } = await completeTask(task.id, {
            is_completed: task.is_completed,
        });
        const currentTask = tasks.value.find(item => item.id == task.id);
        currentTask.is_completed = changedTask.data.is_completed;
    };

    const handleRemovedTask = async task => {
        await deleteTask(task.id);
        const index = tasks.value.findIndex(item => item.id === task.id);
        tasks.value.splice(index, 1);
    };

    return {
        tasks,
        completedTasks,
        uncompletedTasks,
        fetchAllTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handleRemovedTask,
    };
});
