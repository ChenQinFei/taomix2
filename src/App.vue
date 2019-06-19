<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <PlayList :wnSettings="wnSettings" :selected="selected" @change="handleChange"/>
    <PlayDiv :circles="selectedWnSetting.sounds" :wnList="wnList" :isPlay="isPlay"/>
    <AddWnMenu :wnList="wnList" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import PlayDiv from './components/PlayDiv.vue';
import PlayList from './components/PlayList.vue';
import AddWnMenu from './components/AddWnMenu.vue';

import { api } from './util/api'
import { debuglog } from 'util';

export default {
  name: 'app',
  components: {
    PlayDiv,
    PlayList,
    AddWnMenu,
  },
  data(){
    return {
      selected: null,
      wnSettings: [],
      wnList: [],
      loading: true,
      errored: false,
      isPlay: true,
    }
  },
  computed: {
    selectedWnSetting(){
      //selected 为配置的id
      let index = this.wnSettings.findIndex(item => item.id === this.selected);
      return index != -1 ? this.wnSettings[index] : {};
    }
  },
  methods: {
    handleChange(e) {
      // debugger;
      this.selected = parseInt(e);
    },
    getWnSettings() {
      api.http(
        name='local-wnsettings',{
        success: (data) => {
          this.selected = data.selected;
          this.wnSettings = data.settings;
        },
        error: (err) => {
          console.log(err);
          this.errored = true;
        },
        final: () => {
          this.loading = false;
        }
      })
      // try {
      //   let {data} = await api.get('/static/wnsettings.json');
      //   this.selected = data.selected;
      //   this.wnSettings = data.settings;
       
      // } catch(error) {
      //   console.log(error)
      //  this.errored = true;
      // } finally {
      //   this.loading = false;
      // }
    }, 
    getWnList() {
      api.http(
        name='local-wnlist',{
        success: (data) => {
          this.wnList = data;
        },
        error: (err) => {
          console.log(err);
          this.errored = true;
        },
        final: () => {
          this.loading = false;
        }
      })
    },
  },
  mounted() {
    this.getWnSettings();
    this.getWnList();
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
