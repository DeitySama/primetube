<script setup>
    import { defineProps, toRefs } from 'vue';
    const props = defineProps({
        pill:Object
    });
    const {pill} = toRefs(props);
</script>
<template>
    <button class="text-xs md:text-sm py-2 px-3 rounded-3xl border hover:bg-black hover:text-white dark:hover:bg-zinc-500 dark:hover:text-white  focus:bg-black focus:text-white dark:text-zinc-400 dark:border-zinc-700">{{ pill.name }}</button>
</template>