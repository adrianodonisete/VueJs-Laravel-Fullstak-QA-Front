<template>
    <h1>Login page</h1>

    <button
        class="btn btn-primary"
        @click.prevent="handleClick">
        Login
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleClick = () => {
    router.push({ name: 'tasks' });
};
</script>
