    <script setup>
        import { onMounted,ref, watch } from 'vue';
        import {useRoute,useRouter} from 'vue-router';
        import { videos} from "../stores/videos";
        import Recommendation from "../components/recommendation/recommendation.vue";

        const route = useRoute();
        const router = useRouter();
        const videoStore = videos();
        const currentVideo = ref();
        const recommendation = ref();
        
        onMounted(async()=>{
           currentVideo.value = await videoStore.getVideo(route.params.id);
            if(videoStore.videos && videoStore.videos.length>1){
            }
            else{
                 await videoStore.getVideos();
            }
            
                recommendation.value=videoStore.getContent.filter(item=> {return item.id !== parseInt(route.params.id)});
                console.log(recommendation.value)

            })

            watch(()=>currentVideo.value,(newValue)=>{
                currentVideo.value=newValue;
            })
            const watchVideo = async(id)=>{
                currentVideo.value = await videoStore.getVideo(id);
            }


    </script>
    <template>
        <div class="h-screen pl-10 flex">
            <div class="w-3/4 h-[70%] border" v-if="currentVideo">
                <video class="w-full h-full" :src="'http://localhost:5600'+currentVideo.data.url" controls></video>
                <div class="mt-6 space-y-3 flex justify-between px-3">
                    <div>
                        <h1 class="text-xl">{{ currentVideo.data.description }}</h1>
                        <p class="text-sm text-slate-500">{{ currentVideo.data.title}}</p>
                    </div>
                    <p class="text-xs">{{ currentVideo.data.views}} views</p>
                </div>
            </div>
            <div class="w-1/4 px-10 py-5">
                <p class="text-xs">Recommendations</p>
                <div>
                    <div class="" v-for="(data,index) in recommendation" :key="index">
                        <Recommendation :video="data" class="cursor-pointer" @click="watchVideo(data.id)"/>
                    </div>
                </div>
            </div>
        </div>
    </template>
    