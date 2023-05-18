import {defineStore} from "pinia";
import {base_url} from "../config/config";
import axios from 'axios';

export const categories = defineStore('category',{
        state:()=>{
            return({
                categories:[],
                isLoading:false
            })
        },

        getters:{
            getStateCategories:(state)=>{
                return state.categories;
            }
        },

        actions:{
            async getCategories(){
               await axios.get(base_url+'/primetube/categories').then((res)=>{
                    this.categories = res.data.categories
                }).catch(err=>{

                })
            },

            async getCategory(id){
                try{
                  return  await axios.get(base_url+'/primetube/catergories/'+id);
                  }
                  catch(err){
                    console.error(err);
                  }
            }
        }
})


