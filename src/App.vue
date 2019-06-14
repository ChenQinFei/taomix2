<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <PlayDiv :circles="selectedWnSetting.sounds" :wnList="wnList" :isPlay="isPlay"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import PlayDiv from './components/PlayDiv.vue';
import { api } from './util/api'

export default {
  name: 'app',
  components: {
    PlayDiv,
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
      return this.selected ? this.wnSettings[this.selected] : {};
    }
  },
  methods: {
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
