    <script setup>
        import { onMounted,ref, watch } from 'vue';
        import {useRoute,useRouter} from 'vue-router';
        import { videos} from "../stores/videos";
        import Recommendation from "../components/recommendation/recommendation.vue";
        import {base_url} from "../config/config.js"

        const route = useRoute();
        const router = useRouter();
        const videoStore = videos();
        const currentVideo = ref();
        const recommendation = ref();
        
        onMounted(async()=>{
            currentVideo.value = await videoStore.getVideo(route.params.id); 
            recommendation.value = await videoStore.getRecommended(currentVideo.value.data.category);
        })

        watch(()=>currentVideo.value,(newValue)=>{
                currentVideo.value=newValue;
        })
        
        watch(()=>recommendation.value,(newValue)=>{
                console.log(recommendation.value.data)
                recommendation.value=newValue;

        })

        const watchVideo = async(id)=>{
            currentVideo.value = await videoStore.getVideo(id);
            router.push(`/${id}`)

        }

        

    </script>
    <template>
        <div class="md:h-screen md:pl-10 flex flex-col md:flex-row">
            <div class="py-10 md:py-0 w-full md:w-3/4 md:h-[70%] border  dark:border-b dark:border-zinc-800" v-if="currentVideo">
                <video class="w-full h-full" :src="base_url+currentVideo.data.url" controls></video>
                <div class="mt-6 md:space-y-3 flex justify-between px-2 md:px-3">
                    <div>
                        <h1 class="text-sm md:text-xl dark:text-white">{{ currentVideo.data.description }}</h1>
                        <p class="text-xs md:text-sm text-slate-500 dark:text-zinc-500">{{ currentVideo.data.title}}</p>
                    </div>
                    <div class="w-[30%] md:w-auto text-right dark:text-zinc-400">
                        <p class="text-xs">{{ currentVideo.data.views}} views</p>
                    </div>
                </div>
            </div>
            <div class="mt-10 px-3 md:mt-0 md:w-1/4 md:px-10 md:py-5">
                <p class="text-xs dark:text-zinc-400">Recommendations</p>
                <div v-if="recommendation" class="grid grid-cols-2 gap-5">
                    <div class="" v-for="(data,index) in recommendation.data" :key="index">
                        <Recommendation :video="data" class="cursor-pointer" @click="watchVideo(data.id)"/>
                    </div>
                </div>
                <div v-else>
                    <p class="text-sm">No recommendations available yet</p>
                </div>
            </div>
        </div>
    </template>
    