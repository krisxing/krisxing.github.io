<template>
  <div id="app">
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
  background:-webkit-radial-gradient(#fafafa,#e3e3e3); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient( #fafafa, #e3e3e3 ); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient( #fafafa,#e3e3e3 ); /* Firefox 3.6 - 15 */
  background: radial-gradient( #fafafa,#e3e3e3 ); /* 标准的语法 */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  min-width: 1320px;
  margin: 0 auto;
}
</style>
