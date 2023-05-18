<script setup>
    import {ref,toRefs,defineProps} from "vue";
    import {base_url} from "../../config/config"

    const props = defineProps({
        data:Object
    })

    const {data} = toRefs(props);
</script>
<template>
    <div class="space-y-5">
        <div>
            <img :src="base_url+data.thumbnail" alt="" class="w-full  h-36 md:h-60 object-cover rounded-xl">
        </div>
        <div class="flex justify-between md:block">
            <div>
                <div>
                    <p class="md:text-lg font-bold text-sm dark:text-white dark:font-normal">{{ data.description }}</p>
                </div>
                <div>
                    <h1 class="text-slate-600 text-xs md:text-base dark:text-zinc-600">{{ data.title }}</h1>
                </div>
            </div>
            <div class="w-[30%] text-right md:text-left md:w-auto md:mt-3">
                <p class="text-xs md:text-sm text-slate-400"><i class="uil uil-eye"></i> {{ data.views }} views</p>
            </div>
        </div>
    </div>
</template>