import { defineStore } from 'pinia';
import axios from "axios";
import { base_url } from '../config/config';

export const videos = defineStore('videoStore',{
    state:()=>{
        return{
            videos:[],
            loading:true,
            limit:10
        }
    },

    getters:{
        getContent:(state)=>{return state.videos}
    },

    actions:{
         async getVideos(){
                return   axios.get(base_url+"/primetube/videos?"+`limit=${this.limit}`).then((res)=>{
                    this.videos = res.data
                })
            },

            async getVideo(id){
                const res = await axios.get(base_url+"/primetube/videos/"+id);
                return res;
            },

            async queryVideo(query){
                const res = await axios.get(base_url+"/primetube/videos?query="+query);
                return res.data;
            },

            async getByCategory(category){
                const res = await axios.get(base_url+"/primetube/videos?category="+category);
                return res.data;
            },

            async getNext(pagenumber){
                console.log(pagenumber,this.limit*(pagenumber))
                axios.get(base_url+"/primetube/videos?"+`limit=${this.limit}&offset=${(this.limit*(pagenumber))||0}`).then((res)=>{
                            res.data.forEach(item=>{
                                this.videos.push(item);
                            })
                        })
                },
                async getRecommended(id){
                    try{
                        return await axios.get(base_url+`/primetube/videos/recommended/`+id);
                    }
                    catch(err){
                        console.error(err)
                    }
                }
            },

})

