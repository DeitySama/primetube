<script setup>
    import { defineProps, toRefs } from 'vue';
    import { base_url } from '../../config/config.js';

    const props = defineProps({
        video:Object
    });

    const {video} = toRefs(props);

</script>
<template>
   <div class="mt-5">
    <div>
        <img :src="base_url+video.thumbnail" class="h-24 w-full object-cover rounded-xl" alt="">
    </div>
    <div class="mt-3">
        <p class="font-bold text-xs md:text-sm truncate dark:text-zinc-400">{{video.description }}</p>
        <p class="text-xs text-slate-600 dark:text-zinc-600">{{ video.title }}</p>
    </div>
   </div>
</template>