<script setup>
import { RouterView } from 'vue-router';
import Navbar from "./components/navigation/navbar.vue";
import { onBeforeMount, ref } from 'vue';
const isDark = ref(false);

onBeforeMount(()=>{
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                    isDark.value = false
                } else {
                    document.documentElement.classList.remove('dark')
                    isDark.value = true
                }
  })

  const toggleTheme = () =>{
                var element = document.querySelector("html");
                element.classList.toggle("dark");
                const localTheme = localStorage.getItem('theme') ;
                if(localTheme && localTheme == "dark"){
                  localStorage.setItem('theme','light');
                  isDark.value=true
              }
                else {
                  localStorage.setItem('theme','dark');
                  isDark.value=false
                
                }

  }
</script>
<template>
  <div class="dark:bg-zinc-900 min-h-screen">
    <Navbar/>
    <RouterView/>
    <button class="fixed bottom-[5%] right-[5%] bg-white text-3xl shadow-xl rounded-full p-2 hover:bg-gray-50 hover:text-black dark:bg-zinc-800 dark:text-zinc-400" @click="toggleTheme">
      <i class="uil uil-moon" v-if="isDark"></i>
      <i class="uil uil-brightness-half" v-else></i>
    </button>
  </div>
</template>
