<template>
    <div class="w-full p-5 flex flex-row justify-between border-b">
        <router-link to="/" class="font-bold"><i class="uil uil-youtube"></i> Primetube</router-link>
        <div class="w-1/2 relative">
            <input type="url" name="" id="" class="block w-full border rounded-xl text-sm py-1 px-3" placeholder="Search" v-model="query" @keyup="processChange()">
            <div class="absolute w-full rounded-xl bg-white shadow-md" v-if="results">
                <div v-for="(item,index) in results" :key="index" class="border-b p-5 cursor-pointer hover:bg-gray-50" @click="watchVideo(item.id)">
                    <p>{{ item.title }}</p>
                    <p class="text-xs text">{{ item.description }}</p>
                </div>
            </div>
        </div>
        <div class="">
            <router-link to="/" class="text-sm">Request Tutorial</router-link>
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