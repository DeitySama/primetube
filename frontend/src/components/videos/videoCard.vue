<script setup>
    import {ref,toRefs,defineProps} from "vue";

    const props = defineProps({
        data:Object
    })

    const {data} = toRefs(props);
</script>
<template>
    <div class="space-y-5">
        <div>
            <img :src="'http://localhost:5600'+data.thumbnail" alt="" class="w-full h-60 object-cover rounded-xl">
        </div>
        <div class="">
            <div>
                <p class="text-lg font-bold">{{ data.description }}</p>
            </div>
            <div>
                <h1 class="text-slate-600">{{ data.title }}</h1>
            </div>
            <div class="mt-3">
                <p class="text-sm text-slate-400"><i class="uil uil-eye"></i> {{ data.views }} views</p>
            </div>
        </div>
    </div>
</template>