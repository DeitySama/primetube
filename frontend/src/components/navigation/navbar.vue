<template>
    <div class="w-full py-3 md:py-5 px-10 flex flex-col space-y-4  md:space-y-0 items-center md:flex-row md:justify-between border-b dark:border-none">
        <router-link to="/" class="font-bold dark:text-white"><i class="uil uil-youtube dark:text-gray-400"></i> Primetube</router-link>
        <div class="w-full md:w-1/2 relative">
            <input type="url" name="" id="" class="block w-full border rounded-xl text-sm py-1 px-3 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" placeholder="Search" v-model="query" @keyup="processChange()">
            <div class="absolute w-full rounded-xl bg-white shadow-md" v-if="results">
                <div v-for="(item,index) in results" :key="index" class="border-b p-5 cursor-pointer hover:bg-gray-50 z-20" @click="watchVideo(item.id)">
                    <p class="text-sm md:text-base">{{ item.title }}</p>
                    <p class="text-xs text">{{ item.description }}</p>
                </div>
            </div>
        </div>
        <div class="">

        </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import {videos} from "../../stores/videos";
    import {useRouter} from "vue-router";

    const query = ref('');
    const videoStore = videos();
    const results = ref();
    const router = useRouter();
    

    const search = async ()=>{
        if(query.value.length>1){
            results.value = await videoStore.queryVideo(query.value);
        }
        else{
            results.value=''
        }
    }

    const handleInput =(func,timeout=300)=>{
        let timer;
        return (...args)=>{
            clearTimeout(timer);
            timer=setTimeout(()=>{func.apply(this,args);},timeout);
        }
    }

    function saveInput(){
            search();
    }

    const processChange = handleInput(()=>saveInput());

    const watchVideo = (id)=>{
                router.push(`/${id}`);
                results.value=[];
    }

</script>   