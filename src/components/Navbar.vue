<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <router-link
                :to="{ name: 'home' }"
                class="navbar-brand">
                <span>Toedoe</span>
                <strong>List</strong>
            </router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div
                class="collapse navbar-collapse"
                id="navbarNav">
                <ul
                    class="navbar-nav"
                    v-if="store.isLoggedIn">
                    <li class="nav-item">
                        <router-link
                            :to="{ name: 'tasks' }"
                            class="nav-link">
                            Tasks
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{ name: 'summary' }"
                            class="nav-link">
                            Summary
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!store.isLoggedIn">
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'login' }"
                                class="btn btn-outline-secondary ms-2">
                                Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'register' }"
                                class="btn btn-danger ms-2">
                                Register
                            </router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                :class="toggleClass"
                                @click="toggleDropdownUser"
                                href="javascript:;"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ store.user.name }}
                            </a>
                            <ul
                                class="dropdown-menu"
                                :class="toggleClass">
                                <li>
                                    <a
                                        href="javascript:;"
                                        class="dropdown-item"
                                        :class="toggleBtLogout"
                                        @click.prevent="logoutHandler">
                                        Logout
                                    </a>

                                    <div
                                        class="d-flex justify-content-center"
                                        :class="toggleWait">
                                        <div
                                            class="spinner-border text-secondary"
                                            :class="toggleWait"
                                            role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const store = useAuthStore();

const isOpen = ref(false);
const isWaiting = ref(false);

const logoutHandler = async () => {
    isWaiting.value = true;

    await store.handleLogout();
    isOpen.value = false;
    isWaiting.value = false;

    router.push({ name: 'login' });
};

const toggleDropdownUser = () => (isOpen.value = !isOpen.value);
const toggleClass = computed(() => (isOpen.value ? 'show' : ''));

const toggleWait = computed(() => (isWaiting.value ? '' : 'item-hide'));
const toggleBtLogout = computed(() => (isWaiting.value ? 'item-hide' : ''));
</script>

<style scoped>
.nav-link-router-link-active {
    color: rgba(0, 0, 0, 0.9);
}
</style>
