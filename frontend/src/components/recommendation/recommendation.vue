<script setup>
    import { defineProps, toRefs } from 'vue';

    const props = defineProps({
        video:Object
    });

    const {video} = toRefs(props);

</script>
<template>
   <div class="mt-5">
    <div>
        <img :src="'http://localhost:5600'+video.thumbnail" class="h-32 w-full object-cover" alt="">
    </div>
    <div class="mt-3">
        <p class="font-bold">{{video.description }}</p>
        <p class="text-sm text-slate-600">{{ video.title }}</p>
    </div>
   </div>
</template>