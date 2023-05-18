<template>
    <div class="md:py-10 px-5 md:px-10">
        <div class="flex flex-wrap mt-2 gap-2 md:gap-0 md:space-y-0 space-x-2" v-if="categoriesData.length>=1">
            <button @click="resetCategories()" class="text-sm py-2 px-3 rounded-3xl border hover:bg-gray-50 dark:text-zinc-400 dark:border-zinc-600" title="Reset"><i class="uil uil-history-alt"></i></button>
            <Pill v-for="(data,index) in categoriesData" :key="index" :pill="data" @click="fetchCategory(data.id)"/>
        </div>
        <div class="py-5 mt-3 grid sm:grid-cols-2 md:grid-cols-4 gap-10" v-if="content.length>=1">
            <div v-for="(data,index) in content" :key="index" class="cursor-pointer tr hover:-translate-y-2 ease-in-out duration-300">
                <VideoCard :data="data" @click="watchVideo(data.id)"/>
            </div>
        </div>

        <div class="text-center p-10 mt-10 dark:text-zinc-400" v-else>
            <p class="text-3xl"><i class="uil uil-link-broken"></i></p>
            <p class="text-sm">No Videos Available</p>
        </div>
        
        <div class="flex justify-center">
            <button class="border px-3 py-1 rounded-2xl text-sm hover:bg-gray-50 dark:text-zinc-400 dark:border-zinc-600" @click="fetchMore(1)" title="Load More"><i class="uil uil-arrow-down"></i></button>
        </div>
    </div>
</template>
<script setup>
import {videos} from "../stores/videos";
import { categories } from "../stores/categories";
import { onMounted,ref, watch } from 'vue';
import VideoCard from "../components/videos/videoCard.vue";
import Pill from "../components/pills/pill.vue";
import { useRouter } from "vue-router";

    const videoStore = videos();
    const content = ref(videoStore.getContent);
    const router = useRouter();
    const categoriesStore = categories();
    const categoriesData = ref([...categoriesStore.getStateCategories]); 
    const pageNumber = ref(0);
    
    onMounted(()=>{
        categoriesStore.getCategories();
        videoStore.getVideos();
    })

    watch(()=>[...videoStore.getContent],(data)=>{
        content.value = data;
    }) 

    watch(()=>[...categoriesStore.getStateCategories],(data)=>{
        categoriesData.value = data;
    })

    const watchVideo = (id)=>{
        router.push(`/${id}`)
    }

    const fetchMore = ()=>{
        pageNumber.value = pageNumber.value+1;
        videoStore.getNext(pageNumber.value)
    }

    const fetchCategory = async (id)=>{
      content.value = await videoStore.getByCategory(id);
    }

    const resetCategories = () =>{
        content.value = videoStore.getContent;
    }


</script>