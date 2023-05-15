import { defineStore } from 'pinia';
import axios from "axios";


const BASE_URL = 'http://10.0.0.209:5600';

export const videos = defineStore('videoStore',{
    state:()=>{
        return{
            videos:[],
            loading:true
        }
    },

    getters:{
        getContent:(state)=>{return state.videos}
    },

    actions:{
        async getVideos(){
         return   axios.get(BASE_URL+"/primetube/videos").then((res)=>{
                this.videos = res.data
            })
            },

            async getVideo(id){
                const res = await axios.get(BASE_URL+"/primetube/videos/"+id);
                return res;
            },

            async queryVideo(query){
                const res = await axios.get(BASE_URL+"/primetube/videos?query="+query);
                return res.data;
            }
        }
})

