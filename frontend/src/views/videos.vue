<template>
    <div class="py-10 px-5">
        <div>
            <h1 class="text-sm text-slate-600">Video Feed</h1>
        </div>
        <div class="py-5 mt-5 grid grid-cols-4 gap-10">
            <div v-for="(data,index) in content" :key="index" class="cursor-pointer tr hover:-translate-y-2 ease-in-out duration-300">
                <VideoCard :data="data" @click="watchVideo(data.id)"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {videos} from "../stores/videos";
import { onMounted,ref, watch } from 'vue';
import VideoCard from "../components/videos/videoCard.vue";
import { useRouter } from "vue-router";

    const videoStore = videos();
    const content = ref(videoStore.getContent);
    const router = useRouter();
    
    onMounted(()=>{
        videoStore.getVideos();
    })

    watch(()=>[...videoStore.getContent],(data)=>{
        content.value = data;
    })

    const watchVideo = (id)=>{
        router.push(`/${id}`)
    }


</script>